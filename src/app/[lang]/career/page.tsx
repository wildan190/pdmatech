
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Lightbulb, TrendingUp, SearchX, Send, Users } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/career';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.careerPage.breadcrumb;
  
  const descriptions: Record<Locale, string> = {
    en: 'Join our team of innovators at Micro Padma Nusantara. Explore career opportunities and become part of our mission to shape the future of technology in Indonesia.',
    id: 'Bergabunglah dengan tim inovator kami di Micro Padma Nusantara. Jelajahi peluang karir dan jadilah bagian dari misi kami untuk membentuk masa depan teknologi di Indonesia.',
    zh: '加入 Micro Padma Nusantara 的创新团队。探索职业机会，成为我们塑造印度尼西亚技术未来使命的一部分。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['tech jobs Indonesia', 'ICT careers', 'IoT job vacancies', 'software engineer jobs', 'work at Micro Padma Nusantara', 'technology careers Banten'],
    id: ['lowongan kerja teknologi', 'karir ICT', 'lowongan kerja IoT', 'pekerjaan software engineer', 'karir di Micro Padma Nusantara', 'lowongan kerja Banten'],
    zh: ['印尼技术工作', 'ICT职业', '物联网职位空缺', '软件工程师职位', '在Micro Padma Nusantara工作', '万丹技术职业']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;

  return {
    title: `${title} at Micro Padma Nusantara`,
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
      title: `${title} at Micro Padma Nusantara`,
      description: descriptions[lang],
      url: canonicalUrl,
    },
    twitter: {
      title: `${title} at Micro Padma Nusantara`,
      description: descriptions[lang],
    },
  };
}


export default async function CareerPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.careerPage;

  const companyValues = [
    {
        icon: <Lightbulb className="w-8 h-8 text-primary" />,
        title: pageDict.values.innovation.title,
        description: pageDict.values.innovation.description
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: pageDict.values.collaboration.title,
        description: pageDict.values.collaboration.description
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: pageDict.values.growth.title,
        description: pageDict.values.growth.description
    },
    {
        icon: <Heart className="w-8 h-8 text-primary" />,
        title: pageDict.values.passion.title,
        description: pageDict.values.passion.description
    }
];

  const heroImage = PlaceHolderImages.find(p => p.id === 'career-hero');

  return (
    <main className="flex-grow">
      
      {/* Breadcrumb */}
      <section className="bg-secondary/50 py-4 border-b">
        <div className="container">
           <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link href={`/${lang}`}>{dictionary.common.home}</Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                      <BreadcrumbPage>{pageDict.breadcrumb}</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
          {heroImage && (
              <ParallaxImage
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
              />
          )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {pageDict.hero.description}
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
              <p className="font-semibold text-primary">{pageDict.culture.pretitle}</p>
              <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.culture.title}</h2>
              <p className="text-muted-foreground text-lg mt-4">
                {pageDict.culture.description}
              </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {companyValues.map((value) => (
              <Card key={value.title} className="text-center p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-secondary/30">
                  <CardContent className="flex flex-col items-center gap-4 p-0">
                    <div className="bg-primary/10 p-4 rounded-full">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-xl">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.openings.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.openings.description}
            </p>
          </div>
          <Card className="max-w-3xl mx-auto shadow-none border-dashed">
              <CardContent className="p-10 text-center">
                  <SearchX className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground">{pageDict.openings.notAvailable}</h3>
                  <p className="text-muted-foreground mt-2">{pageDict.openings.checkBack}</p>
              </CardContent>
          </Card>
        </div>
      </section>
      

      {/* Spontaneous Application */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{pageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="mailto:micropadmanusantara@gmail.com?subject=Spontaneous%20Application">
              {pageDict.cta.button} <Send className="ml-2"/>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
