
'use client';

import Image from 'next/image';

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
  };
};

const OurClients = ({ dictionary }: OurClientsProps) => {
  return (
    <section id="our-clients" className="py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-muted-foreground font-semibold text-lg mb-8">
          {dictionary.title}
        </h3>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-scroll hover:pause-animation items-center">
            {clients.concat(clients).map((client, index) => (
              <div key={index} className="flex-shrink-0 w-64 mx-8 text-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={60}
                  className="h-10 w-auto inline-block object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 40s linear infinite;
        }
        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurClients;
