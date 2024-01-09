import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import EventList from '@/components/shared/event-list';
import { getEvents } from '@/lib/actions/event-actions';

export default async function Home() {
  const events = await getEvents({
    query: '',
    page: 1,
    limit: 6,
  });

  return (
    <>
      <section className="py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Create, Invite: Your Events, Here!</h1>

            <p className="p-reqular-20 md:p-regular-24">
              Learn and book helpful tips from ours mentors across world
            </p>

            <Button size="lg" asChild className="w-full sm:w-fit button">
              <Link href="#events">Explore now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] 2xl:max-h-[50vh] object-contain object-center"
          />
        </div>
      </section>

      <section id="events" className="my-8 wrapper flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="w-full flex flex-col md:flex-row gap-5">Search Category</div>

        {events && (
          <EventList
            data={events.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPage={events.totalPages}
          />
        )}
      </section>
    </>
  );
}
