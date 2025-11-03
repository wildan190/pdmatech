import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: "avatar-1",
    name: 'Ahmad Subagja',
    title: 'CEO, Nusatech',
    quote: "PadmaTech's IoT solutions revolutionized our supply chain management. Their expertise and support are unparalleled.",
  },
  {
    id: "avatar-2",
    name: 'Dewi Lestari',
    title: 'CTO, Inovasi Digital',
    quote: 'The cloud infrastructure they built for us is robust, scalable, and secure. A truly reliable technology partner.',
  },
  {
    id: "avatar-3",
    name: 'Budi Santoso',
    title: 'Operations Manager, Cipta Karya',
    quote: 'Their team is professional, responsive, and deeply knowledgeable. They delivered beyond our expectations.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Trusted by Industry Leaders</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See what our clients have to say about our partnership.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatarImage = PlaceHolderImages.find(p => p.id === testimonial.id);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col">
                      <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
                        <p className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center flex-col">
                          {avatarImage && (
                            <Avatar className="h-16 w-16 mb-4">
                              <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:inline-flex" />
          <CarouselNext className="hidden lg:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
