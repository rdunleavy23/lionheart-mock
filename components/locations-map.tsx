"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import type { Location } from "@/app/(marketing)/locations/page";

interface LocationsMapProps {
  locations: Location[];
  selectedLocation: Location;
  onLocationSelect: (location: Location) => void;
}

// Approximate USA bounds for normalizing coordinates
const USA_BOUNDS = {
  minLat: 24.396308,
  maxLat: 49.384358,
  minLng: -125.0,
  maxLng: -66.93457,
};

// Convert lat/lng to percentage position within USA bounds
function normalizeCoordinates(lat: number, lng: number) {
  const latPercent = ((lat - USA_BOUNDS.minLat) / (USA_BOUNDS.maxLat - USA_BOUNDS.minLat)) * 100;
  const lngPercent = ((lng - USA_BOUNDS.minLng) / (USA_BOUNDS.maxLng - USA_BOUNDS.minLng)) * 100;
  return {
    top: `${100 - latPercent}%`, // Invert because CSS top starts from top
    left: `${lngPercent}%`,
  };
}

export function LocationsMap({
  locations,
  selectedLocation,
  onLocationSelect,
}: LocationsMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  // Scroll map into view on mobile when location changes
  React.useEffect(() => {
    if (mapRef.current && window.innerWidth < 768) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedLocation]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2 text-2xl font-semibold text-foreground">Map View</h2>
        <p className="text-sm text-muted-foreground">
          Select a location on the left to see it highlighted on the map.
        </p>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden border shadow-md">
        <div
          ref={mapRef}
          className="relative min-h-[60vh] w-full overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 md:min-h-[70vh] md:sticky md:top-20"
          role="img"
          aria-label="Map showing Lionheart Children's Academy locations across multiple states"
        >
          {/* Subtle grid pattern overlay for map-like appearance */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Location Markers */}
          {locations.map((location) => {
            const position = normalizeCoordinates(location.latitude, location.longitude);
            const isSelected = selectedLocation.slug === location.slug;

            return (
              <button
                key={location.slug}
                onClick={() => onLocationSelect(location)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isSelected ? "z-10 scale-125" : "z-0 hover:scale-110"
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                }}
                aria-label={`${location.name} location marker`}
              >
                <MapPin
                  className={`h-6 w-6 drop-shadow-lg transition-colors ${
                    isSelected
                      ? "fill-primary text-primary"
                      : "fill-muted-foreground/60 text-muted-foreground/40 hover:fill-primary/70 hover:text-primary/70"
                  }`}
                />
                {isSelected && (
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow-md">
                    {location.name}
                  </div>
                )}
              </button>
            );
          })}

          {/* Selected Location Info Card */}
          <div className="absolute bottom-4 left-4 right-4 z-20 md:right-auto md:w-80">
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-foreground">
                    {selectedLocation.city}, {selectedLocation.state}
                  </p>
                  <p className="text-muted-foreground">{selectedLocation.fullAddress}</p>
                </div>
                <div className="flex flex-col gap-2 border-t pt-3">
                  <button
                    className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                    aria-label={`Get directions to ${selectedLocation.name}`}
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                    aria-label={`Call ${selectedLocation.name}`}
                  >
                    <Phone className="h-4 w-4" />
                    Call Center
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                    aria-label={`Email ${selectedLocation.name}`}
                  >
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </button>
                </div>
                <div className="border-t pt-3">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/locations/${selectedLocation.slug}`}>
                      View Details
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>

      {/* Location Details (Mobile-friendly alternative view) */}
      <div className="md:hidden">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {selectedLocation.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">
                {selectedLocation.city}, {selectedLocation.state}
              </p>
              <p className="text-muted-foreground">{selectedLocation.fullAddress}</p>
            </div>
            <div className="flex flex-col gap-2 border-t pt-3">
              <button className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline">
                <MapPin className="h-4 w-4" />
                Get Directions
              </button>
              <button className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline">
                <Phone className="h-4 w-4" />
                Call Center
              </button>
              <button className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline">
                <Mail className="h-4 w-4" />
                Contact Us
              </button>
            </div>
            <div className="border-t pt-3">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/locations/${selectedLocation.slug}`}>
                  View Details
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
