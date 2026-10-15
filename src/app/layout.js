import AppShell from '@/components/AppShell';
import ThemeScript from '@/components/ThemeScript';
import '@/styles/globals.css';

export const metadata = {
  title: {
    default: 'Kingshima Foundation — Faith + Tech Innovation',
    template: '%s | Kingshima Foundation',
  },
  description:
    'The Kingshima Foundation is a faith-driven, youth-focused initiative dedicated to equipping young people with technical skills, creative tools, and Godly values.',
  keywords: [
    'Kingshima',
    'faith and tech',
    'youth empowerment',
    'tech training',
    'mentorship',
    'bootcamp',
    'Nigeria',
  ],
  authors: [{ name: 'Kingshima Foundation' }],
  creator: 'Kingshima Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kingshima Foundation',
    title: 'Kingshima Foundation — Faith + Tech Innovation',
    description:
      'Equipping the next generation with technical skills and Godly values to thrive in a fast-changing world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kingshima Foundation — Faith + Tech Innovation',
    description:
      'Equipping the next generation with technical skills and Godly values.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
