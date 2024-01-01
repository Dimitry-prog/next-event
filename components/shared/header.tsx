import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between ">
        <Link href="/" className="w-36">
          <Image src="/assets/images/logo.svg" alt="Evently logo" width={128} height={38} />
        </Link>

        <div className="w-32 flex justify-end gap-3">
          <SignedOut>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
