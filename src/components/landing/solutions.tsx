import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Cpu, LayoutDashboard, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'IoT Development',
    description: 'Custom IoT solutions from hardware design to cloud integration, turning your concepts into connected realities.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'Cloud & ICT Infrastructure',
    description: 'Robust and scalable cloud infrastructure and ICT services to power your digital transformation.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Cybersecurity Services',
    description: 'Protect your digital assets with our comprehensive cybersecurity assessments and solutions.',
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: 'IT Consulting',
    description: 'Strategic IT consulting to align your technology with your business goals for maximum impact.',
  },
];

const Solutions = () => {
  return (
    <section id="solutions" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Our Core Solutions</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We provide a spectrum of services designed to innovate and elevate your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="flex flex-col text-center items-center p-6 bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0 mb-4">
                {solution.icon}
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="font-headline text-xl mb-2">{solution.title}</CardTitle>
                <p className="text-muted-foreground">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
