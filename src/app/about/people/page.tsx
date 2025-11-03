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
import { ArrowRight } from "lucide-react";


const teamMembers = [
    {
        name: "Wildan J. Belfiore",
        title: "President Director",
        imageId: "team-wildan"
    },
    {
        name: "Raihan Firdaus",
        title: "Business Solutions Manager",
        imageId: "team-raihan"
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
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Leaders</h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Meet the visionary minds guiding our mission to deliver transformative technology solutions.
                     </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {teamMembers.map((member) => {
                        const image = PlaceHolderImages.find(p => p.id === member.imageId);
                        return (
                             <Card key={member.name} className="text-center overflow-hidden shadow-lg group">
                                {image && (
                                    <div className="relative h-80 w-full">
                                        <Image
                                            src={image.imageUrl}
                                            alt={`Portrait of ${member.name}`}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                            data-ai-hint={image.imageHint}
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-xl">{member.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-primary font-semibold">{member.title}</p>
                                </CardContent>
                             </Card>
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
