import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Clock, Calendar, Tag, Users, Volume2, VolumeX, Maximize, AlertTriangle } from "lucide-react";
import { topPersons } from "@/data/mockData";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    description: string;
    duration: string;
    release_date: string;
    category: string;
    referenced_persons: string[];
  } | null;
}

const categoryColors: Record<string, string> = {
  "Surveillance": "bg-primary/20 text-primary",
  "Legal Proceeding": "bg-amber-500/20 text-amber-400",
  "Press Conference": "bg-blue-500/20 text-blue-400",
  "Evidence": "bg-destructive/20 text-destructive",
  "Interview": "bg-emerald-500/20 text-emerald-400",
};

const VideoModal = ({ isOpen, onClose, video }: VideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isOpen]);

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { setIsPlaying(false); return 0; }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!video) return null;

  const persons = video.referenced_persons
    .map((id) => topPersons.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-sm border-glow bg-card card-shadow max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X size={16} />
            </button>

            {/* Video player area */}
            <div
              className="relative aspect-video w-full bg-muted/10 cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
              }} />

              {/* Simulated static/noise overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-primary/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent pointer-events-none" />

              {/* Play/Pause center button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm pointer-events-auto cursor-pointer transition-opacity duration-300 ${isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
                  onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-primary-foreground" fill="currentColor" />
                  ) : (
                    <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
                  )}
                </motion.div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`rounded-sm px-3 py-1 font-data text-xs font-medium ${categoryColors[video.category] || "bg-muted text-muted-foreground"}`}>
                  {video.category}
                </span>
              </div>

              {/* EVIDENCE watermark */}
              {isPlaying && (
                <div className="absolute top-4 right-14 z-10 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-data text-[10px] text-primary font-medium tracking-wider">EVIDENCE</span>
                </div>
              )}

              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="w-full h-1 bg-muted/30 cursor-pointer" onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - rect.left) / rect.width) * 100);
                }}>
                  <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-background/80 backdrop-blur-sm">
                  <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} className="text-foreground hover:text-primary transition-colors">
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className="font-data text-[10px] text-muted-foreground">{video.duration}</span>
                  <div className="flex-1" />
                  <button onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Volume2 size={14} />
                  </button>
                  <button onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Maximize size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground leading-snug">
                {video.title}
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {video.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground/60" />
                  <span className="font-data text-xs text-muted-foreground">{video.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground/60" />
                  <span className="font-data text-xs text-muted-foreground">{video.release_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-muted-foreground/60" />
                  <span className="font-data text-xs text-muted-foreground">{video.category}</span>
                </div>
              </div>

              {persons.length > 0 && (
                <div className="pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={14} className="text-primary" />
                    <span className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Referenced Individuals</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {persons.map((person) => (
                      <div key={person!.id} className="flex items-center gap-2 rounded-sm bg-secondary/80 px-3 py-1.5">
                        {person!.photo_url ? (
                          <img src={person!.photo_url} alt={person!.name} className="h-5 w-5 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-data text-[8px] text-muted-foreground">{person!.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                        )}
                        <span className="font-data text-xs text-secondary-foreground">{person!.name}</span>
                        <span className="font-data text-[10px] text-primary">{person!.mention_count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notice */}
              <div className="flex items-start gap-2 rounded-sm bg-secondary/50 p-3 mt-2">
                <AlertTriangle size={14} className="text-muted-foreground/60 mt-0.5 shrink-0" />
                <p className="font-data text-[10px] text-muted-foreground/60 leading-relaxed">
                  This platform indexes metadata and descriptions only. Original video evidence is maintained at official government and court repositories. Access may require FOIA requests or court authorization.
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
