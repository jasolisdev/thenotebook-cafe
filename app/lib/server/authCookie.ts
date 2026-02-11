import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const TOKEN_VERSION = "v1";

export const AUTH_COOKIE_NAME = "site-auth";
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getAuthCookieSecret(): string | null {
  const explicitSecret = process.env.SITE_AUTH_COOKIE_SECRET?.trim();
  if (explicitSecret) return explicitSecret;

  const passwordFallback = process.env.SITE_PASSWORD?.trim();
  return passwordFallback || null;
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAuthCookieValue(now = Date.now()): string | null {
  const secret = getAuthCookieSecret();
  if (!secret) return null;

  const expiresAt = now + AUTH_COOKIE_MAX_AGE_SECONDS * 1000;
  const nonce = randomBytes(12).toString("base64url");
  const payload = `${TOKEN_VERSION}.${expiresAt}.${nonce}`;
  const signature = signPayload(payload, secret);

  return `${payload}.${signature}`;
}

export function isAuthCookieValid(
  cookieValue: string | undefined,
  now = Date.now()
): boolean {
  if (!cookieValue) return false;

  const secret = getAuthCookieSecret();
  if (!secret) return false;

  const parts = cookieValue.split(".");
  if (parts.length !== 4) return false;

  const [version, expiresAtRaw, nonce, signature] = parts;
  if (version !== TOKEN_VERSION || !nonce || !signature) return false;

  const expiresAt = Number.parseInt(expiresAtRaw, 10);
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return false;

  const payload = `${version}.${expiresAtRaw}.${nonce}`;
  const expectedSignature = signPayload(payload, secret);

  try {
    const providedBytes = Buffer.from(signature, "base64url");
    const expectedBytes = Buffer.from(expectedSignature, "base64url");

    if (providedBytes.length !== expectedBytes.length) return false;
    return timingSafeEqual(providedBytes, expectedBytes);
  } catch {
    return false;
  }
}
