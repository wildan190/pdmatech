'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const aboutUsComponents: { title: string; href: string; description: string }[] = [
  {
    title: 'Our Company',
    href: '/about/company',
    description: 'Learn about our history, mission, and values.',
  },
  {
    title: 'Our People',
    href: '/about/people',
    description: 'Meet the team behind our success.',
  },
  {
    title: 'Privacy Policy',
    href: '/about/privacy',
    description: 'How we protect your data and privacy.',
  },
];

const ictSolutionsComponents: { title: string; href: string; description: string }[] = [
    {
        title: 'IoT Solutions',
        href: '/ict-solutions/iot',
        description: 'Intelligent solutions for a connected world.',
    },
    {
        title: 'Enterprise Solutions',
        href: '/ict-solutions/enterprise',
        description: 'Scalable solutions for large businesses.',
    },
    {
        title: 'UMKM Solutions',
        href: '/ict-solutions/umkm',
        description: 'Affordable and effective solutions for small and medium businesses.',
    },
    {
        title: 'Web Solutions',
        href: '/ict-solutions/web',
        description: 'Modern and responsive web design and development.',
    },
];

const insightComponents: { title: string; href: string; description: string }[] = [
    {
        title: 'News',
        href: '/insight/news',
        description: 'Latest news and updates from our company.',
    },
    {
        title: 'Article',
        href: '/insight/article',
        description: 'In-depth articles about technology and business.',
    },
    {
        title: 'Brochure',
        href: '/insight/brochure',
        description: 'Download our company brochure.',
    },
];


const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-start">
          <div>
            <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
            <div className="text-sm text-muted-foreground">Your Business Partner</div>
          </div>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {aboutUsComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>ICT Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {ictSolutionsComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Insight</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {insightComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <Button asChild>
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
         <div className="flex items-center gap-4 md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Link href="/" className="flex items-start mb-6">
                        <div>
                            <div className="font-bold font-headline text-lg">Micro Padma Nusantara</div>
                            <div className="text-sm text-muted-foreground">Your Business Partner</div>
                        </div>
                    </Link>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="about-us">
                        <AccordionTrigger className="text-base font-medium">About Us</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="grid gap-3">
                            {aboutUsComponents.map(item => <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">{item.title}</Link>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="ict-solutions">
                        <AccordionTrigger className="text-base font-medium">ICT Solutions</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="grid gap-3">
                          {ictSolutionsComponents.map(item => <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">{item.title}</Link>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="insight">
                        <AccordionTrigger className="text-base font-medium">Insight</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <div className="grid gap-3">
                            {insightComponents.map(item => <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">{item.title}</Link>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Button asChild className="w-full mt-6">
                        <Link href="/#contact">Contact Us</Link>
                    </Button>
                </SheetContent>
             </Sheet>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href ?? ''}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default Header;
