"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, ZoomIn, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  src: string;
  alt: string;
  category?: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  categories?: string[];
  columns?: { mobile: number; tablet: number; desktop: number };
  className?: string;
  showCaptions?: boolean;
  enableLightbox?: boolean;
  aspectRatio?: "square" | "4:3" | "16:9" | "auto";
}

export function PhotoGallery({
  photos,
  categories = [],
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  className,
  showCaptions = true,
  enableLightbox = true,
  aspectRatio = "4:3",
}: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const filteredPhotos = React.useMemo(() => {
    if (selectedCategory === "all") return photos;
    return photos.filter((photo) => photo.category === selectedCategory);
  }, [photos, selectedCategory]);

  const allCategories = React.useMemo(() => {
    const cats = ["all", ...categories];
    if (categories.length === 0) {
      const uniqueCats = new Set(photos.map((p) => p.category).filter(Boolean));
      return ["all", ...Array.from(uniqueCats)] as string[];
    }
    return cats;
  }, [photos, categories]);

  const aspectRatioClass = {
    square: "aspect-square",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-video",
    auto: "",
  };

  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setLightboxIndex(index);
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className={className}>
      {/* Category Filter */}
      {allCategories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Photo Grid */}
      <div
        className={cn(
          "grid gap-4",
          `grid-cols-${columns.mobile}`,
          `md:grid-cols-${columns.tablet}`,
          `lg:grid-cols-${columns.desktop}`
        )}
        style={{
          gridTemplateColumns: `repeat(${columns.mobile}, 1fr)`,
        }}
      >
        <style jsx>{`
          @media (min-width: 768px) {
            div {
              grid-template-columns: repeat(${columns.tablet}, 1fr) !important;
            }
          }
          @media (min-width: 1024px) {
            div {
              grid-template-columns: repeat(${columns.desktop}, 1fr) !important;
            }
          }
        `}</style>

        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <button
                onClick={() => openLightbox(index)}
                className={cn(
                  "relative block w-full overflow-hidden rounded-lg bg-muted",
                  aspectRatioClass[aspectRatio],
                  enableLightbox && "cursor-zoom-in"
                )}
              >
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/50" />
                      <span className="mt-2 block text-xs text-muted-foreground">
                        {photo.alt}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </button>

              {/* Caption */}
              {showCaptions && photo.caption && (
                <p className="mt-2 text-sm text-muted-foreground">{photo.caption}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="py-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No photos in this category</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="lightbox-content relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute -right-2 -top-12 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Image */}
              <div className="relative">
                {filteredPhotos[lightboxIndex]?.src ? (
                  <Image
                    src={filteredPhotos[lightboxIndex].src}
                    alt={filteredPhotos[lightboxIndex].alt}
                    width={1200}
                    height={800}
                    className="rounded-lg"
                    priority
                  />
                ) : (
                  <div className="flex h-[60vh] w-[80vw] items-center justify-center rounded-lg bg-muted">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">
                        {filteredPhotos[lightboxIndex]?.alt}
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption */}
                {filteredPhotos[lightboxIndex]?.caption && (
                  <p className="mt-4 text-center text-white">
                    {filteredPhotos[lightboxIndex].caption}
                  </p>
                )}
              </div>

              {/* Navigation */}
              {filteredPhotos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}

              {/* Counter */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Placeholder gallery for when real photos aren't available
interface PlaceholderGalleryProps {
  items: Array<{ name: string; description: string }>;
  className?: string;
}

const gradients = [
  "from-primary/20 via-primary/10 to-secondary/20",
  "from-secondary/20 via-secondary/10 to-primary/20",
  "from-accent/20 via-accent/10 to-primary/20",
  "from-primary/15 via-secondary/15 to-accent/15",
  "from-secondary/15 via-primary/10 to-secondary/20",
  "from-accent/15 via-primary/15 to-secondary/15",
];

export function PlaceholderGallery({ items, className }: PlaceholderGalleryProps) {
  return (
    <div
      className={cn(
        "grid gap-4 grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className={cn(
            "group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer",
            "bg-gradient-to-br",
            gradients[index % gradients.length]
          )}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center p-6">
            <div className="mb-4 rounded-full bg-white/30 p-4 backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-110">
              <ImageIcon className="h-8 w-8 text-foreground/60" />
            </div>
            <h3 className="text-base font-semibold text-foreground/90 text-center">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-foreground/60 text-center">
              {item.description}
            </p>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  );
}

