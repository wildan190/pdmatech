
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

const FlagIndonesia = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-16 h-auto rounded-md shadow-md">
        <rect width="900" height="300" fill="#E70011"/>
        <rect y="300" width="900" height="300" fill="#fff"/>
    </svg>
);

const FlagMalaysia = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" className="w-16 h-auto rounded-md shadow-md">
        <path fill="#fff" d="M0 0h1200v600H0z"/>
        <path d="M0 42.857h1200v42.857H0zm0 85.714h1200v42.857H0zm0 85.714h1200v42.857H0zm0 85.715h1200v42.857H0zm0 85.714h1200v42.857H0zm0 85.714h1200v42.857H0zm0 85.715h1200v42.857H0z" fill="#c00"/>
        <path fill="#00327f" d="M0 0h600v342.857H0z"/>
        <path d="M421.12 115.34a101.35 101.35 0 1 0 0 114.32 85.71 85.71 0 1 1 0-114.32z" fill="#f8c300"/>
        <path d="M300 34.286L317.96 90l26.08-20.82-13.88 28.53 30.65-8.5-23.44 23.44 28.53-13.88L345 125l20.82-26.08-28.53-13.88 8.5 30.65-23.44-23.44 13.88 28.53L300 90l-26.08 20.82 13.88-28.53-30.65 8.5 23.44-23.44-28.53 13.88L255 34.286l-20.82 26.08 28.53 13.88-8.5-30.65 23.44 23.44-13.88-28.53z" fill="#f8c300"/>
    </svg>
);

const FlagBrunei = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" className="w-16 h-auto rounded-md shadow-md">
        <rect width="1200" height="600" fill="#fce300"/>
        <path d="M0 92.93L1014.2 600H1200L185.8 0H0z" fill="#fff"/>
        <path d="M0 0l1014.2 507.07L1200 600V507.07L185.8 0H0z"/>
        <g transform="translate(600 310.2) scale(22.8)" fill="#c00">
            <path d="M-12-10a1 1 0 0 1 24 0V5a1 1 0 0 1-24 0zM-13-1a1 1 0 0 1 26 0 1 1 0 0 1-26 0"/>
            <path id="brunei-hand" d="M-6 8a1 1 0 0 0 0-16h-3a1 1 0 0 0 0 16z"/>
            <use href="#brunei-hand" transform="scale(-1 1)"/>
            <path d="M0-13a1 1 0 0 0-9 4.8 1 1 0 0 0 18 0A1 1 0 0 0 0-13z"/>
            <path d="M-15.5 12.5a1 1 0 0 1 1.2-1 1 1 0 0 0-1.2 1z" transform="rotate(15)"/>
            <path d="M-15.5 12.5a1 1 0 0 0-1.2-1 1 1 0 0 1 1.2 1z" transform="rotate(-15)"/>
            <path d="M15.5 12.5a1 1 0 0 0 1.2-1 1 1 0 0 1-1.2 1z" transform="rotate(15) scale(-1,1)"/>
            <path d="M15.5 12.5a1 1 0 0 1-1.2-1 1 1 0 0 0 1.2 1z" transform="rotate(-15) scale(-1,1)"/>
        </g>
    </svg>
);


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

        <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold font-headline text-foreground">{dictionary.internationalReach}</h3>
            <div className="mt-6 flex justify-center items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    <FlagIndonesia />
                    <p className="text-sm font-medium text-muted-foreground">Indonesia</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FlagMalaysia />
                    <p className="text-sm font-medium text-muted-foreground">Malaysia</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FlagBrunei />
                    <p className="text-sm font-medium text-muted-foreground">Brunei</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
