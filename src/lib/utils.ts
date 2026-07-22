import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const getInitials = (fullName?: string) => {
  if (!fullName) return "";

  const names = fullName.trim().split(/\s+/);

  return (
    (names[0]?.[0] ?? "") +
    (names.length > 1 ? names[names.length - 1][0] : "")
  ).toUpperCase();
};