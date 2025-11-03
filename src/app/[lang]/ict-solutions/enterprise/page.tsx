
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building, CheckCircle, Code, Layers, Ticket, Hotel, Users } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.ictSolutionsSubMenu.enterprise.title;
  const description = 'Scalable and robust ICT solutions for large organizations, including ERP, CRM, custom software, POS, and more. Power your enterprise with Micro Padma Nusantara.';
  const descriptionId = 'Solusi ICT yang dapat diskalakan dan kuat untuk organisasi besar, termasuk ERP, CRM, perangkat lunak kustom, POS, dan lainnya. Berdayakan perusahaan Anda dengan Micro Padma Nusantara.';

  const canonicalUrl = `${baseUrl}/${lang}/ict-solutions/enterprise`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['enterprise solutions', 'ERP', 'CRM', 'custom software', 'point of sale', 'hotel management', 'ticketing system', 'ICT for enterprise'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/ict-solutions/enterprise`,
        'id': `${baseUrl}/id/ict-solutions/enterprise`,
        'x-default': `${baseUrl}/en/ict-solutions/enterprise`,
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

export default async function EnterprisePage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.enterprisePage;

  const services = [
    {
        icon: <Layers className="w-8 h-8 text-primary" />,
        title: "ERP (Enterprise Resource Planning)",
        description: pageDict.services.erp,
        imageId: "service-erp",
        imagePath: null
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "CRM (Customer Relationship Management)",
        description: pageDict.services.crm,
        imageId: "service-crm",
        imagePath: null
    },
    {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Custom Software House",
        description: pageDict.services.softwareHouse,
        imageId: "service-software-house",
        imagePath: null
    },
    {
        icon: <Building className="w-8 h-8 text-primary" />,
        title: "POS (Point of Sale)",
        description: pageDict.services.pos,
        imageId: "service-pos",
        imagePath: "/assets/img/ict/pos.jpg"
    },
    {
        icon: <Hotel className="w-8 h-8 text-primary" />,
        title: "Hotel Management System",
        description: pageDict.services.hotel,
        imageId: "service-hotel",
        imagePath: null
    },
    {
        icon: <Ticket className="w-8 h-8 text-primary" />,
        title: "Ticketing System",
        description: pageDict.services.ticketing,
        imageId: "service-ticketing",
        imagePath: null
    }
];

const whyChooseUsData = [
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
      <section className="relative h-[60vh] flex items-center justify-start text-left">
          <Image
              src="/assets/img/ict/enterprise.jpg"
              alt="A bustling, modern data center with rows of servers, symbolizing robust enterprise infrastructure."
              fill
              className="object-cover"
              data-ai-hint="data center"
          />
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
          <div className="text-center max-w-3xl mx-auto">
              <p className="font-semibold text-primary">{pageDict.overview.pretitle}</p>
              <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.overview.title}</h2>
              <p className="text-muted-foreground text-lg mt-4">
                {pageDict.overview.description}
              </p>
          </div>
        </div>
      </section>

      {/* Services Development */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.services.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.services.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const image = PlaceHolderImages.find(p => p.id === service.imageId);
              return (
                  <Card key={service.title} className="group overflow-hidden flex flex-col">
                      <div className="relative h-56 w-full overflow-hidden">
                         {service.imagePath ? (
                              <Image
                                  src={service.imagePath}
                                  alt={service.description}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                          ) : image && (
                              <Image
                                  src={image.imageUrl}
                                  alt={image.description}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  data-ai-hint={image.imageHint}
                              />
                          )}
                      </div>
                      <CardHeader>
                          <div className="flex items-center gap-4">
                              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                  {service.icon}
                              </div>
                              <CardTitle className="text-xl">{service.title}</CardTitle>
                          </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                  </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-4">
                <p className="font-semibold text-primary">{pageDict.whyChooseUs.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.whyChooseUs.title}</h2>
                <p className="text-muted-foreground text-lg">{pageDict.whyChooseUs.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUsData.map((item, index) => (
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

    

    
