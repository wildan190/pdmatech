import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary">
            <rect width="256" height="256" fill="none"></rect>
            <path d="M128,24a104,104,0,1,0,104,104A104.2,104.2,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" fill="currentColor"></path>
            <path d="M168,88.9,104,128l64,39.1a8,8,0,0,0,8-13.8L121.5,128l54.5-25.3a8,8,0,1,0-8-13.8Z" fill="currentColor"></path>
          </svg>
          <span className="font-bold font-headline text-lg">PadmaTech</span>
        </Link>
        <nav className="flex items-center gap-4">
           <a href="#solutions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">
            Solutions
          </a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden md:block">
            Testimonials
          </a>
          <Button asChild>
            <a href="#contact">Contact Us</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
