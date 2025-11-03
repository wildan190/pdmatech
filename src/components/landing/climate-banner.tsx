
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import Link from "next/link";

type ClimateBannerProps = {
    dictionary: any;
    lang: string;
}

const ClimateBanner = ({ dictionary, lang }: ClimateBannerProps) => {
  return (
    <section className="bg-primary/10 py-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 rounded-lg bg-background p-8 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <Leaf className="h-12 w-12 text-primary flex-shrink-0" />
                <div>
                    <h3 className="font-headline text-xl font-bold">{dictionary.title}</h3>
                    <p className="text-muted-foreground mt-1 max-w-2xl">{dictionary.description}</p>
                </div>
            </div>
            <Button asChild className="shrink-0">
                <Link href={`/${lang}/about/company#our-program`}>
                    {dictionary.button}
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default ClimateBanner;
