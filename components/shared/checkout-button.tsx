import { EventType } from '@/types/event-types';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Checkout from '@/components/shared/checkout';

type CheckoutButtonProps = {
  event: EventType;
};

const CheckoutButton = ({ event }: CheckoutButtonProps) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const isAlreadyHaveTicket = event.orders.some((order) => order.userId === event.userId);

  return (
    <div className="flex items-center gap-3 ">
      {hasEventFinished ? (
        <p className="px-2 text-red-400">Sorry, tickets are no longer available</p>
      ) : isAlreadyHaveTicket ? (
        <p className="p-regular-18 text-primary-500">You already have the ticket</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size="lg" className="button rounded-full">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
