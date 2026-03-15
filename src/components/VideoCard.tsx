import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { topPersons } from "@/data/mockData";

interface VideoCardProps {
  title: string;
  description: string;
  duration: string;
  release_date: string;
  category: string;
  referenced_persons: string[];
  delay?: number;
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  "Surveillance": "bg-primary/20 text-primary",
  "Legal Proceeding": "bg-amber-500/20 text-amber-400",
  "Press Conference": "bg-blue-500/20 text-blue-400",
  "Evidence": "bg-destructive/20 text-destructive",
  "Interview": "bg-emerald-500/20 text-emerald-400",
};

const VideoCard = ({ title, description, duration, release_date, category, referenced_persons, delay = 0, onClick }: VideoCardProps) => {
  const persons = referenced_persons
    .map((id) => topPersons.find((p) => p.id === id)?.name)
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
      className="group relative flex-shrink-0 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-[200px] w-[356px] overflow-hidden rounded-sm border-glow border-glow-hover">
        {/* Video thumbnail placeholder */}
        <div className="absolute inset-0 bg-muted/40">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
          }} />
        </div>

        {/* Play button */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Play size={24} className="text-primary-foreground ml-1" fill="currentColor" />
          </motion.div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-sm bg-background/80 backdrop-blur-sm px-2 py-1">
          <Clock size={10} className="text-muted-foreground" />
          <span className="font-data text-[10px] text-foreground">{duration}</span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${categoryColors[category] || "bg-muted text-muted-foreground"}`}>
            {category}
          </span>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <h3 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2 text-shadow-heavy">
            {title}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {persons.slice(0, 2).map((name) => (
                <span key={name} className="rounded-sm bg-secondary/80 px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">
                  {name}
                </span>
              ))}
              {persons.length > 2 && (
                <span className="font-data text-[10px] text-muted-foreground">+{persons.length - 2}</span>
              )}
            </div>
            <span className="font-data text-[10px] text-muted-foreground">{release_date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
