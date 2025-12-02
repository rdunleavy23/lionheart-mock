"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Quote, Award, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  quote?: string;
  yearsExperience?: number;
  certifications?: string[];
}

interface StaffCardProps {
  staff: StaffMember;
  className?: string;
  variant?: "default" | "compact" | "detailed";
}

export function StaffCard({
  staff,
  className,
  variant = "default",
}: StaffCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "group flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
      >
        {/* Photo */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          {staff.photo ? (
            <Image
              src={staff.photo}
              alt={staff.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-foreground truncate">{staff.name}</h4>
          <p className="text-sm text-muted-foreground">{staff.role}</p>
          {staff.yearsExperience && (
            <p className="text-xs text-muted-foreground/70">
              {staff.yearsExperience}+ years experience
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card shadow-md transition-shadow hover:shadow-xl",
        className
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {staff.photo ? (
          <Image
            src={staff.photo}
            alt={staff.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <User className="h-20 w-20 text-muted-foreground/30" />
          </div>
        )}

        {/* Hover Quote Overlay */}
        {staff.quote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 p-6"
          >
            <div className="text-center">
              <Quote className="mx-auto mb-3 h-6 w-6 text-white/80" />
              <p className="text-sm italic text-white/90 line-clamp-4">
                "{staff.quote}"
              </p>
            </div>
          </motion.div>
        )}

        {/* Experience Badge */}
        {staff.yearsExperience && (
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <Calendar className="mr-1 h-3 w-3" />
              {staff.yearsExperience}+ yrs
            </Badge>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h4 className="font-semibold text-foreground">{staff.name}</h4>
        <p className="text-sm text-primary font-medium">{staff.role}</p>

        {variant === "detailed" && staff.bio && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {staff.bio}
          </p>
        )}

        {/* Certifications */}
        {staff.certifications && staff.certifications.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {staff.certifications.slice(0, 2).map((cert, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                <Award className="mr-1 h-3 w-3" />
                {cert}
              </Badge>
            ))}
            {staff.certifications.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{staff.certifications.length - 2} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Staff spotlight section component
interface StaffSpotlightProps {
  title?: string;
  subtitle?: string;
  staff: StaffMember[];
  className?: string;
  variant?: "default" | "compact";
}

export function StaffSpotlight({
  title = "Meet Our Teachers",
  subtitle = "Dedicated educators who love what they do",
  staff,
  className,
  variant = "default",
}: StaffSpotlightProps) {
  return (
    <section className={cn("py-12", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </motion.div>

      {/* Staff Grid */}
      <div
        className={cn(
          "grid gap-6",
          variant === "compact"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {staff.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <StaffCard staff={member} variant={variant} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Placeholder staff data for development
export const placeholderStaff: StaffMember[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Lead Teacher, Pre-K",
    quote: "Every child has a unique gift. My job is to help them discover it.",
    yearsExperience: 12,
    certifications: ["ECE Certified", "CPR/First Aid"],
  },
  {
    id: "2",
    name: "David Chen",
    role: "Preschool Teacher",
    quote: "Learning happens best when children feel safe and loved.",
    yearsExperience: 8,
    certifications: ["Child Development"],
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    role: "Infant Room Lead",
    quote: "The first year of life is so precious. I'm honored to be part of it.",
    yearsExperience: 15,
    certifications: ["Infant Care Specialist"],
  },
  {
    id: "4",
    name: "James Thompson",
    role: "Center Director",
    quote: "We're not just caring for children—we're building the future.",
    yearsExperience: 20,
    certifications: ["ECE Director", "Administration"],
  },
];

