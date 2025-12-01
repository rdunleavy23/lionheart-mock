"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MapPin, Calendar, Users, Shield, Heart, BookOpen, Sparkles } from "lucide-react";

export default function HomePage() {
  const [zipCode, setZipCode] = React.useState("");

  function handleLocationSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log("Searching for locations near ZIP:", zipCode);
    // Placeholder: In future version, this will show nearby locations
    alert("We'll show nearby locations here in a future version.");
  }

  function handleTourFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Tour form submitted");
    // Placeholder: In future version, this will submit to backend
    alert("Thank you! We'll contact you soon to schedule your tour.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      {/* 1. HERO SECTION */}
      <section className="py-12 md:py-20 lg:py-24" aria-label="Hero section">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left: Text + CTAs */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Where Your Child is{" "}
              <span className="text-primary">Safe, Loved & Learning</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Exceptional early education with biblical foundations. Find peace of mind knowing your
              child receives the highest quality care while growing in faith. Serving families across
              5 states with 20+ locations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base font-semibold">
                <Link href="#location-search">Find a Location</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                <Link href="#tour-form">Schedule a Tour</Link>
              </Button>
            </div>
            {/* Trust Bar */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Shield className="mr-1.5 h-3.5 w-3.5" />
                Licensed & Accredited
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Heart className="mr-1.5 h-3.5 w-3.5" />
                Caring, Qualified Teachers
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                School Readiness Focused
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Biblical Foundations
              </Badge>
            </div>
          </div>
          {/* Right: Image Placeholder */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <div className="flex h-full items-center justify-center">
              <span className="text-muted-foreground">Hero Image Placeholder</span>
            </div>
            {/* In production, replace with: */}
            {/* <Image
              src="/hero-image.jpg"
              alt="Happy children learning and playing at Lionheart Children's Academy"
              fill
              className="object-cover"
              priority
            /> */}
          </div>
        </div>
      </section>

      {/* 2. LOCATION SEARCH SHORTCUT */}
      <section id="location-search" className="py-12 md:py-16" aria-label="Find a center near you">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
            Find a center near you
          </h2>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleLocationSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zip-code" className="text-base">
                    Enter your ZIP code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="zip-code"
                      type="text"
                      placeholder="12345"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="flex-1"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      aria-label="ZIP code for location search"
                    />
                    <Button type="submit" size="default">
                      <MapPin className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. PROGRAMS BY AGE OVERVIEW */}
      <section className="py-12 md:py-16" aria-label="Programs by age">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Programs by Age</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every child is unique. Our age-appropriate programs nurture development at each stage,
            combining exceptional care with biblical foundations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Infant Care",
              ageRange: "6 weeks – 12 months",
              description:
                "Nurturing care in a safe, loving environment. Your baby will receive individual attention while building trust and security.",
              href: "/programs/infants",
            },
            {
              name: "Toddlers",
              ageRange: "12 – 24 months",
              description:
                "Encouraging exploration and discovery through play-based learning. Building independence while feeling secure and loved.",
              href: "/programs/toddlers",
            },
            {
              name: "Preschool",
              ageRange: "2 – 4 years",
              description:
                "Social-emotional development and school readiness skills through hands-on activities and biblical character lessons.",
              href: "/programs/preschool",
            },
            {
              name: "Pre-K & Kindergarten Prep",
              ageRange: "4 – 5 years",
              description:
                "Preparing for kindergarten success with academic foundations, critical thinking, and a love for learning rooted in faith.",
              href: "/programs/pre-k",
            },
            {
              name: "Kindergarten",
              ageRange: "5 – 6 years",
              description:
                "Full-day kindergarten program combining academic excellence with biblical values, preparing children for elementary school.",
              href: "/programs/kindergarten",
            },
            {
              name: "After-School Care",
              ageRange: "5 – 12 years",
              description:
                "Safe, structured after-school environment with homework help, enrichment activities, and character development.",
              href: "/programs/after-school",
            },
          ].map((program) => (
            <Card key={program.href} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
                <CardDescription className="text-base font-medium text-primary">
                  {program.ageRange}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{program.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={program.href}>Learn more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. HOW ENROLLMENT WORKS */}
      <section className="py-12 md:py-16" aria-label="How enrollment works">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">How Enrollment Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Getting started is simple. We're here to guide you every step of the way.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Explore Programs",
              description:
                "Learn about our age-appropriate programs and find the right fit for your child's needs and schedule.",
            },
            {
              step: "2",
              title: "Visit & Tour",
              description:
                "Schedule a tour to see our classrooms, meet our teachers, and experience our warm, welcoming environment.",
            },
            {
              step: "3",
              title: "Enroll & Prepare",
              description:
                "Complete enrollment paperwork and prepare for your child's first day. We'll help make the transition smooth.",
            },
          ].map((item) => (
            <Card key={item.step} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/enrollment">View Enrollment & Tuition Details</Link>
          </Button>
        </div>
      </section>

      {/* 5. TRUST & SAFETY SECTION */}
      <section className="py-12 md:py-16" aria-label="Why families trust us">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Safety & Quality */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">Why Families Trust Us</h2>
            <ul className="mb-8 space-y-4">
              {[
                "Licensed and accredited programs",
                "Secure entry and check-in systems",
                "Daily health & safety protocols",
                "Background-checked, qualified teachers",
                "Small class sizes for individual attention",
                "Regular communication with parents",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4">
                State Licensed
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Accredited Program
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Quality Rated
              </Badge>
            </div>
          </div>
          {/* Right: Testimonials */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">What Parents Say</h2>
            <div className="space-y-6">
              {[
                {
                  quote:
                    "We found peace of mind knowing our daughter is safe, loved, and learning. The teachers truly care, and we see biblical values being taught every day.",
                  author: "Sarah M.",
                  details: "Mom of a 3-year-old at Northside Center",
                },
                {
                  quote:
                    "The quality of care is exceptional, and our son has grown so much socially and academically. We're grateful for the biblical foundations being woven into everything.",
                  author: "Michael T.",
                  details: "Dad of a 4-year-old at Riverside Center",
                },
                {
                  quote:
                    "As working parents, we needed somewhere we could trust completely. Lionheart has exceeded our expectations in every way—quality, safety, and faith integration.",
                  author: "Jennifer L.",
                  details: "Mom of twins, 2 years old, at Downtown Center",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="mb-4 text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.details}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL PROOF OF ENVIRONMENT */}
      <section className="py-12 md:py-16" aria-label="Our learning environments">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Our Learning Environments</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See where your child will learn, play, and grow in faith.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Infant classroom", description: "Safe, nurturing spaces for our youngest learners" },
            { name: "Toddler art area", description: "Creative exploration and sensory play" },
            { name: "Preschool learning center", description: "Hands-on activities and discovery" },
            { name: "Outdoor playground", description: "Safe outdoor play and physical development" },
          ].map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-medium text-muted-foreground">
                    {image.name}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground/70">
                    {image.description}
                  </span>
                </div>
              </div>
              {/* In production, replace with: */}
              {/* <Image
                src={`/gallery/${index + 1}.jpg`}
                alt={image.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              /> */}
            </div>
          ))}
        </div>
      </section>

      {/* 7. BRAND STORY / CURRICULUM SECTION */}
      <section className="py-12 md:py-16" aria-label="Our approach to early learning">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">Our Approach to Early Learning</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Lionheart Children's Academy, we believe every child is uniquely created and
                deserves exceptional care. Our approach combines the highest quality early education
                with biblical foundations, nurturing your child's mind, body, and spirit.
              </p>
              <p>
                We understand that choosing childcare is one of the most important decisions you'll
                make as a parent. That's why we're committed to providing peace of mind through
                safe, loving environments where children can thrive academically, socially, and
                spiritually.
              </p>
              <p>
                Our curriculum is designed to prepare children for school success while instilling
                biblical values like kindness, respect, and compassion. Through play-based learning,
                hands-on activities, and intentional character development, we help children grow
                into confident learners and caring individuals.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/curriculum">Learn More About Our Curriculum</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "Play-Based Learning",
                description:
                  "Children learn best through play. Our activities are designed to be engaging, fun, and educational.",
              },
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "School Readiness Skills",
                description:
                  "We prepare children for kindergarten success with age-appropriate academic foundations and social skills.",
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: "Social-Emotional Development",
                description:
                  "Building character, empathy, and emotional intelligence through biblical values and daily interactions.",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-3 text-primary">{item.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESOURCES / BLOG TEASER */}
      <section className="py-12 md:py-16" aria-label="Parent resources">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Parent Resources</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Helpful tips and resources to support you on your parenting journey.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Preparing Your Child for Their First Day",
              description:
                "Tips to help ease the transition and make your child's first day of daycare a positive experience.",
              href: "/resources/first-day",
            },
            {
              title: "Establishing Healthy Sleep Routines",
              description:
                "How to create consistent sleep schedules that support your child's development and well-being.",
              href: "/resources/sleep-routines",
            },
            {
              title: "Potty Training Tips & Strategies",
              description:
                "A parent-friendly guide to potty training, including signs of readiness and practical approaches.",
              href: "/resources/potty-training",
            },
          ].map((resource) => (
            <Card key={resource.href} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0">
                  <Link href={resource.href}>Read more →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 9. HOME PAGE CTA AT BOTTOM */}
      <section id="tour-form" className="py-16 md:py-20" aria-label="Schedule a tour">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-12 pb-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                Ready to Visit?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Schedule a tour to see our classrooms, meet our teachers, and experience the
                Lionheart difference. We're here to answer your questions and help you find the
                perfect fit for your family.
              </p>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="text-base font-semibold">
                  <Link href="/#tour-form">Schedule a Tour</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                  <Link href="/contact">Request Info</Link>
                </Button>
              </div>
              {/* Simple Inline Form */}
              <form onSubmit={handleTourFormSubmit} className="mx-auto mt-8 max-w-md space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tour-name">Name</Label>
                    <Input id="tour-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tour-email">Email</Label>
                    <Input id="tour-email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tour-child-age">Child's Age</Label>
                  <Input
                    id="tour-child-age"
                    type="text"
                    placeholder="e.g., 2 years old"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full text-base font-semibold">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Tour
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
