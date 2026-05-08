import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Micro Padma Nusantara - ICT & IoT Solutions Indonesia',
  description: 'Leading ICT and IoT solutions provider in Indonesia. Transform your business with innovative technology for enterprises, SMEs, and digital transformation.',
  metadataBase: new URL('https://mpnsolutions.my.id'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual code from Google Search Console
  },
  openGraph: {
    title: 'Micro Padma Nusantara - ICT & IoT Solutions Indonesia',
    description: 'Leading ICT and IoT solutions provider in Indonesia. Transform your business with innovative technology.',
    url: 'https://mpnsolutions.my.id',
    siteName: 'Micro Padma Nusantara',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micro Padma Nusantara - ICT & IoT Solutions Indonesia',
    description: 'Leading ICT and IoT solutions provider in Indonesia.',
  },
  alternates: {
    canonical: 'https://mpnsolutions.my.id',
    languages: {
      'en': 'https://mpnsolutions.my.id/en',
      'id': 'https://mpnsolutions.my.id/id',
      'zh': 'https://mpnsolutions.my.id/zh',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
