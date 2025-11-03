
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Experience from "@/components/landing/experience";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our People',
  description: 'Meet the talented team of leaders and innovators at Micro Padma Nusantara. Our experts are dedicated to driving your business success through technology.',
  keywords: ['our team', 'leadership', 'tech experts', 'ICT professionals', 'IoT experts', 'Micro Padma Nusantara team'],
  openGraph: {
    title: 'Our People - Micro Padma Nusantara',
    description: 'Meet the talented team of leaders and innovators at Micro Padma Nusantara.',
    url: 'https://mpnsolutions.my.id/about/people',
  },
  twitter: {
    title: 'Our People - Micro Padma Nusantara',
    description: 'Meet the talented team of leaders and innovators at Micro Padma Nusantara.',
  },
};

const leaders = [
    {
        name: "Wildan J. Belfiore",
        title: "President Director",
        image: "/assets/img/about/me.png",
        bio: "Wildan is a visionary technologist with a rich background in full-stack engineering. Since 2022, he has honed his skills across diverse industries, contributing to complex projects at renowned organizations such as Xapiens, Biro Klasifikasi Indonesia, Lumoshive, and the British Technologies Global Group. His passion for innovation and leadership led him to co-found Micro Padma Nusantara in 2023, where he serves as President Director. Concurrently, he holds the position of Chief Technology Officer at Huntr.id, driving the technological vision for both companies and pioneering solutions that shape the future.",
        width: 800,
        height: 800
    },
    {
        name: "Raihan Firdaus",
        title: "Business Solutions Manager",
        image: "/assets/img/about/rei.jpg",
        bio: "Raihan brings a unique blend of public sector experience and strategic business acumen to the team. His journey began in 2022 with a foundational role at BPS (Badan Pusat Statistik), which provided him with deep analytical insights. He then transitioned to a staff position at KCIC (Kereta Cepat Indonesia China), where he continues to contribute to one of the nation's key infrastructure projects. Since 2023, Raihan has simultaneously taken on the role of Business Solutions Manager at Micro Padma Nusantara, where he excels at bridging client needs with powerful, effective technology solutions.",
        width: 800,
        height: 1000
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
                        const isOdd = index % 2 !== 0;
                        return (
                             <div key={leader.name} className="grid md:grid-cols-2 gap-12 items-center">
                                <div className={`relative w-full max-w-md mx-auto ${isOdd ? 'md:order-last' : ''}`}>
                                    <Image
                                        src={leader.image}
                                        alt={`Portrait of ${leader.name}`}
                                        width={leader.width}
                                        height={leader.height}
                                        className="rounded-lg shadow-xl object-contain w-full h-auto"
                                    />
                                </div>
                                <div className={`${isOdd ? 'md:text-right' : 'md:text-left'}`}>
                                    <h3 className="text-3xl font-bold font-headline">{leader.name}</h3>
                                    <p className="text-primary font-semibold text-lg mt-1">{leader.title}</p>
                                    <p className="mt-6 text-muted-foreground leading-relaxed">
                                        {leader.bio}
                                    </p>
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
