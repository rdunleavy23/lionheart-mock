"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "@/lib/distance";
import type { Location } from "@/lib/locations-data";

interface LocationsListProps {
  locations: Location[];
  allLocations: Location[];
  selectedLocation: Location;
  onLocationSelect: (location: Location) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stateFilter: string;
  onStateFilterChange: (state: string) => void;
  states: string[];
}

export function LocationsList({
  locations,
  selectedLocation,
  onLocationSelect,
  searchQuery,
  onSearchChange,
  stateFilter,
  onStateFilterChange,
  states,
}: LocationsListProps) {
  // Group locations by state
  const locationsByState = React.useMemo(() => {
    const grouped: Record<string, Location[]> = {};
    locations.forEach((location) => {
      if (!grouped[location.state]) {
        grouped[location.state] = [];
      }
      grouped[location.state].push(location);
    });
    // Sort states alphabetically
    const sortedStates = Object.keys(grouped).sort();
    return sortedStates.map((state) => ({
      state,
      locations: grouped[state].sort((a, b) => a.city.localeCompare(b.city)),
    }));
  }, [locations]);

  return (
    <div className="flex flex-col">
      {/* Search and Filter Toolbar */}
      <div className="mb-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location-search" className="text-sm font-medium">
            Search by city or ZIP
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="location-search"
              type="text"
              placeholder="Enter city or ZIP"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
              aria-label="Search locations by city or ZIP code"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="state-filter" className="text-sm font-medium">
            Filter by state
          </Label>
          <Select value={stateFilter} onValueChange={onStateFilterChange}>
            <SelectTrigger id="state-filter" aria-label="Filter locations by state">
              <SelectValue placeholder="All states" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All states</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      {locations.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No locations found. Try adjusting your search.</p>
        </div>
      ) : (
        <>
          {/* Locations grouped by state */}
          <div className="flex-grow space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Browse by State</h2>
            {locationsByState.map(({ state, locations: stateLocations }) => (
              <div key={state} className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">{state}</h3>
                <ul className="space-y-1" role="list">
                  {stateLocations.map((location) => {
                    const isSelected = selectedLocation.slug === location.slug;
                    return (
                      <li key={location.slug}>
                        <button
                          onClick={() => onLocationSelect(location)}
                          className={`group w-full rounded-lg border-l-4 px-3 py-2.5 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                            isSelected
                              ? "border-primary bg-primary/5 font-medium text-foreground shadow-sm"
                              : "border-transparent bg-background text-muted-foreground hover:border-primary/30 hover:bg-accent/50 hover:text-accent-foreground"
                          }`}
                          aria-pressed={isSelected}
                          aria-current={isSelected ? "true" : undefined}
                          aria-label={`Select ${location.label || location.name} location`}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin
                              className={`h-4 w-4 flex-shrink-0 ${
                                isSelected ? "text-primary" : "text-muted-foreground"
                              }`}
                            />
                            <span>
                              {location.label ||
                                `${location.city}, ${location.state.slice(0, 2).toUpperCase()}`}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Schedule Tour CTA */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold text-foreground">Ready to Visit?</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a tour to see our classrooms and meet our teachers in person.
                </p>
                <Button asChild size="lg" className="w-full font-semibold">
                  <Link href="/#tour-form">Schedule a Tour</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
