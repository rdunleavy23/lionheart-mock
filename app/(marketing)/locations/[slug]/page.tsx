"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Baby,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Star,
  Award,
  Calendar,
  Users,
  Play,
  ChevronRight,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { locations, type Location } from "@/lib/locations-data";
import { getDirectionsUrl } from "@/lib/maps";
import { getAgeGroupInfo } from "@/lib/location-helpers";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/animate-on-scroll";
import { TestimonialCard, sampleTestimonials } from "@/components/testimonial-carousel";
import { AvailabilityChecker } from "@/components/availability-checker";
import { PlaceholderGallery } from "@/components/photo-gallery";
import { CompactFAQ, lionheartFAQs } from "@/components/faq-section";
import { MultiStepTourForm } from "@/components/multi-step-tour-form";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function LocationDetailPage({ params }: Props) {
  // Unwrap the Promise params using React.use()
  const { slug } = React.use(params);
  const location = locations.find((loc) => loc.slug === slug);

  if (!location) {
    notFound();
  }

  const shortName = location.shortName || location.city;
  const defaultHours = "Monday - Friday, 6:30 AM - 6:00 PM";
  const hours = location.hours || defaultHours;

  // Director info (use location data or placeholder)
  const director = location.director || {
    name: "Our Director",
    role: "Center Director",
    bio: `We're thrilled you're interested in Lionheart Children's Academy in ${location.city}! We provide quality, affordable child care for infants (age 6 weeks) up to 12 years old in a safe and nurturing environment. We offer full-time and part-time preschool, before and after-school care, summer camp, and engaging activities like STEM projects, sports, and community service opportunities.`,
  };
  
  // Get first name safely
  const directorFirstName = director.name.includes(" ") 
    ? director.name.split(" ")[0] 
    : director.name;

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative min-h-[280px] md:min-h-[320px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/60">
          {/* Decorative pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          {/* Back Link */}
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Locations
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {location.city}, {location.state.split(" ")[0]}
            </h1>
            
            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {location.phone && (
                <Button
                  asChild
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                >
                  <a href={`tel:${location.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {location.phone}
                  </a>
                </Button>
              )}
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                <Link href="#request-info">
                  Request Info
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          
          {/* LEFT COLUMN - Location Details */}
          <AnimateOnScroll variant="slideLeft">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {location.name}
              </h2>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{location.fullAddress}</p>
                    <a
                      href={getDirectionsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Get Directions
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                {location.phone && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <a
                      href={`tel:${location.phone}`}
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                )}

                {/* Email */}
                {location.email && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <a
                      href={`mailto:${location.email}`}
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      {location.email}
                    </a>
                  </div>
                )}

                {/* Hours */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-foreground">
                    <span className="font-medium">Open:</span> {hours}
                  </p>
                </div>

                {/* Ages Served */}
                {location.ageGroups && location.ageGroups.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Baby className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground">
                      <span className="font-medium">Ages:</span> 6 Weeks – 12 Years
                    </p>
                  </div>
                )}

              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="#schedule-tour">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Tour
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <Link href="#request-info">
                    Request Info
                  </Link>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>

          {/* RIGHT COLUMN - Director Spotlight */}
          <AnimateOnScroll variant="slideRight">
            <Card className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-6 md:p-8">
                {/* Director Photo */}
                <div className="flex justify-center mb-6">
                  <div className="relative h-52 w-52 overflow-hidden rounded-lg border-4 border-primary/30 shadow-lg bg-muted">
                    {/* Director photo - will show placeholder if image not found */}
                    <img
                      src="/images/directors/cathy.jpg"
                      alt={`${director.name}, Academy Director at ${location.name}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Users className="h-20 w-20 text-primary/40" />
                    </div>
                  </div>
                </div>

                {/* Director Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Hi! I'm {directorFirstName}, Academy Director
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We're thrilled you're interested in <strong className="text-foreground">Lionheart Children's Academy</strong> in {location.city}! 
                    Located at {location.neighborhood || location.city}, we provide quality, affordable child care for infants 
                    (age 6 weeks) up to 12 years old in a safe and nurturing environment. We offer full-time and part-time preschool, 
                    before and after-school care, summer camp, and engaging activities like STEM projects, sports, and community service opportunities.
                  </p>

                  {/* Award Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                    <img
                      src="/images/badges/best-of-best-2025.png"
                      alt="2025 Best of the Best Award"
                      className="h-24 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <img
                      src="/images/badges/colorado-shines.png"
                      alt="Colorado Shines - Quality Early Learning"
                      className="h-28 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>

        {/* PROGRAMS SECTION */}
        {location.ageGroups && location.ageGroups.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <AnimateOnScroll variant="fadeUp">
              <div className="text-center mb-10">
                <Badge variant="secondary" className="mb-4">
                  <Baby className="mr-1 h-3 w-3" />
                  Programs Offered
                </Badge>
                <h2 className="text-3xl font-bold text-foreground">
                  Programs at {shortName}
                </h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                  Age-appropriate programs that nurture development while integrating biblical foundations
                </p>
              </div>
            </AnimateOnScroll>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {location.ageGroups.map((ageGroup) => {
                const info = getAgeGroupInfo(ageGroup);
                return (
                  <StaggerItem key={ageGroup}>
                    <Card className="h-full hover-lift group">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Baby className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{info.label}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{info.ageRange}</p>
                        <Button asChild variant="ghost" size="sm" className="w-full">
                          <Link href={`/programs/${info.slug}`}>
                            Learn More
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </section>
        )}

        {/* AVAILABILITY SECTION */}
        <section id="availability" className="mt-12 pt-12 border-t">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-3">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Real-Time Availability
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Check Program Availability
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                See which programs have openings at {shortName}. Spots fill quickly—join our waitlist if your preferred program is full.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <AvailabilityChecker defaultLocation={location.slug} showHeader={false} />
            </div>
          </AnimateOnScroll>
        </section>

        {/* GALLERY SECTION */}
        <section className="mt-12 pt-12 border-t">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-3">
                <Play className="mr-1 h-3 w-3" />
                Take a Look Inside
              </Badge>
              <h2 className="text-2xl font-bold text-foreground">
                Inside Our {shortName} Center
              </h2>
              <p className="mt-2 text-muted-foreground">
                See our warm, inviting learning environments
              </p>
            </div>
          </AnimateOnScroll>

          <PlaceholderGallery
            items={[
              { name: "Welcome Area", description: "Bright, secure entrance" },
              { name: "Infant Room", description: "Nurturing care for babies" },
              { name: "Toddler Classroom", description: "Exploration & discovery" },
              { name: "Preschool Room", description: "Learning through play" },
              { name: "Outdoor Playground", description: "Active play area" },
              { name: "Chapel/Circle Time", description: "Faith & learning" },
            ]}
          />

          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="#schedule-tour">
                <Play className="mr-2 h-4 w-4" />
                Schedule a Tour to See More
              </Link>
            </Button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-16 pt-16 border-t">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4">
                <Star className="mr-1 h-3 w-3" />
                Parent Reviews
              </Badge>
              <h2 className="text-3xl font-bold text-foreground">
                What Families Say About {shortName}
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-6 md:grid-cols-3">
            {sampleTestimonials.slice(0, 3).map((testimonial, index) => (
              <AnimateOnScroll key={testimonial.id} variant="fadeUp" delay={index * 0.1}>
                <TestimonialCard testimonial={{
                  ...testimonial,
                  author: {
                    ...testimonial.author,
                    location: `${location.city}, ${location.state.split(" ")[0]}`,
                  },
                }} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mt-16 pt-16 border-t">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimateOnScroll variant="fadeUp">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <HelpCircle className="mr-1 h-3 w-3" />
                  Common Questions
                </Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mb-6">
                  Find answers to common questions about enrollment, programs, and what to expect at {shortName}.
                </p>
                <Button asChild variant="outline">
                  <Link href="/faq">
                    View All FAQs
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeUp" delay={0.2}>
              <CompactFAQ faqs={lionheartFAQs.slice(0, 5)} maxItems={5} />
            </AnimateOnScroll>
          </div>
        </section>

        {/* SCHEDULE TOUR SECTION */}
        <section id="schedule-tour" className="mt-16 pt-16 border-t">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateOnScroll variant="slideLeft">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Calendar className="mr-1 h-3 w-3" />
                  Visit Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Schedule Your Tour at {shortName}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  See our classrooms, meet our teachers, and experience the Lionheart difference firsthand. 
                  We're here to answer your questions and help you find the perfect fit.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    "Meet our caring, qualified teachers",
                    "See our safe, engaging classrooms",
                    "Learn about our Christ-centered curriculum",
                    "Get your questions answered",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {location.phone && (
                  <p className="text-muted-foreground">
                    Or call us directly at{" "}
                    <a href={`tel:${location.phone}`} className="font-semibold text-primary hover:underline">
                      {location.phone}
                    </a>
                  </p>
                )}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slideRight" id="request-info">
              <MultiStepTourForm defaultLocation={location.slug} />
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </main>
  );
}
