import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
    href: '/ict-solutions/umkm',
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
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12 max-w-2xl">
          <p className="font-semibold text-primary">Services and Product</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Solutions that Power Your Business</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From everyday essentials to cutting-edge innovations — we build, customize, and secure your digital ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution) => {
            const image = PlaceHolderImages.find(p => p.id === solution.imageId);
            return (
              <Card key={solution.title} className="group relative overflow-hidden rounded-lg shadow-lg">
                {image && (
                    <div className="relative h-60 w-full">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="mb-4 text-base">{solution.description}</p>
                    <Button variant="secondary" asChild>
                        <Link href={solution.href}>
                            Find Out More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
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
