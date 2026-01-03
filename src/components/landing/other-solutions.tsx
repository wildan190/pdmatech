'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type OtherSolutionsProps = {
    dictionary: any;
    lang: string;
}

const OtherSolutions = ({ dictionary, lang }: OtherSolutionsProps) => {

  const solutions = [
    {
      title: dictionary.iotTitle,
      description: dictionary.iotDescription,
      href: `/${lang}/ict-solutions/iot`,
      imageId: 'solution-iot'
    },
    {
      title: dictionary.umkmTitle,
      description: dictionary.umkmDescription,
      href: `/${lang}/ict-solutions/umkm`,
      imageId: 'umkm-hero'
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-24 bg-secondary/50 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{dictionary.headline}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                {dictionary.subheadline}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution) => {
             const image = PlaceHolderImages.find(p => p.id === solution.imageId);
             return(
            <Card key={solution.title} className="group overflow-hidden flex flex-col">
              <div className="relative h-64 w-full">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                    />
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow bg-background">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold font-headline">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4 flex-grow">
                    <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                    <Button variant="outline" asChild>
                    <Link href={solution.href}>
                        {dictionary.findOutMore} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </CardFooter>
              </div>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
};

export default OtherSolutions;
