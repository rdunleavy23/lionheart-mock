"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const currentYear = new Date().getFullYear();

const footerLinks = {
  programs: [
    { label: "Infants", href: "/programs/infants" },
    { label: "Toddlers", href: "/programs/toddlers" },
    { label: "Preschool", href: "/programs/preschool" },
    { label: "Pre-Kindergarten", href: "/programs/pre-k" },
    { label: "Kindergarten", href: "/programs/kindergarten" },
  ],
  locations: [
    { label: "Find a Location", href: "/locations" },
    { label: "Schedule a Tour", href: "/#tour-form" },
    { label: "Virtual Tour", href: "/virtual-tour" },
    { label: "Church Partners", href: "/church-partners" },
  ],
  enrollment: [
    { label: "Tuition & Fees", href: "/tuition" },
    { label: "Enrollment Process", href: "/enrollment" },
    { label: "Financial Assistance", href: "/financial-assistance" },
    { label: "Waitlist", href: "/waitlist" },
  ],
  about: [
    { label: "Our Mission", href: "/about" },
    { label: "Our Values", href: "/about/values" },
    { label: "Our Team", href: "/about/team" },
    { label: "Careers", href: "/careers" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  resources: [
    { label: "Parent Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Parent Portal", href: "/portal" },
  ],
  legal: [
    { label: "Accessibility", href: "/accessibility" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

function NewsletterSignup() {
  const [email, setEmail] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder - no backend yet
    console.log("Newsletter signup:", email);
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Label htmlFor="newsletter-email" className="text-sm font-medium">
        Stay Connected
      </Label>
      <p className="text-sm text-muted-foreground">
        Get helpful parenting tips, faith-based resources, and updates about your child's program
        delivered to your inbox.
      </p>
      <div className="flex gap-2">
        <Input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          aria-label="Email address for newsletter"
        />
        <Button type="submit" size="default">
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Programs Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Programs
            </h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations & Enrollment Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Locations & Enrollment
            </h3>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.enrollment.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              About
            </h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <NewsletterSignup />
          </div>
        </div>

        {/* Accreditation & Legal */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Licensed and accredited early education provider. We offer exceptional care with
                biblical foundations, nurturing your child's mind, body, and spirit. Serving
                families across 5 states with 20+ locations.
              </p>
              <p className="text-xs text-muted-foreground">
                © {currentYear} Lionheart Children's Academy. All rights reserved.
              </p>
            </div>
            <ul className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
