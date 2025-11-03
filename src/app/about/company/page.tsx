'use client';

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Zap, Goal } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";


const whyChooseUsData = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Proven Experience",
    description: "With over a decade of experience, we've powered major operations across Indonesia, delivering robust and reliable ICT solutions."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Client-Centric Approach",
    description: "Your success is our priority. Our dedicated call center and service desk are always ready to provide the support you need, whenever you need it."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Agile & Efficient",
    description: "In today's market, speed is currency. We operate with agility to deliver solutions quickly, ensuring you achieve maximum efficiency."
  },
  {
    icon: <Goal className="w-8 h-8 text-primary" />,
    title: "Strategic Problem Solving",
    description: "We go beyond quick fixes. We collaborate with you to identify and solve the right problems, leveraging technology for impactful and lasting benefits."
  }
];

export default function CompanyPage() {
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
                        <BreadcrumbLink>About Us</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Our Company</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="relative h-[50vh] flex items-center justify-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c710?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NjIyMzEwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Our Team"
            fill
            className="object-cover"
            data-ai-hint="team collaboration"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center container">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">About Micro Padma Nusantara</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Driving Technological Innovation for Business Excellence</p>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Journey</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Founded on the principle of innovation and partnership, Micro Padma Nusantara began its journey to bridge the technology gap for businesses in Indonesia. Over the years, we have grown into a trusted ICT and IoT solutions provider, known for our commitment to quality, reliability, and client success. Our story is one of continuous evolution, driven by a passion for technology and a dedication to empowering our clients.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFifGVufDB8fHx8MTc2MjI0MzQwMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Technology Lab"
                  fill
                  className="object-cover"
                  data-ai-hint="technology lab"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold font-headline mb-3">Our Vision</h3>
                <p className="text-muted-foreground">To be the leading partner for businesses in Indonesia, pioneering innovative and sustainable technology solutions that drive digital transformation and create lasting value.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline mb-3">Our Mission</h3>
                <p className="text-muted-foreground">To empower businesses with cutting-edge ICT and IoT solutions, delivered with exceptional service and a focus on strategic partnership, enabling them to thrive in the digital economy.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">Why Partner With Us?</h2>
              <p className="text-muted-foreground mt-4 text-lg">We deliver more than just technology; we deliver a partnership built on trust, expertise, and a shared vision for success.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUsData.map((item, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-primary/20 transition-shadow">
                  <CardContent className="flex flex-col items-center gap-4">
                    {item.icon}
                    <h3 className="font-bold text-xl">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Start Your Digital Transformation?</h2>
            <p className="max-w-2xl mx-auto mb-8">Let's discuss how our solutions can be tailored to meet your unique business challenges and goals.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

    