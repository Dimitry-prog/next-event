'use server';

import { UserType } from '@/types/user-types';
import { handleError } from '@/lib/utils';
import prisma from '../prismadb';

export const createUser = async (userData: Omit<UserType, 'id'>) => {
  try {
    const user = await prisma.user.create({ data: userData });
    return user;
  } catch (e) {
    handleError(e);
  }
};

export const updateUser = async (clerkId: string, userData: Partial<UserType>) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        ...userData,
      },
    });

    return updatedUser;
  } catch (e) {
    handleError(e);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    await prisma.event.deleteMany({
      where: {
        userId: deletedUser.id,
      },
    });
    await prisma.order.deleteMany({
      where: {
        userId: deletedUser.id,
      },
    });

    return deletedUser;
  } catch (e) {
    handleError(e);
  }
};
