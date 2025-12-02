"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  Users,
  Loader2,
  Bell,
  Baby,
  Calendar,
} from "lucide-react";
import { locations } from "@/lib/locations-data";

interface ProgramAvailability {
  program: string;
  ageRange: string;
  status: "available" | "limited" | "waitlist";
  spotsAvailable?: number;
  waitlistCount?: number;
}

interface LocationAvailability {
  locationSlug: string;
  programs: ProgramAvailability[];
  lastUpdated: string;
}

// Mock availability data
const mockAvailabilityData: Record<string, ProgramAvailability[]> = {
  "plano-oak-point": [
    { program: "Infants", ageRange: "6 weeks - 1 year", status: "waitlist", waitlistCount: 3 },
    { program: "Toddlers", ageRange: "1-2 years", status: "limited", spotsAvailable: 2 },
    { program: "Two's", ageRange: "2-3 years", status: "available", spotsAvailable: 5 },
    { program: "Preschool", ageRange: "3-4 years", status: "available", spotsAvailable: 8 },
    { program: "Pre-K", ageRange: "4-5 years", status: "limited", spotsAvailable: 3 },
  ],
  default: [
    { program: "Infants", ageRange: "6 weeks - 1 year", status: "limited", spotsAvailable: 1 },
    { program: "Toddlers", ageRange: "1-2 years", status: "available", spotsAvailable: 4 },
    { program: "Two's", ageRange: "2-3 years", status: "available", spotsAvailable: 6 },
    { program: "Preschool", ageRange: "3-4 years", status: "available", spotsAvailable: 10 },
    { program: "Pre-K", ageRange: "4-5 years", status: "available", spotsAvailable: 7 },
  ],
};

interface AvailabilityCheckerProps {
  className?: string;
  defaultLocation?: string;
  showHeader?: boolean;
}

export function AvailabilityChecker({
  className,
  defaultLocation,
  showHeader = true,
}: AvailabilityCheckerProps) {
  const [selectedLocation, setSelectedLocation] = React.useState(
    defaultLocation || locations[0]?.slug || ""
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [availability, setAvailability] = React.useState<ProgramAvailability[]>(
    mockAvailabilityData[selectedLocation] || mockAvailabilityData.default
  );
  const [waitlistModalOpen, setWaitlistModalOpen] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState<string | null>(null);

  const handleLocationChange = (slug: string) => {
    setSelectedLocation(slug);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAvailability(mockAvailabilityData[slug] || mockAvailabilityData.default);
      setIsLoading(false);
    }, 500);
  };

  const selectedLocationData = locations.find((l) => l.slug === selectedLocation);

  const getStatusBadge = (status: ProgramAvailability["status"], spots?: number, waitlist?: number) => {
    switch (status) {
      case "available":
        return (
          <Badge className="status-available">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            {spots} spots
          </Badge>
        );
      case "limited":
        return (
          <Badge className="status-limited">
            <Clock className="mr-1 h-3 w-3" />
            {spots} spots
          </Badge>
        );
      case "waitlist":
        return (
          <Badge className="status-waitlist">
            <Users className="mr-1 h-3 w-3" />
            Waitlist ({waitlist})
          </Badge>
        );
    }
  };

  const getActionButton = (program: ProgramAvailability) => {
    if (program.status === "waitlist") {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedProgram(program.program);
            setWaitlistModalOpen(true);
          }}
        >
          <Bell className="mr-1 h-3 w-3" />
          Join Waitlist
        </Button>
      );
    }
    return (
      <Button size="sm">
        <Calendar className="mr-1 h-3 w-3" />
        Schedule Tour
      </Button>
    );
  };

  return (
    <div className={cn("rounded-xl bg-card p-6 shadow-lg", className)}>
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground">
            Check Availability
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time program availability at our centers
          </p>
        </div>
      )}

      {/* Location Selector */}
      <div className="mb-6">
        <Label htmlFor="location-select" className="mb-2 block">
          Select Location
        </Label>
        <Select value={selectedLocation} onValueChange={handleLocationChange}>
          <SelectTrigger id="location-select" className="w-full">
            <SelectValue placeholder="Choose a location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.slug} value={location.slug}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {location.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedLocationData && (
          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            {selectedLocationData.phone}
          </p>
        )}
      </div>

      {/* Availability Grid */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          availability.map((program, index) => (
            <motion.div
              key={program.program}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between",
                program.status === "available" && "border-green-200 bg-green-50/50",
                program.status === "limited" && "border-yellow-200 bg-yellow-50/50",
                program.status === "waitlist" && "border-red-200 bg-red-50/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <Baby className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{program.program}</h4>
                  <p className="text-sm text-muted-foreground">{program.ageRange}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                {getStatusBadge(
                  program.status,
                  program.spotsAvailable,
                  program.waitlistCount
                )}
                {getActionButton(program)}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Last Updated */}
      <p className="mt-4 text-xs text-muted-foreground/70 text-center">
        Last updated: {new Date().toLocaleDateString()} at{" "}
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>

      {/* Contact CTA */}
      <div className="mt-6 flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">Have questions about availability?</p>
        {selectedLocationData && (
          <Button variant="outline" size="sm" asChild>
            <a href={`tel:${selectedLocationData.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call {selectedLocationData.phone}
            </a>
          </Button>
        )}
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        open={waitlistModalOpen}
        onOpenChange={setWaitlistModalOpen}
        program={selectedProgram}
        location={selectedLocationData?.name || ""}
      />
    </div>
  );
}

// Waitlist signup modal
interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: string | null;
  location: string;
}

function WaitlistModal({ open, onOpenChange, program, location }: WaitlistModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Close modal after showing success
    setTimeout(() => {
      onOpenChange(false);
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
            {program} program at {location}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <p className="mt-4 font-medium text-foreground">
              You're on the waitlist!
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              We'll notify you when a spot opens up.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="waitlist-name">Your Name</Label>
              <Input id="waitlist-name" placeholder="Full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-email">Email</Label>
              <Input
                id="waitlist-email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-phone">Phone</Label>
              <Input
                id="waitlist-phone"
                type="tel"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waitlist-child-dob">Child's Date of Birth</Label>
              <Input id="waitlist-child-dob" type="date" />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Join Waitlist
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Compact availability display for location cards
interface AvailabilityBadgesProps {
  locationSlug: string;
  className?: string;
}

export function AvailabilityBadges({ locationSlug, className }: AvailabilityBadgesProps) {
  const availability = mockAvailabilityData[locationSlug] || mockAvailabilityData.default;
  
  const availableCount = availability.filter((p) => p.status === "available").length;
  const limitedCount = availability.filter((p) => p.status === "limited").length;
  const waitlistCount = availability.filter((p) => p.status === "waitlist").length;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {availableCount > 0 && (
        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
          {availableCount} programs available
        </Badge>
      )}
      {limitedCount > 0 && (
        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
          {limitedCount} limited
        </Badge>
      )}
      {waitlistCount > 0 && (
        <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
          {waitlistCount} waitlist
        </Badge>
      )}
    </div>
  );
}

