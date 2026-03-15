import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Calendar, Tag, Users } from "lucide-react";
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
            className="relative w-full max-w-2xl overflow-hidden rounded-sm border-glow bg-card card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X size={16} />
            </button>

            {/* Video placeholder area */}
            <div className="relative aspect-video w-full bg-muted/20">
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              {/* Scanline effect */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
              }} />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm cursor-pointer"
                >
                  <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
                </motion.div>
              </div>
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`rounded-sm px-3 py-1 font-data text-xs font-medium ${categoryColors[video.category] || "bg-muted text-muted-foreground"}`}>
                  {video.category}
                </span>
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

              {/* Meta info */}
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

              {/* Referenced persons */}
              {persons.length > 0 && (
                <div className="pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={14} className="text-primary" />
                    <span className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Referenced Individuals</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {persons.map((person) => (
                      <div
                        key={person!.id}
                        className="flex items-center gap-2 rounded-sm bg-secondary/80 px-3 py-1.5"
                      >
                        {person!.photo_url ? (
                          <img src={person!.photo_url} alt={person!.name} className="h-5 w-5 rounded-full object-cover" />
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

              {/* Disclaimer */}
              <p className="font-data text-[10px] text-muted-foreground/40 tracking-wider uppercase pt-2">
                This platform indexes metadata only. Original video hosted at official source.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
