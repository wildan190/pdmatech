import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Experience from '@/components/landing/experience';
import ServicesAndProduct from '@/components/landing/services-and-product';
import OurTeam from '@/components/landing/our-team';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
  description: 'Your strategic partner in digital transformation. We provide cutting-edge ICT and IoT solutions, enterprise software, and web development to drive business growth and efficiency in Indonesia.',
  keywords: ['ICT Indonesia', 'IoT solutions', 'digital transformation', 'enterprise software', 'UMKM solutions', 'web development', 'IT consultant'],
  openGraph: {
    title: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
    description: 'Your strategic partner in digital transformation. We provide cutting-edge ICT and IoT solutions, enterprise software, and web development to drive business growth and efficiency in Indonesia.',
    url: '/',
  },
  twitter: {
    title: 'Micro Padma Nusantara | Innovative ICT & IoT Solutions',
    description: 'Your strategic partner in digital transformation. We provide cutting-edge ICT and IoT solutions, enterprise software, and web development to drive business growth and efficiency in Indonesia.',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Experience />
        <ServicesAndProduct />
        <OurTeam />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
