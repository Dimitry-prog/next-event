export type OrderCheckoutParams = {
  eventTitle: string;
  eventId: string;
  price: string | null;
  isFree: boolean | null;
  buyerId: string;
};
