import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { Toaster } from 'sonner';
import { SITE } from '@/lib/constants';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'], variable: '--font-jakarta', display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});
const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-playfair', display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Where curiosity meets character`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  keywords: ['school', 'education', 'K-12', 'admissions', 'academics', SITE.name],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    images: ['/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: ['/og-default.jpg'],
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
