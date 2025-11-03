import { Users, Calendar, Lightbulb, FolderKanban } from 'lucide-react';

const experienceData = [
    {
        icon: <Users className="h-10 w-10 text-primary" />,
        value: "10+",
        label: "Top Tier Clients"
    },
    {
        icon: <Calendar className="h-10 w-10 text-primary" />,
        value: "5+",
        label: "Years of Experience"
    },
    {
        icon: <Lightbulb className="h-10 w-10 text-primary" />,
        value: "10+",
        label: "Technology Talents"
    },
    {
        icon: <FolderKanban className="h-10 w-10 text-primary" />,
        value: "30+",
        label: "Projects in Indonesia"
    }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {experienceData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.icon}
              <p className="text-4xl font-bold mt-2">{item.value}</p>
              <p className="text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
