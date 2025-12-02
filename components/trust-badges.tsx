"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Shield,
  Award,
  Star,
  CheckCircle2,
  Heart,
  Users,
  Clock,
  MapPin,
  BookOpen,
  GraduationCap,
  Baby,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrustBadge {
  icon: keyof typeof iconMap;
  label: string;
  description?: string;
  value?: string;
}

const iconMap = {
  shield: Shield,
  award: Award,
  star: Star,
  check: CheckCircle2,
  heart: Heart,
  users: Users,
  clock: Clock,
  location: MapPin,
  book: BookOpen,
  graduation: GraduationCap,
  baby: Baby,
  lock: Lock,
  verified: BadgeCheck,
};

interface TrustBadgesProps {
  badges: TrustBadge[];
  className?: string;
  variant?: "inline" | "grid" | "hero" | "floating";
  animated?: boolean;
}

export function TrustBadges({
  badges,
  className,
  variant = "inline",
  animated = true,
}: TrustBadgesProps) {
  if (variant === "hero") {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-4 md:gap-6", className)}>
        {badges.map((badge, index) => {
          const Icon = iconMap[badge.icon];
          return (
            <motion.div
              key={index}
              initial={animated ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 text-white/90"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                {badge.value && (
                  <span className="font-bold text-white">{badge.value} </span>
                )}
                <span className="text-white/80">{badge.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-4", className)}>
        {badges.map((badge, index) => {
          const Icon = iconMap[badge.icon];
          return (
            <motion.div
              key={index}
              initial={animated ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-sm border transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              {badge.value && (
                <span className="text-2xl font-bold text-foreground">{badge.value}</span>
              )}
              <span className="font-medium text-foreground">{badge.label}</span>
              {badge.description && (
                <p className="mt-1 text-sm text-muted-foreground">{badge.description}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-6 md:w-auto",
          "rounded-full bg-card px-4 py-2 shadow-lg border",
          "flex items-center justify-center gap-3 md:gap-4",
          className
        )}
      >
        {badges.slice(0, 3).map((badge, index) => {
          const Icon = iconMap[badge.icon];
          return (
            <div key={index} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {badge.value && <span className="font-bold">{badge.value} </span>}
                {badge.label}
              </span>
            </div>
          );
        })}
      </motion.div>
    );
  }

  // Default: inline badges
  return (
    <div className={cn("flex flex-wrap gap-2 md:gap-3", className)}>
      {badges.map((badge, index) => {
        const Icon = iconMap[badge.icon];
        return (
          <motion.div
            key={index}
            initial={animated ? { opacity: 0, scale: 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge
              variant="secondary"
              className="gap-1.5 py-1.5 px-3 text-sm font-medium"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {badge.value && <span className="font-bold">{badge.value}</span>}
              {badge.label}
            </Badge>
          </motion.div>
        );
      })}
    </div>
  );
}

// Pre-configured badge sets
export const heroTrustBadges: TrustBadge[] = [
  { icon: "shield", label: "Licensed & Accredited" },
  { icon: "heart", label: "Christ-Centered Care" },
  { icon: "users", label: "Trained Teachers" },
  { icon: "book", label: "School Readiness" },
];

export const statsBadges: TrustBadge[] = [
  { icon: "location", label: "Locations", value: "25+" },
  { icon: "location", label: "States", value: "5" },
  { icon: "shield", label: "Licensed", value: "100%" },
  { icon: "star", label: "Rating", value: "4.9★" },
];

export const accreditationBadges: TrustBadge[] = [
  { icon: "shield", label: "State Licensed", description: "All locations fully licensed" },
  { icon: "verified", label: "Background Checked", description: "All staff verified" },
  { icon: "award", label: "Quality Rated", description: "Exceeds standards" },
  { icon: "lock", label: "Secure Entry", description: "Controlled access" },
];

// Accreditation logos section
interface AccreditationLogosProps {
  className?: string;
}

export function AccreditationLogos({ className }: AccreditationLogosProps) {
  const accreditations = [
    { name: "State Licensed", description: "Licensed by Texas HHS" },
    { name: "NECPA Member", description: "National Early Childhood Program Accreditation" },
    { name: "Texas Rising Star", description: "Quality Rating System" },
    { name: "CPR/First Aid", description: "All staff certified" },
  ];

  return (
    <div className={cn("", className)}>
      <h4 className="mb-4 text-center text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Our Accreditations & Certifications
      </h4>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {accreditations.map((acc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <span className="font-medium text-foreground text-sm">{acc.name}</span>
            <span className="text-xs text-muted-foreground">{acc.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Safety features callout
interface SafetyFeaturesProps {
  className?: string;
}

export function SafetyFeatures({ className }: SafetyFeaturesProps) {
  const features = [
    {
      icon: "lock" as const,
      title: "Secure Entry Systems",
      description: "Keypad and badge access at all entrances",
    },
    {
      icon: "verified" as const,
      title: "Background Checks",
      description: "Comprehensive screening for all staff",
    },
    {
      icon: "users" as const,
      title: "Low Ratios",
      description: "More individualized attention for your child",
    },
    {
      icon: "shield" as const,
      title: "Health Protocols",
      description: "Daily health checks and sanitization",
    },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 rounded-lg border bg-card p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{feature.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Compact trust bar for headers/footers
interface TrustBarProps {
  className?: string;
}

export function TrustBar({ className }: TrustBarProps) {
  return (
    <div className={cn("bg-muted/50 py-3", className)}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          <span>Licensed & Accredited</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>4.9★ Parent Rating</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>25+ Locations</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Heart className="h-4 w-4 text-red-500" />
          <span>Christ-Centered Care</span>
        </div>
      </div>
    </div>
  );
}

