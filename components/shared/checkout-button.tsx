'use client';

import { EventType } from '@/types/event-types';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Checkout from '@/components/shared/checkout';

type CheckoutButtonProps = {
  event: EventType;
};

const CheckoutButton = ({ event }: CheckoutButtonProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3 ">
      {hasEventFinished ? (
        <p className="px-2 text-red-400">Sorry, tickets are no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size="lg" className="button rounded-full">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
