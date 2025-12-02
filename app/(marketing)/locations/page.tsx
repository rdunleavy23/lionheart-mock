"use client";

import * as React from "react";
import { LocationsList } from "@/components/locations-list";
import { LocationsMapLeaflet } from "@/components/locations-map-leaflet";
import { useGeolocation } from "@/hooks/use-geolocation";
import { calculateDistance, sortByDistance } from "@/lib/distance";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, List, Map } from "lucide-react";
import { locations, type Location } from "@/lib/locations-data";

// Re-export for convenience
export type { Location };
export { locations };

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>(locations[0]);
  const [showMap, setShowMap] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [stateFilter, setStateFilter] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"name" | "distance">("name");
  
  // Geolocation
  const { location: geoLocation, loading: geoLoading } = useGeolocation();
  const userLocation = geoLocation?.coords 
    ? { lat: geoLocation.coords.latitude, lng: geoLocation.coords.longitude } 
    : null;

  // Filter locations
  const filteredLocations = React.useMemo(() => {
    let filtered = locations;

    if (stateFilter !== "All") {
      filtered = filtered.filter((loc) => loc.state === stateFilter);
    }

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

    if (sortBy === "distance" && userLocation) {
      return sortByDistance(filtered, userLocation.lat, userLocation.lng);
    }

    return filtered.sort((a, b) => {
      if (a.state !== b.state) return a.state.localeCompare(b.state);
      return a.city.localeCompare(b.city);
    });
  }, [searchQuery, stateFilter, userLocation, sortBy]);

  // Update selected location if filtered out
  React.useEffect(() => {
    if (!filteredLocations.find((loc) => loc.slug === selectedLocation.slug)) {
      if (filteredLocations.length > 0) {
        setSelectedLocation(filteredLocations[0]);
      }
    }
  }, [filteredLocations, selectedLocation.slug]);

  const states = React.useMemo(() => {
    return Array.from(new Set(locations.map((loc) => loc.state))).sort();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header - Responsive */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b md:static md:border-b-0 md:bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                Find Your Lionheart Center
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5 sm:text-base">
                {locations.length} centers • {states.length} states
              </p>
            </div>
            
            {/* Location & Sort Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {geoLoading && (
                <Badge variant="outline" className="gap-1.5 animate-pulse text-xs">
                  <MapPin className="h-3 w-3" />
                  Finding...
                </Badge>
              )}
              {userLocation && (
                <>
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    Near you
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSortBy(sortBy === "distance" ? "name" : "distance")}
                    className="text-xs h-7 px-2"
                  >
                    {sortBy === "distance" ? "Nearest" : "A-Z"}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Toggle - Visible below lg breakpoint */}
          <div className="mt-3 flex gap-1 p-1 bg-muted rounded-lg lg:hidden">
            <button
              onClick={() => setShowMap(false)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                !showMap
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={!showMap}
            >
              <List className="h-4 w-4" />
              <span>List</span>
              <span className="text-xs text-muted-foreground">({filteredLocations.length})</span>
            </button>
            <button
              onClick={() => setShowMap(true)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                showMap
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={showMap}
            >
              <Map className="h-4 w-4" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 pb-8">
        {/* Grid Layout - Responsive breakpoints */}
        <div className="grid gap-4 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] lg:gap-6">
          
          {/* List Panel */}
          <div 
            className={`
              ${showMap ? "hidden lg:block" : "block"}
              lg:max-h-[calc(100vh-12rem)]
              lg:overflow-y-auto 
              lg:pr-2
              lg:scrollbar-thin
            `}
          >
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

          {/* Map Panel */}
          <div 
            className={`
              ${showMap ? "block" : "hidden lg:block"}
              min-h-[400px]
              sm:min-h-[450px]
              lg:min-h-0
              lg:h-[calc(100vh-12rem)]
              lg:sticky
              lg:top-24
              rounded-lg
              overflow-hidden
            `}
          >
            <LocationsMapLeaflet
              locations={filteredLocations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
              userLocation={userLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
