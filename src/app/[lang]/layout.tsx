
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n.config';
import WhatsAppButton from '@/components/landing/whatsapp-button';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Metadata } from 'next';
import Script from 'next/script';
import CookieConsent from '@/components/shared/cookie-consent';

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEn = lang === 'en';

  const title = isEn 
    ? 'Micro Padma Nusantara | Innovative ICT & IoT Solutions' 
    : 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT';
  const description = isEn
    ? 'Micro Padma Nusantara provides cutting-edge ICT and IoT solutions to drive business growth and efficiency. Explore our services for enterprise, UMKM, and more.'
    : 'Micro Padma Nusantara menyediakan solusi ICT dan IoT canggih untuk mendorong pertumbuhan dan efisiensi bisnis. Jelajahi layanan kami untuk enterprise, UMKM, dan lainnya.';
  const keywordsEn = ['ICT solutions Indonesia', 'IoT company Indonesia', 'enterprise software solutions', 'UMKM digital solutions', 'web development services', 'IT consulting Jakarta', 'technology provider Indonesia', 'Micro Padma Nusantara'];
  const keywordsId = ['solusi ICT Indonesia', 'perusahaan IoT Indonesia', 'software enterprise', 'solusi digital UMKM', 'jasa pembuatan website', 'konsultan IT Jakarta', 'penyedia teknologi Indonesia', 'Micro Padma Nusantara'];
  
  const ogTitle = isEn 
    ? 'Micro Padma Nusantara | Innovative ICT & IoT Solutions'
    : 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT';
  const ogDescription = isEn
    ? 'Empowering businesses with future-ready ICT & IoT solutions in Indonesia.'
    : 'Memberdayakan bisnis dengan solusi ICT & IoT yang siap untuk masa depan di Indonesia.';

  const canonicalUrl = `${baseUrl}/${lang}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | Micro Padma Nusantara`,
    },
    description,
    keywords: isEn ? keywordsEn : keywordsId,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'id': `${baseUrl}/id`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'Micro Padma Nusantara',
      images: [
        {
          url: '/assets/img/home/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'Micro Padma Nusantara Logo and Tagline' : 'Logo dan Tagline Micro Padma Nusantara',
        },
      ],
      locale: isEn ? 'en_US' : 'id_ID',
      type: 'website',
      ['ia:markup_url' as any]: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      creator: '@micropadma',
      images: ['/assets/img/home/twitter-image.jpg'],
    },
  };
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
    },
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
    </>
  );
}
