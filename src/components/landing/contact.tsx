'use client';

import ParallaxImage from '../shared/parallax-image';
import ContactForm from '../shared/contact-form';

type ContactProps = {
  dictionary: any;
}

const Contact = ({ dictionary }: ContactProps) => {
  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
        <ParallaxImage
          src="/assets/img/home/tech.jpg"
          alt="Abstract technology background"
        />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-white">{dictionary.headline}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            {dictionary.subheadline}
          </p>
        </div>
        <ContactForm dictionary={dictionary} />
      </div>
    </section>
  );
};

export default Contact;
