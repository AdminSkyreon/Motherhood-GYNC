/**
 * Normalize Indian mobile to 10 digits (strips country code +91, spaces, etc.).
 */
export function normalizeIndianMobile(raw: unknown): string | null {
  if (raw == null || raw === "") return null;
  let digits = String(raw).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  if (digits.length !== 10) return null;
  if (!/^[6-9]/.test(digits)) return null;
  return digits;
}

export function isValidIndianMobile(raw: unknown): boolean {
  return normalizeIndianMobile(raw) !== null;
}
