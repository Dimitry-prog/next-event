'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { startTransition, useEffect, useState } from 'react';
import { CategoryType } from '@/types/category-types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { createCategory, getCategories } from '@/lib/actions/category-actions';

type DropdownCategoriesProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const DropdownCategories = ({ value, onChangeHandler }: DropdownCategoriesProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    createCategory(newCategory.trim()).then((category) => {
      if (category) {
        setCategories((prev) => [...prev, category]);
      }
    });
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const categoriesList = await getCategories();
      if (categoriesList) {
        setCategories(categoriesList);
      }
    };

    getAllCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {!!categories.length &&
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id} className="select-item p-regular-14">
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="w-full py-3 pl-8 p-medium-14 flex text-primary-500 rounded-sm hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Create New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  onChange={(e) => setNewCategory(e.target.value)}
                  type="text"
                  placeholder="Category name"
                  className="mt-3 input-field"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DropdownCategories;
