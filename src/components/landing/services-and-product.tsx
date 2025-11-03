import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const solutions = [
  {
    title: 'ICT Solutions',
    description: 'Comprehensive ICT solutions to streamline your operations and drive growth.',
    href: '/ict-solutions'
  },
  {
    title: 'Industry Solutions',
    description: 'Tailored solutions for specific industry needs, from manufacturing to finance.',
    href: '/industry-solutions'
  },
];

const ServicesAndProduct = () => {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-semibold text-primary">Services and Product</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Solutions that Power Your Business</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            From everyday essentials to cutting-edge innovations — we build, customize, and secure your digital ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution) => (
            <Card key={solution.title} className="group relative overflow-hidden">
                <CardHeader>
                    <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{solution.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <div className="absolute inset-0 bg-primary/90 flex flex-col justify-center items-center text-center p-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="mb-4">{solution.description}</p>
                        <Button variant="secondary" asChild>
                            <Link href={solution.href}>Find Out More</Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAndProduct;
