import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohsin Ansari — Full Stack Developer',
  description:
    'Full Stack Developer from India specializing in React, Next.js, Node.js, NestJS, and building scalable, production-grade web applications.',
  keywords: [
    'Full Stack Developer', 'React Developer', 'Next.js', 'Node.js', 'NestJS',
    'TypeScript', 'PostgreSQL', 'MongoDB', 'India Developer', 'Mohsin Ansari',
    'Freelance Developer', 'SaaS Developer', 'Web Developer India',
  ],
  authors: [{ name: 'Mohsin Ansari', url: 'https://github.com/mohsinhamza7248' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Mohsin Ansari — Full Stack Developer',
    description:
      'Full Stack Developer engineering scalable web applications, SaaS platforms, and immersive digital experiences.',
    siteName: 'Mohsin Ansari Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohsin Ansari — Full Stack Developer',
    description: 'Full Stack Developer from India. React · Next.js · Node.js · PostgreSQL',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#05070D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
