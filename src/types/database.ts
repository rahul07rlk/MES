export type SchoolStats = {
  students?: number;
  faculty?: number;
  years?: number;
  success_rate?: number;
};

export type SchoolInfo = {
  id: string;
  name: string;
  tagline: string | null;
  motto: string | null;
  about_short: string | null;
  history: string | null;
  vision: string | null;
  mission: string | null;
  principal_name: string | null;
  principal_message: string | null;
  principal_image_url: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  google_maps_embed: string | null;
  stats: SchoolStats;
  created_at: string;
  updated_at: string;
};

export type Faculty = {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string | null;
  experience_years: number;
  bio: string | null;
  email: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  category: string;
  start_at: string;
  end_at: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string | null;
  link_url: string | null;
  priority: number;
  published_at: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryItem = {
  id: string;
  title: string | null;
  caption: string | null;
  image_url: string;
  category: string;
  width: number | null;
  height: number | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type AdmissionInquiry = {
  id: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  grade_applying: string;
  previous_school: string | null;
  address: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'enrolled' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  author_name: string;
  author_role: string | null;
  author_image_url: string | null;
  content: string;
  rating: number;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      school_info: { Row: SchoolInfo; Insert: Partial<SchoolInfo>; Update: Partial<SchoolInfo> };
      faculty: { Row: Faculty; Insert: Partial<Faculty>; Update: Partial<Faculty> };
      events: { Row: EventItem; Insert: Partial<EventItem>; Update: Partial<EventItem> };
      announcements: { Row: Announcement; Insert: Partial<Announcement>; Update: Partial<Announcement> };
      gallery: { Row: GalleryItem; Insert: Partial<GalleryItem>; Update: Partial<GalleryItem> };
      admissions: { Row: AdmissionInquiry; Insert: Partial<AdmissionInquiry>; Update: Partial<AdmissionInquiry> };
      testimonials: { Row: Testimonial; Insert: Partial<Testimonial>; Update: Partial<Testimonial> };
      contact_messages: { Row: ContactMessage; Insert: Partial<ContactMessage>; Update: Partial<ContactMessage> };
      newsletter_subscribers: {
        Row: { id: string; email: string; confirmed: boolean; created_at: string };
        Insert: { email: string; confirmed?: boolean };
        Update: { email?: string; confirmed?: boolean };
      };
      admins: {
        Row: { user_id: string; email: string; full_name: string | null; created_at: string };
        Insert: { user_id: string; email: string; full_name?: string | null };
        Update: { email?: string; full_name?: string | null };
      };
    };
  };
};
