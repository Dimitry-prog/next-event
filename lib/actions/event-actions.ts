'use server';

import prisma from '../prismadb';
import { handleError } from '@/lib/utils';
import { EventDeleteParamsType, EventParamsType, EventsAllParamsType } from '@/types/event-types';
import { revalidatePath } from 'next/cache';

export const createEvent = async ({ event, userId, path }: EventParamsType) => {
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

export const getEventById = async (eventId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        orders: true,
        organizer: true,
        category: true,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (e) {
    handleError(e);
  }
};

export const getEvents = async ({ query, limit = 6, page }: EventsAllParamsType) => {
  try {
    const totalEvents = await prisma.event.count({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        orders: true,
        organizer: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      data: events,
      totalPages: Math.ceil(totalEvents / limit),
    };
  } catch (e) {
    handleError(e);
  }
};

export const deleteEvent = async ({ eventId, path }: EventDeleteParamsType) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    revalidatePath(path);
    return event;
  } catch (e) {
    handleError(e);
  }
};
