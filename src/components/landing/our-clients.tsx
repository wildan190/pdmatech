
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import MaxumaxIcon from '../icons/maxumax-icon';

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
  { name: 'MAXUMAX', logo: <MaxumaxIcon className="w-full h-full object-contain" /> },
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
        
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          {clients.map((client) => (
              <Card key={client.name} className="p-4 flex justify-center items-center h-28 bg-background transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <div className="relative w-full h-full">
                  {typeof client.logo === 'string' ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      className="object-contain"
                    />
                  ) : (
                    client.logo
                  )}
                </div>
              </Card>
            ))}
        </div>
        
        <div className="text-center mt-16">
            <Button asChild size="lg">
                <Link href={`/${lang}/contact`}>
                    {dictionary.cta} <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>

      </div>
    </section>
  );
};

export default OurClients;
