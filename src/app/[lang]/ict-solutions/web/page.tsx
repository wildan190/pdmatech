
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Search, ShoppingBag, Redo, Scaling, Users, Palette, MonitorSmartphone, ExternalLink } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Script from 'next/script';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/ict-solutions/web';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);

  const titles: Record<Locale, string> = {
    en: "Web Development Services for SEA | Custom Websites & E-Commerce",
    id: "Jasa Pembuatan Website untuk Asia Tenggara | Situs Web & E-Commerce Kustom",
    zh: "东南亚网站开发服务 | 定制网站和电子商务"
  };

  const descriptions: Record<Locale, string> = {
    en: 'High-performance web development for businesses in Southeast Asia. We build custom websites, e-commerce stores, and web apps with Next.js & React, focusing on user experience and SEO.',
    id: 'Pengembangan web berkinerja tinggi untuk bisnis di Asia Tenggara. Kami membangun situs web kustom, toko e-commerce, dan aplikasi web dengan Next.js & React, dengan fokus pada pengalaman pengguna dan SEO.',
    zh: '为东南亚企业提供高性能的网站开发。我们使用Next.js和React构建定制网站、电子商务商店和Web应用程序，专注于用户体验和SEO。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['custom web application development SEA', 'e-commerce store development Southeast Asia', 'Next.js and React development agency', 'user-centric website design', 'SEO and performance optimization services', 'website redesign for better UX'],
    id: ['jasa pengembangan aplikasi web Asia Tenggara', 'pembuatan toko e-commerce Asia Tenggara', 'agensi pengembangan Next.js dan React', 'desain website berpusat pada pengguna', 'jasa optimasi SEO dan performa', 'desain ulang website untuk UX yang lebih baik'],
    zh: ['东南亚定制Web应用开发', '东南亚电子商务商店开发', 'Next.js和React开发机构', '以用户为中心的网站设计', 'SEO与性能优化服务', '为更好用户体验的网站重新设计']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;
  const webHeroImage = PlaceHolderImages.find(p => p.id === 'web-hero');

  return {
    title: titles[lang],
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
      title: titles[lang],
      description: descriptions[lang],
      url: canonicalUrl,
      images: webHeroImage ? [webHeroImage.imageUrl] : []
    },
    twitter: {
      title: titles[lang],
      description: descriptions[lang],
      images: webHeroImage ? [webHeroImage.imageUrl] : []
    },
  };
}

const servicesData = (pageDict: any) => [
  {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: "Custom Website Design & Development",
      description: pageDict.services.custom,
  },
  {
      icon: <ShoppingBag className="w-8 h-8 text-primary" />,
      title: "E-Commerce & Online Stores",
      description: pageDict.services.ecommerce,
  },
  {
      icon: <MonitorSmartphone className="w-8 h-8 text-primary" />,
      title: "Responsive Web Design",
      description: pageDict.services.responsive,
  },
  {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "SEO & Performance Optimization",
      description: pageDict.services.seo,
  },
  {
      icon: <Redo className="w-8 h-8 text-primary" />,
      title: "Website Redesign",
      description: pageDict.services.redesign,
  },
   {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Web Application Development",
      description: pageDict.services.webapp,
  }
];

const whyChooseUsData = (pageDict: any) => [
  {
    icon: <Scaling className="w-8 h-8 text-primary" />,
    title: pageDict.whyChooseUs.item1.title,
    description: pageDict.whyChooseUs.item1.description
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: pageDict.whyChooseUs.item2.title,
    description: pageDict.whyChooseUs.item2.description
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: pageDict.whyChooseUs.item3.title,
    description: pageDict.whyChooseUs.item3.description
  }
];

