
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Zap, Goal, Target, Eye, MapPin, Leaf, GraduationCap, Recycle } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Metadata } from 'next';
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/about/company';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.companyPage;
  const title = pageDict.breadcrumb;
  const description = 'Learn about the history, mission, and vision of Micro Padma Nusantara. We are dedicated to delivering transformative ICT and IoT solutions in Indonesia.';
  const descriptionId = 'Pelajari tentang sejarah, misi, dan visi Micro Padma Nusantara. Kami berdedikasi untuk memberikan solusi ICT dan IoT yang transformatif di Indonesia.';
  
  const canonicalUrl = `${baseUrl}/${lang}${path}`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['about us', 'company profile', 'ICT company', 'IoT company', 'mission', 'vision', 'Micro Padma Nusantara'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'id': `${baseUrl}/id${path}`,
        'x-default': `${baseUrl}/en${path}`,
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

    const programData = [
        {
            icon: <Leaf className="w-8 h-8 text-primary" />,
            title: pageDict.ourProgram.items.goGreen.title,
            description: pageDict.ourProgram.items.goGreen.description,
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-primary" />,
            title: pageDict.ourProgram.items.socialTech.title,
            description: pageDict.ourProgram.items.socialTech.description,
        },
        {
            icon: <Recycle className="w-8 h-8 text-primary" />,
            title: pageDict.ourProgram.items.environment.title,
            description: pageDict.ourProgram.items.environment.description,
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
      
      {/* Our Program Section */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.ourProgram.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.ourProgram.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {programData.map((program) => (
              <Card key={program.title} className="group overflow-hidden flex flex-col text-center items-center p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background">
                  <CardHeader className="p-0">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                          {program.icon}
                      </div>
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                      <p className="text-muted-foreground text-sm">{program.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container text-center">
            <div className="text-center mb-12">
                <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Location</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Find us at our office in Rangkasbitung, Banten. We look forward to welcoming you.
                </p>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.383196940831!2d106.2482343152686!3d-6.36531589531535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4216d25245428d%3A0x86c236f1c42a225!2sJl.+Prof.+Dr.+Ir.+Soetami%2C+Cijoro+Pasir%2C+Kec.+Rangkasbitung%2C+Kabupaten+Lebak%2C+Banten+42316!5e0!3m2!1sen!2sid!4v1678886543210"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Micro Padma Nusantara Office Location"
                ></iframe>
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
