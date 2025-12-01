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
  Sparkles,
  Star,
  Baby,
  GraduationCap,
  SmilePlus,
  Flower2,
  Target,
  PlayCircle,
} from "lucide-react";
import { HomeLocationSearch } from "@/components/home-location-search";
import { HomeTourForm } from "@/components/home-tour-form";
import { programs } from "@/lib/programs-data";
import { BentoGrid, BentoBox } from "@/components/bento-grid";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14 space-y-10 sm:space-y-12 md:space-y-16">
      {/* 1. HERO SECTION */}
      <section aria-label="Hero section">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 md:items-center">
          {/* Left: Headline, Copy, CTAs, Trust Bar */}
          <div className="space-y-6 sm:space-y-7">
            <h1 className="relative text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="relative z-10">Quality childcare rooted in Christ's love.</span>
              {/* Decorative organic shape */}
              <div className="absolute -left-4 -top-2 h-8 w-8 rounded-full bg-primary/20 blur-xl md:h-12 md:w-12" />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              A safe, joyful place where children are known, loved, and equipped to thrive. 
              Exceptional early education with biblical foundations that prepare your child for school success.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="text-base font-semibold">
                <Link href="#location-search">Find a location</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                <Link href="#tour-form">Schedule a tour</Link>
              </Button>
            </div>
            {/* Trust Bar */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
              <Badge variant="secondary" className="text-sm py-2 px-3 min-h-[36px] flex items-center">
                <Shield className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>Licensed & accredited</span>
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3 min-h-[36px] flex items-center">
                <Heart className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>Christ-centered care</span>
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3 min-h-[36px] flex items-center">
                <Users className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>Loving, trained teachers</span>
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-3 min-h-[36px] flex items-center">
                <BookOpen className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>School readiness focus</span>
              </Badge>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto mb-2 h-16 w-16 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Teacher sitting with a child reading a book
                </span>
              </div>
            </div>
            {/* In production, replace with: */}
            {/* <Image
              src="/hero-image.jpg"
              alt="Teacher sitting with a child reading a book"
              fill
              className="object-cover"
              priority
            /> */}
          </div>
        </div>
      </section>

      {/* 2. FIND A CENTER NEAR YOU */}
      <section id="location-search" aria-label="Find a center near you">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Find a Lionheart center near you
          </h2>
          <p className="mb-6 text-muted-foreground">
            Use your ZIP code or city to find nearby Lionheart locations. We have centers across 
            multiple states, each offering the same exceptional care and biblical foundations.
          </p>
          <Card>
            <CardContent className="pt-6">
              <HomeLocationSearch />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. WHY LIONHEART - Bento Grid */}
      <section aria-label="Why families choose Lionheart">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Why families choose Lionheart
          </h2>
          <p className="mb-6 max-w-[65ch] text-muted-foreground">
            Every child deserves exceptional care. We combine high-quality early education with biblical 
            foundations, creating a safe, loving environment where children thrive.
          </p>
        </div>
        <BentoGrid>
          {/* Large testimonial box */}
          <BentoBox size="wide">
            <Card className="h-full bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-base italic text-muted-foreground mb-3">
                  "We found peace of mind knowing our daughter is safe, loved, and learning. The teachers truly care."
                </p>
                <p className="text-sm font-semibold text-foreground">— Sarah M., Mom of a 3-year-old</p>
              </CardContent>
            </Card>
          </BentoBox>
          
          {/* Medium feature cards with varied background colors for visual interest */}
          <BentoBox size="medium">
            <Card className="h-full bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="mb-3 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Rooted in Christ's love</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every interaction is guided by biblical values of love, kindness, and respect.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
          
          <BentoBox size="medium">
            <Card className="h-full bg-accent/10 border-accent/30">
              <CardHeader>
                <div className="mb-3 text-accent-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Exceptional teachers & curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Research-based early learning approaches that prepare children for kindergarten success.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
          
          <BentoBox size="medium">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-3 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Safe, secure environments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Licensed and accredited centers with secure entry systems and background-checked staff.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
          
          <BentoBox size="medium">
            <Card className="h-full bg-secondary/20 border-secondary/40">
              <CardHeader>
                <div className="mb-3 text-secondary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Support for working families</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flexible schedules, extended hours, and regular communication for busy parents.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
        </BentoGrid>
      </section>

      {/* 4. PROGRAMS BY AGE - Bento Grid */}
      <section aria-label="Programs by age">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Programs by age</h2>
          <p className="mx-auto max-w-[65ch] text-lg text-muted-foreground">
            Age-appropriate programs that nurture development at each stage.
          </p>
        </div>
        <BentoGrid>
          {programs.map((program) => (
            <BentoBox key={program.href} size="medium">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary">
                    {program.ageRange}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={program.href}>Explore {program.name}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BentoBox>
          ))}
        </BentoGrid>
      </section>

      {/* 5. HOW ENROLLMENT WORKS */}
      <section aria-label="How enrollment works">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">How enrollment works</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Getting started with Lionheart is simple.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Connect with your local center",
              description: "Find a Lionheart center near you and reach out to learn about programs, availability, and enrollment options. Our team is ready to answer your questions and help you find the right fit for your family.",
            },
            {
              step: "2",
              title: "Visit & tour the classrooms",
              description: "Schedule a tour to see our classrooms, meet our teachers, and experience our warm, welcoming environment firsthand. You'll see how we care for children and integrate faith naturally into daily learning.",
            },
            {
              step: "3",
              title: "Enroll & prepare for your child's first day",
              description: "Complete enrollment paperwork and prepare for your child's first day. We'll guide you through every step and help make the transition smooth for both you and your child.",
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
            <Link href="/enrollment">Learn about enrollment & tuition</Link>
          </Button>
        </div>
      </section>

      {/* 6. TRUST, SAFETY, AND SPIRITUAL CARE - Bento Grid */}
      <section aria-label="Safety, trust, and spiritual care">
        <BentoGrid>
          {/* Large: Safety & Trust */}
          <BentoBox size="large">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Safety, trust, and spiritual care</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Licensed & accredited:</strong> Every center meets state requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Secure entry:</strong> Controlled access and check-in systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Health protocols:</strong> Daily checks and regular cleaning.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Trained staff:</strong> Background-checked, ongoing training.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Christ-following teachers:</strong> Model love, patience, and kindness.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </BentoBox>
          
          {/* Medium: Testimonials */}
          {[
            {
              quote: "We found peace of mind knowing our daughter is safe, loved, and learning. The teachers truly care.",
              author: "Sarah M.",
              details: "Mom of a 3-year-old",
            },
            {
              quote: "The quality of care is exceptional. Our son has grown so much socially and academically.",
              author: "Michael T.",
              details: "Dad of a 4-year-old",
            },
            {
              quote: "Lionheart exceeded our expectations—quality, safety, and faith integration.",
              author: "Jennifer L.",
              details: "Mom of twins",
            },
          ].map((testimonial, index) => (
            <BentoBox key={index} size="medium">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.details}</p>
                  </div>
                </CardContent>
              </Card>
            </BentoBox>
          ))}
        </BentoGrid>
      </section>

      {/* 7. VISUAL PROOF OF ENVIRONMENT - Fixed Spacing & Colors */}
      <section aria-label="See our classrooms">
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <SmilePlus className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">See our classrooms</h2>
            <SmilePlus className="h-6 w-6 text-primary" />
          </div>
          <p className="mx-auto max-w-[65ch] text-base text-muted-foreground">
            Warm, inviting learning environments where children explore, create, and grow.
          </p>
        </div>
        <BentoGrid>
          {[
            {
              name: "Infant classroom",
              description: "Safe, nurturing spaces",
              alt: "Infant classroom at Lionheart Children's Academy",
              icon: Users,
              size: "large" as const,
              bg: "bg-primary/10",
            },
            {
              name: "Toddler play area",
              description: "Creative exploration",
              alt: "Toddler play area at Lionheart Children's Academy",
              icon: PlayCircle,
              size: "medium" as const,
              bg: "bg-accent-mid-blue/10",
            },
            {
              name: "Circle time",
              description: "Story time and learning",
              alt: "Circle time at Lionheart Children's Academy",
              icon: BookOpen,
              size: "medium" as const,
              bg: "bg-primary/10",
            },
            {
              name: "Outdoor playground",
              description: "Safe outdoor play",
              alt: "Outdoor playground at Lionheart Children's Academy",
              icon: Flower2,
              size: "medium" as const,
              bg: "bg-accent-mid-blue/10",
            },
          ].map((image, index) => {
            const Icon = image.icon;
            return (
              <BentoBox key={index} size={image.size}>
                <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                  <div className={`relative aspect-[4/3] ${image.bg} flex items-center justify-center`}>
                    <div className="text-center">
                      <Icon className={`mx-auto mb-3 ${image.size === 'large' ? 'h-16 w-16' : 'h-12 w-12'} text-primary`} />
                      <span className="block text-sm font-semibold text-foreground">
                        {image.name}
                      </span>
                    </div>
                    {/* In production, replace with: */}
                    {/* <Image
                      src={`/gallery/${index + 1}.jpg`}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm text-muted-foreground text-center">{image.description}</p>
                    <Button asChild size="sm" variant="outline" className="w-full mt-2">
                      <Link href="/locations">Schedule Tour</Link>
                    </Button>
                  </CardContent>
                </Card>
              </BentoBox>
            );
          })}
        </BentoGrid>
      </section>

      {/* 8. FAITHFUL LEARNING & CURRICULUM - Fixed Layout & Colors */}
      <section aria-label="Learning rooted in God's love">
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Learning rooted in God's love
            </h2>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="mb-6 max-w-[65ch] mx-auto text-base text-muted-foreground">
            We integrate a Christ-centered worldview with strong early learning. Age-appropriate Bible stories, 
            research-based curriculum, and whole-child development prepare your child for school success.
          </p>
        </div>
        <BentoGrid>
          {/* Balanced 3-column layout instead of L-shape */}
          <BentoBox size="medium">
            <Card className="h-full bg-primary/10 border-2 border-primary/30">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Whole-child development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We nurture academic growth, physical development, social skills, emotional intelligence, 
                  and character formation. Your child will grow in every area—prepared for school and equipped for life.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
          
          <BentoBox size="medium">
            <Card className="h-full bg-accent-mid-blue/10 border-2 border-accent-mid-blue/30">
              <CardHeader>
                <CardTitle className="text-lg">Christ-centered environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Age-appropriate Bible stories, worship, and prayer help children understand God's love naturally.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
          
          <BentoBox size="medium">
            <Card className="h-full bg-primary/10 border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg">Strong early learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Research-based approaches to literacy, math, and social studies prepare children for kindergarten success.
                </p>
              </CardContent>
            </Card>
          </BentoBox>
        </BentoGrid>
        <div className="mt-6 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/curriculum">Learn more about our curriculum</Link>
          </Button>
        </div>
      </section>

      {/* 9. PARENT RESOURCES - Fixed Colors & Spacing */}
      <section aria-label="Resources for your family">
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Resources for your family</h2>
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <p className="mx-auto max-w-[65ch] text-base text-muted-foreground">
            Helpful tips and resources to support your parenting journey.
          </p>
        </div>
        <BentoGrid>
          {[
            {
              title: "Helping your child with the first day",
              description: "Practical tips to ease the transition and make your child's first day positive.",
              href: "/resources/first-day",
              bg: "bg-primary/10",
              border: "border-primary/30",
            },
            {
              title: "Raising kind kids",
              description: "Simple ways to teach kindness, empathy, and character in everyday moments.",
              href: "/resources/kindness",
              bg: "bg-accent-mid-blue/10",
              border: "border-accent-mid-blue/30",
            },
            {
              title: "Bedtime routines that work",
              description: "How to create consistent sleep schedules that support your child's development.",
              href: "/resources/bedtime",
              bg: "bg-primary/10",
              border: "border-primary/30",
            },
          ].map((resource, index) => (
            <BentoBox key={resource.href} size="medium">
              <Card className={`h-full flex flex-col border-2 ${resource.bg} ${resource.border}`}>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-primary/80">
                    <Link href={resource.href}>Read more →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BentoBox>
          ))}
        </BentoGrid>
      </section>

      {/* 10. BOTTOM CTA + TOUR FORM - Enhanced with Playful Elements */}
      <section id="tour-form" aria-label="Schedule a tour">
        <Card className="border-2 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl -ml-16 -mt-16" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl -mr-20 -mb-20" />
          <CardContent className="p-8 md:p-12 relative">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">
                  Ready to visit a Lionheart center?
                </h2>
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <p className="mb-8 text-lg text-muted-foreground">
                Schedule a tour to see our classrooms, meet our teachers, and experience our warm, welcoming environment.
              </p>
              <div className="mb-6 rounded-lg bg-primary/5 p-6 border border-primary/20">
                <HomeTourForm />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild variant="outline" size="lg" className="font-semibold">
                  <Link href="#location-search">Find a location</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-semibold">
                  <Link href="/programs">Explore programs</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
