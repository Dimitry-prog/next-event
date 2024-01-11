import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order-actions';

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  const eventType = event.type;

  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    const orderData = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      userId: metadata?.userId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
    };

    const order = await createOrder(orderData);

    return NextResponse.json({
      message: 'Order successfully created',
      status: 201,
      data: order,
    });
  }

  return new Response('', { status: 200 });
}
