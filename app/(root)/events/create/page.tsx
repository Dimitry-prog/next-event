import EventForm from '@/components/shared/event-form';
import { auth } from '@clerk/nextjs';

const CreateEvents = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvents;
