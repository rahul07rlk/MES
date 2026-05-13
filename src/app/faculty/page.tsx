import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { FacultyGrid } from '@/components/faculty/FacultyGrid';
import { getFaculty } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Faculty',
  description: 'Meet the educators who make our school remarkable.',
};

export const revalidate = 300;

export default async function FacultyPage() {
  const faculty = await getFaculty();
  return (
    <>
      <PageHero
        title="Our faculty"
        subtitle="A team of educators, mentors, and lifelong learners."
        crumbs={[{ label: 'Faculty' }]}
      />
      <section className="section">
        <div className="container-wide">
          <FacultyGrid faculty={faculty} />
        </div>
      </section>
    </>
  );
}
