import { Metadata } from 'next';
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Cpu, Map, Leaf, Factory } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: 'Intelligent IoT Solutions',
  description: 'Transform your business with our end-to-end IoT solutions. From smart monitoring and asset tracking to industrial automation, we connect your world for enhanced efficiency.',
  keywords: ['IoT solutions', 'Internet of Things', 'smart monitoring', 'asset tracking', 'industrial automation', 'smart agriculture', 'IIoT', 'connected devices'],
  openGraph: {
    title: 'Intelligent IoT Solutions',
    description: 'Transform your business with our end-to-end IoT solutions for enhanced efficiency.',
    url: '/ict-solutions/iot',
  },
  twitter: {
    title: 'Intelligent IoT Solutions',
    description: 'Transform your business with our end-to-end IoT solutions for enhanced efficiency.',
  },
};

const services = [
    {
        icon: <Cpu className="w-8 h-8 text-primary" />,
        title: "Smart Monitoring & Control",
        description: "Remotely monitor and control your assets in real-time, from industrial machinery to environmental conditions, for proactive maintenance and optimized performance.",
        imageId: "iot-feature-1",
        imagePath: "/assets/img/ict/smartmonitoring.jpg"
    },
    {
        icon: <Map className="w-8 h-8 text-primary" />,
        title: "Asset Tracking & Logistics",
        description: "Gain complete visibility over your supply chain with our advanced tracking solutions, optimizing routes, reducing loss, and ensuring timely delivery.",
        imageId: "iot-feature-3",
        imagePath: "/assets/img/ict/logistics.jpg"
    },
    {
        icon: <Factory className="w-8 h-8 text-primary" />,
        title: "Industrial Automation (IIoT)",
        description: "Transform your manufacturing processes with connected sensors and automated workflows, leading to increased production efficiency and reduced operational costs.",
        imageId: "iot-feature-4"
    },
    {
        icon: <Leaf className="w-8 h-8 text-primary" />,
        title: "Smart Agriculture",
        description: "Leverage IoT to monitor soil conditions, automate irrigation, and track crop health, maximizing yields and promoting sustainable farming practices.",
        imageId: "iot-feature-2",
        imagePath: "/assets/img/ict/agriculture.jpg"
    }
];

const processSteps = [
  {
    title: "1. Discovery & Strategy",
    description: "We start by understanding your unique business challenges and goals to co-create a tailored IoT strategy and roadmap."
  },
  {
    title: "2. Hardware & Sensor Integration",
    description: "We select and configure the right sensors and hardware, ensuring reliable data capture from your physical assets."
  },
  {
    title: "3. Platform Development",
    description: "Our team builds the central IoT platform to collect, process, and visualize data, complete with a user-friendly dashboard."
  },
  {
    title: "4. Deployment & Support",
    description: "We manage the full deployment and provide ongoing support and maintenance to ensure your IoT ecosystem runs flawlessly."
  }
];

export default function IotPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'iot-hero');

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
                        <BreadcrumbPage>IoT Solutions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-start text-left">
            <Image
                src="/assets/img/ict/iot.jpg"
                alt="A futuristic cityscape with glowing data streams connecting buildings, representing a smart city powered by IoT."
                fill
                className="object-cover"
                data-ai-hint="smart city"
            />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Connecting Your World: Intelligent IoT Solutions</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl">
              We transform your physical business assets into smart, connected devices that deliver actionable data and drive operational excellence.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <p className="font-semibold text-primary">THE FUTURE IS CONNECTED</p>
                <h2 className="text-3xl font-bold font-headline mt-2">Unlock the Power of Real-Time Data</h2>
                <p className="text-muted-foreground text-lg mt-4">
                  The Internet of Things (IoT) is revolutionizing industries by bridging the gap between the physical and digital worlds. By embedding sensors and connectivity into your equipment, environments, and products, you can gather invaluable real-time data. This data empowers you to automate processes, predict failures, reduce costs, and create innovative new services that were previously impossible.
                </p>
            </div>
          </div>
        </section>

        {/* Our IoT Applications */}
        <section className="py-20 lg:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">IoT Applications Across Industries</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We develop tailored IoT solutions that solve real-world problems and create tangible value.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => {
                 const image = PlaceHolderImages.find(p => p.id === service.imageId);
                 return(
                <Card key={service.title} className="group overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
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
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
                                {service.icon}
                            </div>
                            <CardTitle className="text-xl leading-tight">{service.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                </Card>
                 );
              })}
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-4">
                  <p className="font-semibold text-primary">END-TO-END IMPLEMENTATION</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">From Concept to Connectivity</h2>
                  <p className="text-muted-foreground text-lg">We provide a comprehensive, four-step process to ensure your IoT project is a success from start to finish.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {processSteps.map((item, index) => (
                  <div key={index} className="p-6 rounded-lg bg-secondary/30">
                      <h3 className="font-bold font-headline text-2xl text-primary mb-2">{item.title}</h3>
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
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Build a Smarter Business?</h2>
            <p className="max-w-2xl mx-auto mb-8">Let's explore how IoT can revolutionize your operations. Contact our experts for a free consultation and a proof of concept.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                Discuss Your IoT Project <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
