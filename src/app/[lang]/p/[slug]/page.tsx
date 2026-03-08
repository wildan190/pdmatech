import { Metadata } from 'next';
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import clientPromise from '@/lib/mongodb';
import { unstable_cache } from 'next/cache';
import { getMediaById } from '@/app/cms/media/actions';
import ParallaxImage from '@/components/shared/parallax-image';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

type CustomPageProps = {
  params: Promise<{ lang: Locale; slug: string }>;
};

const getCachedPageDetail = (slug: string, lang: string) => unstable_cache(
  async (slug: string, lang: string) => {
    try {
      const client = await clientPromise;
      const db = client.db('mpn_cms');
      const page = await db.collection('pages').findOne({ slug, lang });
      if (!page) return null;
      
      const resolvedSections = [];
      if (page.sections) {
        for (const section of page.sections) {
          if ((section.type === 'hero' || section.type === 'image') && section.data.imageId) {
            const imageData = await getMediaById(section.data.imageId);
            resolvedSections.push({
              ...section,
              data: { ...section.data, imageData }
            });
          } else if (section.type === 'gallery' && section.data.items) {
              const resolvedItems = await Promise.all(section.data.items.map(async (item: any) => {
                  const imageData = await getMediaById(item.imageId);
                  return { ...item, imageData };
              }));
              resolvedSections.push({
                  ...section,
                  data: { ...section.data, items: resolvedItems }
              });
          } else if (section.type === 'columns' && section.data.columns) {
              const resolvedColumns = await Promise.all(section.data.columns.map(async (col: any) => {
                  if (col.type === 'image' && col.imageId) {
                      const imageData = await getMediaById(col.imageId);
                      return { ...col, imageData };
                  }
                  return col;
              }));
              resolvedSections.push({
                  ...section,
                  data: { ...section.data, columns: resolvedColumns }
              });
          } else {
            resolvedSections.push(section);
          }
        }
      }

      return {
        ...page,
        _id: page._id.toString(),
        sections: resolvedSections
      };
    } catch (e) {
      console.error("Error fetching dynamic page:", e);
      return null;
    }
  },
  [`custom-page-detail-${slug}-${lang}`],
  { tags: ['custom-pages', 'media'] }
)(slug, lang);

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = await getCachedPageDetail(slug, lang);
  if (!page) return { title: 'Page Not Found' };

  return {
    title: `${page.title} | Micro Padma Nusantara`,
    description: page.description,
  };
}

export default async function DynamicCustomPage({ params }: CustomPageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang);
  const page = await getCachedPageDetail(slug, lang);

  if (!page) notFound();

  return (
    <main className="flex-grow bg-background">
      {!page.hideNavbar && (
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
      )}

      {page.sections && page.sections.map((section: any, sectionIdx: number) => (
        <div key={section.id}>
          {section.type === 'hero' && (
            <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
              {section.data.imageData && (
                <ParallaxImage 
                  src={section.data.imageData} 
                  alt={section.data.title} 
                  priority={sectionIdx === 0} 
                  sizes="100vw"
                />
              )}
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 container text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">{section.data.title}</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">{section.data.subtitle}</p>
              </div>
            </section>
          )}

          {section.type === 'text' && (
            <section className="py-16 md:py-24">
              <div className="container max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none prose-primary news-content"
                  dangerouslySetInnerHTML={{ __html: section.data.content }}
                />
              </div>
            </section>
          )}

          {section.type === 'image' && (
            <section className="py-12">
              <div className="container max-w-5xl mx-auto text-center">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mx-auto">
                  <Image 
                    src={section.data.imageData || 'https://picsum.photos/seed/img/1200/800'} 
                    alt={section.data.caption || 'Image'} 
                    fill 
                    className="object-cover" 
                    priority={sectionIdx === 0}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
                {section.data.caption && <p className="mt-4 text-center text-muted-foreground italic">{section.data.caption}</p>}
              </div>
            </section>
          )}

          {section.type === 'columns' && (
              <section className="py-16 md:py-24">
                  <div className="container">
                      <div className={cn(
                          "grid gap-12 items-center",
                          section.data.layout === '2-cols' ? 'md:grid-cols-2' : 'md:grid-cols-3'
                      )}>
                          {section.data.columns.map((col: any, idx: number) => (
                              <div key={idx} className="w-full">
                                  {col.type === 'text' ? (
                                      <div className="prose prose-lg dark:prose-invert max-w-none news-content">
                                          <div dangerouslySetInnerHTML={{ __html: col.content }} />
                                      </div>
                                  ) : (
                                      <div className="relative aspect-square md:aspect-auto md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
                                          <Image 
                                              src={col.imageData || 'https://picsum.photos/seed/col/800/600'} 
                                              alt="Column image" 
                                              fill 
                                              className="object-cover" 
                                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                          />
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>
              </section>
          )}

          {section.type === 'gallery' && (
              <section className="py-16 md:py-24 bg-secondary/10">
                  <div className="container">
                      {section.data.title && (
                          <h2 className="text-3xl font-bold font-headline mb-12 text-center">{section.data.title}</h2>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {section.data.items.map((item: any, idx: number) => (
                              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                                  <Image 
                                    src={item.imageData} 
                                    alt="Gallery item" 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                  />
                              </div>
                          ))}
                      </div>
                  </div>
              </section>
          )}

          {section.type === 'button' && (
            <section className="py-12">
              <div className={cn("container", 
                section.data.align === 'center' ? 'text-center' : 
                section.data.align === 'right' ? 'text-right' : 'text-left'
              )}>
                <Button size="lg" variant={section.data.variant || 'default'} asChild>
                  <Link href={section.data.link}>{section.data.text}</Link>
                </Button>
              </div>
            </section>
          )}

          {section.type === 'faq' && (
            <section className="py-16 bg-secondary/20">
              <div className="container max-w-3xl mx-auto">
                {section.data.title && (
                  <h2 className="text-3xl font-bold font-headline mb-10 text-center">{section.data.title}</h2>
                )}
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {section.data.items && section.data.items.map((item: any, idx: number) => (
                    <AccordionItem key={item.id || idx} value={`item-${idx}`} className="bg-background px-6 rounded-lg border shadow-sm">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2 whitespace-pre-wrap">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          )}
        </div>
      ))}
    </main>
  );
}
