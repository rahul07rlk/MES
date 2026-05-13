'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

export function WhatsAppButton() {
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello! I'd like to know more about admissions at " + SITE.name + ".")}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 220 }}
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center
                 rounded-full bg-[#25D366] text-white shadow-elevated
                 hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="sr-only">WhatsApp</span>
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
    </motion.a>
  );
}
