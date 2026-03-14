import { motion } from "framer-motion";

interface PersonCardProps {
  name: string;
  mention_count: number;
  rank: number;
  photo_url: string;
  delay?: number;
}

const PersonCard = ({ name, mention_count, rank, delay = 0 }: PersonCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[280px] w-[200px] overflow-hidden rounded-lg border-glow border-glow-hover card-shadow">
        {/* Rank number behind */}
        <div className="absolute -left-2 -top-4 z-0 select-none font-display text-[120px] font-bold leading-none text-foreground/[0.03]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}>
          {rank}
        </div>

        {/* Avatar placeholder */}
        <div className="relative z-10 flex h-full w-full items-center justify-center bg-muted/30 grayscale transition-all duration-300 group-hover:grayscale-0">
          <span className="font-display text-3xl font-bold text-muted-foreground/40 transition-colors duration-300 group-hover:text-primary/60">
            {initials}
          </span>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-20 card-overlay-gradient" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
          <p className="font-display text-sm font-semibold text-foreground leading-tight">
            {name}
          </p>
          <p className="mt-1 font-data text-xs text-primary">
            {mention_count.toLocaleString()} mentions
          </p>
        </div>

        {/* Rank badge */}
        <div className="absolute left-3 top-3 z-30 flex h-6 w-6 items-center justify-center rounded-sm bg-background/60 backdrop-blur-sm">
          <span className="font-data text-xs font-bold text-foreground">
            {rank}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonCard;
