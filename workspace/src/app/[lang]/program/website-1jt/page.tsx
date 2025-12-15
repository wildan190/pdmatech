
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowRight, Check, Rocket, Gem, Building, MonitorSmartphone, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mpnsolutions.my.id';
const path = '/program/website-1jt';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.website1jtPage;
  
  const titles: Record<Locale, string> = {
    en: "Affordable Website Design | Starts from IDR 1 Million",
    id: "Jasa Pembuatan Website Murah | Mulai dari 1 Juta Rupiah",
    zh: "经济实惠的网站设计服务 | 100万印尼盾起"
  };

  const descriptions: Record<Locale, string> = {
    en: "Discover our affordable website program for SMEs and startups. Get a professional, fast, and SEO-friendly site starting from IDR 1 million.",
    id: "Temukan program website terjangkau untuk UMKM & startup. Dapatkan situs profesional, cepat, dan ramah SEO mulai dari 1 juta rupiah.",
    zh: "探索我们为中小微企业和初创公司提供的经济实惠的网站计划。获得一个专业、快速且SEO友好的网站，起价100万印尼盾。"
  };

  const keywords: Record<Locale, string[]> = {
    en: ['affordable website', 'cheap website', 'website design service', 'landing page service', 'cheap landing page', 'website for smes', 'website for startup', 'cheap website builder'],
    id: ['jasa website murah', 'website murah', 'website 1 juta', 'landing page murah', 'website company profile', 'jasa landing page', 'website untuk UMKM', 'website untuk startup', 'buat website profesional', 'website builder murah', 'buat landing page murah', 'cara buat website murah', 'website design murah'],
    zh: ['经济实惠的网站', '便宜网站', '网站设计服务', '登录页面服务', '便宜登录页面', '中小微企业网站', '初创公司网站', '便宜网站建设工具']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;
  const imageUrl = `${baseUrl}/assets/img/cover.png`;

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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: titles[lang],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [imageUrl],
    },
  };
}

export default async function Website1JtPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.website1jtPage;
  const commonDict = dictionary.common;

  const features = [
    { icon: <MonitorSmartphone className="w-8 h-8 text-primary" />, title: pageDict.features.item1.title, description: pageDict.features.item1.description },
    { icon: <TrendingUp className="w-8 h-8 text-primary" />, title: pageDict.features.item2.title, description: pageDict.features.item2.description },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: pageDict.features.item3.title, description: pageDict.features.item3.description },
    { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: pageDict.features.item4.title, description: pageDict.features.item4.description },
  ];

  const packages = [
    {
      icon: <Rocket className="w-10 h-10 mb-4 text-primary" />,
      title: "Starter",
      price: pageDict.packages.starter.price,
      description: pageDict.packages.starter.description,
      features: pageDict.packages.starter.features,
      cta: pageDict.packages.cta,
      highlight: false,
    },
    {
      icon: <Gem className="w-10 h-10 mb-4 text-primary" />,
      title: "Business",
      price: pageDict.packages.business.price,
      description: pageDict.packages.business.description,
      features: pageDict.packages.business.features,
      cta: pageDict.packages.cta,
      highlight: true,
    },
    {
      icon: <Building className="w-10 h-10 mb-4 text-primary" />,
      title: "Enterprise",
      price: pageDict.packages.enterprise.price,
      description: pageDict.packages.enterprise.description,
      features: pageDict.packages.enterprise.features,
      cta: pageDict.packages.cta,
      highlight: false,
    },
  ];

  const ctaWhatsappUrl = `https://wa.me/62811144793?text=${encodeURIComponent(pageDict.cta.whatsappMessage)}`;

  return (
    <main className="flex-grow">
      
      {/* Breadcrumb */}
      <section className="bg-secondary/50 py-4 border-b">
        <div className="container">
           <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link href={`/${lang}`}>{commonDict.home}</Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                   <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/${lang}#`}>{dictionary.navigation.program}</Link>
                        </BreadcrumbLink>
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
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
          <ParallaxImage
              src="/assets/img/cover.png"
              alt={pageDict.hero.imageAlt}
              data-ai-hint="modern website design"
              priority
          />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {pageDict.hero.description}
          </p>
           <Button size="lg" className="mt-8" asChild>
                <Link href="#packages">{pageDict.hero.cta}</Link>
            </Button>
        </div>
      </section>

      {/* For Who? */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.forWho.title}</h2>
              <p className="text-muted-foreground text-lg mt-4">
                {pageDict.forWho.description}
              </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardHeader>
                    <Rocket className="w-12 h-12 mx-auto text-primary" />
                    <CardTitle className="mt-4">{pageDict.forWho.item1.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{pageDict.forWho.item1.description}</p>
                </CardContent>
              </Card>
               <Card className="text-center p-6">
                <CardHeader>
                    <Building className="w-12 h-12 mx-auto text-primary" />
                    <CardTitle className="mt-4">{pageDict.forWho.item2.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{pageDict.forWho.item2.description}</p>
                </CardContent>
              </Card>
               <Card className="text-center p-6">
                <CardHeader>
                    <Gem className="w-12 h-12 mx_auto text-primary" />
                    <CardTitle className="mt-4">{pageDict.forWho.item3.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{pageDict.forWho.item3.description}</p>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>
      
      {/* Features */}
       <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
             <div className="lg:col-span-1 space-y-4">
                <p className="font-semibold text-primary">{pageDict.features.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.features.title}</h2>
                <p className="text-muted-foreground text-lg">{pageDict.features.description}</p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background">
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

      {/* Packages */}
      <section id="packages" className="py-20 lg:py-24 bg-background">
        <div className="container">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.packages.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {pageDict.packages.description}
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {packages.map((pkg) => (
                    <Card key={pkg.title} className={`flex flex-col ${pkg.highlight ? 'border-primary shadow-primary/20 shadow-lg' : ''}`}>
                        <CardHeader className="text-center">
                            {pkg.icon}
                            <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                            <CardDescription className="text-4xl font-bold text-foreground">{pkg.price}</CardDescription>
                            <p className="text-sm text-muted-foreground">{pkg.description}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full" variant={pkg.highlight ? 'default' : 'outline'}>
                                <Link href={ctaWhatsappUrl} target="_blank">{pkg.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
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
            <Link href={ctaWhatsappUrl} target="_blank">
                {pageDict.cta.button} <ArrowRight className="ml-2"/>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
