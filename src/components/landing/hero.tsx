'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

const heroSlides = [
    {
        id: "slide1",
        headline: "Pioneering Future-Ready ICT & IoT Solutions",
        subheadline: "We are Micro Padma Nusantara, empowering businesses with innovative technology for a connected and intelligent world.",
        cta1: "Explore Our Solutions",
        cta2: "Get a Quote",
        cta1Link: "#services",
        cta2Link: "#contact",
    },
    {
        id: "slide2",
        headline: "Simplify Process. Maximize Productivity",
        subheadline: "Micro Padma Nusantara delivers tailored IT solutions, software, and strategic support—to help your business scale confidently.",
        cta1: "Discover Our Services",
        cta2: "Contact Us",
        cta1Link: "#services",
        cta2Link: "#contact",
    },
];

const Hero = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="hero" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
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

    