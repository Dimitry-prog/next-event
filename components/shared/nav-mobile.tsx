import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import NavItems from '@/components/shared/nav-items';

const NavMobile = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="mobile menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="md:hidden flex flex-col gap-6 bg-white">
          <Image src="/assets/images/logo.svg" alt="Evently logo" width={128} height={38} />
          <Separator className="border border-gray-500" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavMobile;
