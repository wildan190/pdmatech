'use client';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    id: 'iot-solutions',
    title: 'IoT Solutions',
    description: 'Comprehensive IoT solutions to connect your assets and drive data-driven insights.',
    href: '/ict-solutions/iot',
    imageId: 'solution-iot'
  },
  {
    id: 'enterprise-solutions',
    title: 'Enterprise Solutions',
    description: 'Scalable and robust solutions for large-scale enterprise needs, from cloud to security.',
    href: '/ict-solutions/enterprise',
    imageId: 'solution-enterprise'
  },
];

const ServicesAndProduct = () => {
  return (
    <section id="services" className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <p className="font-semibold text-primary">Services and Product</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Solutions that Power Your Business</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            From everyday essentials to cutting-edge innovations — we build, customize, and secure your digital ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution) => {
            const image = PlaceHolderImages.find(p => p.id === solution.imageId);
            return (
              <Card key={solution.title} className="group overflow-hidden rounded-lg shadow-lg relative h-96">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <CardTitle className="text-white">{solution.title}</CardTitle>
                  <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen transition-all duration-300 ease-in-out mt-2">
                      <p className="text-white/80 text-sm mb-4">{solution.description}</p>
                      <Button variant="secondary" asChild>
                          <Link href={solution.href}>
                              Find Out More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesAndProduct;
