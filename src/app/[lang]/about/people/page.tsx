
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Experience from "@/components/landing/experience";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from 'next';
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";

const baseUrl = 'https://mpnsolutions.my.id';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.peoplePage;
  const title = pageDict.breadcrumb;
  const description = 'Meet the talented team of leaders and innovators at Micro Padma Nusantara. Our experts are dedicated to driving your business success through technology.';
  const descriptionId = 'Temui tim pemimpin dan inovator berbakat di Micro Padma Nusantara. Para ahli kami berdedikasi untuk mendorong kesuksesan bisnis Anda melalui teknologi.';

  const canonicalUrl = `${baseUrl}/${lang}/about/people`;

  return {
    title,
    description: lang === 'id' ? descriptionId : description,
    keywords: ['our team', 'leadership', 'tech experts', 'ICT professionals', 'IoT experts', 'Micro Padma Nusantara team'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/about/people`,
        'id': `${baseUrl}/id/about/people`,
        'x-default': `${baseUrl}/en/about/people`,
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


export default async function PeoplePage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.peoplePage;

  const leaders = [
    {
        name: pageDict.leaders.wildan.name,
        title: pageDict.leaders.wildan.title,
        image: "/assets/img/about/me.png",
        bio: pageDict.leaders.wildan.bio,
        width: 800,
        height: 800
    },
    {
        name: pageDict.leaders.raihan.name,
        title: pageDict.leaders.raihan.title,
        image: "/assets/img/about/rei.jpg",
        bio: pageDict.leaders.raihan.bio,
        width: 800,
        height: 1000
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
      <section className="py-20 lg:py-24 text-center">
          <div className="container">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  {pageDict.hero.description}
              </p>
          </div>
      </section>

      {/* Experience Section */}
      <Experience dictionary={dictionary.homePage.experience} />

      {/* Team Leaders */}
      <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
              <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.leaders.title}</h2>
                   <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                      {pageDict.leaders.description}
                   </p>
              </div>
              <div className="space-y-24">
                  {leaders.map((leader, index) => {
                      const isOdd = index % 2 !== 0;
                      return (
                           <div key={leader.name} className="grid md:grid-cols-2 gap-12 items-center">
                              <div className={`relative w-full max-w-md mx-auto ${isOdd ? 'md:order-last' : ''}`}>
                                  <Image
                                      src={leader.image}
                                      alt={`Portrait of ${leader.name}`}
                                      width={leader.width}
                                      height={leader.height}
                                      className="rounded-lg shadow-xl object-contain w-full h-auto"
                                  />
                              </div>
                              <div className={`${isOdd ? 'md:text-right' : 'md:text-left'}`}>
                                  <h3 className="text-3xl font-bold font-headline">{leader.name}</h3>
                                  <p className="text-primary font-semibold text-lg mt-1">{leader.title}</p>
                                  <p className="mt-6 text-muted-foreground leading-relaxed">
                                      {leader.bio}
                                  </p>
                              </div>
                           </div>
                      );
                  })}
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

    

    
