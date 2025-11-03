'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const OurTeam = () => {
  return (
    <section id="our-team" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden">
             <Image
                src="/assets/img/home/team.jpg"
                alt="A diverse team of professionals collaborating in a modern office."
                fill
                className="object-cover"
             />
          </div>
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Driven by Talent. Built on Experience.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprises passionate, experienced, and certified ICT professionals with a strong focus on helping clients advance.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/about/people">Get to know us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
