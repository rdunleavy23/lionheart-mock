"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight, Play, User, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    photo?: string;
    child?: string;
    location?: string;
    verified?: boolean;
  };
  rating: number;
  videoUrl?: string;
  featured?: boolean;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  variant?: "cards" | "single" | "grid";
  showRating?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function TestimonialCarousel({
  testimonials,
  className,
  variant = "cards",
  showRating = true,
  autoPlay = true,
  autoPlayInterval = 5000,
}: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [videoModalOpen, setVideoModalOpen] = React.useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = React.useState<string | null>(null);

  // Auto-play functionality
  React.useEffect(() => {
    if (!emblaApi || !autoPlay) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [emblaApi, autoPlay, autoPlayInterval]);

  // Track selected index
  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const openVideoModal = (url: string) => {
    setActiveVideoUrl(url);
    setVideoModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setActiveVideoUrl(null);
    document.body.style.overflow = "";
  };

  if (variant === "grid") {
    return (
      <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <TestimonialCard
              testimonial={testimonial}
              showRating={showRating}
              onVideoClick={testimonial.videoUrl ? () => openVideoModal(testimonial.videoUrl!) : undefined}
            />
          </motion.div>
        ))}

        {/* Video Modal */}
        <VideoModal
          isOpen={videoModalOpen}
          videoUrl={activeVideoUrl}
          onClose={closeVideoModal}
        />
      </div>
    );
  }

  if (variant === "single") {
    return (
      <div className={cn("relative", className)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Quote className="mx-auto mb-6 h-12 w-12 text-primary/30" />
            <p className="text-xl md:text-2xl text-foreground italic leading-relaxed">
              "{testimonials[selectedIndex].quote}"
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              {testimonials[selectedIndex].author.photo ? (
                <Image
                  src={testimonials[selectedIndex].author.photo}
                  alt={testimonials[selectedIndex].author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold text-foreground">
                    {testimonials[selectedIndex].author.name}
                  </span>
                  {testimonials[selectedIndex].author.verified && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>
                {testimonials[selectedIndex].author.child && (
                  <p className="text-sm text-muted-foreground">
                    {testimonials[selectedIndex].author.child}
                  </p>
                )}
                {testimonials[selectedIndex].author.location && (
                  <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {testimonials[selectedIndex].author.location}
                  </p>
                )}
              </div>
              {showRating && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < testimonials[selectedIndex].rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === selectedIndex
                  ? "w-6 bg-primary"
                  : "bg-muted hover:bg-muted-foreground/30"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  // Default: cards carousel
  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <TestimonialCard
                testimonial={testimonial}
                showRating={showRating}
                onVideoClick={
                  testimonial.videoUrl
                    ? () => openVideoModal(testimonial.videoUrl!)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={scrollPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === selectedIndex
                  ? "w-6 bg-primary"
                  : "bg-muted hover:bg-muted-foreground/30"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={scrollNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        videoUrl={activeVideoUrl}
        onClose={closeVideoModal}
      />
    </div>
  );
}

// Individual testimonial card component
interface TestimonialCardProps {
  testimonial: Testimonial;
  showRating?: boolean;
  onVideoClick?: () => void;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  showRating = true,
  onVideoClick,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "flex h-full flex-col rounded-xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg",
        testimonial.featured && "ring-2 ring-primary",
        className
      )}
    >
      {/* Rating */}
      {showRating && (
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="flex-1">
        <p className="text-muted-foreground italic leading-relaxed">
          "{testimonial.quote}"
        </p>
      </blockquote>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {/* Photo */}
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-muted">
          {testimonial.author.photo ? (
            <Image
              src={testimonial.author.photo}
              alt={testimonial.author.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground/50" />
            </div>
          )}
          {testimonial.videoUrl && (
            <button
              onClick={onVideoClick}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
            >
              <Play className="h-5 w-5 text-white" />
            </button>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground truncate">
              {testimonial.author.name}
            </span>
            {testimonial.author.verified && (
              <Badge variant="secondary" className="flex-shrink-0 text-xs px-1.5 py-0">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          {testimonial.author.child && (
            <p className="text-sm text-muted-foreground truncate">
              {testimonial.author.child}
            </p>
          )}
          {testimonial.author.location && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground/70">
              <MapPin className="h-3 w-3" />
              {testimonial.author.location}
            </p>
          )}
        </div>
      </div>

      {/* Video Button */}
      {testimonial.videoUrl && (
        <Button
          variant="outline"
          size="sm"
          onClick={onVideoClick}
          className="mt-4 w-full"
        >
          <Play className="mr-2 h-4 w-4" />
          Watch Video Testimonial
        </Button>
      )}
    </motion.div>
  );
}

// Video modal component
function VideoModal({
  isOpen,
  videoUrl,
  onClose,
}: {
  isOpen: boolean;
  videoUrl: string | null;
  onClose: () => void;
}) {
  if (!isOpen || !videoUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -right-2 -top-12 text-white hover:bg-white/20"
          >
            ×
          </Button>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="h-full w-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Aggregate rating display
interface AggregateRatingProps {
  rating: number;
  totalReviews: number;
  source?: string;
  className?: string;
}

export function AggregateRating({
  rating,
  totalReviews,
  source = "Google Reviews",
  className,
}: AggregateRatingProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-5 w-5",
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      <div className="text-sm">
        <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground"> from {totalReviews.toLocaleString()} reviews</span>
        {source && <span className="text-muted-foreground/70"> on {source}</span>}
      </div>
    </div>
  );
}

// Sample testimonials for development
export const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "We found peace of mind knowing our daughter is safe, loved, and learning. The teachers truly care, and we see biblical values being taught every day.",
    author: {
      name: "Sarah M.",
      child: "Mom of a 3-year-old",
      location: "Plano, TX",
      verified: true,
    },
    rating: 5,
    featured: true,
  },
  {
    id: "2",
    quote: "The quality of care is exceptional, and our son has grown so much socially and academically. We're grateful for the biblical foundations being woven into everything.",
    author: {
      name: "Michael T.",
      child: "Dad of a 4-year-old",
      location: "Arlington, TX",
      verified: true,
    },
    rating: 5,
  },
  {
    id: "3",
    quote: "As working parents, we needed somewhere we could trust completely. Lionheart has exceeded our expectations in every way—quality, safety, and faith integration.",
    author: {
      name: "Jennifer L.",
      child: "Mom of twins, 2 years old",
      location: "McKinney, TX",
      verified: true,
    },
    rating: 5,
  },
  {
    id: "4",
    quote: "My daughter loves going to 'school' every day. The teachers are amazing and the curriculum prepares her so well for kindergarten.",
    author: {
      name: "David K.",
      child: "Dad of a 4-year-old",
      location: "Frisco, TX",
      verified: true,
    },
    rating: 5,
  },
  {
    id: "5",
    quote: "The communication from teachers is excellent. We feel like true partners in our child's development.",
    author: {
      name: "Amanda R.",
      child: "Mom of a 2-year-old",
      location: "Dallas, TX",
      verified: true,
    },
    rating: 5,
  },
];

