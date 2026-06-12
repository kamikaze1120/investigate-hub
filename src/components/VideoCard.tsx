import { motion } from "framer-motion";
import { Play, Clock, TrendingUp } from "lucide-react";
import { allIndividuals } from "@/data/allIndividuals";

interface VideoCardProps {
  title: string;
  description: string;
  duration: string;
  release_date: string;
  category: string;
  thumbnail_url: string;
  referenced_persons: string[];
  delay?: number;
  onClick?: () => void;
  isTrending?: boolean;
}

const categoryColors: Record<string, string> = {
  Surveillance: "bg-primary/20 text-primary",
  "Legal Proceeding": "bg-amber-500/20 text-amber-400",
  "Press Conference": "bg-blue-500/20 text-blue-400",
  Evidence: "bg-destructive/20 text-destructive",
  Interview: "bg-emerald-500/20 text-emerald-400",
};

const personMap = new Map(allIndividuals.map((person) => [person.id, person.name]));

const VideoCard = ({ title, description, duration, release_date, category, thumbnail_url, referenced_persons, delay = 0, onClick, isTrending }: VideoCardProps) => {
  const persons = referenced_persons
    .map((id) => personMap.get(id) || id)
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
      className="group relative flex-shrink-0 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-[200px] w-[356px] overflow-hidden rounded-md border-glow border-glow-hover transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)]">
        <img
          src={thumbnail_url || "/placeholder.svg"}
          alt={`${title} thumbnail`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(event) => {
            const img = event.currentTarget;
            img.onerror = null;
            img.src = "/placeholder.svg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
        
        {/* Hover overlay with detail reveal */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <Play size={20} className="ml-0.5 text-primary-foreground" fill="currentColor" />
          </motion.div>
        </div>

        {isTrending && (
          <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-sm bg-primary px-2 py-0.5 shadow-lg">
            <TrendingUp size={10} className="text-white" />
            <span className="font-data text-[9px] font-bold text-white uppercase tracking-wider">Trending</span>
          </div>
        )}

        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-sm bg-background/80 backdrop-blur-sm px-2 py-1 transition-opacity duration-300 group-hover:opacity-0">
          <Clock size={10} className="text-muted-foreground" />
          <span className="font-data text-[10px] text-foreground">{duration}</span>
        </div>

        <div className={`absolute left-3 ${isTrending ? 'top-8' : 'top-3'} z-10 transition-all duration-300 group-hover:opacity-0`}>
          <span className={`rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${categoryColors[category] || "bg-muted text-muted-foreground"}`}>
            {category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
          <h3 className="line-clamp-1 font-display text-sm font-semibold leading-snug text-foreground text-shadow-heavy group-hover:line-clamp-2">
            {title}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {persons.slice(0, 2).map((name) => (
                <span key={name} className="rounded-sm bg-secondary/80 px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">
                  {name}
                </span>
              ))}
            </div>
            <span className="font-data text-[10px] text-muted-foreground">{release_date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
