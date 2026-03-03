import { parsePhoneNumberWithError } from "libphonenumber-js/max";

export function formatPhoneNumber(phone: string): string {
  if (!phone) return phone;

  const normalized = phone.startsWith("+") ? phone : `+${phone}`;

  try {
    return parsePhoneNumberWithError(normalized).formatInternational();
  } catch {
    return phone;
  }
}
