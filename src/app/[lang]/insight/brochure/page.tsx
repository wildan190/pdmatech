import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, Layers, Store, Globe, Shield, CheckCircle, Zap, Goal, Download, FileWarning } from "lucide-react";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';
import { getLatestBrochure } from '@/app/cms/brochures/actions';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/insight/brochure';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.brochurePage;
  const title = pageDict.breadcrumb;

  return {
    title,
    description: 'Explore the official brochure of Micro Padma Nusantara. Discover our innovative ICT and IoT solutions.',
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
    },
  };
}

export default async function BrochurePage({ params }: { params: { lang: Locale }}) {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.brochurePage;
  const commonDict = dictionary.common;
  const companyDict = dictionary.companyPage;

  const latestBrochure = await getLatestBrochure(lang);

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
      <section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">
          <ParallaxImage
              src="/assets/img/home/tech.jpg"
              alt={pageDict.hero.imageAlt}
              data-ai-hint="abstract technology"
              priority
          />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">{pageDict.hero.title}</h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            {pageDict.hero.description}
          </p>
          
          <div className="mt-10 flex flex-col items-center gap-4">
            {latestBrochure ? (
              <Button size="lg" className="h-14 px-10 text-lg gap-3" asChild>
                <a href={latestBrochure.fileData} download={latestBrochure.fileName}>
                  <Download className="w-6 h-6" />
                  {pageDict.hero.downloadButton}
                </a>
              </Button>
            ) : (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <FileWarning className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">Brosur terbaru sedang disiapkan</span>
              </div>
            )}
            {latestBrochure && (
              <p className="text-xs opacity-60">File PDF: {latestBrochure.fileName}</p>
            )}
          </div>
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
