
import { Metadata } from 'next';
import Script from 'next/script';
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import clientPromise from '@/lib/mongodb';
import { Button } from '@/components/ui/button';
import { unstable_cache } from 'next/cache';
import { getMediaById } from '@/app/cms/media/actions';

type ArticleDetailPageProps = {
  params: Promise<{ lang: Locale; slug: string }>;
};

const baseUrl = 'https://mpnsolutions.my.id';

const getArticleDetail = (slug: string, lang: string) => unstable_cache(
  async () => {
    try {
      const client = await clientPromise;
      const db = client.db('mpn_cms');
      const article = await db.collection('articles').findOne({ slug, lang });
      if (!article) return null;
      
      let imageSrc = article.image;
      if (article.image && article.image.length === 24 && !article.image.startsWith('data:')) {
        imageSrc = await getMediaById(article.image) || 'https://picsum.photos/seed/article/800/600';
      }

      return {
        ...article,
        _id: article._id.toString(),
        imageId: article.image,
        image: imageSrc
      };
    } catch (e) {
      console.error("Failed to fetch article detail:", e);
      return null;
    }
  },
  [`article-detail-${slug}-${lang}`],
  { tags: ['articles', 'media'] }
)();

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = await getArticleDetail(slug, lang);
  
  if (!article) return { title: 'Not Found' };

  const canonicalUrl = `${baseUrl}/${lang}/insight/article/${slug}`;
  
  let ogImageUrl = article.image;
  if (article.imageId && article.imageId.length === 24 && !article.imageId.startsWith('http')) {
    ogImageUrl = `${baseUrl}/api/media/${article.imageId}`;
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords || '',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }] : [],
      type: 'article',
      siteName: 'Micro Padma Nusantara',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang);
  const article = await getArticleDetail(slug, lang);

  if (!article) notFound();

  const canonicalUrl = `${baseUrl}/${lang}/insight/article/${slug}`;
  let ogImageUrl = article.image;
  if (article.imageId && article.imageId.length === 24 && !article.imageId.startsWith('http')) {
    ogImageUrl = `${baseUrl}/api/media/${article.imageId}`;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: ogImageUrl ? [ogImageUrl] : [],
    author: {
      '@type': 'Organization',
      name: 'Micro Padma Nusantara',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Micro Padma Nusantara',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/img/home/og-image.jpg`,
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
                <BreadcrumbLink asChild><Link href={`/${lang}/insight/article`}>Article</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <article className="container mt-12">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8 p-0 hover:bg-transparent text-primary hover:underline">
            <Link href={`/${lang}/insight/article`} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Articles
            </Link>
          </Button>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-10">
            <Image 
              src={article.image} 
              alt={article.title} 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">{article.title}</h1>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-primary 
            prose-headings:font-headline prose-img:rounded-xl prose-a:text-primary news-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </main>
    </>
  );
}
