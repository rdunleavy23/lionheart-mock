"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

export function HomeLocationSearch() {
  const [searchQuery, setSearchQuery] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Searching for locations near:", searchQuery);
    // Placeholder: In future version, this will show nearby locations
    alert("We'll show nearby locations here in a future update.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location-search-input" className="text-base">
          ZIP code or city
        </Label>
        <div className="flex gap-2">
          <Input
            id="location-search-input"
            type="text"
            placeholder="e.g., 75001 or Dallas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            aria-label="ZIP code or city for location search"
          />
          <Button type="submit">
            <MapPin className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
