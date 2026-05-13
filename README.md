# Modern English School — Website

A production-grade school website built with **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + Framer Motion**, backed by **Supabase** (Postgres, Auth, Storage, RLS) and deployed on **Vercel**.

It ships with:

- Marketing site (Home, About, Academics, Faculty, Admissions, Gallery, Events, Contact)
- Server-rendered pages with ISR + dynamic metadata + sitemap + robots
- A protected **Admin dashboard** for faculty, events, announcements, gallery, admissions, testimonials, and school info
- Public form endpoints (admissions inquiry, contact, newsletter) backed by the **service role** key
- Row-level security policies, storage buckets, and seed data
- Dark/light theme, glassmorphism, smooth animations, WhatsApp floating button, news ticker, masonry gallery, faculty search/filter, accessible forms

---

## Tech stack

| Layer       | Choice                                           |
| ----------- | ------------------------------------------------ |
| Framework   | Next.js 15 (App Router) + React 19               |
| Language    | TypeScript (strict)                              |
| Styling     | Tailwind CSS, custom design tokens, glass UI     |
| Animation   | Framer Motion                                    |
| Forms       | react-hook-form + zod                            |
| Backend     | Supabase (Postgres + Auth + Storage + RLS)       |
| Icons       | lucide-react                                     |
| Toasts      | sonner                                           |
| Hosting     | Vercel                                           |

---

## Folder structure

```
.
├── middleware.ts                         # Supabase session refresh + /admin gate
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── public/                               # static assets (favicon, og image, etc.)
├── supabase/
│   ├── schema.sql                        # tables, triggers, RLS, storage buckets
│   └── seed.sql                          # sample data
└── src/
    ├── app/
    │   ├── globals.css                   # tailwind layers + design tokens
    │   ├── layout.tsx                    # root layout (Navbar, Footer, providers)
    │   ├── page.tsx                      # / home (Hero, Stats, About, …)
    │   ├── sitemap.ts                    # /sitemap.xml
    │   ├── robots.ts                     # /robots.txt
    │   ├── not-found.tsx
    │   ├── loading.tsx
    │   ├── about/page.tsx
    │   ├── academics/page.tsx
    │   ├── faculty/page.tsx
    │   ├── admissions/page.tsx
    │   ├── gallery/page.tsx
    │   ├── events/page.tsx
    │   ├── contact/page.tsx
    │   ├── admin/
    │   │   ├── login/page.tsx            # public login page (Supabase)
    │   │   ├── SignOutButton.tsx
    │   │   └── (dashboard)/              # protected route group
    │   │       ├── layout.tsx            # sidebar + auth gate
    │   │       ├── page.tsx              # dashboard home
    │   │       ├── faculty/
    │   │       ├── events/
    │   │       ├── announcements/
    │   │       ├── gallery/
    │   │       ├── admissions/
    │   │       ├── testimonials/
    │   │       └── settings/
    │   └── api/
    │       ├── admissions/route.ts       # POST inquiry → DB
    │       ├── contact/route.ts          # POST contact message
    │       └── newsletter/route.ts       # POST email subscribe
    ├── components/
    │   ├── providers/ThemeProvider.tsx
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ThemeToggle.tsx
    │   │   └── WhatsAppButton.tsx
    │   ├── ui/                           # Button, Card, Input, Skeleton, …
    │   ├── home/                         # Hero, Stats, NewsTicker, Testimonials, …
    │   ├── events/EventCard.tsx
    │   ├── faculty/FacultyCard.tsx + FacultyGrid.tsx
    │   ├── gallery/MasonryGallery.tsx
    │   └── forms/                        # AdmissionForm, ContactForm, NewsletterForm
    ├── lib/
    │   ├── supabase/{client,server,middleware}.ts
    │   ├── queries.ts                    # typed server-side data fetchers
    │   ├── constants.ts
    │   └── utils.ts
    └── types/database.ts                 # DB row types
```

---

## Local setup

### 1. Prerequisites

- Node.js **20+**
- A free **Supabase** project

### 2. Install

```bash
git clone <your-fork> school-website
cd school-website
npm install
```

### 3. Configure Supabase

In your Supabase dashboard:

