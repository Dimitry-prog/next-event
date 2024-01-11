import * as z from 'zod';
import { eventFormSchema } from '@/lib/validation/form-event-validation';
import { UserType } from '@/types/user-types';
import { CategoryType } from '@/types/category-types';

export type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  organizer: UserType;
  userId: string;
  category: CategoryType;
  categoryId: string;
};

export type EventParamsType = {
  userId: string;
  event: EventFormDataType;
  path: string;
};

export type EventsAllParamsType = {
  query: string;
  limit: number;
  page: number;
};

export type EventFormDataType = z.infer<typeof eventFormSchema>;

export type EventDeleteParamsType = {
  eventId: string;
  path: string;
};
