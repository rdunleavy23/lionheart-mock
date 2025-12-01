"use client";

import * as React from "react";
import { LocationsList } from "@/components/locations-list";
import { LocationsMapLeaflet } from "@/components/locations-map-leaflet";
import { useGeolocation } from "@/hooks/use-geolocation";
import { calculateDistance, formatDistance, sortByDistance } from "@/lib/distance";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { locations, type Location } from "@/lib/locations-data";

// Re-export for convenience
export type { Location };
export { locations };

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>(locations[0]);
  const [showMap, setShowMap] = React.useState(false); // Default to List on mobile
  const [searchQuery, setSearchQuery] = React.useState("");
  const [stateFilter, setStateFilter] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"name" | "distance">("name");
  
  // Geolocation
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const userLocation = latitude && longitude ? { lat: latitude, lng: longitude } : null;

  // Filter locations based on search query and state filter
  const filteredLocations = React.useMemo(() => {
    let filtered = locations;

    // Filter by state
    if (stateFilter !== "All") {
      filtered = filtered.filter((loc) => loc.state === stateFilter);
    }

    // Filter by search query (city, ZIP, or name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (loc) =>
          loc.city.toLowerCase().includes(query) ||
          loc.name.toLowerCase().includes(query) ||
          loc.state.toLowerCase().includes(query) ||
          loc.fullAddress.toLowerCase().includes(query)
      );
    }

    // Add distance to each location if user location is available
    if (userLocation) {
      filtered = filtered.map((loc) => ({
        ...loc,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          loc.latitude,
          loc.longitude
        ),
      }));
    }

    // Sort locations
    if (sortBy === "distance" && userLocation) {
      return sortByDistance(filtered, userLocation.lat, userLocation.lng);
    }

    // Sort by name (state, then city)
    return filtered.sort((a, b) => {
      if (a.state !== b.state) {
        return a.state.localeCompare(b.state);
      }
      return a.city.localeCompare(b.city);
    });
  }, [searchQuery, stateFilter, userLocation, sortBy]);

  // Update selected location if it's filtered out
  React.useEffect(() => {
    if (!filteredLocations.find((loc) => loc.slug === selectedLocation.slug)) {
      if (filteredLocations.length > 0) {
        setSelectedLocation(filteredLocations[0]);
      }
    }
  }, [filteredLocations, selectedLocation.slug]);

  // Get unique states for filter dropdown
  const states = React.useMemo(() => {
    const uniqueStates = Array.from(new Set(locations.map((loc) => loc.state))).sort();
    return uniqueStates;
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      {/* Page Header */}
      <section className="py-8 md:py-12" aria-labelledby="locations-heading">
        <h1 id="locations-heading" className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Find a Center Near You
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Browse our locations by state, or search by city or ZIP to find a center close to home or
          work. Choose a center to learn more and schedule a tour.
        </p>
        
        {/* Geolocation Status */}
        {geoLoading && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 animate-pulse" />
            Finding your location...
          </div>
        )}
        {userLocation && (
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <MapPin className="h-3 w-3" />
              Using your location
            </Badge>
            {sortBy === "name" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("distance")}
              >
                Sort by Distance
              </Button>
            )}
            {sortBy === "distance" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy("name")}
              >
                Sort by Name
              </Button>
            )}
          </div>
        )}
        {geoError && (
          <div className="mt-4 text-sm text-muted-foreground">
            {geoError}
          </div>
        )}
      </section>

      {/* Mobile Toggle */}
      <div className="mb-6 flex gap-2 md:hidden">
        <button
          onClick={() => setShowMap(false)}
          className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
            !showMap
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-muted-foreground hover:bg-accent"
          }`}
          aria-pressed={!showMap}
        >
          List
        </button>
        <button
          onClick={() => setShowMap(true)}
          className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
            showMap
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-muted-foreground hover:bg-accent"
          }`}
          aria-pressed={showMap}
        >
          Map
        </button>
      </div>

      {/* Main Content: List + Map */}
      <div className="grid gap-8 pb-12 md:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] lg:gap-10">
        {/* Left: Locations List */}
        <div className={`${showMap ? "hidden md:block" : "block"}`}>
          <LocationsList
            locations={filteredLocations}
            allLocations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            stateFilter={stateFilter}
            onStateFilterChange={setStateFilter}
            states={states}
          />
        </div>

        {/* Right: Map */}
        <div className={`${showMap ? "block" : "hidden md:block"}`}>
          <LocationsMapLeaflet
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}
