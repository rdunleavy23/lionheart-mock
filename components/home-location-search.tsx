"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";

export function HomeLocationSearch() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  }

  return (
    <div className="space-y-4">
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(false);
              }}
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

      {showResults && (
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                In the full site, you'll see nearby Lionheart centers here based on your search.
              </p>
              <Button asChild>
                <Link href="/locations">
                  Browse all locations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
