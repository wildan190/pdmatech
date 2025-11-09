
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Search, ShoppingBag, Redo, Scaling, Users, Palette, MonitorSmartphone } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/ict-solutions/web';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);

  const titles: Record<Locale, string> = {
    en: "Web Development Services | Custom Websites, E-Commerce, SEO",
    id: "Jasa Pembuatan Website | Website Kustom, E-Commerce, SEO",
    zh: "网站开发服务 | 定制网站、电子商务、搜索引擎优化"
  };

  const descriptions: Record<Locale, string> = {
    en: 'Crafting high-performance digital experiences. We build custom websites, e-commerce stores, and web applications using modern technologies like Next.js and React.',
    id: 'Menciptakan pengalaman digital berperforma tinggi. Kami membangun situs web kustom, toko e-commerce, dan aplikasi web menggunakan teknologi modern seperti Next.js dan React.',
    zh: '打造高性能的数字体验。我们使用Next.js和React等现代技术构建定制网站、电子商务商店和Web应用程序。'
  };

  const keywords: Record<Locale, string[]> = {
    en: ['web development Indonesia', 'custom website design', 'e-commerce solutions', 'Next.js developer', 'React development agency', 'SEO optimization services', 'web application development'],
    id: ['jasa pembuatan website Indonesia', 'desain website kustom', 'solusi e-commerce', 'developer Next.js', 'agensi pengembangan React', 'jasa optimasi SEO', 'pengembangan aplikasi web'],
    zh: ['印尼网站开发', '定制网站设计', '电子商务解决方案', 'Next.js开发者', 'React开发机构', 'SEO优化服务', 'Web应用开发']
  };

  const canonicalUrl = `${baseUrl}/${lang}${path}`;

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
    },
    twitter: {
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}


export default async function WebPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.webPage;

  const services = [
    {
        icon: <Palette className="w-8 h-8 text-primary" />,
        title: "Custom Website Design & Development",
        description: pageDict.services.custom,
    },
    {
        icon: <ShoppingBag className="w-8 h-8 text-primary" />,
        title: "E-Commerce & Online Stores",
        description: pageDict.services.ecommerce,
    },
    {
        icon: <MonitorSmartphone className="w-8 h-8 text-primary" />,
        title: "Responsive Web Design",
        description: pageDict.services.responsive,
    },
    {
        icon: <Search className="w-8 h-8 text-primary" />,
        title: "SEO & Performance Optimization",
        description: pageDict.services.seo,
    },
    {
        icon: <Redo className="w-8 h-8 text-primary" />,
        title: "Website Redesign",
        description: pageDict.services.redesign,
    },
     {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Web Application Development",
        description: pageDict.services.webapp,
    }
];

const whyChooseUsData = [
  {
    icon: <Scaling className="w-8 h-8 text-primary" />,
    title: pageDict.whyChooseUs.item1.title,
    description: pageDict.whyChooseUs.item1.description
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: pageDict.whyChooseUs.item2.title,
    description: pageDict.whyChooseUs.item2.description
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: pageDict.whyChooseUs.item3.title,
    description: pageDict.whyChooseUs.item3.description
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
                      <BreadcrumbLink asChild><Link href={`/${lang}`}>{dictionary.common.home}</Link></BreadcrumbLink>
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
      <section className="relative h-[60vh] flex items-center justify-start text-left overflow-hidden">
          <ParallaxImage
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGFic3RyYWN0fGVufDB8fHx8MTc2NDg4NDYyOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Abstract image representing modern web design with clean lines and vibrant colors."
              data-ai-hint="web development abstract"
          />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            {pageDict.hero.description}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <p className="font-semibold text-primary">{pageDict.approach.pretitle}</p>
                  <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.approach.title}</h2>
                  <p className="text-muted-foreground text-lg mt-4">
                      {pageDict.approach.description}
                  </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwb24lMjBsYXB0b3B8ZW58MHx8fHwxNzY0ODg1MDMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="A sleek laptop displaying a modern website interface."
                      fill
                      className="object-cover"
                      data-ai-hint="website laptop"
                  />
              </div>
          </div>
        </div>
      </section>

      {/* Our Web Services */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.services.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDict.services.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-background flex flex-col">
                  <CardContent className="flex flex-col items-start gap-4 p-0">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-xl">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
              <p className="font-semibold text-primary">{pageDict.whyChooseUs.pretitle}</p>
              <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.whyChooseUs.title}</h2>
              <p className="text-muted-foreground text-lg mt-4">
                {pageDict.whyChooseUs.description}
              </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUsData.map((item, index) => (
                <div key={index} className="p-8 rounded-lg bg-secondary/30 text-center">
                    <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                       {item.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
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
