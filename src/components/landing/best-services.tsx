
'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type BestServicesProps = {
    dictionary: any;
    lang: string;
}

const BestServices = ({ dictionary, lang }: BestServicesProps) => {
  const solutions = [
    {
      title: dictionary.webTitle,
      description: dictionary.webDescription,
      href: `/${lang}/ict-solutions/web`,
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGFic3RyYWN0fGVufDB8fHx8MTc2NDg4NDYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      imageAlt: 'Abstract image representing modern web design',
      imageHint: 'web development abstract'
    },
    {
      title: dictionary.erpTitle,
      description: dictionary.erpDescription,
      href: `/${lang}/ict-solutions/enterprise`,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzY0MDQ2NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      imageAlt: 'A tablet displaying complex business analytics and charts for an ERP system.',
      imageHint: 'analytics dashboard'
    },
  ];

  return (
    <section id="best-services" className="py-20 lg:py-24 bg-background animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-semibold text-primary">{dictionary.pretitle}</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
              <Card key={solution.title} className="group overflow-hidden rounded-lg shadow-lg relative h-96">
                <Image
                    src={solution.imageUrl}
                    alt={solution.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={solution.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <CardTitle className="text-white text-2xl font-bold font-headline">{solution.title}</CardTitle>
                  <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen transition-all duration-500 ease-in-out mt-2">
                      <p className="text-white/80 text-sm mb-4">{solution.description}</p>
                      <Button variant="secondary" asChild>
                          <Link href={solution.href} title={`Learn more about ${solution.title}`}>
                              Learn more about {solution.title} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
                </div>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BestServices;
