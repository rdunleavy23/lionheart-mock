"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeLocationSearch() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

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

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location-search-input" className="text-base font-medium">
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
              className={cn(
                "flex-1 h-11 text-base", // Minimum 44px height, 16px font
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
              aria-label="ZIP code or city for location search"
              disabled={isSearching}
            />
            <Button 
              type="submit" 
              className="min-w-[100px]"
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {showResults && (
        <Card className="border-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground text-base leading-relaxed">
                In the full site, you'll see nearby Lionheart centers here based on your search.
              </p>
              <Button asChild size="lg" className="min-h-[48px]">
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
