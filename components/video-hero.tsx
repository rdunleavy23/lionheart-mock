"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  fallbackImageSrc?: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  showControls?: boolean;
  minHeight?: string;
}

export function VideoHero({
  videoSrc,
  posterSrc,
  fallbackImageSrc,
  children,
  className,
  overlayClassName,
  autoPlay = true,
  loop = true,
  showControls = false,
  minHeight = "70vh",
}: VideoHeroProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const [hasVideo, setHasVideo] = React.useState(!!videoSrc);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleCanPlay = () => setIsVideoLoaded(true);
    const handleError = () => setHasVideo(false);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [videoSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      className={cn("video-hero relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      {/* Video Background */}
      {hasVideo && videoSrc && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          loop={loop}
          muted={isMuted}
          playsInline
          poster={posterSrc}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Fallback Image (shown when no video or video not loaded) */}
      {(fallbackImageSrc || posterSrc) && (!hasVideo || !isVideoLoaded) && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url(${fallbackImageSrc || posterSrc})`,
          }}
        />
      )}

      {/* Placeholder when no media */}
      {!videoSrc && !fallbackImageSrc && !posterSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
      )}

      {/* Overlay Gradient */}
      <div
        className={cn(
          "absolute inset-0 z-[5]",
          "bg-gradient-to-b from-black/40 via-black/50 to-black/60",
          overlayClassName
        )}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex min-h-[inherit] items-center"
      >
        {children}
      </motion.div>

      {/* Video Controls */}
      {showControls && hasVideo && (
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={togglePlay}
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleMute}
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white" />
            ) : (
              <Volume2 className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-white/70">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-white/50 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-2 w-1.5 rounded-full bg-white/70"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Simple hero content wrapper with consistent styling
interface HeroContentProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export function HeroContent({
  children,
  className,
  maxWidth = "max-w-4xl",
}: HeroContentProps) {
  return (
    <div className={cn("mx-auto w-full px-4 py-16 md:px-6 md:py-24", maxWidth, className)}>
      {children}
    </div>
  );
}

