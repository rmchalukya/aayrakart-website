/**
 * Token gate for the /admin editor. There is no login — access is controlled
 * by a secret token (ADMIN_TOKEN in .env.local) passed with each admin request
 * and validated here on the server. Keep the token private.
 */
export function isValidAdminToken(token: string | null | undefined): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false; // no token configured => deny everything
  if (!token) return false;
  // Constant-time-ish comparison
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}
