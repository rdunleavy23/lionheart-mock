"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Search, 
  ChevronRight, 
  Clock, 
  Calendar,
  CheckCircle2,
  Phone,
} from "lucide-react";
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
  return (
    <div className="flex flex-col">
      {/* Search and Filter - Responsive */}
      <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search city or ZIP..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-12 sm:h-10 text-base sm:text-sm"
            aria-label="Search locations"
          />
        </div>
        <Select value={stateFilter} onValueChange={onStateFilterChange}>
          <SelectTrigger className="h-12 sm:h-10 sm:w-[140px] text-base sm:text-sm">
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

      {/* Results */}
      {locations.length === 0 ? (
        <div className="py-16 text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-medium">No centers found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Results count - Hidden on mobile, visible on desktop */}
          <p className="hidden lg:block text-xs text-muted-foreground pb-1">
            {locations.length} center{locations.length !== 1 ? "s" : ""}
          </p>

          {/* Location Cards - Responsive sizing */}
          <div className="space-y-2 sm:space-y-1.5">
            {locations.map((location) => {
              const isSelected = selectedLocation.slug === location.slug;
              return (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  onMouseEnter={() => onLocationSelect(location)}
                  onFocus={() => onLocationSelect(location)}
                  onClick={() => onLocationSelect(location)}
                  className={`
                    flex items-center justify-between gap-3 
                    p-4 sm:p-3
                    rounded-xl sm:rounded-lg 
                    border transition-all 
                    active:scale-[0.98]
                    ${isSelected 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border/50 bg-card hover:bg-accent/30 hover:border-border"
                    }
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-base sm:text-sm">
                        {location.city}, {location.state.split(" ")[0].slice(0, 2).toUpperCase()}
                      </h3>
                      {location.distance && (
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {formatDistance(location.distance)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Mon-Fri
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        Open
                      </span>
                    </div>
                    {/* Phone - visible on mobile for quick tap-to-call */}
                    {location.phone && (
                      <a 
                        href={`tel:${location.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline sm:hidden"
                      >
                        <Phone className="h-3 w-3" />
                        {location.phone}
                      </a>
                    )}
                  </div>
                  <ChevronRight className={`h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA - Responsive */}
          <div className="mt-4 p-4 sm:p-3 rounded-xl sm:rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-8 sm:w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Ready to visit?</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Meet our teachers in person</p>
              </div>
              <Button asChild size="sm" className="flex-shrink-0">
                <Link href="/#tour-form">Schedule Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
