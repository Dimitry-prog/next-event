'use client';

import { headerLinks } from '@/lib/contants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="w-full md:flex-between flex flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={cn('flex-center p-medium-16 whitespace-nowrap', {
              'text-primary-500': isActive,
            })}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
