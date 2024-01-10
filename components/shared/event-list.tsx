import { EventType } from '@/types/event-types';
import EventCard from '@/components/shared/event-card';

type EventListType = {
  data: EventType[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events';
  totalPage?: number;
  urlParamName?: string;
};

const EventList = ({
  data,
  collectionType,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPage = 0,
  limit,
  urlParamName,
}: EventListType) => {
  return (
    <>
      {data.length ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';
              return (
                <li key={event.id} className="flex justify-center">
                  <EventCard event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="w-full min-h-[200px] py-28 flex-center wrapper flex-col gap-3 text-center rounded-md bg-grey-50">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default EventList;
