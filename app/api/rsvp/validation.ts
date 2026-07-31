export type RsvpMemberInput = {
  name?: unknown;
  age?: unknown;
};

export type MemberValidationResult =
  | { error: string }
  | { member: { name: string; age: number } };

export const maxMembers = 12;
export const maxNameLength = 90;

export const normalizeName = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

export const normalizeAge = (value: unknown) => {
  if (
    value === null ||
    value === undefined ||
    typeof value === "boolean" ||
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && !/^\d{1,3}$/.test(value.trim()))
  ) {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(value.trim());
  return Number.isInteger(numericValue) ? numericValue : null;
};

export const validateMember = (
  member: RsvpMemberInput,
  label: string,
): MemberValidationResult => {
  const name = normalizeName(member.name);
  const age = normalizeAge(member.age);

  if (!name) {
    return { error: `${label} name is required.` };
  }

  if (name.length > maxNameLength) {
    return { error: `${label} name is too long.` };
  }

  if (age === null || age < 0 || age > 120) {
    return { error: `${label} age must be between 0 and 120.` };
  }

  return { member: { name, age } };
};
