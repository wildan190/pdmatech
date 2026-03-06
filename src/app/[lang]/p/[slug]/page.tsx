import { Metadata } from 'next';
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import clientPromise from '@/lib/mongodb';
import { unstable_cache } from 'next/cache';

type CustomPageProps = {
  params: { lang: Locale; slug: string };
};

const getCachedPageDetail = unstable_cache(
  async (slug: string, lang: string) => {
    try {
      const client = await clientPromise;
      const db = client.db('mpn_cms');
      const page = await db.collection('pages').findOne({ slug, lang });
      if (!page) return null;
      
      return {
        ...page,
        _id: page._id.toString()
      };
    } catch (e) {
      console.error("Failed to fetch custom page:", e);
      return null;
    }
  },
  ['custom-page-detail'],
  { tags: ['custom-pages'] }
);

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const { lang, slug } = params;
  const page = await getCachedPageDetail(slug, lang);
  
  if (!page) return { title: 'Page Not Found' };

  return {
    title: `${page.title} | Micro Padma Nusantara`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function DynamicCustomPage({ params }: CustomPageProps) {
  const { lang, slug } = params;
  const dictionary = await getDictionary(lang);
  const page = await getCachedPageDetail(slug, lang);

  if (!page) notFound();

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
                <BreadcrumbPage>{page.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <article className="container mt-12 md:mt-20">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight tracking-tight text-foreground">
              {page.title}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full" />
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-primary 
            prose-headings:font-headline prose-img:rounded-2xl prose-a:text-primary news-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </article>
    </main>
  );
}