const portfolioData = [
  {
    name: "Liga Mahasiswa",
    company: "PT. BINA MAHASISWA INDONESIA",
    url: "https://www.ligamahasiswa.com",
    imageId: "portfolio-liga-mahasiswa"
  },
  {
    name: "Communic 8 Agency",
    company: "PT. Communic 8",
    url: "https://communic8agency.com",
    imageId: "portfolio-communic8"
  },
  {
    name: "Hadiwijaya Bore Pile",
    company: "PT. Hadiningrat Construction",
    url: "https://hadiwijayaborepile.co.id",
    imageId: "portfolio-hadiwijaya"
  },
  {
    name: "Huntr.id",
    company: "PT. Hunter Integrasi Bisnis",
    url: "https://huntr.id",
    imageId: "portfolio-huntr"
  }
];

export default async function WebPage({ params }: { params: { lang: Locale }}) {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.webPage;

  const services = servicesData(pageDict);
  const whyChooseUs = whyChooseUsData(pageDict);
  const webHeroImage = PlaceHolderImages.find(p => p.id === 'web-hero');
  const webApproachImage = PlaceHolderImages.find(p => p.id === 'web-approach');

  const webPageSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          'name': pageDict.breadcrumb,
          'description': pageDict.hero.description,
          'provider': {
            '@type': 'Organization',
            'name': 'Micro Padma Nusantara'
          },
          'areaServed': [
            {'@type': 'Country', 'name': 'ID'},
            {'@type': 'Country', 'name': 'SG'},
            {'@type': 'Country', 'name': 'MY'},
            {'@type': 'Country', 'name': 'TH'},
            {'@type': 'Country', 'name': 'VN'},
            {'@type': 'Country', 'name': 'PH'}
          ],
          'serviceType': pageDict.services.title,
        },
        {
          '@type': 'ItemList',
          'name': pageDict.portfolio.title,
          'description': pageDict.portfolio.description,
          'itemListElement': portfolioData.map((project, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
              '@type': 'CreativeWork',
              'name': project.name,
              'url': project.url,
              'author': {
                '@type': 'Organization',
                'name': project.company
              }
            }
          }))
        }
      ]
    };

  return (
    <>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
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
                        <BreadcrumbLink asChild><Link href={`/${lang}/#services`}>{dictionary.navigation.ictSolutions}</Link></BreadcrumbLink>
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
            {webHeroImage && (
              <ParallaxImage
                  src={webHeroImage.imageUrl}
                  alt={webHeroImage.description}
                  data-ai-hint={webHeroImage.imageHint}
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

        {/* Overview */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="font-semibold text-primary">{pageDict.approach.pretitle}</p>
                    <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.approach.title}</h2>
                    <p className="text-muted-foreground text-lg mt-4">
                        {pageDict.approach.description}
                    </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  {webApproachImage && (
                    <Image
                        src={webApproachImage.imageUrl}
                        alt={webApproachImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={webApproachImage.imageHint}
                    />
                  )}
                </div>
            </div>
          </div>
        </section>

        {/* Our Web Services */}
        <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.services.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {pageDict.services.description}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.title} className="p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background flex flex-col">
                    <CardContent className="flex flex-col items-start gap-4 p-0">
                      <div className="bg-primary/10 p-3 rounded-full">
                        {service.icon}
                      </div>
                      <h3 className="font-bold text-xl">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Portfolio Section */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.portfolio.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {pageDict.portfolio.description}
              </p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {portfolioData.map((project) => (
                <Card key={project.name} className="group overflow-hidden flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow bg-card border-0">
                  <div className="relative h-96 w-full border-b">
                    <iframe
                      src={project.url}
                      title={`Live preview of ${project.name}`}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.company}</p>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {pageDict.portfolio.visitButton} <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <p className="font-semibold text-primary">{pageDict.whyChooseUs.pretitle}</p>
                <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.whyChooseUs.title}</h2>
                <p className="text-muted-foreground text-lg mt-4">
                  {pageDict.whyChooseUs.description}
                </p>
            </div>
            <div className="mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="p-8 rounded-lg bg-background text-center">
                      <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
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
    </>
  );
}
