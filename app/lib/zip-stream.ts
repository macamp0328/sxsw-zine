/* eslint-disable no-bitwise, no-await-in-loop -- ZIP CRCs and sequential stream writes require bitwise operations and ordered awaits. */

type ZipEntrySource = {
  filename: string;
  stream: () => Promise<AsyncIterable<Uint8Array>>;
};

const textEncoder = new TextEncoder();

const crcTable = new Uint32Array(256);
for (let index = 0; index < 256; index += 1) {
  let crc = index;
  for (let bit = 0; bit < 8; bit += 1) {
    crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  crcTable[index] = crc >>> 0;
}

const writeUint16 = (value: number) => {
  const buffer = new Uint8Array(2);
  const view = new DataView(buffer.buffer);
  view.setUint16(0, value, true);
  return buffer;
};

const writeUint32 = (value: number) => {
  const buffer = new Uint8Array(4);
  const view = new DataView(buffer.buffer);
  view.setUint32(0, value >>> 0, true);
  return buffer;
};

const concatChunks = (chunks: Uint8Array[]) => {
  const length = chunks.reduce((total, chunk) => total + chunk.byteLength, 0);
  const output = new Uint8Array(length);
  let offset = 0;

  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  });

  return output;
};

const updateCrc = (crc: number, chunk: Uint8Array) => {
  let updated = crc;
  chunk.forEach((byte) => {
    updated = crcTable[(updated ^ byte) & 0xff] ^ (updated >>> 8);
  });
  return updated >>> 0;
};

function localFileHeader(filenameBytes: Uint8Array) {
  return concatChunks([
    writeUint32(0x04034b50),
    writeUint16(20),
    writeUint16(0x08),
    writeUint16(0),
    writeUint16(0),
    writeUint16(0),
    writeUint32(0),
    writeUint32(0),
    writeUint32(0),
    writeUint16(filenameBytes.byteLength),
    writeUint16(0),
    filenameBytes,
  ]);
}

function dataDescriptor(crc: number, size: number) {
  return concatChunks([
    writeUint32(0x08074b50),
    writeUint32(crc),
    writeUint32(size),
    writeUint32(size),
  ]);
}

function centralDirectoryHeader({
  crc,
  filenameBytes,
  offset,
  size,
}: {
  crc: number;
  filenameBytes: Uint8Array;
  offset: number;
  size: number;
}) {
  return concatChunks([
    writeUint32(0x02014b50),
    writeUint16(20),
    writeUint16(20),
    writeUint16(0x08),
    writeUint16(0),
    writeUint16(0),
    writeUint16(0),
    writeUint32(crc),
    writeUint32(size),
    writeUint32(size),
    writeUint16(filenameBytes.byteLength),
    writeUint16(0),
    writeUint16(0),
    writeUint16(0),
    writeUint16(0),
    writeUint32(0),
    writeUint32(offset),
    filenameBytes,
  ]);
}

function endOfCentralDirectory({
  centralDirectoryOffset,
  centralDirectorySize,
  entryCount,
}: {
  centralDirectoryOffset: number;
  centralDirectorySize: number;
  entryCount: number;
}) {
  return concatChunks([
    writeUint32(0x06054b50),
    writeUint16(0),
    writeUint16(0),
    writeUint16(entryCount),
    writeUint16(entryCount),
    writeUint32(centralDirectorySize),
    writeUint32(centralDirectoryOffset),
    writeUint16(0),
  ]);
}

export function createZipStream(entries: ZipEntrySource[]) {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const centralDirectory: Uint8Array[] = [];
      let offset = 0;

      for (const entry of entries) {
        const filenameBytes = textEncoder.encode(entry.filename);
        const header = localFileHeader(filenameBytes);
        controller.enqueue(header);

        const entryOffset = offset;
        offset += header.byteLength;

        let crc = 0xffffffff;
        let size = 0;
        const stream = await entry.stream();

        for await (const rawChunk of stream) {
          const chunk =
            rawChunk instanceof Uint8Array
              ? rawChunk
              : new Uint8Array(rawChunk);
          crc = updateCrc(crc, chunk);
          size += chunk.byteLength;
          offset += chunk.byteLength;
          controller.enqueue(chunk);
        }

        const finalCrc = (crc ^ 0xffffffff) >>> 0;
        const descriptor = dataDescriptor(finalCrc, size);
        controller.enqueue(descriptor);
        offset += descriptor.byteLength;

        centralDirectory.push(
          centralDirectoryHeader({
            crc: finalCrc,
            filenameBytes,
            offset: entryOffset,
            size,
          }),
        );
      }

      const centralDirectoryOffset = offset;
      const centralDirectoryBytes = concatChunks(centralDirectory);
      controller.enqueue(centralDirectoryBytes);
      offset += centralDirectoryBytes.byteLength;

      controller.enqueue(
        endOfCentralDirectory({
          centralDirectoryOffset,
          centralDirectorySize: centralDirectoryBytes.byteLength,
          entryCount: entries.length,
        }),
      );

      controller.close();
    },
  });
}
