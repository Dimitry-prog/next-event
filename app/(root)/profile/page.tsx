import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { getEventsByUserId } from '@/lib/actions/event-actions';
import EventList from '@/components/shared/event-list';

const ProfilePage = async ({searchParams}) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const eventsByUser = await getEventsByUserId({ userId, page: 1 });
  const userPurchasedEvents =
    eventsByUser?.data.filter((event) => event.orders.some((order) => order.userId === userId)) ||
    [];

  return (
    <>
      <section className="py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>

          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="my-8 wrapper">
        {eventsByUser && (
          <EventList
            data={userPurchasedEvents}
            emptyTitle="No event tickets"
            emptyStateSubtext="No worries!"
            collectionType="My_Tickets"
            limit={3}
            page={1}
            totalPage={eventsByUser.totalPages}
            urlParamName="ordersPage"
          />
        )}
      </section>

      <section className="py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>

          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create new event</Link>
          </Button>
        </div>
      </section>

      <section className="my-8 wrapper">
        {eventsByUser && (
          <EventList
            data={eventsByUser.data}
            emptyTitle="No event created"
            emptyStateSubtext="You can create some now!"
            collectionType="Events_Organized"
            limit={3}
            page={1}
            totalPage={eventsByUser.totalPages}
            urlParamName="eventsPage"
          />
        )}
      </section>
    </>
  );
};

export default ProfilePage;
