"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Sun,
  Coffee,
  Book,
  Music,
  Utensils,
  Moon,
  Play,
  Heart,
  Sparkles,
  Clock,
  Baby,
} from "lucide-react";

interface ScheduleItem {
  time: string;
  activity: string;
  description?: string;
  icon?: keyof typeof iconMap;
  highlight?: boolean;
}

const iconMap = {
  arrival: Sun,
  breakfast: Coffee,
  learning: Book,
  music: Music,
  lunch: Utensils,
  nap: Moon,
  play: Play,
  faith: Heart,
  art: Sparkles,
  snack: Coffee,
  departure: Sun,
};

interface DailyScheduleProps {
  scheduleItems: ScheduleItem[];
  programName?: string;
  className?: string;
  variant?: "timeline" | "grid" | "compact";
}

export function DailySchedule({
  scheduleItems,
  programName,
  className,
  variant = "timeline",
}: DailyScheduleProps) {
  if (variant === "compact") {
    return (
      <div className={cn("space-y-2", className)}>
        {programName && (
          <h4 className="font-medium text-foreground mb-3">{programName}</h4>
        )}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {scheduleItems.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : Clock;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-lg border p-3 text-center",
                  item.highlight && "border-primary bg-primary/5"
                )}
              >
                <Icon className="mx-auto h-4 w-4 text-primary mb-1" />
                <p className="text-xs font-medium text-foreground">{item.time}</p>
                <p className="text-xs text-muted-foreground truncate">{item.activity}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("", className)}>
        {programName && (
          <h4 className="font-medium text-foreground mb-4">{programName}</h4>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scheduleItems.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : Clock;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 transition-shadow hover:shadow-md",
                  item.highlight && "border-primary bg-primary/5"
                )}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">{item.time}</span>
                  </div>
                  <h5 className="font-medium text-foreground">{item.activity}</h5>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Timeline variant (default)
  return (
    <div className={cn("", className)}>
      {programName && (
        <h4 className="font-medium text-foreground mb-6">{programName}</h4>
      )}
      <div className="timeline">
        {scheduleItems.map((item, index) => {
          const Icon = item.icon ? iconMap[item.icon] : Clock;
          const isActive = item.highlight;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn("timeline-item", isActive && "active")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.time}
                    </span>
                  </div>
                  <h5 className="font-medium text-foreground">{item.activity}</h5>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Pre-configured schedules for different age groups
export const infantSchedule: ScheduleItem[] = [
  {
    time: "7:00 AM",
    activity: "Arrival & Free Play",
    description: "Warm greetings and individual attention",
    icon: "arrival",
  },
  {
    time: "8:00 AM",
    activity: "Breakfast",
    description: "Age-appropriate feeding times",
    icon: "breakfast",
  },
  {
    time: "9:00 AM",
    activity: "Sensory Play & Learning",
    description: "Tummy time, textures, and exploration",
    icon: "learning",
    highlight: true,
  },
  {
    time: "10:00 AM",
    activity: "Morning Nap",
    description: "Individual sleep schedules honored",
    icon: "nap",
  },
  {
    time: "11:30 AM",
    activity: "Lunch",
    icon: "lunch",
  },
  {
    time: "12:30 PM",
    activity: "Outdoor Time",
    description: "Stroller walks and fresh air",
    icon: "play",
  },
  {
    time: "1:30 PM",
    activity: "Afternoon Nap",
    icon: "nap",
  },
  {
    time: "3:30 PM",
    activity: "Snack & Story Time",
    description: "Bible stories and songs",
    icon: "faith",
    highlight: true,
  },
  {
    time: "4:30 PM",
    activity: "Free Play & Departure",
    icon: "departure",
  },
];

export const preschoolSchedule: ScheduleItem[] = [
  {
    time: "7:00 AM",
    activity: "Arrival & Free Play",
    description: "Morning greeting and center time",
    icon: "arrival",
  },
  {
    time: "8:00 AM",
    activity: "Breakfast",
    description: "Nutritious meal served family-style",
    icon: "breakfast",
  },
  {
    time: "8:30 AM",
    activity: "Circle Time",
    description: "Calendar, weather, and morning devotion",
    icon: "faith",
    highlight: true,
  },
  {
    time: "9:00 AM",
    activity: "Learning Centers",
    description: "Math, literacy, science, and art activities",
    icon: "learning",
    highlight: true,
  },
  {
    time: "10:30 AM",
    activity: "Outdoor Play",
    description: "Gross motor activities and nature exploration",
    icon: "play",
  },
  {
    time: "11:30 AM",
    activity: "Lunch",
    description: "Nutritious meal with table manners practice",
    icon: "lunch",
  },
  {
    time: "12:30 PM",
    activity: "Rest Time",
    description: "Quiet time with soft music",
    icon: "nap",
  },
  {
    time: "2:30 PM",
    activity: "Afternoon Snack",
    icon: "snack",
  },
  {
    time: "3:00 PM",
    activity: "Music & Movement",
    description: "Songs, dancing, and instruments",
    icon: "music",
  },
  {
    time: "3:30 PM",
    activity: "Art & Creative Time",
    description: "Open-ended art projects",
    icon: "art",
  },
  {
    time: "4:30 PM",
    activity: "Outdoor Play & Departure",
    description: "Extended day activities",
    icon: "departure",
  },
];

export const preKSchedule: ScheduleItem[] = [
  {
    time: "7:00 AM",
    activity: "Arrival & Morning Work",
    description: "Independent activities and journaling",
    icon: "arrival",
  },
  {
    time: "8:00 AM",
    activity: "Breakfast",
    icon: "breakfast",
  },
  {
    time: "8:30 AM",
    activity: "Morning Meeting",
    description: "Devotion, pledge, and classroom community",
    icon: "faith",
    highlight: true,
  },
  {
    time: "9:00 AM",
    activity: "Literacy Block",
    description: "Phonics, reading, and writing workshops",
    icon: "learning",
    highlight: true,
  },
  {
    time: "10:00 AM",
    activity: "Math Workshop",
    description: "Number sense, patterns, and problem-solving",
    icon: "learning",
    highlight: true,
  },
  {
    time: "10:45 AM",
    activity: "Outdoor Recess",
    icon: "play",
  },
  {
    time: "11:30 AM",
    activity: "Lunch",
    icon: "lunch",
  },
  {
    time: "12:15 PM",
    activity: "Rest & Read",
    description: "Quiet time with books",
    icon: "nap",
  },
  {
    time: "1:30 PM",
    activity: "Science & Discovery",
    description: "Hands-on experiments and exploration",
    icon: "learning",
  },
  {
    time: "2:30 PM",
    activity: "Specials",
    description: "Art, music, or PE rotation",
    icon: "art",
  },
  {
    time: "3:15 PM",
    activity: "Snack & Story",
    icon: "snack",
  },
  {
    time: "3:45 PM",
    activity: "Centers & Enrichment",
    description: "Choice time and small groups",
    icon: "play",
  },
  {
    time: "5:00 PM",
    activity: "Extended Care",
    description: "Outdoor play and departure",
    icon: "departure",
  },
];

// Schedule selector component
interface ScheduleSelectorProps {
  className?: string;
}

export function ScheduleSelector({ className }: ScheduleSelectorProps) {
  const [activeProgram, setActiveProgram] = React.useState<"infant" | "preschool" | "prek">("preschool");

  const schedules = {
    infant: { name: "Infant (6 weeks - 1 year)", items: infantSchedule },
    preschool: { name: "Preschool (3-4 years)", items: preschoolSchedule },
    prek: { name: "Pre-K (4-5 years)", items: preKSchedule },
  };

  return (
    <div className={cn("", className)}>
      {/* Program Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(schedules).map(([key, schedule]) => (
          <button
            key={key}
            onClick={() => setActiveProgram(key as keyof typeof schedules)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              activeProgram === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/50"
            )}
          >
            <Baby className="h-4 w-4" />
            {schedule.name}
          </button>
        ))}
      </div>

      {/* Schedule Display */}
      <DailySchedule
        scheduleItems={schedules[activeProgram].items}
        variant="timeline"
      />
    </div>
  );
}

