import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { NewsTicker } from '@/components/home/NewsTicker';
import { Stats } from '@/components/home/Stats';
import { AboutPreview } from '@/components/home/AboutPreview';
import { AcademicPrograms } from '@/components/home/AcademicPrograms';
import { Facilities } from '@/components/home/Facilities';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
import { EventsPreview } from '@/components/home/EventsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { CTABanner } from '@/components/home/CTABanner';
import {
  getAnnouncements, getSchoolInfo, getTestimonials, getUpcomingEvents,
} from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'A K–12 institution preparing students for a global future through rigorous academics, creative arts, and ethical leadership.',
  alternates: { canonical: '/' },
};

export const revalidate = 300;

export default async function HomePage() {
  const [info, events, announcements, testimonials] = await Promise.all([
    getSchoolInfo(),
    getUpcomingEvents(3),
    getAnnouncements(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero
        name={info?.name}
        tagline={info?.tagline}
        motto={info?.motto}
        heroImage={info?.hero_image_url}
      />
      <NewsTicker items={announcements} />
      <Stats stats={info?.stats ?? {}} />
      <AboutPreview aboutShort={info?.about_short} />
      <AcademicPrograms />
      <Facilities />
      <PrincipalMessage
        name={info?.principal_name}
        message={info?.principal_message}
        image={info?.principal_image_url}
      />
      <EventsPreview events={events} />
      <Testimonials items={testimonials} />
      <CTABanner />
    </>
  );
}
