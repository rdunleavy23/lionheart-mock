"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

// Core navigation (3-5 items max for mobile)
const coreNavItems = [
  { label: "Locations", href: "/locations", priority: "high" },
  { label: "Programs", href: "/programs", priority: "high" },
  { label: "Schedule Tour", href: "/#tour-form", priority: "high" },
];

// Secondary navigation (moved to "More" menu on mobile)
const secondaryNavItems = [
  { label: "Our Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Lionheart Children's Academy Home"
        >
          <Image
            src="/images/logo.svg"
            alt="Lionheart Children's Academy"
            width={140}
            height={45}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {[...coreNavItems, ...secondaryNavItems].map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/#tour-form">Schedule a Tour</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle mobile menu"
              className="h-9 w-9"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt="Lionheart Children's Academy"
                  width={120}
                  height={39}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </SheetHeader>
            <nav className="mt-8 flex flex-col space-y-3" aria-label="Mobile navigation">
              {/* Core actions - visually dominant, thumb-reachable */}
              {coreNavItems.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Button
                    asChild
                    size="lg"
                    variant={item.label === "Schedule Tour" ? "default" : "outline"}
                    className="w-full justify-start text-base font-semibold min-h-[52px]"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </SheetClose>
              ))}
              
              {/* Divider */}
              <div className="my-2 border-t border-border" />
              
              {/* Secondary navigation - smaller, less prominent */}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1 mb-2">
                More
              </p>
              {secondaryNavItems.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="text-base text-foreground transition-colors hover:text-primary py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
