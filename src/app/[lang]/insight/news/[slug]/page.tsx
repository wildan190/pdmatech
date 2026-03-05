import { Metadata } from 'next';
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import clientPromise from '@/lib/mongodb';
import { Button } from '@/components/ui/button';

type NewsDetailPageProps = {
  params: { lang: Locale; slug: string };
};

async function getNewsBySlug(slug: string, lang: string) {
  try {
    const client = await clientPromise;
    const db = client.db('mpn_cms');
    return await db.collection('news').findOne({ slug, lang });
  } catch (e) {
    console.error("Failed to fetch news detail:", e);
    return null;
  }
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { lang, slug } = params;
  const news = await getNewsBySlug(slug, lang);
  
  if (!news) return { title: 'Not Found' };

  return {
    title: `${news.title} | Micro Padma Nusantara`,
    description: news.excerpt,
    keywords: news.keywords || '',
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: [{ url: news.image }],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { lang, slug } = params;
  const dictionary = await getDictionary(lang);
  const news = await getNewsBySlug(slug, lang);

  if (!news) notFound();

  return (
    <main className="flex-grow bg-background pb-20">
      <section className="bg-secondary/50 py-4 border-b">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href={`/${lang}`}>{dictionary.common.home}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href={`/${lang}/insight/news`}>News</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{news.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <article className="container mt-12">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8 p-0 hover:bg-transparent text-primary hover:underline">
            <Link href={`/${lang}/insight/news`} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </Button>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-10">
            <Image src={news.image} alt={news.title} fill className="object-cover" priority />
          </div>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {new Date(news.date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              {news.tags && news.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">{news.title}</h1>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-primary 
            prose-headings:font-headline prose-img:rounded-xl prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </article>
    </main>
  );
}