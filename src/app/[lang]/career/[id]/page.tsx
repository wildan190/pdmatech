import { Metadata } from 'next';
import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, DollarSign, ArrowLeft, Award, Settings } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ApplicationForm from './application-form';

type JobDetailPageProps = {
  params: Promise<{ lang: Locale; id: string }>;
};

async function getJob(id: string) {
  try {
    if (!id || id.length !== 24) return null;
    const client = await clientPromise;
    const db = client.db('mpn_cms');
    const job = await db.collection('jobs').findOne({ _id: new ObjectId(id) });
    if (!job) return null;
    return { ...job, _id: job._id.toString() };
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return { title: 'Job Not Found' };

  return {
    title: `${job.title} | Career at Micro Padma Nusantara`,
    description: `We are looking for a ${job.title}. Join our team and help us build the future of ICT and IoT.`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { lang, id } = await params;
  const dictionary = await getDictionary(lang);
  const job = await getJob(id);

  if (!job) notFound();

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
                <BreadcrumbLink asChild><Link href={`/${lang}/career`}>{dictionary.careerPage.breadcrumb}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{job.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="container mt-12">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" asChild className="mb-8 p-0 hover:bg-transparent text-primary">
            <Link href={`/${lang}/career`} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Career Openings
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <header>
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">{job.title}</h1>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    <Briefcase className="w-4 h-4 text-primary" /> {job.position}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 text-primary" /> Remote / Hybrid
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    <DollarSign className="w-4 h-4 text-primary" /> {job.salary}
                  </div>
                </div>
              </header>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold font-headline mb-4">Job Description & Requirements</h3>
                  <div 
                    className="prose prose-primary dark:prose-invert max-w-none news-content"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                  
                  <div className="mt-8 pt-8 border-t space-y-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-bold">Required Experience</p>
                        <p className="text-muted-foreground">{job.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Settings className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-bold">Technical Skills</p>
                        <p className="text-muted-foreground">{job.skills}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Apply Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-2xl border-primary/20">
                  <CardHeader className="bg-primary text-primary-foreground p-6">
                    <CardTitle className="text-xl font-bold">Apply for this position</CardTitle>
                    <p className="text-sm opacity-90">Please fill out the form below carefully.</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ApplicationForm jobId={job._id} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
