
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
  { name: 'MAXUMAX', logo: <span className="font-bold text-2xl text-foreground whitespace-nowrap">MAXUMAX</span> },
];

const ClientLogo = ({ client }: { client: typeof clients[0] }) => (
    <div className="relative w-40 h-20 flex-shrink-0">
        {typeof client.logo === 'string' ? (
            <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
            />
        ) : (
            <div className="flex items-center justify-center h-full">
                {client.logo}
            </div>
        )}
    </div>
);


const Marquee = ({ children, reverse = false }: { children: React.ReactNode, reverse?: boolean }) => (
  <div className="flex space-x-16 overflow-hidden">
      <div className={cn("flex space-x-16 justify-around flex-shrink-0 min-w-full", reverse ? "animate-[marquee_60s_linear_infinite_reverse]" : "animate-[marquee_60s_linear_infinite]")}>
          {children}
      </div>
      <div className={cn("flex space-x-16 justify-around flex-shrink-0 min-w-full", reverse ? "animate-[marquee_60s_linear_infinite_reverse]" : "animate-[marquee_60s_linear_infinite]")}>
          {children}
      </div>
  </div>
);


type OurClientsProps = {
  dictionary: {
    title: string;
    description: string;
    cta: string;
  };
  lang: string;
};

const OurClients = ({ dictionary, lang }: OurClientsProps) => {
  const firstRow = clients.slice(0, Math.ceil(clients.length / 2));
  const secondRow = clients.slice(Math.ceil(clients.length / 2));

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
        
        <div className="relative mt-16 flex flex-col gap-8 overflow-hidden group">
            <div className="group-hover:[animation-play-state:paused]">
                <Marquee>
                    {firstRow.map((client) => <ClientLogo key={client.name} client={client} />)}
                </Marquee>
            </div>
             <div className="group-hover:[animation-play-state:paused]">
                <Marquee reverse>
                    {secondRow.map((client) => <ClientLogo key={client.name} client={client} />)}
                </Marquee>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-transparent to-secondary/50 pointer-events-none" />
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
