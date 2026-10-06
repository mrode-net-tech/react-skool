import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Joins class names and lets later Tailwind classes override earlier ones:
// cn('px-2 py-1', 'px-4') returns 'py-1 px-4'.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
