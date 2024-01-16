'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CategoryType } from '@/types/category-types';
import { getCategories } from '@/lib/actions/category-actions';

const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const handleSelect = (category: string) => {
    params.set('page', '1');

    if (category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    replace(`${pathname}?${params}`, { scroll: false });
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
    <Select onValueChange={(value) => handleSelect(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="p-regular-14 select-item">
          All
        </SelectItem>
        {!!categories.length &&
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id} className="select-item p-regular-14">
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
