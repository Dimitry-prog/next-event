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

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions);

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions);

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions);

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return formattedPrice;
};
