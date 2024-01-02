import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.log(error);
  let message = '';

  if (typeof error === 'string') {
    message = error;
  } else {
    message = JSON.stringify(error);
  }
  return {
    message,
  };
};
