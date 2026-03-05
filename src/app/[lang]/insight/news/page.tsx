import { Metadata } from 'next';
import { Rss, Newspaper, Calendar, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import clientPromise from '@/lib/mongodb';
import { Button } from '@/components/ui/button';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/insight/news';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  
  const titles: Record<Locale, string> = {
    en: 'Latest Tech News & Company Updates',
    id: 'Berita Teknologi & Informasi Perusahaan Terbaru',
    zh: '最新科技新闻与公司动态'
  };

  const descriptions: Record<Locale, string> = {
    en: 'Stay updated with the latest ICT and IoT trends, company milestones, and technology innovations from Micro Padma Nusantara.',
    id: 'Tetap terinformasi dengan tren ICT dan IoT terbaru, tonggak pencapaian perusahaan, dan inovasi teknologi dari Micro Padma Nusantara.',
    zh: '了解 Micro Padma Nusantara 的最新 ICT 和物联网趋势、公司里程碑和技术创新。'
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;
  const title = titles[lang];

  return {
    title: `${title} - Micro Padma Nusantara`,
    description: descriptions[lang],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'id': `${baseUrl}/id${path}`,
        'zh': `${baseUrl}/zh${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title: `${title} - Micro Padma Nusantara`,
      description: descriptions[lang],
      url: canonicalUrl,
    },
  };
}

async function getNewsFromDB(lang: string) {
  try {
    const client = await clientPromise;
    const db = client.db('mpn_cms');
    const news = await db.collection('news').find({ lang }).sort({ date: -1 }).toArray();
    return news.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch news from DB:", e);
    return [];
  }
}

export default async function NewsPage({ params }: { params: { lang: Locale }}) {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.constructionPage;
  
  const newsItems = await getNewsFromDB(lang);

  return (
    <main className="flex-grow bg-background">
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
      <section className="py-20 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
                <Rss className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.breadcrumb.news}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {dictionary.insightSubMenu.news.description}
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 lg:pb-24">
          <div className="container">
              {newsItems.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsItems.map((news) => (
                    <Card key={news._id} className="group overflow-hidden flex flex-col shadow-lg border-0 bg-card hover:shadow-primary/10 transition-shadow">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(news.date).toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          {news.tags && news.tags[0] && (
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                              <Tag className="w-2.5 h-2.5" /> {news.tags[0]}
                            </div>
                          )}
                        </div>
                        <CardTitle className="line-clamp-2 leading-tight group-hover:text-primary transition-colors">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">{news.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" asChild className="p-0 h-auto gap-2 group/btn">
                          <Link href={`/${lang}/insight/news/${news.slug}`}>
                            {dictionary.common.learnMore} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="max-w-3xl mx-auto shadow-none border-dashed bg-secondary/10">
                    <CardContent className="p-16 text-center">
                        <Newspaper className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-semibold text-muted-foreground">{pageDict.newsDescription}</h3>
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">Stay tuned for future updates and stories from our innovation journey.</p>
                    </CardContent>
                </Card>
              )}
          </div>
      </section>
    </main>
  );
}