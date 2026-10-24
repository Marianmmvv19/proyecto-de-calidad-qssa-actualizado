import { timingSafeEqual } from 'crypto';

const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'admin1234!@';

export const isAdminPasswordConfigured = (): boolean =>
  Boolean(process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD);

const matchesSecret = (provided: string, expected: string): boolean => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return providedBuffer.length === expectedBuffer.length
    && timingSafeEqual(providedBuffer, expectedBuffer);
};

export const verifyAdminCredentials = (username: unknown, password: unknown): boolean => {
  const expectedUsername = process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  if (!expectedPassword || typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  return matchesSecret(username.trim(), expectedUsername)
    && matchesSecret(password, expectedPassword);
};
