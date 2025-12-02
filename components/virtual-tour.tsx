"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Video,
  Image as ImageIcon,
  MapPin,
  X,
} from "lucide-react";

interface TourRoom {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  timestamp?: number; // For video chapters
}

interface VirtualTourProps {
  locationName: string;
  videoUrl?: string;
  rooms: TourRoom[];
  className?: string;
  posterImage?: string;
}

export function VirtualTour({
  locationName,
  videoUrl,
  rooms,
  className,
  posterImage,
}: VirtualTourProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [activeRoom, setActiveRoom] = React.useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      await containerRef.current.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const seekToRoom = (room: TourRoom) => {
    const video = videoRef.current;
    if (!video || room.timestamp === undefined) return;

    video.currentTime = room.timestamp;
    setActiveRoom(room.id);
    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);

    // Update active room based on current time
    const currentRoom = [...rooms]
      .reverse()
      .find((room) => room.timestamp !== undefined && video.currentTime >= room.timestamp);
    
    if (currentRoom) {
      setActiveRoom(currentRoom.id);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div ref={containerRef} className={cn("rounded-xl bg-card overflow-hidden shadow-lg", className)}>
      {/* Header */}
      <div className="border-b bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Virtual Tour</h3>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {locationName}
              </p>
            </div>
          </div>
          <Button variant="default" size="sm">
            Schedule In-Person Tour
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterImage}
              className="h-full w-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => setIsPlaying(false)}
              playsInline
            />

            {/* Play Overlay (when paused) */}
            {!isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </motion.button>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-1 w-full rounded-full bg-white/30">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="text-sm text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Placeholder when no video
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <div className="text-center">
              <Video className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                Virtual tour coming soon
              </p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Schedule an in-person tour to see our facility
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Room Chapters */}
      {rooms.length > 0 && (
        <div className="border-t p-4">
          <h4 className="mb-3 text-sm font-medium text-muted-foreground">
            Jump to Room
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => seekToRoom(room)}
                className={cn(
                  "flex flex-shrink-0 flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-primary/50 min-w-[100px]",
                  activeRoom === room.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <div className="relative h-14 w-20 overflow-hidden rounded bg-muted">
                  {room.thumbnail ? (
                    <img
                      src={room.thumbnail}
                      alt={room.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  )}
                  {room.timestamp !== undefined && (
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-xs text-white">
                      {formatTime(room.timestamp)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-foreground text-center">
                  {room.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="border-t bg-muted/30 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Want to see more? Schedule a personalized tour with our team.
          </p>
          <Button className="flex-shrink-0">
            Schedule Tour
          </Button>
        </div>
      </div>
    </div>
  );
}

// Simple modal for virtual tour popup
interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  videoUrl?: string;
  rooms?: TourRoom[];
}

export function VirtualTourModal({
  isOpen,
  onClose,
  locationName,
  videoUrl,
  rooms = [],
}: VirtualTourModalProps) {
  if (!isOpen) return null;

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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -right-2 -top-12 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
          <VirtualTour
            locationName={locationName}
            videoUrl={videoUrl}
            rooms={rooms}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Sample room data
export const sampleTourRooms: TourRoom[] = [
  {
    id: "entrance",
    name: "Entrance",
    description: "Secure check-in area",
    timestamp: 0,
  },
  {
    id: "infant",
    name: "Infant Room",
    description: "For ages 6 weeks - 1 year",
    timestamp: 30,
  },
  {
    id: "toddler",
    name: "Toddler Room",
    description: "For ages 1-2 years",
    timestamp: 60,
  },
  {
    id: "preschool",
    name: "Preschool",
    description: "For ages 3-4 years",
    timestamp: 90,
  },
  {
    id: "playground",
    name: "Playground",
    description: "Outdoor play area",
    timestamp: 120,
  },
];

