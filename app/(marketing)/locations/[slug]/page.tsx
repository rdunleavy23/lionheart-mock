import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  ArrowLeft,
  Shield,
  CheckCircle,
  Star,
} from "lucide-react";
import { locations, type Location } from "@/lib/locations-data";
import { getDirectionsUrl } from "@/lib/maps";
import { getAgeGroupInfo, formatAddress } from "@/lib/location-helpers";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = locations.find((loc) => loc.slug === params.slug);

  if (!location) {
    return {
      title: "Location Not Found | Lionheart Children's Academy",
    };
  }

  const shortName = location.shortName || location.city;
  const description = location.director
    ? `Visit ${location.name} in ${location.city}, ${location.state}. Led by ${location.director.name}, we provide exceptional early education with biblical foundations. Schedule a tour today.`
    : `Visit ${location.name} in ${location.city}, ${location.state}. Exceptional early education with biblical foundations. Schedule a tour today.`;

  return {
    title: `${location.name} | Lionheart Children's Academy`,
    description,
    openGraph: {
      title: `${location.name} | Lionheart Children's Academy`,
      description: `High-quality early education in ${location.city}, ${location.state}. Combining faith and academic excellence.`,
      type: "website",
    },
  };
}

export default function LocationDetailPage({ params }: Props) {
  const location = locations.find((loc) => loc.slug === params.slug);

  if (!location) {
    notFound();
  }

  const shortName = location.shortName || location.city;
  const addressParts = formatAddress(location.fullAddress);
  const defaultHours = "Monday - Friday, 7:00 AM - 6:00 PM";
  const hours = location.hours || defaultHours;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      {/* Back Link */}
      <div className="py-6">
        <Link
          href="/locations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Locations
        </Link>
      </div>

      {/* HERO / HEADER SECTION */}
      <section className="py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column: Title, Meta Info, CTAs */}
          <div>
            <Badge variant="secondary" className="mb-4">
              {location.state}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {location.name}
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Private preschool and child care in {location.city}
              {location.neighborhood ? `, ${location.neighborhood}` : ""}, {location.state.split(" ")[0]}.
            </p>
            <Badge variant="outline" className="mb-6">
              Now Enrolling
            </Badge>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/#tour-form">Schedule a Tour</Link>
              </Button>
              {location.phone && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-semibold"
                >
                  <a href={`tel:${location.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Center
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Image/Map Preview */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {shortName} Center Photo
                </span>
              </div>
            </div>
            {/* In production, replace with actual hero image */}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: location.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: addressParts[0] || location.fullAddress,
              addressLocality: location.city,
              addressRegion: location.state,
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.latitude,
              longitude: location.longitude,
            },
            telephone: location.phone,
            email: location.email,
          }),
        }}
      />

      {/* ESSENTIAL INFO CARD */}
      <section className="mb-12">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Essential Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Address</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                      {addressParts.map((part, i) => (
                        <p key={i} className="text-muted-foreground">
                          {part}
                        </p>
                      ))}
                    </div>
                  </div>
                  <a
                    href={getDirectionsUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    Get directions →
                  </a>
                </div>
                {location.phone && (
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Phone</h3>
                    <a
                      href={`tel:${location.phone}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{location.phone}</span>
                    </a>
                  </div>
                )}
                {location.email && (
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Email</h3>
                    <a
                      href={`mailto:${location.email}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="h-5 w-5" />
                      <span>{location.email}</span>
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Hours</h3>
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{hours}</p>
                  </div>
                </div>
                {location.ageGroups && location.ageGroups.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      Age Groups Served
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.ageGroups.map((ageGroup) => {
                        const info = getAgeGroupInfo(ageGroup);
                        return (
                          <Link
                            key={ageGroup}
                            href={`/programs/${info.slug}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {info.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ACCREDITATION & SAFETY */}
      {(location.accreditation && location.accreditation.length > 0) && (
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-foreground">
            Licensed & Accredited
          </h2>
          <div className="mb-6 flex flex-wrap gap-2">
            {location.accreditation.map((acc, i) => (
              <Badge key={i} variant="secondary" className="text-sm">
                <CheckCircle className="mr-1 h-3 w-3" />
                {acc}
              </Badge>
            ))}
          </div>
          <div className="rounded-lg bg-muted/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Shield className="h-5 w-5" />
              Safety Practices
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Secure entry and check-in system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Daily health & safety checks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Background-checked, trained staff</span>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* LOCATION GALLERY */}
      {location.gallery && location.gallery.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-foreground">
            Inside our {shortName} center
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {location.gallery.map((image, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{image}</span>
                  </div>
                </div>
                {/* In production, replace with: */}
                {/* <Image
                  src={`/locations/${location.slug}/${image}`}
                  alt={`${image} at ${location.name}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                /> */}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MEET THE DIRECTOR / TEAM */}
      {location.director && (
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-foreground">
            Meet our director
          </h2>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl">
                    {location.director.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold text-foreground">
                    {location.director.name}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {location.director.role}
                  </p>
                  <p className="text-muted-foreground">
                    {location.director.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {location.staff && location.staff.length > 0 && (
            <>
              <h3 className="mb-4 text-xl font-semibold text-foreground">
                Our team
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {location.staff.slice(0, 3).map((member, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="mb-3 h-16 w-16">
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold text-foreground">
                          {member.name}
                        </h4>
                        <p className="mb-2 text-sm text-muted-foreground">
                          {member.role}
                        </p>
                        {member.bio && (
                          <p className="text-xs text-muted-foreground">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* PROGRAMS AT THIS LOCATION */}
      {location.ageGroups && location.ageGroups.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-foreground">
            Programs at this center
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {location.ageGroups.map((ageGroup) => {
              const info = getAgeGroupInfo(ageGroup);
              return (
                <Card key={ageGroup}>
                  <CardHeader>
                    <CardTitle className="text-lg">{info.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Ages {info.ageRange}
                    </p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Our {info.label.toLowerCase()} program at {shortName} provides
                      age-appropriate learning experiences that nurture your child's
                      development while integrating biblical values.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/programs/${info.slug}`}>
                        Learn about this program →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* ENROLLMENT & FAQ */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-semibold text-foreground">
          Enrollment & FAQs
        </h2>
        <p className="mb-6 text-muted-foreground">
          Every center has its own enrollment timing and availability. Here's how it
          works at {shortName}.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="enroll">
            <AccordionTrigger>How do I enroll at this center?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The best way to get started is to schedule a tour. During your visit,
                you'll meet our director, see our classrooms, and learn about our
                programs. After the tour, we'll provide enrollment information and
                availability. You can schedule a tour online or call us directly at{" "}
                {location.phone || "the number listed above"}.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="waitlist">
            <AccordionTrigger>Is there a waitlist?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Availability varies by age group and program. Some programs may have
                immediate openings, while others may have a waitlist. We recommend
                scheduling a tour to discuss current availability and get your name on
                our waitlist if needed. We'll keep you updated as spots become available.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tuition">
            <AccordionTrigger>How do I learn about tuition?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Tuition varies by program and age group. During your tour, we'll provide
                detailed tuition information and discuss payment options, including any
                available discounts or financial assistance programs. We believe in
                transparent pricing and will answer all your questions about costs
                during your visit.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="schedule">
            <AccordionTrigger>What are the hours and schedule options?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Our center is open {hours}. We offer full-time and part-time enrollment
                options to meet your family's needs. During your tour, we'll discuss
                which schedule works best for your child and your family's routine.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* LOCATION-SPECIFIC TESTIMONIALS */}
      {location.testimonials && location.testimonials.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-semibold text-foreground">
            What families say about {shortName}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {location.testimonials.map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground">{testimonial.childAge}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* BOTTOM CTA ("Take the next step") */}
      <section className="mb-12 rounded-lg bg-primary/5 p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to visit {shortName}?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Schedule a tour to see our classrooms, meet our team, and experience the
            Lionheart difference firsthand.
          </p>

          {/* Inline Form (UI only) */}
          <div className="mb-6 rounded-lg bg-background p-6 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // In production, handle form submission
                console.log("Form submitted");
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="childAge">Child's Age</Label>
                <Input
                  id="childAge"
                  name="childAge"
                  type="text"
                  placeholder="e.g., 3 years old"
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button type="submit" size="lg" className="flex-1 font-semibold">
                  Schedule a Tour
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1 font-semibold"
                >
                  Request Info
                </Button>
              </div>
            </form>
          </div>

          <p className="text-sm text-muted-foreground">
            Or call us directly at{" "}
            {location.phone ? (
              <a
                href={`tel:${location.phone}`}
                className="font-semibold text-primary hover:underline"
              >
                {location.phone}
              </a>
            ) : (
              "the number listed above"
            )}
            .
          </p>
        </div>
      </section>
    </div>
  );
}
