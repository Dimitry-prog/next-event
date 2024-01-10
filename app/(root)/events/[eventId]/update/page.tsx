import EventForm from '@/components/shared/event-form';
import { auth } from '@clerk/nextjs';
import { getEventById } from '@/lib/actions/event-actions';

type UpdateEventsProps = {
  params: {
    eventId: string;
  };
};

const UpdateEvents = async ({ params }: UpdateEventsProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(params.eventId);

  return (
    <>
      <section className="py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        {event && <EventForm event={event} eventId={event.id} userId={userId} type="Update" />}
      </div>
    </>
  );
};

export default UpdateEvents;
