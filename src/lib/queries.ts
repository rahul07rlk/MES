import { createClient } from '@/lib/supabase/server';
import type {
  Announcement, EventItem, Faculty, GalleryItem, SchoolInfo, Testimonial,
} from '@/types/database';

export async function getSchoolInfo(): Promise<SchoolInfo | null> {
  const supabase = await createClient();
  const { data } = await supabase.from('school_info').select('*').limit(1).maybeSingle();
  return data ?? null;
}

export async function getFaculty(): Promise<Faculty[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('faculty')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  return data ?? [];
}

export async function getUpcomingEvents(limit = 6): Promise<EventItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true })
    .limit(limit);
  return data ?? [];
}

export async function getAllEvents(): Promise<EventItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('start_at', { ascending: false });
  return data ?? [];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('published_at', { ascending: false });
  return data ?? [];
}

export async function getGallery(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('display_order', { ascending: true });
  return data ?? [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });
  return data ?? [];
}
