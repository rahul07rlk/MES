import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { getGallery } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore campus life through photographs of events, activities and facilities.',
};

export const revalidate = 300;

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from campus life, classrooms, events and the playground."
        crumbs={[{ label: 'Gallery' }]}
      />
      <section className="section">
        <div className="container-wide">
          <MasonryGallery items={items} />
        </div>
      </section>
    </>
  );
}
