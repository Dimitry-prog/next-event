import { getEventById, getEventsByCategoryId } from '@/lib/actions/event-actions';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import EventList from '@/components/shared/event-list';
import CheckoutButton from '@/components/shared/checkout-button';

type SingleEventPageProps = {
  params: {
    eventId: string;
  };
};

const SingleEventPage = async ({ params: { eventId } }: SingleEventPageProps) => {
  const event = await getEventById(eventId);
  const eventsByCategory = await getEventsByCategoryId({
    categoryId: event?.categoryId as string,
    eventId: event?.id as string,
    page: 1,
  });

  if (!event) {
    return <h1>LOADING....</h1>;
  }

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="w-full p-5 md:p-10 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="px-5 py-2 p-bold-20 text-green-700 rounded-full bg-green-500/10">
                    {event.isFree ? 'FREE' : `$${event.price}`}
                  </p>

                  <p className="px-4 py-2.5 p-medium-16 text-grey-500 rounded-full bg-grey-500/10">
                    {event.category.name}
                  </p>
                </div>

                <p className="ml-2 mt-2 sm:mt-0 p-medium-18">
                  by{' '}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex flex-col g-5">
              <div className="flex gap-2 md:gap-3">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />

                <div className="flex flex-col items-center p-medium-16 lg:p-regular-20">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{' '}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{' '}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />

                <p className="p-medium-16 lg:p-reqular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-gray-700"> What You Will Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-8 wrapper flex  flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        {eventsByCategory && (
          <EventList
            data={eventsByCategory.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPage={eventsByCategory.totalPages}
          />
        )}
      </section>
    </>
  );
};

export default SingleEventPage;
