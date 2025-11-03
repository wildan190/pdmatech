import { Metadata } from 'next';
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Lightbulb, TrendingUp, SearchX, Send } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: 'Career at Micro Padma Nusantara',
  description: 'Join our team of innovators at Micro Padma Nusantara. Explore career opportunities and become part of our mission to shape the future of technology in Indonesia.',
  keywords: ['career', 'jobs', 'tech jobs', 'ICT jobs', 'IoT careers', 'Micro Padma Nusantara careers', 'job openings'],
  openGraph: {
    title: 'Career at Micro Padma Nusantara',
    description: 'Join our team of innovators and help shape the future of technology in Indonesia.',
    url: '/career',
  },
  twitter: {
    title: 'Career at Micro Padma Nusantara',
    description: 'Join our team of innovators and help shape the future of technology in Indonesia.',
  },
};


const companyValues = [
    {
        icon: <Lightbulb className="w-8 h-8 text-primary" />,
        title: "Innovation at Heart",
        description: "We are driven by a desire to push boundaries and explore new technological frontiers. Creativity and forward-thinking are our core."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Collaborative Spirit",
        description: "We believe the best solutions come from working together. Our team thrives on open communication and mutual support."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: "Growth Mindset",
        description: "We are lifelong learners, committed to personal and professional development for ourselves and our clients."
    },
    {
        icon: <Heart className="w-8 h-8 text-primary" />,
        title: "Client-Centric Passion",
        description: "Your success is our success. We are passionate about delivering value and building lasting partnerships based on trust."
    }
];

export default function CareerPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'career-hero');

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
                        <BreadcrumbPage>Career</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center text-center">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Build Your Future With Us</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Join a team of innovators, problem-solvers, and collaborators who are passionate about shaping the future of technology in Indonesia.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <p className="font-semibold text-primary">OUR CULTURE</p>
                <h2 className="text-3xl font-bold font-headline mt-2">More Than a Job, It's a Mission</h2>
                <p className="text-muted-foreground text-lg mt-4">
                  At Micro Padma Nusantara, we're not just building products; we're building a culture of excellence, growth, and impact. We believe in empowering our team to do their best work in an environment that is supportive, challenging, and rewarding.
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
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Current Openings</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We are always looking for talented individuals. While there are no open positions right now, we'd love to hear from you.
              </p>
            </div>
            <Card className="max-w-3xl mx-auto shadow-none border-dashed">
                <CardContent className="p-10 text-center">
                    <SearchX className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold text-muted-foreground">No Positions Available at the Moment</h3>
                    <p className="text-muted-foreground mt-2">Please check back later for future opportunities.</p>
                </CardContent>
            </Card>
          </div>
        </section>
        

        {/* Spontaneous Application */}
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Don't See a Role For You?</h2>
            <p className="max-w-2xl mx-auto mb-8">We are always open to connecting with exceptional talent. If you believe your skills can make a difference, send us your resume!</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="mailto:micropadmanusantara@gmail.com?subject=Spontaneous%20Application">
                Send Your Resume <Send className="ml-2"/>
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
