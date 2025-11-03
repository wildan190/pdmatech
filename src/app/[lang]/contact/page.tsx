
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { CheckCircle, Shield, Zap, Goal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from '@/components/shared/contact-form';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.contactPage;
  const title = pageDict.breadcrumb;
  const description = 'Get in touch with Micro Padma Nusantara. We are here to help you with your ICT and IoT needs. Contact us for a consultation.';
  const descriptionId = 'Hubungi Micro Padma Nusantara. Kami siap membantu kebutuhan ICT dan IoT Anda. Hubungi kami untuk konsultasi.';

  const path = '/contact';
  const canonicalUrl = `${baseUrl}/${lang}${path}`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['contact us', 'get in touch', 'ICT consultation', 'IoT consultation', 'Micro Padma Nusantara contact'],
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

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale }}) {
    const dictionary = await getDictionary(lang);
    const pageDict = dictionary.contactPage;
    const companyPageDict = dictionary.companyPage;

    const whyChooseUsData = [
      {
        icon: <Shield className="w-8 h-8 text-primary" />,
        title: companyPageDict.whyChooseUs.item1.title,
        description: companyPageDict.whyChooseUs.item1.description
      },
      {
        icon: <CheckCircle className="w-8 h-8 text-primary" />,
        title: companyPageDict.whyChooseUs.item2.title,
        description: companyPageDict.whyChooseUs.item2.description
      },
      {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: companyPageDict.whyChooseUs.item3.title,
        description: companyPageDict.whyChooseUs.item3.description
      },
      {
        icon: <Goal className="w-8 h-8 text-primary" />,
        title: companyPageDict.whyChooseUs.item4.title,
        description: companyPageDict.whyChooseUs.item4.description
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
                  <BreadcrumbLink asChild>
                      <Link href={`/${lang}`}>{dictionary.common.home}</Link>
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
      <section className="relative h-[50vh] flex items-center">
          <Image
              src="/assets/img/home/contact-hero.jpg"
              alt="An abstract image of glowing network connections, representing technology and communication."
              fill
              className="object-cover"
              data-ai-hint="technology communication"
          />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.headline}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            {pageDict.hero.subheadline}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact-form" className="py-20 lg:py-24 bg-background">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">{dictionary.homePage.contact.headline}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {dictionary.homePage.contact.subheadline}
                </p>
            </div>
            <ContactForm dictionary={dictionary.homePage.contact} />
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
             <div className="lg:col-span-1 space-y-4">
                <p className="font-semibold text-primary">{companyPageDict.whyChooseUs.pretitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{companyPageDict.whyChooseUs.title}</h2>
                <p className="text-muted-foreground text-lg">{companyPageDict.whyChooseUs.description}</p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {whyChooseUsData.map((item, index) => (
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

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{companyPageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{companyPageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/${lang}/about/company`}>{dictionary.common.learnMore}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
