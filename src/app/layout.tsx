import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'PadmaTech Solutions | Innovative ICT & IoT Solutions',
  description: 'PadmaTech Solutions (Micro Padma Nusantara) provides cutting-edge ICT and IoT solutions to drive business growth and efficiency. Explore our services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PadmaTech Solutions',
    description: 'Leading provider of innovative ICT and IoT solutions to empower businesses in the digital era.',
    // Replace with your actual domain
    url: 'https://padmatech.example.com',
    telephone: '+62-XXX-XXXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Inovasi Digital No. 42',
      addressLocality: 'Jakarta',
      postalCode: '10110',
      addressCountry: 'ID',
    },
    // Replace with your actual logo URL
    image: 'https://padmatech.example.com/logo.png',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
