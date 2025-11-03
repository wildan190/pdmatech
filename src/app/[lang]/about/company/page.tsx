
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Zap, Goal, Target, Eye } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Metadata } from 'next';
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.companyPage;
  const title = pageDict.breadcrumb;
  const description = 'Learn about the history, mission, and vision of Micro Padma Nusantara. We are dedicated to delivering transformative ICT and IoT solutions in Indonesia.';
  const descriptionId = 'Pelajari tentang sejarah, misi, dan visi Micro Padma Nusantara. Kami berdedikasi untuk memberikan solusi ICT dan IoT yang transformatif di Indonesia.';
  
  const canonicalUrl = `${baseUrl}/${lang}/about/company`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['about us', 'company profile', 'ICT company', 'IoT company', 'mission', 'vision', 'Micro Padma Nusantara'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/about/company`,
        'id': `${baseUrl}/id/about/company`,
        'x-default': `${baseUrl}/en/about/company`,
      },
    },
    openGraph: {
      title: `${title} - Micro Padma Nusantara`,
      description: lang === 'id' ? descriptionId : description,
      url: canonicalUrl,
    },
    twitter: {
      title: `${title} - Micro Padma Nusantara`,
      description: lang === 'id' ? descriptionId : description,
    },
  };
}

export default async function CompanyPage({ params: { lang } }: { params: { lang: Locale }}) {
    const dictionary = await getDictionary(lang);
    const pageDict = dictionary.companyPage;

    const whyChooseUsData = [
      {
        icon: <Shield className="w-8 h-8 text-primary" />,
        title: pageDict.whyChooseUs.item1.title,
        description: pageDict.whyChooseUs.item1.description
      },
      {
        icon: <CheckCircle className="w-8 h-8 text-primary" />,
        title: pageDict.whyChooseUs.item2.title,
        description: pageDict.whyChooseUs.item2.description
      },
      {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: pageDict.whyChooseUs.item3.title,
        description: pageDict.whyChooseUs.item3.description
      },
      {
        icon: <Goal className="w-8 h-8 text-primary" />,
        title: pageDict.whyChooseUs.item4.title,
        description: pageDict.whyChooseUs.item4.description
      }
    ];

    const visionImage = PlaceHolderImages.find(p => p.id === 'company-vision');
    const missionImage = PlaceHolderImages.find(p => p.id === 'company-mission');

  return (
    <main className="flex-grow">
        
      {/* Breadcrumb */}
      <section className="bg-secondary/50 py-4 border-b">
        <div className="container">
           <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                      <Link href={`/${lang}`}>{dictionary.common.home}</Link>
                  </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link href={`/${lang}/about/company`}>{dictionary.common.aboutUs}</Link></BreadcrumbLink>
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
      <section className="relative h-[60vh] flex items-center">
          <Image
              src="/assets/img/home/company.jpg"
              alt="A modern, bright office space with people collaborating, representing a forward-thinking company."
              fill
              className="object-cover"
          />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.headline}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            {pageDict.hero.subheadline}
          </p>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.journey.title}</h2>
              <p className="text-muted-foreground text-lg mb-6">
                {pageDict.journey.content}
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFifGVufDB8fHx8MTc2MjI0MzQwMXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Technology Lab"
                fill
                className="object-cover"
                data-ai-hint="technology lab"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container space-y-20">
          {/* Vision */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg order-last md:order-first">
                  {visionImage && (
                      <Image
                      src={visionImage.imageUrl}
                      alt={visionImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={visionImage.imageHint}
                      />
                  )}
              </div>
              <div className="text-left md:text-right">
                  <div className="inline-flex items-center gap-3">
                      <h3 className="text-3xl font-bold font-headline">{pageDict.vision.title}</h3>
                      <Eye className="w-10 h-10 text-primary"/>
                  </div>
                  <p className="text-muted-foreground mt-4 text-lg">{pageDict.vision.content}</p>
              </div>
          </div>
          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                  <div className="inline-flex items-center gap-3">
                      <Target className="w-10 h-10 text-primary"/>
                      <h3 className="text-3xl font-bold font-headline">{pageDict.mission.title}</h3>
                  </div>
                  <p className="text-muted-foreground mt-4 text-lg">{pageDict.mission.content}</p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  {missionImage && (
                      <Image
                      src={missionImage.imageUrl}
                      alt={missionImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={missionImage.imageHint}
                      />
                  )}
              </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
             <div className="lg:col-span-1 space-y-4">
                <p className="font-semibold text-primary">{pageDict.whyChooseUs.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.whyChooseUs.title}</h2>
                <p className="text-muted-foreground text-lg">{pageDict.whyChooseUs.description}</p>
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
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{pageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/${lang}/#contact`}>{pageDict.cta.button}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

    

    
