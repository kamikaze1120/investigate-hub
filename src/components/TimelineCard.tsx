import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimelineCardProps {
  date: string;
  event_title: string;
  description: string;
  delay?: number;
}

const TimelineCard = ({ date, event_title, description, delay = 0 }: TimelineCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[180px] w-[300px] overflow-hidden rounded-lg border-glow border-glow-hover card-shadow surface-gradient bg-card p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} className="text-primary" />
            <span className="font-data text-xs text-primary">{date}</span>
          </div>
          <h3 className="font-display text-sm font-semibold text-foreground leading-snug">
            {event_title}
          </h3>
          <p className="mt-1.5 font-body text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
