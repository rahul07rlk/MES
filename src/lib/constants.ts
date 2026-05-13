export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Modern Excellence School',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourschool.edu',
  description:
    'A K–12 institution preparing students for a global future through rigorous academics, creative arts, and ethical leadership.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '15551234567',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
] as const;

export const GRADES = [
  'Pre-K', 'Kindergarten',
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8',
  'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
] as const;

export const DEPARTMENTS = [
  'Administration',
  'Mathematics',
  'Science',
  'English',
  'Social Studies',
  'Languages',
  'Arts',
  'Sports',
  'Technology',
] as const;
