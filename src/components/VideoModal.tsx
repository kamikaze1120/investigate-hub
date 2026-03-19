import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Calendar, Tag, Users, Volume2, VolumeX, Maximize, AlertTriangle } from "lucide-react";
import { topPersons } from "@/data/mockData";
import { allIndividuals } from "@/data/allIndividuals";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    description: string;
    duration: string;
    release_date: string;
    source_url: string;
    thumbnail_url: string;
    category: string;
    referenced_persons: string[];
  } | null;
}

const categoryColors: Record<string, string> = {
  Surveillance: "bg-primary/20 text-primary",
  "Legal Proceeding": "bg-amber-500/20 text-amber-400",
  "Press Conference": "bg-blue-500/20 text-blue-400",
  Evidence: "bg-destructive/20 text-destructive",
  Interview: "bg-emerald-500/20 text-emerald-400",
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const VideoModal = ({ isOpen, onClose, video }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
      return;
    }

    const media = videoRef.current;
    if (!media) return;

    media.currentTime = 0;
    media.pause();
    setIsPlaying(false);
    setProgress(0);
  }, [isOpen, video?.title]);

  if (!video) return null;

  const persons = video.referenced_persons
    .map((id) => topPersons.find((person) => person.id === id) ?? allIndividuals.find((person) => person.id === id))
    .filter(Boolean);

  const hasVideoSource = Boolean(video.source_url) && video.source_url !== "#";

  const handleTogglePlay = async () => {
    const media = videoRef.current;
    if (!media || !hasVideoSource) return;

    if (media.paused) {
      try {
        await media.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      media.pause();
    }
  };

  const handleSeek = (nextProgress: number) => {
    const media = videoRef.current;
    if (!media || !duration) return;

    const clamped = Math.min(100, Math.max(0, nextProgress));
    media.currentTime = (clamped / 100) * duration;
    setProgress(clamped);
  };

  const handleToggleMute = () => {
    const media = videoRef.current;
    if (!media) return;

    media.muted = !media.muted;
    setIsMuted(media.muted);
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await containerRef.current.requestFullscreen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden overflow-y-auto rounded-sm border-glow bg-card card-shadow"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-0 right-0 top-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X size={16} />
            </button>

            <div ref={containerRef} className="relative aspect-video w-full bg-background">
              {hasVideoSource ? (
                <video
                  ref={videoRef}
                  src={video.source_url}
                  poster={video.thumbnail_url || "/placeholder.svg"}
                  className="h-full w-full bg-background object-contain"
                  preload="metadata"
                  playsInline
                  onClick={handleTogglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                  onTimeUpdate={(event) => {
                    const media = event.currentTarget;
                    if (!media.duration) return;
                    setProgress((media.currentTime / media.duration) * 100);
                  }}
                />
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={video.thumbnail_url || "/placeholder.svg"}
                    alt={`${video.title} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(event) => {
                      const img = event.currentTarget;
                      img.onerror = null;
                      img.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 px-6 text-center">
                    <p className="font-body text-sm text-muted-foreground">Video source unavailable for this record.</p>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-card/10 to-transparent" />

              <div className="absolute left-4 top-4 z-10">
                <span className={`rounded-sm px-3 py-1 font-data text-xs font-medium ${categoryColors[video.category] || "bg-muted text-muted-foreground"}`}>
                  {video.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/80 px-4 pb-3 pt-2 backdrop-blur-sm">
                <div className="mb-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={(event) => handleSeek(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleTogglePlay} className="text-foreground transition-colors hover:text-primary" disabled={!hasVideoSource}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className="font-data text-[10px] text-muted-foreground">
                    {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                  </span>
                  <div className="flex-1" />
                  <button onClick={handleToggleMute} className="text-muted-foreground transition-colors hover:text-foreground" disabled={!hasVideoSource}>
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <button onClick={handleFullscreen} className="text-muted-foreground transition-colors hover:text-foreground" disabled={!hasVideoSource}>
                    <Maximize size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <h2 className="font-display text-xl font-bold leading-snug text-foreground">
                {video.title}
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {video.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground/60" />
                  <span className="font-data text-xs text-muted-foreground">{video.release_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-muted-foreground/60" />
                  <span className="font-data text-xs text-muted-foreground">{video.duration}</span>
                </div>
              </div>

              {persons.length > 0 && (
                <div className="border-t border-border/30 pt-2">
                  <div className="mb-3 flex items-center gap-2">
                    <Users size={14} className="text-primary" />
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">Referenced Individuals</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {persons.map((person) => (
                      <div key={person!.id} className="flex items-center gap-2 rounded-sm bg-secondary/80 px-3 py-1.5">
                        <img
                          src={person!.photo_url || "/placeholder.svg"}
                          alt={person!.name}
                          className="h-5 w-5 rounded-full object-cover"
                          onError={(event) => {
                            const img = event.currentTarget;
                            img.onerror = null;
                            img.src = "/placeholder.svg";
                          }}
                        />
                        <span className="font-data text-xs text-secondary-foreground">{person!.name}</span>
                        {"mention_count" in person! && (
                          <span className="font-data text-[10px] text-primary">{person!.mention_count.toLocaleString()}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-2 flex items-start gap-2 rounded-sm bg-secondary/50 p-3">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-muted-foreground/60" />
                <p className="font-data text-[10px] leading-relaxed text-muted-foreground/60">
                  Full-length source material is available in the original archive. This preview contains indexed publicly released excerpts.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
