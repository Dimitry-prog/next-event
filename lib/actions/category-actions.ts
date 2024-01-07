'use server';

import { handleError } from '@/lib/utils';
import prisma from '../prismadb';

export const createCategory = async (categoryName: string) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
    return category;
  } catch (e) {
    handleError(e);
  }
};

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (e) {
    handleError(e);
  }
};
