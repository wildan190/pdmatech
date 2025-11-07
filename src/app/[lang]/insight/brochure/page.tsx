
import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, Layers, Store, Globe, Shield, CheckCircle, Zap, Goal } from "lucide-react";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import PrintButton from '@/components/brochure/print-button';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/insight/brochure';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.brochurePage;
  const title = pageDict.breadcrumb;

  const descriptions: Record<Locale, string> = {
    en: 'Explore the official brochure of Micro Padma Nusantara. Discover our innovative ICT and IoT solutions, our mission, and how we empower businesses in Indonesia.',
    id: 'Jelajahi brosur resmi Micro Padma Nusantara. Temukan solusi ICT dan IoT inovatif kami, misi kami, dan bagaimana kami memberdayakan bisnis di Indonesia.',
    zh: '浏览 Micro Padma Nusantara 的官方宣传册。了解我们的创新 ICT 和物联网解决方案、我们的使命以及我们如何为印度尼西亚的企业赋能。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['company brochure', 'download ICT brochure', 'IoT solutions PDF', 'Micro Padma Nusantara profile', 'digital transformation services', 'tech company portfolio'],
    id: ['brosur perusahaan', 'unduh brosur ICT', 'PDF solusi IoT', 'profil Micro Padma Nusantara', 'layanan transformasi digital', 'portofolio perusahaan teknologi'],
    zh: ['公司宣传册', '下载ICT宣传册', '物联网解决方案PDF', 'Micro Padma Nusantara简介', '数字化转型服务', '科技公司产品组合']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;

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
      title: `${title} | Micro Padma Nusantara`,
      description: descriptions[lang],
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Micro Padma Nusantara`,
      description: descriptions[lang],
    },
  };
}

export default async function BrochurePage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.brochurePage;
  const commonDict = dictionary.common;
  const companyDict = dictionary.companyPage;

  const services = [
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: dictionary.ictSolutionsSubMenu.iot.title,
      description: dictionary.ictSolutionsSubMenu.iot.description,
      href: `/${lang}/ict-solutions/iot`
    },
    {
      icon: <Layers className="w-8 h-8 text-primary" />,
      title: dictionary.ictSolutionsSubMenu.enterprise.title,
      description: dictionary.ictSolutionsSubMenu.enterprise.description,
      href: `/${lang}/ict-solutions/enterprise`
    },
    {
      icon: <Store className="w-8 h-8 text-primary" />,
      title: dictionary.ictSolutionsSubMenu.umkm.title,
      description: dictionary.ictSolutionsSubMenu.umkm.description,
      href: `/${lang}/ict-solutions/umkm`
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: dictionary.ictSolutionsSubMenu.web.title,
      description: dictionary.ictSolutionsSubMenu.web.description,
      href: `/${lang}/ict-solutions/web`
    },
  ];

  const whyChooseUsData = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: companyDict.whyChooseUs.item1.title,
      description: companyDict.whyChooseUs.item1.description
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: companyDict.whyChooseUs.item2.title,
      description: companyDict.whyChooseUs.item2.description
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: companyDict.whyChooseUs.item3.title,
      description: companyDict.whyChooseUs.item3.description
    },
    {
      icon: <Goal className="w-8 h-8 text-primary" />,
      title: companyDict.whyChooseUs.item4.title,
      description: companyDict.whyChooseUs.item4.description
    }
  ];

  return (
    <main className="flex-grow bg-background">
      
      {/* Breadcrumb */}
      <section className="bg-secondary/50 py-4 border-b no-print">
        <div className="container">
           <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link href={`/${lang}`}>{commonDict.home}</Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage>{dictionary.navigation.insight}</BreadcrumbPage>
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
          <ParallaxImage
              src="/assets/img/home/tech.jpg"
              alt={pageDict.hero.imageAlt}
              data-ai-hint="abstract technology"
              priority
          />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {pageDict.hero.description}
          </p>
           <PrintButton>{pageDict.hero.downloadButton}</PrintButton>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/img/home/company.jpg"
                alt={companyDict.hero.headline}
                fill
                className="object-cover"
                data-ai-hint="team collaboration"
              />
            </div>
            <div>
              <p className="font-semibold text-primary uppercase tracking-wider">{companyDict.vision.title}</p>
              <h2 className="text-3xl font-bold font-headline mt-2">{companyDict.vision.content}</h2>
              <p className="text-muted-foreground text-lg mt-4">
                {companyDict.mission.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.services.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.services.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background flex flex-col text-center items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {service.icon}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                  <div className="mt-6 w-full no-print">
                     <Button variant="outline" asChild className="w-full">
                        <Link href={service.href}>
                            {commonDict.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                  </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
       <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
             <div className="lg:col-span-1 space-y-4">
                <p className="font-semibold text-primary">{companyDict.whyChooseUs.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{companyDict.whyChooseUs.title}</h2>
                <p className="text-muted-foreground text-lg">{companyDict.whyChooseUs.description}</p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {whyChooseUsData.map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-secondary/30">
                  <CardContent className="flex flex-col items-start gap-4 p-0">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground no-print">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{pageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/${lang}/contact`}>{pageDict.cta.button}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
