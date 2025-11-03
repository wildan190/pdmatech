import { Users, Calendar, Lightbulb, FolderKanban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const experienceData = [
    {
        icon: <Users className="h-10 w-10 text-primary mx-auto" />,
        value: "10+",
        label: "Top Tier Clients"
    },
    {
        icon: <Calendar className="h-10 w-10 text-primary mx-auto" />,
        value: "5+",
        label: "Years of Experience"
    },
    {
        icon: <Lightbulb className="h-10 w-10 text-primary mx-auto" />,
        value: "10+",
        label: "Technology Talents"
    },
    {
        icon: <FolderKanban className="h-10 w-10 text-primary mx-auto" />,
        value: "30+",
        label: "Projects in Indonesia"
    }
];

const Experience = () => {
  return (
    <section id="experience" className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {experienceData.map((item, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col justify-center items-center p-6">
                {item.icon}
                <p className="text-4xl font-bold mt-4">{item.value}</p>
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
