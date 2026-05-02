const optionalClientEnv = [
  'NEXT_PUBLIC_POSTHOG_KEY',
  'NEXT_PUBLIC_POSTHOG_HOST',
] as const;

export type StorageType = 's3' | 'blob' | 'local';

export class MissingEnvError extends Error {
  constructor(name: string) {
    super(`Missing required environment variable: ${name}`);
    this.name = 'MissingEnvError';
  }
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new MissingEnvError(name);
  }
  return value;
}

export function getStorageType(): StorageType {
  const storageType = process.env.STORAGE_TYPE || 'local';

  if (
    storageType === 's3' ||
    storageType === 'blob' ||
    storageType === 'local'
  ) {
    return storageType;
  }

  throw new Error(
    `Unsupported STORAGE_TYPE "${storageType}". Expected "s3", "blob", or "local".`,
  );
}

export function getS3Env() {
  return {
    region: getRequiredEnv('AWS_REGION'),
    accessKeyId: getRequiredEnv('AWS_ACCESS_KEY_ID'),
    secretAccessKey: getRequiredEnv('AWS_SECRET_ACCESS_KEY'),
    bucketName: getRequiredEnv('S3_BUCKET_NAME'),
    cloudfrontDistributionUrl: getRequiredEnv('AWS_CLOUDFRONT_DOMAIN'),
  };
}

export const requiredLocalEnv = [
  'DATABASE_URL',
  'DIRECT_URL',
  'STORAGE_TYPE',
  'IP_HASH_SALT',
] as const;

export const requiredS3Env = [
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'S3_BUCKET_NAME',
  'AWS_CLOUDFRONT_DOMAIN',
  'NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN',
] as const;

export const optionalEnv = [...optionalClientEnv] as const;
