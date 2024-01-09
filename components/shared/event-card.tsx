import { EventType } from '@/types/event-types';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import DeleteConfirmation from '@/components/shared/delete-confirmation';

type EventCardProps = {
  event: EventType;
  hidePrice?: boolean;
  hasOrderLink?: boolean;
};

const EventCard = ({ event, hidePrice, hasOrderLink }: EventCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer.id;

  return (
    <div className="w-full max-w-[400px] min-h-[300px] md:min-h-[438px] flex flex-col rounded-xl overflow-hidden bg-white shadow-md transition-all hover:shadow-lg group relative">
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="min-h-[200px] flex-center flex-grow text-grey-500 bg-gray-50 bg-cover bg-center"
      />

      {isEventCreator && !hidePrice && (
        <div className="flex flex-col items-center rounded-xl bg-white shadow-sm transition-all absolute right-2 top-2">
          <Link href={`/events/${event.id}/update`} className="p-3">
            <Image src="/assets/icons/edit.svg" alt="update" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event.id} />
        </div>
      )}

      <Link href={`/events/${event.id}`} className="min-h-[230px] p-5 flex flex-col gap-3 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="w-min px-4 py-1 text-green-600 p-semibold-14 rounded-full bg-green-100">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>

            <p className="w-min px-4 py-1 text-grey-600 p-semibold-14 rounded-full bg-grey-400">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <h2 className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</h2>

        <div className="w-full flex-between">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event.id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
