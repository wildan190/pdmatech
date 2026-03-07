import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Lightbulb, TrendingUp, SearchX, Send, Users, Briefcase, MapPin, ArrowRight, Award, Settings } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import ParallaxImage from '@/components/shared/parallax-image';
import { getJobs } from '@/app/cms/career/actions';

const baseUrl = 'https://mpnsolutions.my.id';
const path = '/career';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const title = dictionary.careerPage.breadcrumb;
  
  return {
    title: `${title} at Micro Padma Nusantara`,
    description: 'Join our team of innovators. Explore job opportunities in ICT and IoT solutions.',
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
    },
  };
}

export default async function CareerPage({ params }: { params: { lang: Locale }}) {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const pageDict = dictionary.careerPage;
  const jobs = await getJobs();
  const activeJobs = jobs.filter(j => j.lang === lang);

  const companyValues = [
    {
        icon: <Lightbulb className="w-8 h-8 text-primary" />,
        title: pageDict.values.innovation.title,
        description: pageDict.values.innovation.description
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: pageDict.values.collaboration.title,
        description: pageDict.values.collaboration.description
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: pageDict.values.growth.title,
        description: pageDict.values.growth.description
    },
    {
        icon: <Heart className="w-8 h-8 text-primary" />,
        title: pageDict.values.passion.title,
        description: pageDict.values.passion.description
    }
];

  const heroImage = PlaceHolderImages.find(p => p.id === 'career-hero');

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
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
          {heroImage && (
              <ParallaxImage
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
              />
          )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{pageDict.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {pageDict.hero.description}
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
              <p className="font-semibold text-primary">{pageDict.culture.pretitle}</p>
              <h2 className="text-3xl font-bold font-headline mt-2">{pageDict.culture.title}</h2>
              <p className="text-muted-foreground text-lg mt-4">
                {pageDict.culture.description}
              </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {companyValues.map((value) => (
              <Card key={value.title} className="text-center p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow bg-secondary/30">
                  <CardContent className="flex flex-col items-center gap-4 p-0">
                    <div className="bg-primary/10 p-4 rounded-full">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-xl">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-20 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{pageDict.openings.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We are looking for talented individuals to join our mission.
            </p>
          </div>
          
          {activeJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {activeJobs.map((job) => (
                <Card key={job._id} className="group hover:shadow-xl transition-all border-0 shadow-sm overflow-hidden flex flex-col">
                  <CardHeader className="bg-background border-b p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-primary tracking-widest bg-primary/10 px-2 py-1 rounded">Full Time</span>
                    </div>
                    <CardTitle className="mt-4 text-2xl group-hover:text-primary transition-colors">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> Indonesia (Remote/Hybrid)
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow bg-background/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="w-4 h-4 text-primary" /> {job.experience} Experience
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Settings className="w-4 h-4 text-primary" /> {job.skills}
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto bg-background/50">
                    <Button className="w-full gap-2 group/btn" asChild>
                      <Link href={`/${lang}/career/${job._id}`}>
                        View Details & Apply <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-3xl mx-auto shadow-none border-dashed bg-background/50">
                <CardContent className="p-16 text-center">
                    <SearchX className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold text-muted-foreground">{pageDict.openings.notAvailable}</h3>
                    <p className="text-muted-foreground mt-2">{pageDict.openings.checkBack}</p>
                </CardContent>
            </Card>
          )}
        </div>
      </section>
      

      {/* Spontaneous Application */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{pageDict.cta.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">{pageDict.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="mailto:hrd@mpnsolutions.my.id?subject=Career Inquiry">
              {pageDict.cta.button} <Send className="ml-2"/>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
