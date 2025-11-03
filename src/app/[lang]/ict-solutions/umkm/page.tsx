
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Globe, ShoppingCart, MessageSquare, AppWindow } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/ict-solutions/umkm';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.ictSolutionsSubMenu.umkm.title;
  const description = 'Empowering small and medium enterprises (UMKM) in Indonesia with affordable and effective digital solutions, including websites, POS Lite, and social media management.';
  const descriptionId = 'Memberdayakan usaha kecil dan menengah (UMKM) di Indonesia dengan solusi digital yang terjangkau dan efektif, termasuk situs web, POS Lite, dan manajemen media sosial.';

  const canonicalUrl = `${baseUrl}/${lang}${path}`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['UMKM solutions', 'digital UMKM', 'website UMKM', 'POS UMKM', 'social media management', 'bisnis kecil', 'Indonesia'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'id': `${baseUrl}/id${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description: lang === 'id' ? descriptionId : description,
      url: canonicalUrl,
    },
    twitter: {
      title,
      description: lang === 'id' ? descriptionId : description,
    },
  };
}

export default async function UmkmPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.umkmPage;

  const solutions = [
    {
        icon: <Globe className="w-8 h-8 text-primary" />,
        title: pageDict.solutions.website.title,
        description: pageDict.solutions.website.description
    },
    {
        icon: <ShoppingCart className="w-8 h-8 text-primary" />,
        title: pageDict.solutions.pos.title,
        description: pageDict.solutions.pos.description
    },
    {
        icon: <MessageSquare className="w-8 h-8 text-primary" />,
        title: pageDict.solutions.social.title,
        description: pageDict.solutions.social.description
    },
    {
        icon: <AppWindow className="w-8 h-8 text-primary" />,
        title: pageDict.solutions.customApp.title,
        description: pageDict.solutions.customApp.description
    }
];

const advantages = [
  {
    title: pageDict.whyChooseUs.item1.title,
    description: pageDict.whyChooseUs.item1.description
  },
  {
    title: pageDict.whyChooseUs.item2.title,
    description: pageDict.whyChooseUs.item2.description
  },
  {
    title: pageDict.whyChooseUs.item3.title,
    description: pageDict.whyChooseUs.item3.description
  },
  {
    title: pageDict.whyChooseUs.item4.title,
    description: pageDict.whyChooseUs.item4.description
  }
];

  const heroImage = PlaceHolderImages.find(p => p.id === 'umkm-hero');
  const umkmChallengeImage = PlaceHolderImages.find(p => p.id === 'umkm-challenge');

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
      <section className="relative h-[60vh] flex items-center justify-start text-left overflow-hidden">
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
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            {pageDict.hero.description}
          </p>
        </div>
      </section>

      {/* The UMKM Challenge */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-semibold text-primary">{pageDict.challenge.pretitle}</p>
              <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.challenge.title}</h2>
              <p className="text-muted-foreground text-lg mt-4 mb-6">
                {pageDict.challenge.description}
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              {umkmChallengeImage && (
                  <Image
                  src={umkmChallengeImage.imageUrl}
                  alt={umkmChallengeImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={umkmChallengeImage.imageHint}
                  />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Solutions for UMKM */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.solutions.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.solutions.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.title} className="text-center p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background">
                  <CardContent className="flex flex-col items-center gap-4 p-0">
                    <div className="bg-primary/10 p-4 rounded-full">
                      {solution.icon}
                    </div>
                    <h3 className="font-bold text-xl">{solution.title}</h3>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us for UMKM */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-4">
                <p className="font-semibold text-primary">{pageDict.whyChooseUs.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.whyChooseUs.title}</h2>
                <p className="text-muted-foreground text-lg">{pageDict.whyChooseUs.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((item, index) => (
                <div key={index} className="p-6 rounded-lg bg-secondary/30">
                    <CheckCircle className="w-8 h-8 text-primary mb-4"/>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{pageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/${lang}/#contact`}>
              {pageDict.cta.button} <ArrowRight className="ml-2"/>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
