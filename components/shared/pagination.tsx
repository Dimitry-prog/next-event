'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

type PaginationProps = {
  page: number;
  totalPages: number;
};

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handlePagination = (btnType: string) => {
    const value = btnType === 'next' ? page + 1 : page - 1;
    params.set('page', value.toString());
    replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handlePagination('prev')}
        disabled={page <= 1}
        size="lg"
        variant="outline"
        className="w-28"
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePagination('next')}
        disabled={page >= totalPages}
        size="lg"
        variant="outline"
        className="w-28"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
