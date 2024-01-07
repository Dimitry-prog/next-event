'use server';

import prisma from '../prismadb';
import { handleError } from '@/lib/utils';
import { EventType } from '@/types/event-types';

export const createEvent = async ({ event, userId, path }: EventType) => {
  try {
    const organizer = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const category = await prisma.category.findUnique({
      where: {
        id: event.categoryId,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const createdEvent = await prisma.event.create({
      data: {
        ...event,
        userId: organizer.id,
        categoryId: category.id,
      },
    });
    return createdEvent;
  } catch (e) {
    handleError(e);
  }
};
