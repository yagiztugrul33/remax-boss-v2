/**
 * Admin allowlist — server-only.
 * "Login olmuş olmak" tek başına yetmez; ADMIN_EMAILS içinde olmak şarttır.
 * Signup açık kalsa bile yabancılar /admin'e geçemez.
 */
function getAllowlist(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = getAllowlist();
  if (list.length === 0) return false; // env boşsa hiç kimse admin değil
  return list.includes(email.toLowerCase());
}
