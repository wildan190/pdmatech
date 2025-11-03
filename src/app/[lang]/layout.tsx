import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n.config';
import WhatsAppButton from '@/components/landing/whatsapp-button';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const metadata: any = {
    'en': {
      metadataBase: new URL('https://mpnsolutions.my.id'),
      title: {
        default: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
        template: `%s | Micro Padma Nusantara`,
      },
      description: 'Micro Padma Nusantara provides cutting-edge ICT and IoT solutions to drive business growth and efficiency. Explore our services for enterprise, UMKM, and more.',
      keywords: ['ICT solutions', 'IoT', 'Enterprise software', 'UMKM', 'Web development', 'IT consulting', 'Micro Padma Nusantara', 'Indonesia'],
      openGraph: {
        title: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
        description: 'Empowering businesses with future-ready ICT & IoT solutions in Indonesia.',
        url: 'https://mpnsolutions.my.id',
        siteName: 'Micro Padma Nusantara',
        images: [
          {
            url: '/assets/img/home/og-image.jpg',
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
        creator: '@micropadma',
        images: ['/assets/img/home/twitter-image.jpg'],
      },
    },
    'id': {
      metadataBase: new URL('https://mpnsolutions.my.id'),
      title: {
        default: 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT',
        template: `%s | Micro Padma Nusantara`,
      },
      description: 'Micro Padma Nusantara menyediakan solusi ICT dan IoT canggih untuk mendorong pertumbuhan dan efisiensi bisnis. Jelajahi layanan kami untuk enterprise, UMKM, dan lainnya.',
      keywords: ['Solusi ICT', 'IoT', 'Perangkat lunak enterprise', 'UMKM', 'Pengembangan web', 'Konsultan IT', 'Micro Padma Nusantara', 'Indonesia'],
      openGraph: {
        title: 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT',
        description: 'Memberdayakan bisnis dengan solusi ICT & IoT yang siap untuk masa depan di Indonesia.',
        url: 'https://mpnsolutions.my.id/id',
        siteName: 'Micro Padma Nusantara',
        images: [
          {
            url: '/assets/img/home/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Logo dan Tagline Micro Padma Nusantara',
          },
        ],
        locale: 'id_ID',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT',
        description: 'Memberdayakan bisnis dengan solusi ICT & IoT yang siap untuk masa depan di Indonesia.',
        creator: '@micropadma',
        images: ['/assets/img/home/twitter-image.jpg'],
      },
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Micro Padma Nusantara',
    description: 'Leading provider of innovative ICT and IoT solutions to empower businesses in the digital era.',
    url: 'https://mpnsolutions.my.id',
    telephone: '+62811144793',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Profesor Dr. Insinyur Soetami, Kp. Malangnengah, Cijoro Pasir',
      addressLocality: 'Rangkasbitung',
      addressRegion: 'Banten',
      postalCode: '42316',
      addressCountry: 'ID',
    },
    logo: 'https://mpnsolutions.my.id/logo.png',
    image: 'https://mpnsolutions.my.id/og-image.jpg',
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
    url: `https://mpnsolutions.my.id/${lang}`,
    name: 'Micro Padma Nusantara',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://mpnsolutions.my.id/${lang}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    ...metadata[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'id': '/id',
        'x-default': '/en',
      },
    },
    other: {
        'ld+json': [JSON.stringify(localBusinessSchema), JSON.stringify(websiteSchema)]
    }
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

  return (
    <>
      <Header dictionary={dictionary} lang={params.lang} />
      {children}
      <WhatsAppButton dictionary={dictionary.whatsapp} />
      <Footer dictionary={dictionary} lang={params.lang} />
    </>
  );
}