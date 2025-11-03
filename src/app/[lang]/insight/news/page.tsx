import { Metadata } from 'next';
import { Wrench } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const title = dictionary.constructionPage.breadcrumb.news;
  const description = 'Our news section is being updated with the latest stories and updates from Micro Padma Nusantara. Please check back soon.';
  const descriptionId = 'Bagian berita kami sedang diperbarui dengan cerita dan pembaruan terbaru dari Micro Padma Nusantara. Silakan periksa kembali segera.';

  return {
    title: `${title} - On Construction`,
    description: lang === 'id' ? descriptionId : description,
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `${title} - On Construction`,
      description: lang === 'id' ? descriptionId : description,
      url: `https://mpnsolutions.my.id/${lang}/insight/news`,
    },
    alternates: {
      canonical: `/${lang}/insight/news`,
      languages: {
        'en': '/en/insight/news',
        'id': '/id/insight/news',
        'x-default': '/en/insight/news',
      },
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
      <div className="flex-grow container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center justify-center text-center">
          <Wrench className="w-20 h-20 text-primary mb-6" />
          <h1 className="text-4xl font-bold font-headline">{pageDict.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
              {pageDict.newsDescription}
          </p>
      </div>
    </main>
  );
}
