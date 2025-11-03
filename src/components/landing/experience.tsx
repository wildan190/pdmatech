
'use client'

import { Users, Calendar, Lightbulb, FolderKanban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value }: { value: string }) => {
    const target = parseInt(value, 10);
    const [current, setCurrent] = useState(0);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();

                    const animate = (currentTime: number) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        start = Math.floor(progress * target);
                        setCurrent(start);
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [target]);

    return (
        <p ref={ref} className="text-4xl font-bold mt-4">
            {current}{value.includes('+') ? '+' : ''}
        </p>
    );
};


const Experience = ({ dictionary }: { dictionary: any }) => {
    const experienceData = [
        {
            icon: <Users className="h-10 w-10 text-primary mx-auto" />,
            value: "10+",
            label: dictionary.clients
        },
        {
            icon: <Calendar className="h-10 w-10 text-primary mx-auto" />,
            value: "5+",
            label: dictionary.years
        },
        {
            icon: <Lightbulb className="h-10 w-10 text-primary mx-auto" />,
            value: "10+",
            label: dictionary.talents
        },
        {
            icon: <FolderKanban className="h-10 w-10 text-primary mx-auto" />,
            value: "30+",
            label: dictionary.projects
        }
    ];

  return (
    <section id="experience" className="py-12 lg:py-16 bg-background animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {experienceData.map((item, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col justify-center items-center p-6">
                {item.icon}
                <AnimatedNumber value={item.value} />
                <p className="text-muted-foreground mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
