import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { locations, type Location } from "@/lib/locations-data";
import { getDirectionsUrl } from "@/lib/maps";

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

  return {
    title: `${location.name} | Lionheart Children's Academy`,
    description: `Visit ${location.name} in ${location.city}, ${location.state}. Exceptional early education with biblical foundations. Schedule a tour today.`,
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

      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4">
            {location.state}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            {location.name}
          </h1>
          <div className="flex flex-col gap-2 text-lg text-muted-foreground md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{location.fullAddress}</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/#tour-form">Schedule a Tour</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-semibold"
          >
            <a
              href={getDirectionsUrl(location)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Get Directions
            </a>
          </Button>
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
              streetAddress: location.fullAddress.split(",")[0],
              addressLocality: location.city,
              addressRegion: location.state,
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }),
        }}
      />

      {/* Main Content Grid */}
      <div className="grid gap-8 pb-12 md:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Photo Gallery Placeholder */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Our Academy
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                      Photo {i} Placeholder
                    </span>
                  </div>
                  {/* In production, replace with: */}
                  {/* <Image
                    src={`/locations/${location.slug}/photo-${i}.jpg`}
                    alt={`${location.name} - Photo ${i}`}
                    fill
                    className="object-cover"
                  /> */}
                </div>
              ))}
            </div>
          </section>

          {/* Programs Offered */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Programs Offered
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "Infant Care", age: "6 weeks – 12 months" },
                { name: "Toddlers", age: "12 – 24 months" },
                { name: "Preschool", age: "2 – 4 years" },
                { name: "Pre-K & Kindergarten Prep", age: "4 – 5 years" },
                { name: "Kindergarten", age: "5 – 6 years" },
                { name: "After-School Care", age: "5 – 12 years" },
              ].map((program) => (
                <Card key={program.name}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {program.age}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* About This Location */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              About This Location
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                {location.name} provides exceptional early education with biblical
                foundations, serving families in {location.city} and the surrounding
                area. Our warm, nurturing environment combines the highest quality
                care with faith-based learning, preparing children for success in
                school and life.
              </p>
              <p>
                We understand that choosing childcare is one of the most important
                decisions you'll make as a parent. That's why we're committed to
                providing peace of mind through safe, loving environments where
                children can thrive academically, socially, and spiritually.
              </p>
              <p>
                Schedule a tour to see our classrooms, meet our teachers, and
                experience the Lionheart difference firsthand.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      {location.fullAddress}
                    </p>
                  </div>
                </div>
              </div>
              {location.phone && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Phone</p>
                      <a
                        href={`tel:${location.phone}`}
                        className="text-primary hover:underline"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {location.email && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href={`mailto:${location.email}`}
                        className="text-primary hover:underline"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Hours of Operation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Monday – Friday</p>
                    <p className="text-muted-foreground">7:00 AM – 6:00 PM</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Hours may vary by program. Contact us for specific schedule
                  information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/#tour-form">Schedule a Tour</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <a
                  href={getDirectionsUrl(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </Button>
              {location.phone && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <a href={`tel:${location.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Center
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Map Embed */}
          <Card>
            <CardHeader>
              <CardTitle>Location Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01},${location.latitude - 0.01},${location.longitude + 0.01},${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing ${location.name}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
