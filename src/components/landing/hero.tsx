'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import ParallaxImage from '../shared/parallax-image';

type HeroProps = {
    dictionary: any;
    lang: string;
}

const Hero = ({ dictionary, lang }: HeroProps) => {
  const heroSlides = [
      {
          id: "slide1",
          headline: dictionary.slide1.headline,
          subheadline: dictionary.slide1.subheadline,
          cta1: dictionary.slide1.cta1,
          cta2: dictionary.slide1.cta2,
          cta1Link: `#services`,
          cta2Link: `#contact`,
      },
      {
          id: "slide2",
          headline: dictionary.slide2.headline,
          subheadline: dictionary.slide2.subheadline,
          cta1: dictionary.slide2.cta1,
          cta2: dictionary.slide2.cta2,
          cta1Link: `#services`,
          cta2Link: `#contact`,
      },
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="hero" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      {heroImage && (
        <ParallaxImage
          src={heroImage.imageUrl}
          alt={heroImage.description}
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  {slide.headline}
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                  {slide.subheadline}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <a href={slide.cta1Link}>
                      {slide.cta1} <ArrowRight className="ml-2" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-black/20 backdrop-blur-sm border-white text-white hover:bg-white/10 hover:text-white" asChild>
                    <a href={slide.cta2Link}>{slide.cta2}</a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-white/50" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-white/50" />
      </Carousel>

    </section>
  );
};

export default Hero;
