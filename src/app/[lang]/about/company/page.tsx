
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import CompanyClientPage from "./company-client-page";
import { Metadata } from "next";
import Script from "next/script";

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/about/company';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.companyPage;
  
  const titles: Record<Locale, string> = {
    en: 'Our Company | Micro Padma Nusantara',
    id: 'Perusahaan Kami | Micro Padma Nusantara',
    zh: '我们的公司 | Micro Padma Nusantara'
  };

  const descriptions: Record<Locale, string> = {
    en: 'Learn about our mission, vision, and the values that drive us. Discover how Micro Padma Nusantara is pioneering future-ready ICT and IoT solutions in Southeast Asia.',
    id: 'Pelajari tentang misi, visi, dan nilai-nilai yang menggerakkan kami. Temukan bagaimana Micro Padma Nusantara memelopori solusi ICT dan IoT yang siap untuk masa depan.',
    zh: '了解我们的使命、愿景和驱动我们的价值观。了解 Micro Padma Nusantara 如何在东南亚开创面向未来的 ICT 和物联网解决方案。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['about us', 'company profile', 'ICT company Southeast Asia', 'our mission', 'our vision', 'tech company values', 'digital transformation services Southeast Asia', 'Micro Padma Nusantara'],
    id: ['tentang kami', 'profil perusahaan', 'misi kami', 'visi kami', 'nilai perusahaan', 'perusahaan teknologi', 'layanan transformasi digital', 'Micro Padma Nusantara'],
    zh: ['关于我们', '公司简介', '东南亚ICT公司', '我们的使命', '我们的愿景', '科技公司价值观', '数字化转型服务', 'Micro Padma Nusantara']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;
  const title = titles[lang];

  return {
    title,
    description: descriptions[lang],
    keywords: keywords[lang],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'id': `${baseUrl}/id${path}`,
        'zh': `${baseUrl}/zh${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title: `${title}`,
      description: descriptions[lang],
      url: canonicalUrl,
    },
    twitter: {
      title: `${title}`,
      description: descriptions[lang],
    },
  };
}


type CompanyPageProps = {
    params: { lang: Locale }
};

export default async function CompanyPage({ params }: CompanyPageProps) {
    const lang = params.lang;
    const dictionary = await getDictionary(lang);

    const corporationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Corporation',
        name: 'Micro Padma Nusantara',
        alternateName: 'MPN Solutions',
        url: baseUrl,
        logo: `${baseUrl}/assets/img/logo.png`,
        description: dictionary.companyPage.hero.subheadline,
        slogan: dictionary.header.tagline,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Profesor Dr. Insinyur Soetami, Kp. Malangnengah, Cijoro Pasir',
            addressLocality: 'Rangkasbitung',
            addressRegion: 'Banten',
            postalCode: '42316',
            addressCountry: 'ID',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+62811144793',
            contactType: 'Customer Service',
            email: 'micropadmanusantara@gmail.com'
        },
        sameAs: [
            'https://facebook.com/micropadmanusantara',
            'https://instagram.com/micropadmanusantara',
        ],
        foundingDate: '2023',
        founder: [
            {
                '@type': 'Person',
                name: 'Wildan J. Belfiore'
            },
            {
                '@type': 'Person',
                name: 'Raihan Firdaus'
            }
        ]
    };

    return (
        <>
            <Script
                id="corporation-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(corporationSchema),
                }}
            />
            <CompanyClientPage dictionary={dictionary} lang={lang} />
        </>
    );
}
