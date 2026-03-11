import { getDictionary } from '@/lib/dictionaries';
import { Locale, i18n } from '@/i18n.config';
import WhatsAppButton from '@/components/landing/whatsapp-button';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import Script from 'next/script';
import CookieConsent from '@/components/shared/cookie-consent';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from "@vercel/speed-insights/next";

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Micro Padma Nusantara',
    description: 'Leading provider of innovative ICT and IoT solutions to empower businesses in the digital era.',
    url: baseUrl,
    telephone: '+62811144793',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Profesor Dr. Insinyur Soetami, Kp. Malangnengah, Cijoro Pasir',
      addressLocality: 'Rangkasbitung',
      addressRegion: 'Banten',
      postalCode: '42316',
      addressCountry: 'ID',
    },
    areaServed: [
        "ID", "SG", "MY", "TH", "VN", "PH"
    ],
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/assets/img/home/og-image.jpg`,
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
    url: `${baseUrl}/${params.lang}`,
    name: 'Micro Padma Nusantara',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/${params.lang}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    }
  };

  return (
    <>
      <Script
        id="schema-markup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, websiteSchema]),
        }}
      />
      <Header dictionary={dictionary} lang={params.lang} />
      {children}
      <WhatsAppButton dictionary={dictionary.whatsapp} />
      <Footer dictionary={dictionary} lang={params.lang} />
      <CookieConsent dictionary={dictionary} lang={params.lang} />
      <Toaster />
      <SpeedInsights />
    </>
  );
}
