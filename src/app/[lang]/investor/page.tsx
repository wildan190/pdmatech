
import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, FileText, Mail, Building, Users, Lightbulb, TrendingUp, SearchX } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/investor';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.investorPage;
  const title = pageDict.breadcrumb;
  
  const descriptions: Record<Locale, string> = {
    en: 'Explore investment opportunities with Micro Padma Nusantara. Join us in driving Indonesia\'s digital transformation.',
    id: 'Jelajahi peluang investasi dengan Micro Padma Nusantara. Bergabunglah dengan kami dalam mendorong transformasi digital Indonesia.',
    zh: '探索与 Micro Padma Nusantara 的投资机会。加入我们，共同推动印度尼西亚的数字化转型。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['invest in Indonesian tech', 'ICT investment opportunities', 'IoT startup funding', 'tech investor relations', 'digital transformation Indonesia', 'Micro Padma Nusantara investors'],
    id: ['investasi teknologi Indonesia', 'peluang investasi ICT', 'pendanaan startup IoT', 'hubungan investor teknologi', 'transformasi digital Indonesia', 'investor Micro Padma Nusantara'],
    zh: ['投资印尼科技', 'ICT投资机会', '物联网初创公司融资', '科技投资者关系', '印尼数字化转型', 'Micro Padma Nusantara投资者']
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
    },
    twitter: {
      title: `${title} | Micro Padma Nusantara`,
      description: descriptions[lang],
    },
  };
}

export default async function InvestorPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.investorPage;
  const commonDict = dictionary.common;

  const whyInvestData = [
    {
      icon: <Building className="w-8 h-8 text-primary" />,
      title: pageDict.whyInvest.items[0].title,
      description: pageDict.whyInvest.items[0].description
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: pageDict.whyInvest.items[1].title,
      description: pageDict.whyInvest.items[1].description
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: pageDict.whyInvest.items[2].title,
      description: pageDict.whyInvest.items[2].description
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: pageDict.whyInvest.items[3].title,
      description: pageDict.whyInvest.items[3].description
    }
  ];

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
                      <BreadcrumbPage>{pageDict.breadcrumb}</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-start text-left overflow-hidden">
          <ParallaxImage
              src="/assets/img/investor/investor.jpg"
              alt="Business professionals shaking hands, symbolizing a partnership or investment deal."
              data-ai-hint="business agreement"
          />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            {pageDict.hero.description}
          </p>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
             <div className="lg:col-span-1 space-y-4">
                <p className="font-semibold text-primary">{pageDict.whyInvest.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.whyInvest.title}</h2>
                <p className="text-muted-foreground text-lg">{pageDict.whyInvest.description}</p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {whyInvestData.map((item, index) => (
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

      {/* Financials & Resources */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Financial Highlights */}
            <div className="text-center md:text-left">
              <BarChart className="mx-auto md:mx-0 h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline">{pageDict.financials.title}</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto md:mx-0">{pageDict.financials.description}</p>
            </div>
            
            {/* Investor Resources */}
            <div className="text-center md:text-left">
              <FileText className="mx-auto md:mx-0 h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline">{pageDict.resources.title}</h2>
               <p className="text-muted-foreground mt-2 max-w-xl mx-auto md:mx-0">{pageDict.resources.description}</p>
               <Card className="mt-6 border-dashed bg-transparent">
                  <CardContent className="p-6 text-center">
                      <SearchX className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground text-sm">{pageDict.resources.comingSoon}</p>
                  </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investor Contact CTA */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <Mail className="mx-auto h-12 w-12 mb-4" />
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.contact.title}</h2>
          <p className="max-w-2xl mx-auto mb-6">{pageDict.contact.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <a href={`mailto:${pageDict.contact.email}`}>
              {pageDict.contact.email}
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
