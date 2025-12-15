
import { getDictionary } from '@/lib/dictionaries';
import { Locale, i18n } from '@/i18n.config';
import WhatsAppButton from '@/components/landing/whatsapp-button';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Metadata } from 'next';
import Script from 'next/script';
import CookieConsent from '@/components/shared/cookie-consent';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ReactNode } from 'react';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }))
}

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEn = lang === 'en';
  const isId = lang === 'id';

  const titles: Record<Locale, string> = {
    en: 'Micro Padma Nusantara | ICT & IoT Solutions for Southeast Asia',
    id: 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT',
    zh: 'Micro Padma Nusantara | 创新的 ICT 和物联网解决方案'
  };

  const descriptions: Record<Locale, string> = {
    en: 'Micro Padma Nusantara provides cutting-edge ICT and IoT solutions to drive business growth and efficiency across Southeast Asia. Explore our services for enterprise, SMEs, and more.',
    id: 'Micro Padma Nusantara menyediakan solusi ICT dan IoT canggih untuk mendorong pertumbuhan dan efisiensi bisnis. Jelajahi layanan kami untuk enterprise, UMKM, dan lainnya.',
    zh: 'Micro Padma Nusantara 提供尖端的 ICT 和物联网解决方案，以推动业务增长和效率。探索我们为企业、中小微企业等提供的服务。'
  };
  
  const keywords: Record<Locale, string[]> = {
    en: ['ICT solutions Southeast Asia', 'IoT company SEA', 'enterprise software solutions', 'digital transformation Asia', 'web development services', 'IT consulting', 'technology provider Singapore', 'IoT Malaysia', 'Micro Padma Nusantara'],
    id: ['solusi ICT Indonesia', 'perusahaan IoT Indonesia', 'software enterprise', 'solusi digital UMKM', 'jasa pembuatan website', 'konsultan IT Jakarta', 'penyedia teknologi Indonesia', 'Micro Padma Nusantara'],
    zh: ['东南亚ICT解决方案', '印尼物联网公司', '企业软件解决方案', '中小微企业数字解决方案', '网站开发服务', 'IT咨询', '新加坡技术提供商', 'Micro Padma Nusantara']
  };
  
  const ogTitles: Record<Locale, string> = {
    en: 'Micro Padma Nusantara | ICT & IoT Solutions for Southeast Asia',
    id: 'Micro Padma Nusantara | Solusi Inovatif ICT & IoT',
    zh: 'Micro Padma Nusantara | 创新的 ICT 和物联网解决方案'
  };
  
  const ogDescriptions: Record<Locale, string> = {
    en: 'Empowering businesses with future-ready ICT & IoT solutions in Southeast Asia.',
    id: 'Memberdayakan bisnis dengan solusi ICT & IoT yang siap untuk masa depan di Indonesia.',
    zh: '以面向未来的 ICT 和物联网解决方案为印度尼西亚的企业赋能。'
  };

  const canonicalUrl = `${baseUrl}/${lang}`;
  const alternates: { [key: string]: string } = {};
  i18n.locales.forEach(locale => {
    alternates[locale] = `${baseUrl}/${locale}`;
  });
  alternates['x-default'] = `${baseUrl}/${i18n.defaultLocale}`;

  const ogImageUrl = `${baseUrl}/assets/img/home/og-image.jpg`;
  const twitterImageUrl = `${baseUrl}/assets/img/home/twitter-image.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: titles[lang],
      template: `%s | Micro Padma Nusantara`,
    },
    description: descriptions[lang],
    keywords: keywords[lang],
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: ogTitles[lang],
      description: ogDescriptions[lang],
      url: canonicalUrl,
      siteName: 'Micro Padma Nusantara',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: isId ? 'Logo dan Tagline Micro Padma Nusantara' : (isEn ? 'Micro Padma Nusantara Logo and Tagline' : 'Micro Padma Nusantara 徽标和标语'),
        },
      ],
      locale: isId ? 'id_ID' : (isEn ? 'en_US' : 'zh_CN'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitles[lang],
      description: ogDescriptions[lang],
      creator: '@micropadma',
      images: [twitterImageUrl],
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
    },
  };

  return (
    <html lang={params.lang} className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-body antialiased">
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
      </body>
    </html>
  );
}
