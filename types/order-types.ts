export type OrderType = {
  id: string;
  stripeId: string;
  totalAmount?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  eventId: string;
};

export type OrderCheckoutParamsType = {
  eventTitle: string;
  eventId: string;
  price: string | null;
  isFree: boolean | null;
  userId: string;
};

export type OrderCreateParamsType = {
  stripeId: string;
  userId: string;
  eventId: string;
  totalAmount: string;
};
