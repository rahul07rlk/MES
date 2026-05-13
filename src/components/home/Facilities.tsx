'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const facilities = [
  { title: 'Smart Classrooms', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85', span: 'lg:col-span-2 lg:row-span-2' },
  { title: 'Science Labs',     img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85' },
  { title: 'Library',          img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=85' },
  { title: 'Sports Complex',   img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85', span: 'lg:col-span-2' },
  { title: 'Computer Lab',     img: 'https://images.unsplash.com/photo-1581091215367-59ab6e3bf0c1?auto=format&fit=crop&w=900&q=85' },
  { title: 'Auditorium',       img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85' },
  { title: 'Robotics Lab',     img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=900&q=85' },
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

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] md:auto-rows-[220px] gap-3 md:gap-4">
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
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/35 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="font-display text-base md:text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <span className="block h-px w-10 bg-gradient-to-r from-cyan-500 to-transparent mt-1 group-hover:w-20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
