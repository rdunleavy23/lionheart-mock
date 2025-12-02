"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Heart,
  BookOpen,
  CheckCircle2,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Play,
  Calendar,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { programs } from "@/lib/programs-data";

// New best-in-class components
import { VideoHero, HeroContent } from "@/components/video-hero";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/animate-on-scroll";
import { StatsCounter, lionheartStats } from "@/components/stats-counter";
import { TestimonialCarousel, sampleTestimonials, AggregateRating } from "@/components/testimonial-carousel";
import { StaffSpotlight, placeholderStaff } from "@/components/staff-card";
import { PlaceholderGallery } from "@/components/photo-gallery";
import { TrustBadges, heroTrustBadges, SafetyFeatures, AccreditationLogos } from "@/components/trust-badges";
import { CompactFAQ, lionheartFAQs } from "@/components/faq-section";
import { ScheduleSelector } from "@/components/daily-schedule";
import { AvailabilityChecker } from "@/components/availability-checker";
import { MultiStepTourForm } from "@/components/multi-step-tour-form";
import { HomeLocationSearch } from "@/components/home-location-search";

export default function HomePage() {
  return (
    <main>
      {/* 1. VIDEO HERO SECTION */}
      <VideoHero
        // videoSrc="/videos/hero.mp4" // Add when video is available
        // posterSrc="/images/hero-poster.jpg" // Add when image is available
        fallbackImageSrc=""
        minHeight="85vh"
        showControls={false}
        className="relative"
      >
        <HeroContent className="text-center" maxWidth="max-w-5xl">
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Where Your Child is{" "}
            <span className="text-accent">Safe</span>,{" "}
            <span className="text-accent">Loved</span> &{" "}
            <span className="text-accent">Learning</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            Exceptional early education with biblical foundations. Find peace of mind 
            knowing your child receives the highest quality care while growing in faith.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-lg font-semibold px-8 py-6 shadow-lg hover-scale">
              <Link href="#tour-form">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Tour
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg font-semibold px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
              <Link href="#location-search">
                <MapPin className="mr-2 h-5 w-5" />
                Find a Location
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10">
            <TrustBadges badges={heroTrustBadges} variant="hero" />
          </div>

          {/* Stats */}
          <div className="mt-12 rounded-2xl bg-white/10 backdrop-blur-md p-6 md:p-8">
            <StatsCounter stats={lionheartStats} variant="hero" />
          </div>
        </HeroContent>
      </VideoHero>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* 2. SOCIAL PROOF BAR */}
        <AnimateOnScroll variant="fadeUp" className="py-12 border-b">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <AggregateRating rating={4.9} totalReviews={312} source="Google Reviews" />
            <div className="hidden md:block h-8 w-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span><strong className="text-foreground">2,000+</strong> families trust Lionheart</span>
            </div>
            <div className="hidden md:block h-8 w-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              <span><strong className="text-foreground">15+</strong> years of excellence</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* 3. FIND A CENTER NEAR YOU */}
        <section id="location-search" className="py-16 md:py-20" aria-label="Find a center near you">
          <AnimateOnScroll variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="mr-1 h-3 w-3" />
                25+ Locations
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Find a Lionheart Center Near You
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Use your ZIP code or city to find nearby Lionheart locations. We have centers 
                across multiple states, each offering the same exceptional care.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.2} className="mt-10">
            <Card className="mx-auto max-w-xl shadow-lg hover-lift">
              <CardContent className="pt-6">
                <HomeLocationSearch />
              </CardContent>
            </Card>
          </AnimateOnScroll>

          {/* Quick Stats */}
          <div className="mt-12">
            <StatsCounter stats={lionheartStats} variant="card" className="mx-auto max-w-4xl" />
          </div>
        </section>

        {/* 4. WHY FAMILIES CHOOSE LIONHEART */}
        <section className="py-16 md:py-20 border-t" aria-label="Why families choose Lionheart">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Heart className="mr-1 h-3 w-3" />
                The Lionheart Difference
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Why Families Choose Lionheart
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                We believe every child is uniquely created and deserves exceptional care. 
                Here's what sets us apart.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Rooted in Christ's Love",
                description: "Every interaction is guided by biblical values of love, kindness, and respect. Your child will experience genuine care that reflects Christ's love.",
              },
              {
                icon: BookOpen,
                title: "Exceptional Curriculum",
                description: "Our trained educators use research-based early learning approaches that prepare children for kindergarten success while nurturing their natural curiosity.",
              },
              {
                icon: Shield,
                title: "Safe, Secure Environments",
                description: "Licensed and accredited centers with secure entry systems, health protocols, and background-checked staff give you peace of mind.",
              },
              {
                icon: Users,
                title: "Support for Working Families",
                description: "Flexible schedules, extended hours, and regular communication help busy parents balance work and family life with confidence.",
              },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className="h-full hover-lift group">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 5. PROGRAMS BY AGE */}
        <section className="py-16 md:py-20 border-t" aria-label="Programs by age">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <BookOpen className="mr-1 h-3 w-3" />
                Age-Appropriate Learning
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Programs for Every Stage
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Every child is unique. Our age-appropriate programs nurture development 
                at each stage, combining exceptional care with biblical foundations.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <StaggerItem key={program.href}>
                <Card className="h-full flex flex-col hover-lift group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{program.name}</CardTitle>
                      <Badge variant="outline" className="text-primary border-primary">
                        {program.ageRange}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{program.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href={program.href}>
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Sample Daily Schedule */}
          <AnimateOnScroll variant="fadeUp" delay={0.3} className="mt-16">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Sample Daily Schedule
                </CardTitle>
                <CardDescription>
                  See how we structure a typical day for different age groups
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ScheduleSelector />
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </section>

        {/* 6. MEET OUR TEACHERS */}
        <section className="py-16 md:py-20 border-t" aria-label="Meet our teachers">
          <StaffSpotlight
            title="Meet Our Dedicated Teachers"
            subtitle="Loving educators who make a difference every day"
            staff={placeholderStaff}
          />
        </section>

        {/* 7. TESTIMONIALS */}
        <section className="py-16 md:py-20 border-t bg-muted/30 -mx-4 px-4 md:-mx-6 md:px-6" aria-label="What families say">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Star className="mr-1 h-3 w-3" />
                Parent Testimonials
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                What Families Are Saying
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Don't just take our word for it. Here's what parents say about their 
                Lionheart experience.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.2}>
            <TestimonialCarousel
              testimonials={sampleTestimonials}
              variant="cards"
              autoPlay={true}
              className="max-w-6xl mx-auto"
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.3} className="mt-8 text-center">
            <AggregateRating
              rating={4.9}
              totalReviews={312}
              source="Google Reviews"
              className="justify-center"
            />
          </AnimateOnScroll>
        </section>

        {/* 8. SAFETY & TRUST */}
        <section className="py-16 md:py-20 border-t" aria-label="Safety and trust">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Shield className="mr-1 h-3 w-3" />
                Your Peace of Mind
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Safety, Trust & Spiritual Care
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Your child's safety and well-being are our top priorities. Every 
                center maintains the highest standards.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.2}>
            <SafetyFeatures />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.3} className="mt-12">
            <AccreditationLogos />
          </AnimateOnScroll>
        </section>

        {/* 9. SEE OUR CLASSROOMS */}
        <section className="py-16 md:py-20 border-t" aria-label="See our classrooms">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Play className="mr-1 h-3 w-3" />
                Take a Look Inside
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                See Our Classrooms
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Take a peek inside our warm, inviting learning environments where 
                children explore, create, and grow.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.2}>
            <PlaceholderGallery
              items={[
                { name: "Infant Classroom", description: "Safe, nurturing spaces" },
                { name: "Toddler Play Area", description: "Creative exploration" },
                { name: "Circle Time", description: "Bible story & learning" },
                { name: "Outdoor Playground", description: "Physical development" },
                { name: "Art Center", description: "Creative expression" },
                { name: "Reading Nook", description: "Literacy development" },
                { name: "Meal Time", description: "Nutritious meals" },
                { name: "Music Room", description: "Songs & movement" },
              ]}
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.3} className="mt-8 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/virtual-tour">
                <Play className="mr-2 h-4 w-4" />
                Take a Virtual Tour
              </Link>
            </Button>
          </AnimateOnScroll>
        </section>

        {/* 10. CHECK AVAILABILITY */}
        <section className="py-16 md:py-20 border-t" aria-label="Check availability">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <AnimateOnScroll variant="slideLeft">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Real-Time Availability
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Check Program Availability
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  See which programs have openings at your preferred location. 
                  Spots fill quickly, especially for infants and toddlers.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Real-time availability updates",
                    "Join waitlist for full programs",
                    "Multiple age programs available",
                    "Easy tour scheduling",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slideRight">
              <AvailabilityChecker showHeader={false} />
            </AnimateOnScroll>
          </div>
        </section>

        {/* 11. FAQ PREVIEW */}
        <section className="py-16 md:py-20 border-t" aria-label="Frequently asked questions">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimateOnScroll variant="fadeUp">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Common Questions
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Find answers to the most common questions about enrollment, 
                  programs, and what to expect.
                </p>
                <Button asChild className="mt-6" size="lg">
                  <Link href="/faq">
                    View All FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeUp" delay={0.2}>
              <CompactFAQ
                faqs={lionheartFAQs.slice(0, 5)}
                maxItems={5}
              />
            </AnimateOnScroll>
          </div>
        </section>

        {/* 12. HOW ENROLLMENT WORKS */}
        <section className="py-16 md:py-20 border-t" aria-label="How enrollment works">
          <AnimateOnScroll variant="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Simple Process
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                How Enrollment Works
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Getting started with Lionheart is simple. Here's what to expect.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Schedule a Tour",
                description: "Visit our center, meet our teachers, and see our classrooms in action. We'll answer all your questions.",
              },
              {
                step: "2",
                title: "Complete Enrollment",
                description: "Fill out enrollment forms, submit required documents, and reserve your child's spot.",
              },
              {
                step: "3",
                title: "First Day Success",
                description: "We'll help you prepare for a smooth transition. Your child's adventure begins!",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <Card className="text-center hover-lift h-full">
                  <CardContent className="pt-8 pb-6">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </div>

      {/* 13. BOTTOM CTA + TOUR FORM */}
      <section id="tour-form" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" aria-label="Schedule a tour">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Copy */}
            <AnimateOnScroll variant="slideLeft">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Calendar className="mr-1 h-3 w-3" />
                  Schedule Your Visit
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  Ready to See Lionheart in Person?
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Schedule a tour to see our classrooms, meet our teachers, and 
                  experience the Lionheart difference firsthand. We're here to 
                  answer your questions and help you find the perfect fit.
                </p>

                <ul className="mt-8 space-y-4">
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

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                      >
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">200+</strong> families scheduled tours this month
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Or call: <strong className="text-foreground">(469) 555-0123</strong></span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right: Form */}
            <AnimateOnScroll variant="slideRight">
              <MultiStepTourForm className="shadow-2xl" />
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
