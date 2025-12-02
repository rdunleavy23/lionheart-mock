"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, Users, Award, Heart, Star, Shield, Building, Clock } from "lucide-react";

interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: keyof typeof iconMap;
}

const iconMap = {
  location: MapPin,
  users: Users,
  award: Award,
  heart: Heart,
  star: Star,
  shield: Shield,
  building: Building,
  clock: Clock,
};

interface StatsCounterProps {
  stats: Stat[];
  className?: string;
  variant?: "default" | "card" | "inline" | "hero";
  animateOnView?: boolean;
}

// Animated number component
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, count, rounded, duration]);

  return (
    <span ref={ref} className="stat-counter">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsCounter({
  stats,
  className,
  variant = "default",
  animateOnView = true,
}: StatsCounterProps) {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-6 md:gap-10",
          className
        )}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon ? iconMap[stat.icon] : null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 text-white/90"
            >
              {Icon && <Icon className="h-5 w-5 text-white/70" />}
              <span className="text-2xl font-bold md:text-3xl">
                {animateOnView ? (
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                ) : (
                  <>
                    {stat.prefix}
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </>
                )}
              </span>
              <span className="text-sm text-white/70">{stat.label}</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-8 md:gap-12",
          className
        )}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon ? iconMap[stat.icon] : null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2">
                {Icon && <Icon className="h-6 w-6 text-primary" />}
                <span className="text-3xl font-bold text-foreground md:text-4xl">
                  {animateOnView ? (
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <>
                      {stat.prefix}
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </>
                  )}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
          className
        )}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon ? iconMap[stat.icon] : null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="stat-card"
            >
              {Icon && (
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              )}
              <div className="stat-value">
                {animateOnView ? (
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                ) : (
                  <>
                    {stat.prefix}
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </>
                )}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8",
        className
      )}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon ? iconMap[stat.icon] : null;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            {Icon && (
              <Icon className="mx-auto mb-2 h-8 w-8 text-primary" />
            )}
            <div className="text-4xl font-bold text-foreground md:text-5xl">
              {animateOnView ? (
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              ) : (
                <>
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </>
              )}
            </div>
            <p className="mt-2 text-muted-foreground">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// Pre-configured stats for Lionheart
export const lionheartStats: Stat[] = [
  { value: 25, suffix: "+", label: "Locations", icon: "location" },
  { value: 5, label: "States Served", icon: "building" },
  { value: 100, suffix: "%", label: "Licensed", icon: "shield" },
  { value: 4.9, label: "Parent Rating", icon: "star" },
];

export const lionheartStatsExtended: Stat[] = [
  { value: 25, suffix: "+", label: "Locations", icon: "location" },
  { value: 5, label: "States Served", icon: "building" },
  { value: 2000, suffix: "+", label: "Families Served", icon: "users" },
  { value: 15, suffix: "+", label: "Years of Excellence", icon: "award" },
];

