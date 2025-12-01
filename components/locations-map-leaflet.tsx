"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import type { Location } from "@/lib/locations-data";
import { getDirectionsUrl } from "@/lib/maps";

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface LocationsMapLeafletProps {
  locations: Location[];
  selectedLocation: Location;
  onLocationSelect: (location: Location) => void;
  userLocation?: { lat: number; lng: number } | null;
}

// Component to update map center when location changes
function MapUpdater({
  center,
}: {
  center: [number, number];
}) {
  const MapUpdaterInner = dynamic(
    () =>
      import("react-leaflet").then((mod) => {
        function Inner() {
          const map = mod.useMap();
          React.useEffect(() => {
            map.setView(center, map.getZoom() > 10 ? map.getZoom() : 12);
          }, [center, map]);
          return null;
        }
        return Inner;
      }),
    { ssr: false }
  );
  return <MapUpdaterInner />;
}

export function LocationsMapLeaflet({
  locations,
  selectedLocation,
  onLocationSelect,
  userLocation,
}: LocationsMapLeafletProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll map into view on mobile when location changes
  React.useEffect(() => {
    if (mapRef.current && window.innerWidth < 768) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedLocation]);

  const center: [number, number] = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : [39.5, -98.35]; // Center of USA

  // Fix for Leaflet marker icons in Next.js
  React.useEffect(() => {
    if (isClient) {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      });
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Map View
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a location on the left to see it highlighted on the map.
          </p>
        </div>
        <Card className="overflow-hidden border shadow-md">
          <div className="relative min-h-[60vh] w-full bg-muted/30 md:min-h-[70vh]">
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Map View
        </h2>
        <p className="text-sm text-muted-foreground">
          Select a location on the left to see it highlighted on the map.
        </p>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden border shadow-md">
        <div
          ref={mapRef}
          className="relative min-h-[60vh] w-full md:min-h-[70vh] md:sticky md:top-20"
        >
          <MapContainer
            center={center}
            zoom={selectedLocation ? 12 : 4}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            scrollWheelZoom={true}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedLocation && (
              <MapUpdater
                center={[selectedLocation.latitude, selectedLocation.longitude]}
              />
            )}

            {locations.map((location) => {
              const isSelected = selectedLocation.slug === location.slug;
              return (
                <Marker
                  key={location.slug}
                  position={[location.latitude, location.longitude]}
                  eventHandlers={{
                    click: () => onLocationSelect(location),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-sm">{location.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {location.city}, {location.state}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

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
                  <p className="text-muted-foreground">
                    {selectedLocation.fullAddress}
                  </p>
                </div>
                <div className="flex flex-col gap-2 border-t pt-3">
                  <a
                    href={getDirectionsUrl(selectedLocation, userLocation || undefined)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </a>
                  {selectedLocation.phone && (
                    <a
                      href={`tel:${selectedLocation.phone}`}
                      className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      Call Center
                    </a>
                  )}
                  {selectedLocation.email && (
                    <a
                      href={`mailto:${selectedLocation.email}`}
                      className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </a>
                  )}
                </div>
                <div className="border-t pt-3">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={`/locations/${selectedLocation.slug}`}>
                      View Details
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
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
              <p className="text-muted-foreground">
                {selectedLocation.fullAddress}
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t pt-3">
              <a
                href={getDirectionsUrl(selectedLocation, userLocation || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
              {selectedLocation.phone && (
                <a
                  href={`tel:${selectedLocation.phone}`}
                  className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  Call Center
                </a>
              )}
              {selectedLocation.email && (
                <a
                  href={`mailto:${selectedLocation.email}`}
                  className="flex items-center gap-2 text-sm text-primary transition-colors hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              )}
            </div>
            <div className="border-t pt-3">
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={`/locations/${selectedLocation.slug}`}>
                  View Details
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
