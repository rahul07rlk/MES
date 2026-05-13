'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Facility = {
  title: string;
  img: string;
  /** position class for the explicit 4-col desktop grid; mobile/tablet flow naturally */
  span?: string;
};

const facilities: Facility[] = [
  {
    title: 'Smart Classrooms',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=85',
    span: 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    title: 'Science Labs',
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Library',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=85',
  },
  {
    // Wide landscape sports image with players visible — no more crop issues.
    title: 'Sports Complex',
    img: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1400&q=85',
    span: 'col-span-2 lg:col-span-2',
  },
  {
    title: 'Computer Lab',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Auditorium',
    img: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Robotics Lab',
    img: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1400&q=85',
    span: 'col-span-2 lg:col-span-2',
  },
];

export function Facilities() {
  return (
    <section className="section bg-ink-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
      <div className="container-wide relative">
        <SectionHeader
          eyebrow="World-class facilities"
          title="A campus built for discovery"
          description="State-of-the-art classrooms, labs and studios — designed to make learning tactile, social, and ambitious."
          className="text-white"
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4
                        auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[230px] lg:auto-rows-[220px]
                        gap-3 md:gap-4">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${f.span ?? ''}`}
            >
              <Image
                src={f.img}
                alt={f.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                <h3 className="font-display text-sm md:text-base lg:text-lg font-semibold tracking-tight drop-shadow-md">
                  {f.title}
                </h3>
                <span className="block h-px w-8 md:w-10 bg-gradient-to-r from-cyan-400 to-transparent mt-1.5 group-hover:w-20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
