
import { Metadata } from 'next';
import { Rss, SearchX } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/insight/news';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.constructionPage.breadcrumb.news;
  const description = 'Our news section is being updated with the latest stories and updates from Micro Padma Nusantara. Please check back soon.';
  const descriptionId = 'Bagian berita kami sedang diperbarui dengan cerita dan pembaruan terbaru dari Micro Padma Nusantara. Silakan periksa kembali segera.';

  const canonicalUrl = `${baseUrl}/${lang}${path}`;

  return {
    title: `${title} - Micro Padma Nusantara`,
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
      title: `${title} - Micro Padma Nusantara`,
      description: lang === 'id' ? descriptionId : description,
      url: canonicalUrl,
    },
  };
}

export default async function NewsPage({ params: { lang } }: { params: { lang: Locale }}) {
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
                          <BreadcrumbPage>{pageDict.breadcrumb.news}</BreadcrumbPage>
                      </BreadcrumbItem>
                  </BreadcrumbList>
              </Breadcrumb>
          </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 lg:py-24 text-center">
        <div className="container">
            <Rss className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.breadcrumb.news}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {dictionary.insightSubMenu.news.description}
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 lg:pb-24">
          <div className="container">
              <Card className="max-w-3xl mx-auto shadow-none border-dashed">
                  <CardContent className="p-10 text-center">
                      <SearchX className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-semibold text-muted-foreground">{dictionary.careerPage.openings.notAvailable}</h3>
                      <p className="text-muted-foreground mt-2">{pageDict.newsDescription}</p>
                  </CardContent>
              </Card>
          </div>
      </section>
    </main>
  );
}
