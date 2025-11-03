'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

type OurTeamProps = {
    dictionary: any;
    lang: string;
}

const OurTeam = ({ dictionary, lang }: OurTeamProps) => {
  return (
    <section id="our-team" className="py-20 lg:py-32 bg-secondary/50 animate-in fade-in slide-in-from-bottom-12 duration-1000">
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
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{dictionary.headline}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {dictionary.subheadline}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href={`/${lang}/about/people`}>{dictionary.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
