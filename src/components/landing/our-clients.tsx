
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
  { name: 'British Technology Global Group', logo: '/assets/img/clients/british-technology.svg' },
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
        
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {clients.map((client) => (
            <div key={client.name} className="flex justify-center">
              <Image
                src={client.logo}
                alt={client.name}
                width={180}
                height={72}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
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
