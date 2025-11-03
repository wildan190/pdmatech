
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, Map, Leaf, Factory } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.ictSolutionsSubMenu.iot.title;
  const description = 'Transform your business with our end-to-end IoT solutions. From smart monitoring and asset tracking to industrial automation, we connect your world for enhanced efficiency.';
  const descriptionId = 'Ubah bisnis Anda dengan solusi IoT end-to-end kami. Dari pemantauan cerdas dan pelacakan aset hingga otomatisasi industri, kami menghubungkan dunia Anda untuk efisiensi yang lebih baik.';

  const canonicalUrl = `${baseUrl}/${lang}/ict-solutions/iot`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['IoT solutions', 'Internet of Things', 'smart monitoring', 'asset tracking', 'industrial automation', 'smart agriculture', 'IIoT', 'connected devices'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/ict-solutions/iot`,
        'id': `${baseUrl}/id/ict-solutions/iot`,
        'x-default': `${baseUrl}/en/ict-solutions/iot`,
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

export default async function IotPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.iotPage;

  const services = [
    {
        icon: <Cpu className="w-8 h-8 text-primary" />,
        title: pageDict.applications.monitoring.title,
        description: pageDict.applications.monitoring.description,
        imageId: "iot-feature-1",
        imagePath: "/assets/img/ict/smartmonitoring.jpg"
    },
    {
        icon: <Map className="w-8 h-8 text-primary" />,
        title: pageDict.applications.tracking.title,
        description: pageDict.applications.tracking.description,
        imageId: "iot-feature-3",
        imagePath: "/assets/img/ict/logistics.jpg"
    },
    {
        icon: <Factory className="w-8 h-8 text-primary" />,
        title: pageDict.applications.automation.title,
        description: pageDict.applications.automation.description,
        imageId: "iot-feature-4"
    },
    {
        icon: <Leaf className="w-8 h-8 text-primary" />,
        title: pageDict.applications.agriculture.title,
        description: pageDict.applications.agriculture.description,
        imageId: "iot-feature-2",
        imagePath: "/assets/img/ict/agriculture.jpg"
    }
];

const processSteps = [
  {
    title: pageDict.process.step1.title,
    description: pageDict.process.step1.description
  },
  {
    title: pageDict.process.step2.title,
    description: pageDict.process.step2.description
  },
  {
    title: pageDict.process.step3.title,
    description: pageDict.process.step3.description
  },
  {
    title: pageDict.process.step4.title,
    description: pageDict.process.step4.description
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
              src="/assets/img/ict/iot.jpg"
              alt="A futuristic cityscape with glowing data streams connecting buildings, representing a smart city powered by IoT."
              fill
              className="object-cover"
              data-ai-hint="smart city"
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

      {/* Our IoT Applications */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.applications.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.applications.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
               const image = PlaceHolderImages.find(p => p.id === service.imageId);
               return(
              <Card key={service.title} className="group overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
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
                      <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
                              {service.icon}
                          </div>
                          <CardTitle className="text-xl leading-tight">{service.title}</CardTitle>
                      </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
              </Card>
               );
            })}
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-4">
                <p className="font-semibold text-primary">{pageDict.process.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.process.title}</h2>
                <p className="text-muted-foreground text-lg">{pageDict.process.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {processSteps.map((item, index) => (
                <div key={index} className="p-6 rounded-lg bg-secondary/30">
                    <h3 className="font-bold font-headline text-2xl text-primary mb-2">{item.title}</h3>
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

    

    
