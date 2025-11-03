
import { Metadata } from 'next';
import { Wrench } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/insight/article';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.constructionPage.breadcrumb.article;
  const description = 'Our articles page is currently under construction. Please check back soon for in-depth analysis on ICT, IoT, and business technology trends.';
  const descriptionId = 'Halaman artikel kami sedang dalam pembangunan. Silakan periksa kembali segera untuk analisis mendalam tentang tren ICT, IoT, dan teknologi bisnis.';

  const canonicalUrl = `${baseUrl}/${lang}${path}`;

  return {
    title: `${title} - On Construction`,
    description: lang === 'id' ? descriptionId : description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'id': `${baseUrl}/id${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title: `${title} - On Construction`,
      description: lang === 'id' ? descriptionId : description,
      url: canonicalUrl,
    },
  };
}

export default async function ArticlePage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.constructionPage;
  return (
    <main className="flex-grow">
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
                         <BreadcrumbPage>{pageDict.breadcrumb.insight}</BreadcrumbPage>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                          <BreadcrumbPage>{pageDict.breadcrumb.article}</BreadcrumbPage>
                      </BreadcrumbItem>
                  </BreadcrumbList>
              </Breadcrumb>
          </div>
      </section>
      <div className="flex-grow container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center justify-center text-center">
          <Wrench className="w-20 h-20 text-primary mb-6" />
          <h1 className="text-4xl font-bold font-headline">{pageDict.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
              {pageDict.description}
          </p>
      </div>
    </main>
  );
}
