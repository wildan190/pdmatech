
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Store, Factory, Cpu, Zap, BarChart, ExternalLink } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/insight/use-case';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.useCasePage;
  
  const titles: Record<Locale, string> = {
    en: "Use Cases: Real-World Impact of Our ICT & IoT Solutions",
    id: "Studi Kasus: Dampak Nyata dari Solusi ICT & IoT Kami",
    zh: "用例：我们的ICT和物联网解决方案的实际影响"
  };

  const descriptions: Record<Locale, string> = {
    en: 'Explore real-world examples of how Micro Padma Nusantara helps businesses like yours achieve digital transformation, from modernizing SMEs to implementing IoT in manufacturing.',
    id: 'Jelajahi contoh nyata bagaimana Micro Padma Nusantara membantu bisnis seperti Anda mencapai transformasi digital, dari modernisasi UMKM hingga implementasi IoT di manufaktur.',
    zh: '探索Micro Padma Nusantara如何帮助像您这样的企业实现数字化转型的真实案例，从中小微企业现代化到在制造业中实施工业物联网。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['use cases', 'case studies', 'digital transformation success stories', 'IoT in manufacturing Indonesia', 'SME digitalization', 'Xapiens ERP', 'business technology impact'],
    id: ['studi kasus', 'kisah sukses transformasi digital', 'IoT di manufaktur Indonesia', 'digitalisasi UMKM', 'Xapiens ERP', 'dampak teknologi bisnis'],
    zh: ['用例', '案例研究', '数字化转型成功案例', '印尼制造业物联网', '中小微企业数字化', 'Xapiens ERP', '商业技术影响']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;
  const heroImage = PlaceHolderImages.find(p => p.id === 'use-case-hero');

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: keywords[lang],
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
      title: titles[lang],
      description: descriptions[lang],
      url: canonicalUrl,
      images: heroImage ? [heroImage.imageUrl] : [],
    },
    twitter: {
      title: titles[lang],
      description: descriptions[lang],
      images: heroImage ? [heroImage.imageUrl] : [],
    },
  };
}


export default async function UseCasePage({ params }: { params: { lang: Locale }}) {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.useCasePage;
  const heroImage = PlaceHolderImages.find(p => p.id === 'use-case-hero');
  const umkmImage = PlaceHolderImages.find(p => p.id === 'use-case-umkm');
  const iotImage = PlaceHolderImages.find(p => p.id === 'use-case-iot');

  return (
    <main className="flex-grow">
      
      {/* Breadcrumb */}
      <section className="bg-secondary/50 py-4 border-b">
        <div className="container">
           <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link href={`/${lang}`}>{dictionary.common.home}</Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage>{dictionary.navigation.insight}</BreadcrumbPage>
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
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {heroImage && (
            <ParallaxImage
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {pageDict.hero.description}
          </p>
        </div>
      </section>

      {/* Use Case 1: UMKM */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                {umkmImage && (
                    <Image
                    src={umkmImage.imageUrl}
                    alt={umkmImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={umkmImage.imageHint}
                    />
                )}
            </div>
            <Card className="border-0 bg-secondary/30 shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <Store className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">{pageDict.umkm.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg text-destructive">{pageDict.umkm.challenge.title}</h4>
                        <p className="text-muted-foreground mt-1">{pageDict.umkm.challenge.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-primary">{pageDict.umkm.solution.title}</h4>
                        <p className="text-muted-foreground mt-1">{pageDict.umkm.solution.description}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-green-600">{pageDict.umkm.impact.title}</h4>
                        <ul className="mt-2 space-y-2">
                           <li className="flex items-start"><Zap className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-muted-foreground">{pageDict.umkm.impact.item1}</span></li>
                           <li className="flex items-start"><BarChart className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-muted-foreground">{pageDict.umkm.impact.item2}</span></li>
                        </ul>
                    </div>
                    <Button asChild>
                        <Link href={`/${lang}/ict-solutions/umkm`}>
                            {pageDict.umkm.cta} <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Use Case 2: IoT */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="border-0 bg-background shadow-lg md:order-last">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <Factory className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">{pageDict.iot.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg text-destructive">{pageDict.iot.challenge.title}</h4>
                        <p className="text-muted-foreground mt-1">{pageDict.iot.challenge.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-primary">{pageDict.iot.solution.title}</h4>
                        <p className="text-muted-foreground mt-1">{pageDict.iot.solution.description}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-green-600">{pageDict.iot.impact.title}</h4>
                        <ul className="mt-2 space-y-2">
                           <li className="flex items-start"><Cpu className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-muted-foreground">{pageDict.iot.impact.item1}</span></li>
                           <li className="flex items-start"><Zap className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" /> <span className="text-muted-foreground">{pageDict.iot.impact.item2}</span></li>
                        </ul>
                    </div>
                    <Button asChild>
                        <Link href={`/${lang}/ict-solutions/iot`}>
                            {pageDict.iot.cta} <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                {iotImage && (
                    <Image
                    src={iotImage.imageUrl}
                    alt={iotImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={iotImage.imageHint}
                    />
                )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{pageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/${lang}/contact`}>{pageDict.cta.button}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
