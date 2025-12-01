"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ArrowRight, Loader2, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeolocation } from "@/hooks/use-geolocation";

export function HomeLocationSearch() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const { location: userLocation, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();

  // Auto-fill with user location if available
  React.useEffect(() => {
    if (userLocation && !searchQuery) {
      // Could use reverse geocoding here, but for now just enable search
      setSearchQuery(userLocation.coords.latitude.toFixed(2) + ", " + userLocation.coords.longitude.toFixed(2));
    }
  }, [userLocation]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay for better UX feedback
      setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 500);
    }
  }

  function handleUseLocation() {
    if (!userLocation && !geoLoading) {
      requestLocation();
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Mobile: Simplified label, auto-detect location */}
        <div className="flex items-center justify-between">
          <label htmlFor="location-search-input" className="text-sm font-medium text-foreground sr-only sm:not-sr-only">
            ZIP code or city
          </label>
          {!userLocation && !geoLoading && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleUseLocation}
              className="text-xs sm:text-sm h-8 sm:h-9"
            >
              <Navigation className="mr-1.5 h-3.5 w-3.5" />
              Use my location
            </Button>
          )}
        </div>
        
        {/* Mobile: Full-width input, button below for thumb-reachability */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="location-search-input"
            type="text"
            placeholder={userLocation ? "Searching near you..." : "e.g., 75001 or Dallas"}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(false);
            }}
            className={cn(
              "flex-1 h-12 text-base", // Larger on mobile (48px)
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "sm:h-11" // Standard size on desktop
            )}
            aria-label="ZIP code or city for location search"
            disabled={isSearching || geoLoading}
            autoComplete="postal-code"
          />
          <Button 
            type="submit" 
            className="w-full sm:w-auto min-w-[120px] h-12 sm:h-11 font-semibold"
            disabled={isSearching || !searchQuery.trim() || geoLoading}
          >
            {isSearching || geoLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </form>

      {showResults && (
        <div className="border-2 border-primary/20 rounded-lg bg-primary/5 p-4 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              In the full site, you'll see nearby Lionheart centers here based on your search.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto min-h-[52px] font-semibold">
              <Link href="/locations">
                Browse all locations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
