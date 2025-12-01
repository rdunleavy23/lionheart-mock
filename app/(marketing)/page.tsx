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
} from "lucide-react";
import { HomeLocationSearch } from "@/components/home-location-search";
import { HomeTourForm } from "@/components/home-tour-form";
import { programs } from "@/lib/programs-data";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-16">
      {/* 1. HERO SECTION */}
      <section aria-label="Hero section">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 md:items-center">
          {/* Left: Headline, Copy, CTAs, Trust Bar */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Quality childcare rooted in Christ's love.
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed">
              A safe, joyful place where children are known, loved, and equipped to thrive—academically, socially, and spiritually. 
              We welcome families of all backgrounds, offering exceptional early education with biblical foundations that prepare 
              your child for school success while nurturing their heart and character.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base font-semibold">
                <Link href="#location-search">Find a location</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                <Link href="#tour-form">Schedule a tour</Link>
              </Button>
            </div>
            {/* Trust Bar */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Shield className="mr-1.5 h-3.5 w-3.5" />
                Licensed & accredited
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Heart className="mr-1.5 h-3.5 w-3.5" />
                Christ-centered care
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                Loving, trained teachers
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                School readiness focus
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

      {/* 3. WHY LIONHEART */}
      <section aria-label="Why families choose Lionheart">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Why families choose Lionheart
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At Lionheart Children's Academy, we believe every child is uniquely created and deserves 
              exceptional care. Our Christ-centered approach means your child will experience genuine 
              love and acceptance, while our high-quality early education curriculum prepares them for 
              school success. We integrate biblical values naturally—teaching kindness, respect, and 
              compassion through daily interactions and age-appropriate Bible stories.
            </p>
            <p>
              Safety and security are foundational. Every center is licensed and accredited, with secure 
              entry systems, background-checked staff, and rigorous health protocols. Our teachers are 
              trained professionals who genuinely care about your child's development—academically, 
              socially, and spiritually.
            </p>
            <p>
              We welcome families of all backgrounds. Whether you're actively involved in a church or 
              simply seeking trustworthy, loving care for your child, you'll find a warm, inclusive 
              environment where your family belongs. Our faith-forward approach is never exclusive or 
              harsh—it's simply part of who we are and how we care for children.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="mb-3 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle>Rooted in Christ's love</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every interaction is guided by biblical values of love, kindness, and respect. Your child 
                will experience genuine care that reflects Christ's love.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-3 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Exceptional teachers & curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our trained educators use research-based early learning approaches that prepare children 
                for kindergarten success while nurturing their natural curiosity.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-3 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle>Safe, secure environments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Licensed and accredited centers with secure entry systems, health protocols, and 
                background-checked staff give you peace of mind.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-3 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Support for working families</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Flexible schedules, extended hours, and regular communication help busy parents balance 
                work and family life with confidence.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. PROGRAMS BY AGE */}
      <section aria-label="Programs by age">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Programs by age</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every child is unique. Our age-appropriate programs nurture development at each stage, 
            combining exceptional care with biblical foundations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
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
                  <Link href={program.href}>Explore {program.name}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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

      {/* 6. TRUST, SAFETY, AND SPIRITUAL CARE */}
      <section aria-label="Safety, trust, and spiritual care">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Safety & Trust Bullets */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              Safety, trust, and spiritual care
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Licensed and accredited programs:</strong> Every 
                  Lionheart center meets or exceeds state licensing requirements and maintains 
                  accreditation standards.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Security:</strong> Secure entrances, check-in/out 
                  systems, and controlled access ensure your child's safety throughout the day.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Healthy routines and cleanliness:</strong> Daily 
                  health checks, regular cleaning protocols, and age-appropriate hygiene practices keep 
                  children healthy and safe.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Background checks and ongoing training:</strong> All 
                  staff undergo thorough background checks and receive continuous training in child 
                  development, safety, and best practices.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Faithful, Christ-following staff:</strong> Our 
                  teachers and caregivers model Jesus' love through their daily interactions—showing 
                  patience, kindness, and genuine care for each child.
                </span>
              </li>
            </ul>
          </div>
          {/* Right: Testimonials */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">What families say</h2>
            <div className="space-y-6">
              {[
              {
                quote: "We found peace of mind knowing our daughter is safe, loved, and learning. The teachers truly care, and we see biblical values being taught every day. As a Christian family, we appreciate the faith integration, but we also know families of all backgrounds feel welcome here.",
                author: "Sarah M.",
                details: "Mom of a 3-year-old in Plano, TX",
              },
              {
                quote: "The quality of care is exceptional, and our son has grown so much socially and academically. We're grateful for the biblical foundations being woven into everything. The communication from teachers is excellent, and we feel like true partners in our child's development.",
                author: "Michael T.",
                details: "Dad of a 4-year-old in Arlington, TX",
              },
              {
                quote: "As working parents, we needed somewhere we could trust completely. Lionheart has exceeded our expectations in every way—quality, safety, and faith integration. Our daughter loves going to 'school' and comes home talking about Bible stories and showing us what she learned.",
                author: "Jennifer L.",
                details: "Mom of twins, 2 years old, in McKinney, TX",
              },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
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

      {/* 7. VISUAL PROOF OF ENVIRONMENT */}
      <section aria-label="See our classrooms">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">See our classrooms</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Take a peek inside our warm, inviting learning environments where children explore, create, 
            and grow.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Infant classroom",
              description: "Safe, nurturing spaces for our youngest learners",
              alt: "Infant classroom at Lionheart Children's Academy",
            },
            {
              name: "Toddler play area",
              description: "Creative exploration and sensory play",
              alt: "Toddler play area at Lionheart Children's Academy",
            },
            {
              name: "Circle time / Bible story",
              description: "Children gathered for story time and learning",
              alt: "Circle time with Bible story at Lionheart Children's Academy",
            },
            {
              name: "Outdoor playground",
              description: "Safe outdoor play and physical development",
              alt: "Outdoor playground at Lionheart Children's Academy",
            },
          ].map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Users className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
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
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              /> */}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAITHFUL LEARNING & CURRICULUM */}
      <section aria-label="Learning rooted in God's love">
        <div className="mb-8">
          <h2 className="mb-6 text-3xl font-bold text-foreground">
            Learning rooted in God's love
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At Lionheart Children's Academy, we integrate a Christ-centered worldview into everything 
              we do. This means age-appropriate Bible stories, simple worship songs, and daily prayers 
              that help children understand God's love for them. But it also means teaching kindness, 
              empathy, and character as natural expressions of faith—values that benefit all children, 
              regardless of their family's background.
            </p>
            <p>
              Our early learning curriculum is strong and research-based. We focus on language development, 
              early math concepts, social-emotional skills, and school readiness. Children learn through 
              play, hands-on activities, and intentional instruction that sparks curiosity and builds 
              confidence. We prepare your child academically while also nurturing their heart and character.
            </p>
            <p>
              Whole-child development is our goal. We believe children thrive when their mind, body, and 
              spirit are all nurtured. That's why we integrate physical activity, creative expression, 
              academic learning, and spiritual growth into each day. Your child will leave Lionheart 
              prepared for school success and equipped with values that will serve them throughout life.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Christ-centered environment",
              description: "Age-appropriate Bible stories, worship, and prayer help children understand God's love in ways that are natural and engaging. Faith is woven into daily life, not taught as a separate subject.",
            },
            {
              title: "Strong early learning curriculum",
              description: "Research-based approaches to literacy, math, science, and social studies prepare children for kindergarten success. Our curriculum meets or exceeds state early learning standards.",
            },
            {
              title: "Whole-child development: heart, mind, and character",
              description: "We nurture academic growth, physical development, social skills, emotional intelligence, and character formation. Your child will grow in every area—prepared for school and equipped for life.",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link href="/curriculum">Learn more about our curriculum</Link>
          </Button>
        </div>
      </section>

      {/* 9. PARENT RESOURCES / BLOG TEASER */}
      <section aria-label="Resources for your family">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Resources for your family</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Helpful tips and resources to support you on your parenting journey.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Helping your child with the first day of childcare",
              description: "Practical tips to ease the transition and make your child's first day a positive experience. Learn how to prepare your child (and yourself) for this important milestone.",
              href: "/resources/first-day",
            },
            {
              title: "Raising kind kids in a busy world",
              description: "Simple ways to teach kindness, empathy, and character in everyday moments. Biblical values made practical for busy families.",
              href: "/resources/kindness",
            },
            {
              title: "Bedtime routines that actually work",
              description: "How to create consistent sleep schedules that support your child's development and well-being. Real strategies from parents who've been there.",
              href: "/resources/bedtime",
            },
          ].map((resource) => (
            <Card key={resource.href} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  {resource.description}
                </CardDescription>
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

      {/* 10. BOTTOM CTA + TOUR FORM */}
      <section id="tour-form" aria-label="Schedule a tour">
        <div className="rounded-lg bg-primary/5 p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Ready to see Lionheart in person?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Schedule a tour to see our classrooms, meet our teachers, and experience the Lionheart 
              difference firsthand. We're here to answer your questions and help you find the perfect 
              fit for your family.
            </p>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <HomeTourForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
