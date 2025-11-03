import { Metadata } from 'next';
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code, Search, ShoppingBag, Redo, Scaling, Users, Palette, MonitorSmartphone } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: 'Modern Web Solutions',
  description: 'Crafting captivating and high-performance digital experiences. We build custom websites, e-commerce stores, and web applications using modern technologies like Next.js and React.',
  keywords: ['web development', 'web design', 'e-commerce', 'custom website', 'Next.js developer', 'React developer', 'SEO optimization'],
  openGraph: {
    title: 'Modern Web Solutions',
    description: 'Crafting captivating and high-performance digital experiences for your brand.',
    url: '/ict-solutions/web',
  },
  twitter: {
    title: 'Modern Web Solutions',
    description: 'Crafting captivating and high-performance digital experiences for your brand.',
  },
};

const services = [
    {
        icon: <Palette className="w-8 h-8 text-primary" />,
        title: "Custom Website Design & Development",
        description: "We build beautiful, bespoke websites from scratch that perfectly capture your brand identity and meet your specific business objectives.",
    },
    {
        icon: <ShoppingBag className="w-8 h-8 text-primary" />,
        title: "E-Commerce & Online Stores",
        description: "Launch a powerful online store with a seamless user experience, secure payment gateways, and easy-to-manage inventory systems.",
    },
    {
        icon: <MonitorSmartphone className="w-8 h-8 text-primary" />,
        title: "Responsive Web Design",
        description: "We ensure your website looks and functions flawlessly on all devices, from desktops to smartphones, providing an optimal user experience everywhere.",
    },
    {
        icon: <Search className="w-8 h-8 text-primary" />,
        title: "SEO & Performance Optimization",
        description: "Improve your search engine rankings and deliver a lightning-fast experience for your visitors with our optimization services.",
    },
    {
        icon: <Redo className="w-8 h-8 text-primary" />,
        title: "Website Redesign",
        description: "Modernize your existing website with a fresh design, improved functionality, and a better user experience to re-engage your audience.",
    },
     {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Web Application Development",
        description: "Go beyond a simple website with custom web applications that streamline your operations and provide unique value to your users.",
    }
];

const whyChooseUsData = [
  {
    icon: <Scaling className="w-8 h-8 text-primary" />,
    title: "Modern Technology",
    description: "We build with the latest, most reliable technologies like Next.js and React to create fast, scalable, and secure websites."
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "User-Centric Approach",
    description: "Our design process is centered around your target audience, ensuring an intuitive and engaging experience that drives results."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Quality & Reliability",
    description: "We adhere to the highest standards of coding and testing to deliver a reliable, high-performance product you can depend on."
  }
];

export default function WebPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'solution-iot');

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
                        <BreadcrumbPage>Web Solutions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-start text-left">
            <Image
                src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGFic3RyYWN0fGVufDB8fHx8MTc2NDg4NDYyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Abstract image representing modern web design with clean lines and vibrant colors."
                fill
                className="object-cover"
                data-ai-hint="web development abstract"
            />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Crafting Digital Experiences that Captivate and Convert</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl">
              We build fast, beautiful, and user-friendly websites that serve as the digital forefront of your brand.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="font-semibold text-primary">OUR APPROACH</p>
                    <h2 className="text-3xl font-bold font-headline mt-2">Your Website is Your Digital Front Door</h2>
                    <p className="text-muted-foreground text-lg mt-4">
                        In today's digital-first world, your website is often the first interaction a potential customer has with your business. It's more than just an online brochure; it's a powerful tool for building credibility, generating leads, and driving growth. At Micro Padma Nusantara, we create strategic web solutions that not only look great but also perform exceptionally, ensuring that your first impression is a lasting one.
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
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Web Development Services</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a complete suite of services to build and maintain your powerful online presence.
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
                <p className="font-semibold text-primary">WHY CHOOSE US</p>
                <h2 className="text-3xl font-bold font-headline mt-2">Engineered for Excellence</h2>
                <p className="text-muted-foreground text-lg mt-4">
                  We combine creative design with technical expertise to deliver web solutions that are not only visually appealing but also robust, secure, and built for the future.
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
            <h2 className="text-3xl font-bold font-headline mb-4">Have an Idea for a Website?</h2>
            <p className="max-w-2xl mx-auto mb-8">Let's turn your vision into a stunning digital reality. Get in touch with us today for a free consultation.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                Start a Project <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
