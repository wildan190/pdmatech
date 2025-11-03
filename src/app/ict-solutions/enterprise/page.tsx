'use client';

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building, CheckCircle, Code, Layers, Ticket, Hotel, Users } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
    {
        icon: <Layers className="w-8 h-8 text-primary" />,
        title: "ERP (Enterprise Resource Planning)",
        description: "Integrate all your core business processes into a single, unified system for enhanced efficiency and real-time data visibility.",
        imageId: "service-erp",
        imagePath: null
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "CRM (Customer Relationship Management)",
        description: "Build and manage stronger customer relationships with a centralized platform for sales, marketing, and service.",
        imageId: "service-crm",
        imagePath: null
    },
    {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Custom Software House",
        description: "Leverage our expert developers to build bespoke software solutions perfectly tailored to your unique operational needs.",
        imageId: "service-software-house",
        imagePath: null
    },
    {
        icon: <Building className="w-8 h-8 text-primary" />,
        title: "POS (Point of Sale)",
        description: "Modernize your retail or F&B operations with our intuitive and powerful Point of Sale systems for seamless transactions.",
        imageId: "service-pos",
        imagePath: "/assets/img/ict/pos.jpg"
    },
    {
        icon: <Hotel className="w-8 h-8 text-primary" />,
        title: "Hotel Management System",
        description: "Streamline your hospitality operations, from reservations to guest services, with our comprehensive hotel management software.",
        imageId: "service-hotel",
        imagePath: null
    },
    {
        icon: <Ticket className="w-8 h-8 text-primary" />,
        title: "Ticketing System",
        description: "Manage events, attractions, or transport services efficiently with a robust and user-friendly ticketing platform.",
        imageId: "service-ticketing",
        imagePath: null
    }
];

const whyChooseUsData = [
  {
    title: "Scalable Architecture",
    description: "Our solutions are built to grow with your business, handling increased complexity and user load without compromising performance."
  },
  {
    title: "Seamless Integration",
    description: "We ensure our software integrates smoothly with your existing systems, creating a unified and efficient IT ecosystem."
  },
  {
    title: "Enterprise-Grade Security",
    description: "Protecting your data is our top priority. We implement robust security protocols to safeguard your critical business information."
  },
  {
    title: "Dedicated Support",
    description: "Receive ongoing, expert support from our dedicated team to ensure your systems run smoothly and effectively."
  }
];

export default function EnterprisePage() {

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
                        <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Enterprise Solutions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-start text-left">
            <Image
                src="/assets/img/ict/enterprise.jpg"
                alt="A bustling, modern data center with rows of servers, symbolizing robust enterprise infrastructure."
                fill
                className="object-cover"
                data-ai-hint="data center"
            />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Powering Your Enterprise with Robust ICT Solutions</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl">
              We deliver scalable, secure, and integrated software solutions designed to optimize your operations and drive sustainable growth.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <p className="font-semibold text-primary">OVERVIEW</p>
                <h2 className="text-3xl font-bold font-headline mt-2">Built for Complexity, Designed for Growth</h2>
                <p className="text-muted-foreground text-lg mt-4">
                  Micro Padma Nusantara understands the unique challenges faced by large organizations. Our enterprise solutions are engineered to handle complex workflows, manage vast amounts of data, and integrate seamlessly into your existing infrastructure. We focus on building powerful, custom systems that streamline operations, reduce costs, and provide a competitive edge in your industry.
                </p>
            </div>
          </div>
        </section>

        {/* Services Development */}
        <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Custom Development Services</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                From core business management to specialized operational tools, we build the software that runs your business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const image = PlaceHolderImages.find(p => p.id === service.imageId);
                return (
                    <Card key={service.title} className="group overflow-hidden flex flex-col">
                        <div className="relative h-56 w-full overflow-hidden">
                           {service.imagePath ? (
                                <Image
                                    src={service.imagePath}
                                    alt={service.description}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : image && (
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={image.imageHint}
                                />
                            )}
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-4">
                  <p className="font-semibold text-primary">WHY CHOOSE US</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Your Strategic Technology Partner</h2>
                  <p className="text-muted-foreground text-lg">We deliver enterprise solutions that are not just functional, but transformational. Our commitment to quality, security, and partnership ensures your investment yields long-term value.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUsData.map((item, index) => (
                  <div key={index} className="p-6 rounded-lg bg-secondary/30">
                      <CheckCircle className="w-8 h-8 text-primary mb-4"/>
                      <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Architect Your Future?</h2>
            <p className="max-w-2xl mx-auto mb-8">Let's build a robust digital foundation for your enterprise. Contact us for a consultation.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                Schedule a Consultation <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
