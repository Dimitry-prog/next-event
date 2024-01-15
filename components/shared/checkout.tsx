import { EventType } from '@/types/event-types';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order-actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutProps = {
  event: EventType;
};

const Checkout = async ({ event }: CheckoutProps) => {
  const onCheckout = async () => {
    'use server';
    const order = {
      eventTitle: event.title,
      eventId: event.id,
      price: event.price,
      isFree: event.isFree,
      userId: event.userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
