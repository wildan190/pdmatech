import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Space_Grotesk } from 'next/font/google';
import WhatsAppButton from '@/components/landing/whatsapp-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://micropadmanusantara.com'),
  title: {
    default: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
    template: `%s | Micro Padma Nusantara`,
  },
  description: 'Micro Padma Nusantara provides cutting-edge ICT and IoT solutions to drive business growth and efficiency. Explore our services for enterprise, UMKM, and more.',
  keywords: ['ICT solutions', 'IoT', 'Enterprise software', 'UMKM', 'Web development', 'IT consulting', 'Micro Padma Nusantara', 'Indonesia'],
  openGraph: {
    title: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
    description: 'Empowering businesses with future-ready ICT & IoT solutions in Indonesia.',
    url: 'https://micropadmanusantara.com',
    siteName: 'Micro Padma Nusantara',
    images: [
      {
        url: 'https://micropadmanusantara.com/og-image.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Micro Padma Nusantara Logo and Tagline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
    description: 'Empowering businesses with future-ready ICT & IoT solutions in Indonesia.',
    creator: '@micropadma', // Replace with your Twitter handle
    images: ['https://micropadmanusantara.com/twitter-image.jpg'], // Replace with your actual Twitter image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Micro Padma Nusantara',
    description: 'Leading provider of innovative ICT and IoT solutions to empower businesses in the digital era.',
    url: 'https://micropadmanusantara.com',
    telephone: '+62811144793',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Profesor Dr. Insinyur Soetami, Kp. Malangnengah, Cijoro Pasir',
      addressLocality: 'Rangkasbitung',
      addressRegion: 'Banten',
      postalCode: '42316',
      addressCountry: 'ID',
    },
    logo: 'https://micropadmanusantara.com/logo.png',
    image: 'https://micropadmanusantara.com/og-image.jpg',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62811144793',
      contactType: 'Customer Service',
      email: 'micropadmanusantara@gmail.com'
    },
    sameAs: [
      'https://facebook.com/micropadmanusantara',
      'https://instagram.com/micropadmanusantara',
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://micropadmanusantara.com',
    name: 'Micro Padma Nusantara',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://micropadmanusantara.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };


  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
