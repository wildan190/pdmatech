'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const clients = [
  { name: 'Sinar Indah Padma', logo: '/assets/img/clients/sinar-indah-padma.svg' },
  { name: 'Hakarentcar', logo: '/assets/img/clients/hakarentcar.svg' },
  { name: 'Communic8', logo: '/assets/img/clients/communic8.svg' },
  { name: 'Liga Mahasiswa', logo: '/assets/img/clients/liga-mahasiswa.svg' },
  { name: 'Garuda Systrain Interindo', logo: '/assets/img/clients/garuda-systrain-interindo.svg' },
  { name: 'Huntr.id', logo: '/assets/img/clients/huntr-id.svg' },
  { name: 'Safarental', logo: '/assets/img/clients/safarental.svg' },
  { name: 'SyauqiRental', logo: '/assets/img/clients/syauqirental.svg' },
  { name: 'Bali Pure', logo: '/assets/img/clients/bali-pure.svg' },
  { name: 'MyPulsa', logo: '/assets/img/clients/mypulsa.svg' },
  { name: 'Jowoland Construction', logo: '/assets/img/clients/jowoland-construction.svg' },
  { name: 'Hadiwijaya', logo: '/assets/img/clients/hadiwijaya.svg' },
  { name: 'Hadiningrat Corp', logo: '/assets/img/clients/hadiningrat-corp.svg' },
];

type OurClientsProps = {
  dictionary: {
    title: string;
    description: string;
    cta: string;
  };
  lang: string;
};

const OurClients = ({ dictionary, lang }: OurClientsProps) => {

  return (
    <section id="our-clients" className="py-20 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
            {dictionary.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.description}
            </p>
        </div>
        
        <div className="relative mt-16 w-full overflow-hidden">
          <div className="flex animate-marquee-scroll hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, index) => (
              <div key={`${client.name}-${index}`} className="flex-shrink-0 w-1/5 flex justify-center items-center mx-4">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={88}
                  className="h-20 w-auto object-contain text-muted-foreground"
                />
              </div>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-secondary/50 to-transparent"
          ></div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-secondary/50 to-transparent"
          ></div>
        </div>
        
        <div className="text-center mt-16">
            <Button asChild size="lg">
                <Link href={`/${lang}/#contact`}>
                    {dictionary.cta} <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>

      </div>
    </section>
  );
};

export default OurClients;
