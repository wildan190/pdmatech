'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import ParallaxImage from '../shared/parallax-image';

type HeroProps = {
    dictionary: any;
    lang: string;
}

const Hero = ({ dictionary, lang }: HeroProps) => {
  const heroSlide = {
      id: "slide1",
      headline: dictionary.slide1.headline,
      subheadline: dictionary.slide1.subheadline,
      cta1: dictionary.slide1.cta1,
      cta2: dictionary.slide1.cta2,
      cta1Link: `#services`,
      cta2Link: `#contact`,
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzYyMDkwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Abstract technological background with glowing blue nodes and connections.",
      imageHint: "abstract technology"
  };

  return (
    <section id="hero" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <ParallaxImage
        src={heroSlide.imageUrl}
        alt={heroSlide.imageAlt}
        priority
        data-ai-hint={heroSlide.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      <div className="relative z-10 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          {heroSlide.headline}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          {heroSlide.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <a href={heroSlide.cta1Link}>
              {heroSlide.cta1} <ArrowRight className="ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="bg-black/20 backdrop-blur-sm border-white text-white hover:bg-white/10 hover:text-white" asChild>
            <a href={heroSlide.cta2Link}>{heroSlide.cta2}</a>
          </Button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
