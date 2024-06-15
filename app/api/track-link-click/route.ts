import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';

const prisma = new PrismaClient();

const hashIpAddress = (ip: string, salt: string): string => {
  return crypto.createHmac('sha256', salt).update(ip).digest('hex');
};

const anonymizeUserAgent = (userAgentString: string) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  return {
    browser: `${result.browser.name} ${result.browser.version}`,
    os: `${result.os.name} ${result.os.version}`,
    device: result.device.type || 'Desktop',
  };
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { linkId, url, linkType, bandId } = await req.json();

    const ipAddress: string =
      req.headers.get('x-forwarded-for') || req.ip || '';
    const userAgentString: string = req.headers.get('user-agent') || '';
    const referrerUrl: string = req.headers.get('referer') || '';
    const salt: string = process.env.IP_HASH_SALT || 'default_salt'; // Use an environment variable for the salt

    // Hash the IP address with a consistent salt
    const hashedIpAddress: string = hashIpAddress(ipAddress, salt);

    // Anonymize the user agent
    const anonymizedUserAgent: { browser: string; os: string; device: string } =
      anonymizeUserAgent(userAgentString);

    const linkClick = await prisma.linkClick.create({
      data: {
        link: linkId ? { connect: { id: linkId } } : undefined,
        url: url || undefined,
        linkType,
        band: bandId ? { connect: { id: bandId } } : undefined,
        ipAddress: hashedIpAddress,
        userAgent: JSON.stringify(anonymizedUserAgent),
        referrerUrl,
        pageUrl: req.url,
      },
    });

    return NextResponse.json(linkClick, { status: 200 });
  } catch (error) {
    console.error('Error recording link click:', error);

    // Close the Prisma client gracefully in case of an error
    await prisma.$disconnect();

    return NextResponse.json(
      { error: 'Failed to record link click' },
      { status: 500 },
    );
  }
}
