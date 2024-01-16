'use server';

import { handleError } from '@/lib/utils';
import { OrderCheckoutParamsType, OrderCreateParamsType } from '@/types/order-types';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prismadb';

export const checkoutOrder = async (order: OrderCheckoutParamsType) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree ? 0 : Number(order.price) * 100;

  // eslint-disable-next-line no-useless-catch
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        userId: order.userId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    });

    redirect(session.url!);
  } catch (e) {
    throw e;
  }
};

export const createOrder = async (orderData: OrderCreateParamsType) => {
  try {
    const order = await prisma.order.create({
      data: {
        ...orderData,
      },
    });
    return order;
  } catch (e) {
    handleError(e);
  }
};

export const getOrdersByEvent = async ({
  eventId,
  search,
}: {
  eventId: string;
  search: string;
}) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        eventId,
        buyer: {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      select: {
        event: {
          select: {
            title: true,
          },
        },
        buyer: {
          select: {
            email: true,
          },
        },
        id: true,
        createdAt: true,
        totalAmount: true,
      },
    });

    return orders;
  } catch (e) {
    handleError(e);
  }
};
