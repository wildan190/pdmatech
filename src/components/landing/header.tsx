'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';

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
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary">
            <rect width="256" height="256" fill="none"></rect>
            <path d="M128,24a104,104,0,1,0,104,104A104.2,104.2,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" fill="currentColor"></path>
            <path d="M168,88.9,104,128l64,39.1a8,8,0,0,0,8-13.8L121.5,128l54.5-25.3a8,8,0,1,0-8-13.8Z" fill="currentColor"></path>
          </svg>
          <span className="font-bold font-headline text-lg">Micro Padma Nusantara</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
              <Link href="/#contact" className={navigationMenuTriggerStyle()}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
         <div className="flex items-center gap-4 md:hidden">
            <Button asChild>
                <a href="#contact">Contact Us</a>
            </Button>
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
