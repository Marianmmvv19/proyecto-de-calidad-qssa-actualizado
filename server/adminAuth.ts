import { timingSafeEqual } from 'crypto';

export const isAdminPasswordConfigured = (): boolean => Boolean(process.env.ADMIN_PASSWORD);

const matchesSecret = (provided: string, expected: string): boolean => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return providedBuffer.length === expectedBuffer.length
    && timingSafeEqual(providedBuffer, expectedBuffer);
};

export const verifyAdminCredentials = (username: unknown, password: unknown): boolean => {
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword || typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  return matchesSecret(username.trim(), expectedUsername)
    && matchesSecret(password, expectedPassword);
};
