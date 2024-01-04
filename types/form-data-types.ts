import * as z from 'zod';
import { eventFormSchema } from '@/lib/validation/form-event-validation';

export type EventFormDataType = z.infer<typeof eventFormSchema>;
