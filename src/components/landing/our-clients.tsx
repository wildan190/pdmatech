
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
        
        <div className="mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-8 items-center max-w-6xl mx-auto">
            {clients.map((client) => (
              <div key={client.name} className="flex justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={88}
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
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
