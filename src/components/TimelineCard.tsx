import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { topPersons } from "@/data/mockData";

interface TimelineCardProps {
  date: string;
  event_title: string;
  description: string;
  associated_persons?: string[];
  delay?: number;
}

const TimelineCard = ({ date, event_title, description, associated_persons = [], delay = 0 }: TimelineCardProps) => {
  const persons = associated_persons
    .map((id) => topPersons.find((p) => p.id === id)?.name)
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      className="group flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[190px] w-[310px] overflow-hidden rounded-sm border-glow border-glow-hover card-shadow surface-gradient bg-card p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary/10">
              <Clock size={12} className="text-primary" />
            </div>
            <span className="font-data text-[10px] text-primary font-medium">{date}</span>
          </div>
          <h3 className="font-display text-sm font-semibold text-foreground leading-snug">
            {event_title}
          </h3>
          <p className="mt-1.5 font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {persons.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {persons.map((name) => (
              <span key={name} className="rounded-sm bg-secondary px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineCard;
