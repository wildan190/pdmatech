import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Experience from '@/components/landing/experience';
import ServicesAndProduct from '@/components/landing/services-and-product';
import OurTeam from '@/components/landing/our-team';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

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
