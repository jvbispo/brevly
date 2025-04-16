import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValidAlias( alias: string ) {
  const pattern = /^[a-zA-Z0-9-]+$/;
  return pattern.test(alias);
}
