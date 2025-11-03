
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FaqProps = {
  dictionary: {
    pretitle: string;
    title: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
}

const Faq = ({ dictionary }: FaqProps) => {
  return (
    <section id="faq" className="py-20 lg:py-24 bg-background animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-semibold text-primary">{dictionary.pretitle}</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.description}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {dictionary.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-secondary/30 px-6 rounded-lg border-b-0">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
