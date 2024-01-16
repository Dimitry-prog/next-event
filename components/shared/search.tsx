'use client';

import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchProps = {
  placeholder?: string;
};

const Search = ({ placeholder = 'Search title' }: SearchProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    params.set('page', '1');

    if (!e.target.value) {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }
    replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
      <Input
        onChange={handleSearch}
        type="text"
        placeholder={placeholder}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
