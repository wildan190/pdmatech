
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowRight, Check, Zap, Server, ShieldCheck, Feather } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';
import Script from 'next/script';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mpnsolutions.my.id';
const path = '/program/website-murah';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const pageDict = dictionary.websiteMurahPage;
  
  const titles: Record<Locale, string> = {
    en: "Affordable Static Website | Under IDR 500K + Free Domain",
    id: "Website Statis Murah | Di Bawah 500 Ribu + Gratis Domain",
    zh: "经济型静态网站 | 50万印尼盾以下 + 免费域名"
  };

  const descriptions: Record<Locale, string> = {
    en: "Get a lightning-fast, secure, and professional static website for under IDR 500K. Includes a free .my.id domain. Perfect for portfolios, landing pages, and small businesses.",
    id: "Dapatkan website statis yang super cepat, aman, dan profesional dengan harga di bawah 500 ribu rupiah. Sudah termasuk domain .my.id gratis. Sempurna untuk portofolio, landing page, dan bisnis kecil.",
    zh: "以低于50万印尼盾的价格获得一个速度极快、安全且专业的静态网站。包含免费的.my.id域名。非常适合作品集、登录页面和小型企业。"
  };

  const keywords: Record<Locale, string[]> = {
    en: ['affordable static website', 'cheap static site', '500k website', 'free .my.id domain', 'fast landing page', 'website under 500k', 'static site generator service'],
    id: ['website statis murah', 'website 500 ribu', 'jasa website statis', 'landing page cepat', 'website di bawah 500 ribu', 'gratis domain .my.id', 'jasa pembuatan website murah'],
    zh: ['经济型静态网站', '便宜的静态网站', '50万印尼盾网站', '免费.my.id域名', '快速登录页面', '50万印尼盾以下网站', '静态网站生成器服务']
  };

  const canonicalUrl = `${baseUrl}/${params.lang}${path}`;
  const imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdGF0aWMlMjB3ZWJzaXRlJTIwY29kZXxlbnwwfHx8fDE3NjU1NTgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080";

  return {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
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
      title: titles[params.lang],
      description: descriptions[params.lang],
      url: canonicalUrl,
      images: [ { url: imageUrl, width: 1200, height: 630, alt: titles[params.lang] } ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[params.lang],
      description: descriptions[params.lang],
      images: [imageUrl],
    },
  };
}

export default async function WebsiteMurahPage({ params }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(params.lang);
  const pageDict = dictionary.websiteMurahPage;
  const commonDict = dictionary.common;

  const features = [
    { icon: <Zap className="w-8 h-8 text-primary" />, title: pageDict.features.item1.title, description: pageDict.features.item1.description },
    { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: pageDict.features.item2.title, description: pageDict.features.item2.description },
    { icon: <Server className="w-8 h-8 text-primary" />, title: pageDict.features.item3.title, description: pageDict.features.item3.description },
    { icon: <Feather className="w-8 h-8 text-primary" />, title: pageDict.features.item4.title, description: pageDict.features.item4.description },
  ];

  const packages = [
    {
      domain: ".my.id",
      price: pageDict.packages.myid.price,
      description: pageDict.packages.myid.description,
      features: pageDict.packages.myid.features,
      highlight: true,
    },
    {
      domain: ".com",
      price: pageDict.packages.com.price,
      description: pageDict.packages.com.description,
      features: pageDict.packages.com.features,
      highlight: false,
    },
    {
      domain: ".id",
      price: pageDict.packages.id.price,
      description: pageDict.packages.id.description,
      features: pageDict.packages.id.features,
      highlight: false,
    },
  ];

  const ctaWhatsappUrl = `https://wa.me/62811144793?text=${encodeURIComponent(pageDict.cta.whatsappMessage)}`;
  const canonicalUrl = `${baseUrl}/${params.lang}${path}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pageDict.breadcrumb,
    description: pageDict.hero.description,
    brand: { '@type': 'Brand', name: 'Micro Padma Nusantara' },
    offers: packages.map(pkg => ({
      '@type': 'Offer',
      name: `Static Website with ${pkg.domain} domain`,
      price: pkg.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'IDR',
      url: canonicalUrl,
      availability: 'https://schema.org/InStock',
    }))
  };

  return (
    <>
      <Script
        id="product-schema-murah"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <section className="bg-secondary/50 py-4 border-b">
          <div className="container">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild><Link href={`/${params.lang}`}>{commonDict.home}</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                              <Link href={`/${params.lang}/#program`}>{dictionary.navigation.program}</Link>
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
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdGF0aWMlMjB3ZWJzaXRlJTIwY29kZXxlbnwwfHx8fDE3NjU1NTgzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={pageDict.hero.imageAlt}
                data-ai-hint="static website code"
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

        {/* Features */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="font-semibold text-primary">{pageDict.features.pretitle}</p>
                <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.features.title}</h2>
                <p className="text-muted-foreground text-lg mt-4">
                  {pageDict.features.description}
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-secondary/30 text-center">
                  <CardContent className="flex flex-col items-center gap-4 p-0">
                    <div className="bg-primary/10 p-4 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.packages.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  {pageDict.packages.description}
                  </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                  {packages.map((pkg) => (
                      <Card key={pkg.domain} className={`flex flex-col bg-background ${pkg.highlight ? 'border-primary shadow-primary/20 shadow-lg' : ''}`}>
                          <CardHeader className="text-center">
                              <CardTitle className="text-3xl font-bold">{pkg.domain}</CardTitle>
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
                                  <Link href={ctaWhatsappUrl} target="_blank">{pageDict.packages.cta}</Link>
                              </Button>
                          </CardFooter>
                      </Card>
                  ))}
              </div>
               <div className="text-center mt-12 text-muted-foreground text-sm">
                  <p>{pageDict.packages.footerNote}</p>
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
    </>
  );
}
