import { useState } from "react";
import { motion } from "framer-motion";

interface PersonCardProps {
  name: string;
  mention_count: number;
  rank: number;
  photo_url: string;
  description: string;
  onClick?: () => void;
  delay?: number;
}

const PersonCard = ({ name, mention_count, rank, photo_url, description, onClick, delay = 0 }: PersonCardProps) => {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const showPhoto = Boolean(photo_url) && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] } }}
      onClick={onClick}
      className="group relative flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[300px] w-[210px] overflow-hidden rounded-sm border-glow border-glow-hover card-shadow">
        <div
          className="absolute -left-3 bottom-12 z-0 select-none font-display text-[140px] font-black leading-none opacity-[0.06]"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.08)" }}
        >
          {rank}
        </div>

        <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden bg-muted/20 grayscale-hover">
          {showPhoto ? (
            <img
              src={photo_url}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-foreground/10 bg-secondary">
                <span className="font-display text-2xl font-bold text-muted-foreground/50 transition-colors duration-400 group-hover:text-primary">
                  {initials}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-0 z-20 card-overlay-gradient" />

        <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
          <p className="font-display text-sm font-bold leading-tight text-foreground text-shadow-heavy">
            {name}
          </p>
          <p className="mt-1 font-data text-xs font-medium text-primary">
            {mention_count.toLocaleString()} mentions
          </p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            whileHover={{ height: "auto", opacity: 1 }}
          >
            <p className="mt-2 line-clamp-2 font-body text-[11px] leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="absolute left-3 top-3 z-30">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary/90 backdrop-blur-sm">
            <span className="font-data text-xs font-bold text-primary-foreground">
              {rank}
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(0 80% 50% / 0.08) 0%, transparent 70%)" }}
        />
      </div>
    </motion.div>
  );
};

export default PersonCard;
