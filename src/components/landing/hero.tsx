import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="hero" className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/30 dark:bg-background/70"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-primary-foreground dark:text-foreground">
        <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          Pioneering Future-Ready ICT & IoT Solutions
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 dark:text-foreground/80 mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          We are Micro Padma Nusantara, empowering businesses with innovative technology for a connected and intelligent world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <a href="#solutions">
              Explore Our Solutions <ArrowRight className="ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="bg-background/20 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-background/30 hover:text-primary-foreground" asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
