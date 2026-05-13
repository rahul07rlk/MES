-- Sample seed data for local development / preview.
-- Run AFTER schema.sql.

insert into public.school_info (
  name, tagline, motto, about_short, history, vision, mission,
  principal_name, principal_message,
  address, phone, email, whatsapp,
  facebook_url, instagram_url, twitter_url, youtube_url,
  stats
) values (
  'Modern English School',
  'Where curiosity meets character.',
  'Knowledge · Integrity · Excellence',
  'A K–12 institution preparing students for a global future through rigorous academics, creative arts, and ethical leadership.',
  'Established in 2026 at Chochinde, Modern English School begins a new chapter in education for Mahad and the Raigad district — built around modern facilities, dedicated faculty, and a curriculum designed for the next generation of learners.',
  'To nurture lifelong learners who lead with empathy, think critically, and contribute meaningfully to a connected world.',
  'We deliver a balanced curriculum that fuses rigorous academics with the arts, athletics, and service, in a campus culture rooted in respect and curiosity.',
  'Mrs. Kumudini Ravindra Chavan',
  'At Modern English School we believe every child carries a spark — our role is to fan it into a flame. Our faculty and staff are committed to creating a learning environment where students feel seen, challenged, and inspired.',
  'At/Post Chochinde, Tal. Mahad, Dist. Raigad, Maharashtra 402301, India',
  '+91 95274 61618',
  'admissions@modernenglishschool.edu',
  '+919527461618',
  'https://facebook.com/modernenglishschool',
  'https://instagram.com/modernenglishschool',
  'https://twitter.com/modernenglishschool',
  'https://youtube.com/@modernenglishschool',
  '{"students": 500, "faculty": 30, "years": 30, "success_rate": 100}'::jsonb
)
on conflict do nothing;

-- Faculty
insert into public.faculty (name, designation, department, qualification, experience_years, bio, image_url, display_order)
values
  ('Mrs. Kumudini Ravindra Chavan', 'Principal', 'Administration', 'B.Ed., M.Ed., M.Phil., Ph.D.', 25, 'Leading the school with a vision of holistic education.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600', 0),
  ('Mr. Rohan Kapoor', 'Head of Mathematics', 'Mathematics', 'M.Sc. Mathematics, B.Ed.', 18, 'Olympiad coach and competition mentor.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', 1),
  ('Ms. Priya Iyer', 'Senior Science Teacher', 'Science', 'M.Sc. Physics, B.Ed.', 12, 'Specialises in lab-led inquiry.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600', 2),
  ('Mr. Daniel Park', 'English Department Lead', 'English', 'M.A. English Literature', 15, 'Debate and literary club mentor.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600', 3),
  ('Mrs. Sara Khan', 'Visual Arts Faculty', 'Arts', 'M.F.A. Fine Arts', 9, 'Mixed-media artist and curator.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', 4),
  ('Mr. Vikram Singh', 'Athletics Director', 'Sports', 'M.P.Ed.', 20, 'Former national-level cricketer.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600', 5);

-- Events
insert into public.events (title, slug, description, location, category, start_at, end_at, cover_image_url, is_featured)
values
  ('Annual Science Exhibition', 'annual-science-exhibition', 'Student-led exhibits, robotics, and hands-on workshops.', 'Main Auditorium', 'academic', now() + interval '14 days', now() + interval '15 days', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200', true),
  ('Inter-house Sports Meet', 'sports-meet-2026', 'Two days of track, field and team sports.', 'Athletics Ground', 'sports', now() + interval '30 days', now() + interval '32 days', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200', true),
  ('Cultural Night — Rhythm', 'cultural-night-rhythm', 'Music, dance, and drama by students across all grades.', 'Open Amphitheatre', 'cultural', now() + interval '60 days', null, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200', false),
  ('Parent–Teacher Conference', 'pta-march', 'Term-end one-on-one meetings.', 'Each Classroom', 'general', now() + interval '7 days', null, 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200', false);

-- Announcements
insert into public.announcements (title, body, priority, link_url) values
  ('Admissions open for AY 2026–27', 'Applications for Grades K–11 are now being accepted.', 2, '/admissions'),
  ('School reopens Monday', 'Winter break ends. Classes resume at 8:15 AM.', 1, null),
  ('New scholarship programme launched', 'Merit-based aid for incoming Grade 9 students.', 1, '/admissions');

-- Gallery
insert into public.gallery (title, caption, image_url, category, width, height, display_order) values
  ('Main building', 'Front facade at sunrise.', 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200', 'campus', 1200, 800, 0),
  ('Science lab', 'Senior school physics lab.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200', 'campus', 1200, 800, 1),
  ('Library', 'Reading hall.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200', 'campus', 1200, 900, 2),
  ('Sports day', 'Track event finals.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200', 'events', 1200, 800, 3),
  ('Cultural night', 'Junior choir performing.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200', 'events', 1200, 800, 4),
  ('Art studio', 'Grade 10 mixed-media class.', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200', 'activities', 1200, 1500, 5),
  ('Robotics club', 'Building competition entry.', 'https://images.unsplash.com/photo-1581091215367-59ab6e3bf0c1?w=1200', 'activities', 1200, 800, 6),
  ('Football team', 'Mid-match.', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200', 'sports', 1200, 800, 7);

-- Testimonials
insert into public.testimonials (author_name, author_role, content, rating, author_image_url) values
  ('Meera S.', 'Parent of Grade 7 student', 'The faculty actually care — my daughter blossomed in her first year here.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300'),
  ('Aarav P.', 'Alumnus, batch of 2018', 'MES gave me both the rigor and the curiosity to thrive at university.', 5, 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300'),
  ('Dr. K. Rao', 'Parent of two students', 'A rare blend of academic depth and a genuinely warm community.', 5, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300'),
  ('Tara Bhat', 'Grade 12 Student', 'Teachers here treat us like thinkers, not test-takers.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300');
