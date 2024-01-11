import { EventType } from '@/types/event-types';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { checkoutOrder } from '@/lib/actions/oreder-actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutProps = {
  event: EventType;
  userId: string;
};

const Checkout = ({ event }: CheckoutProps) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    console.log('checkout');
    const order = {
      eventTitle: event.title,
      eventId: event.id,
      price: event.price,
      isFree: event.isFree,
      buyerId: event.userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
