import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * If the value looks like an email, return the local-part (before @).
 * Otherwise return the value unchanged.
 */
export function displayNameFrom(value?: string | null) {
  if (!value) return value ?? '';
  const idx = value.indexOf('@');
  return idx > 0 ? value.substring(0, idx) : value;
}