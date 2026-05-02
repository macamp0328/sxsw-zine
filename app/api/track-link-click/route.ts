import { LinkClickType } from '@prisma/client';
import crypto from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';

import { getRequiredEnv, MissingEnvError } from '@/app/lib/env';
import { getPrisma } from '@/app/lib/prisma';
import { isRateLimited } from '@/app/lib/rate-limit';

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

const isLinkClickType = (value: unknown): value is LinkClickType => {
  return (
    typeof value === 'string' &&
    Object.values(LinkClickType).includes(value as LinkClickType)
  );
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const ipAddress: string =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '';

    if (
      isRateLimited(`track-link-click:${ipAddress || 'unknown'}`, {
        limit: 120,
        windowMs: 60_000,
      })
    ) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    const { linkId, url, linkType, bandId } = body as Record<string, unknown>;

    if (!isLinkClickType(linkType)) {
      return NextResponse.json({ error: 'Invalid linkType' }, { status: 400 });
    }

    if (linkId !== undefined && typeof linkId !== 'string') {
      return NextResponse.json({ error: 'Invalid linkId' }, { status: 400 });
    }

    if (bandId !== undefined && typeof bandId !== 'string') {
      return NextResponse.json({ error: 'Invalid bandId' }, { status: 400 });
    }

    if (url !== undefined && typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
    }

    const userAgentString: string = req.headers.get('user-agent') || '';
    const referrerUrl: string = req.headers.get('referer') || '';
    const salt: string = getRequiredEnv('IP_HASH_SALT');

    // Hash the IP address with a consistent salt
    const hashedIpAddress: string = hashIpAddress(ipAddress, salt);

    // Anonymize the user agent
    const anonymizedUserAgent: { browser: string; os: string; device: string } =
      anonymizeUserAgent(userAgentString);

    const linkClick = await getPrisma().linkClick.create({
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

    if (error instanceof MissingEnvError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Failed to record link click' },
      { status: 500 },
    );
  }
}