1. **SQL Editor** → paste `supabase/schema.sql` → **Run**.
2. **SQL Editor** → paste `supabase/seed.sql` → **Run** (optional sample data).
3. **Project Settings → API**: copy `Project URL`, `anon` key, and `service_role` key.

### 4. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Modern English School"
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

> ⚠️ **Never** commit the service-role key, and never expose it to the client.

### 5. Create your first admin

1. **Authentication → Users → Add user** in Supabase (set a password).
2. Run in SQL editor:

    ```sql
    insert into public.admins (user_id, email, full_name)
    select id, email, 'Site Admin' from auth.users where email = 'you@school.edu';
    ```

3. Visit `/admin/login`, sign in.

### 6. Run the dev server

```bash
npm run dev
```

App: <http://localhost:3000> · Admin: <http://localhost:3000/admin>

---

## Database schema overview

| Table                     | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `school_info`             | Singleton row driving home page, footer, stats       |
| `faculty`                 | Teacher profiles                                     |
| `events`                  | Upcoming & past events                               |
| `announcements`           | News-ticker items                                    |
| `gallery`                 | Masonry-grid images by category                      |
| `admissions`              | Online inquiry submissions                           |
| `testimonials`            | Parent / student quotes                              |
| `newsletter_subscribers`  | Email opt-ins                                        |
| `contact_messages`        | Public contact-form submissions                      |
| `admins`                  | `user_id`s with admin write access                   |

### Row-level security

- **Public read** for all marketing content (`is_active`/`is_published` filters).
- **Public insert** for `admissions`, `contact_messages`, `newsletter_subscribers`.
- **All writes** require `public.is_admin()` (`user_id` exists in `admins`).
- Storage buckets `faculty`, `gallery`, `events`, `school` are publicly readable; only admins can upload/delete.

---

## API examples

### Submit admission inquiry

```ts
await fetch('/api/admissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    student_name: 'Aanya Sharma',
    parent_name: 'Riya Sharma',
    email: 'riya@example.com',
    phone: '+919876543210',
    grade_applying: 'Grade 5',
    message: 'Interested in IB track later.',
  }),
});
```

### Fetch faculty on the server

```ts
// src/lib/queries.ts
import { createClient } from '@/lib/supabase/server';

export async function getFaculty() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('faculty').select('*')
    .eq('is_active', true)
    .order('display_order');
  return data ?? [];
}
```

### Auth flow

| Step                | Where                                  |
| ------------------- | -------------------------------------- |
| Sign in             | `/admin/login` (Supabase email+password)|
| Session refresh     | `middleware.ts` → `updateSession()`    |
| Route protection    | `middleware.ts` + admin layout         |
| RLS write authority | `public.is_admin()` predicate          |
| Sign out            | `SignOutButton` → `supabase.auth.signOut()` |

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. On [vercel.com/new](https://vercel.com/new) → **Import** the repo.
3. In **Environment Variables**, add:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `NEXT_PUBLIC_SITE_URL` (your production URL)
    - `NEXT_PUBLIC_SITE_NAME`
    - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Click **Deploy**.
5. In **Supabase → Authentication → URL Configuration**, add your Vercel URL to *Site URL* and *Redirect URLs*.

> **Production checklist:** custom domain, OG image (`public/og-default.jpg`), favicon, Google Search Console verification, GA / Plausible analytics.

---

## Performance & SEO

- **App Router** + React Server Components + ISR (`revalidate` per page).
- `next/image` with AVIF/WebP and remote pattern allow-list.
- Per-page `<title>` / `<meta>` / OG / Twitter via `metadata` export.
- `sitemap.ts` + `robots.ts` generated at the edge.
- Tailwind purge + `optimizePackageImports` for `lucide-react` and `framer-motion`.
- Security headers (`X-Frame-Options`, `Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) in `next.config.js`.
- Mobile-first responsive; verified down to 360 px viewports.
- Form validation with `zod` on both client and API edge.

---

## Scripts

| Script             | Purpose                       |
| ------------------ | ----------------------------- |
| `npm run dev`      | Start dev server              |
| `npm run build`    | Production build              |
| `npm run start`    | Serve the production build    |
| `npm run lint`     | Run ESLint                    |
| `npm run type-check` | Run TypeScript compiler     |

---

## Contributing

Open a PR; follow existing component & file conventions. Use the supplied path alias `@/*` for `src/*` imports.

---

## License

MIT
