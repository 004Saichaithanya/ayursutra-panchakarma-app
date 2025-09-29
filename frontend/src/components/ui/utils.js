import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names
 * @param {...any} inputs - Class values to merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}