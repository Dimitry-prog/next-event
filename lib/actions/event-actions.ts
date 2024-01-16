'use server';

import prisma from '../prismadb';
import { handleError } from '@/lib/utils';
import {
  EventDeleteParamsType,
  EventFormDataType,
  EventParamsType,
  EventsAllParamsType,
} from '@/types/event-types';
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
    revalidatePath(path);
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

export const getEvents = async ({ query, categoryId, limit = 6, page }: EventsAllParamsType) => {
  try {
    const totalEvents = await prisma.event.count({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
        categoryId,
      },
    });
    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
        categoryId,
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
    const event = await prisma.event.delete({
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

export const updateEvent = async ({
  eventId,
  event,
  path,
}: {
  eventId: string;
  path: string;
  event: EventFormDataType;
}) => {
  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...event,
      },
    });
    revalidatePath(path);
    return updatedEvent;
  } catch (e) {
    handleError(e);
  }
};

export const getEventsByCategoryId = async ({
  categoryId,
  eventId,
  limit = 3,
  page,
}: {
  categoryId: string;
  eventId: string;
  page: number;
  limit?: number;
}) => {
  try {
    const totalEvents = await prisma.event.count({
      where: {
        AND: [
          { categoryId },
          {
            NOT: {
              id: eventId,
            },
          },
        ],
      },
    });

    const events = await prisma.event.findMany({
      where: {
        AND: [
          { categoryId },
          {
            NOT: {
              id: eventId,
            },
          },
        ],
      },
      include: {
        category: true,
        organizer: true,
        orders: true,
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

export const getEventsByUserId = async ({
  userId,
  limit = 3,
  page,
}: {
  userId: string;
  limit?: number;
  page: number;
}) => {
  try {
    const totalEvents = await prisma.event.count({
      where: {
        userId,
      },
    });

    const events = await prisma.event.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        organizer: true,
        orders: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: limit * (page - 1),
    });

    return { data: events, totalPages: Math.ceil(totalEvents / limit) };
  } catch (e) {
    handleError(e);
  }
};
