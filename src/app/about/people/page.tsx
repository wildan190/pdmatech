'use client';

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Experience from "@/components/landing/experience";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Briefcase } from "lucide-react";

const leaders = [
    {
        name: "Wildan J. Belfiore",
        title: "President Director",
        imageId: "team-wildan",
        experiences: [
            { role: "President Director", company: "PT Micro Padma Nusantara", period: "2023 - Present" },
            { role: "Chief Technology Officer", company: "Huntr.id", period: "2023 - Present" },
            { role: "Fullstack Engineer", company: "British Technologies Global Group", period: "2022 - 2023" },
            { role: "Fullstack Engineer", company: "Lumoshive", period: "2022 - 2023" },
            { role: "Fullstack Engineer", company: "Biro Klasifikasi Indonesia", period: "2022 - 2023" },
            { role: "Fullstack Engineer", company: "Xapiens", period: "2022 - 2023" },
        ]
    },
    {
        name: "Raihan Firdaus",
        title: "Business Solutions Manager",
        imageId: "team-raihan",
        experiences: [
            { role: "Business Solution Manager", company: "PT Micro Padma Nusantara", period: "2023 - Present" },
            { role: "Staff", company: "KCIC (Kereta Cepat Indonesia China)", period: "2022 - Present" },
            { role: "Staff", company: "BPS (Badan Pusat Statistik)", period: "2022" },
        ]
    }
];

export default function PeoplePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <section className="bg-secondary/50 py-4 border-b">
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild><Link href="/about/company">About Us</Link></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Our People</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </section>

        {/* Hero */}
        <section className="py-20 lg:py-24 text-center">
            <div className="container">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Meet Our Team</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    We are a collective of thinkers, creators, and innovators, united by a passion for technology and a drive to deliver excellence.
                </p>
            </div>
        </section>

        {/* Experience Section */}
        <Experience />

        {/* Team Leaders */}
        <section className="py-20 lg:py-24 bg-secondary/50">
            <div className="container">
                <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Leaders</h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Meet the visionary minds guiding our mission to deliver transformative technology solutions.
                     </p>
                </div>
                <div className="space-y-24">
                    {leaders.map((leader, index) => {
                        const image = PlaceHolderImages.find(p => p.id === leader.imageId);
                        const isOdd = index % 2 !== 0;
                        return (
                             <div key={leader.name} className="grid md:grid-cols-2 gap-12 items-center">
                                <div className={`relative h-96 rounded-lg overflow-hidden shadow-xl ${isOdd ? 'md:order-last' : ''}`}>
                                    {image && (
                                        <Image
                                            src={image.imageUrl}
                                            alt={`Portrait of ${leader.name}`}
                                            fill
                                            className="object-cover object-top"
                                            data-ai-hint={image.imageHint}
                                        />
                                    )}
                                </div>
                                <div className={`${isOdd ? 'md:text-right' : 'md:text-left'}`}>
                                    <h3 className="text-3xl font-bold font-headline">{leader.name}</h3>
                                    <p className="text-primary font-semibold text-lg mt-1">{leader.title}</p>
                                    <div className="mt-6 space-y-4">
                                        {leader.experiences.map((exp) => (
                                            <div key={`${exp.company}-${exp.role}`} className={`flex items-start gap-4 ${isOdd ? 'md:justify-end' : 'md:justify-start'}`}>
                                                <div className="bg-primary/10 p-2 rounded-full mt-1">
                                                     <Briefcase className="w-5 h-5 text-primary"/>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{exp.role}</p>
                                                    <p className="text-muted-foreground text-sm">{exp.company} &middot; {exp.period}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             </div>
                        );
                    })}
                </div>
            </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Join Our Journey of Innovation</h2>
            <p className="max-w-2xl mx-auto mb-8">We are always looking for passionate talent. Explore how you can contribute to our team.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                Contact Us <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
