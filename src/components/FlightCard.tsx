import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { topPersons } from "@/data/mockData";

interface FlightCardProps {
  date: string;
  origin: string;
  destination: string;
  passengers: string[];
  delay?: number;
}

const FlightCard = ({ date, origin, destination, passengers, delay = 0 }: FlightCardProps) => {
  const passengerNames = passengers
    .map((id) => topPersons.find((p) => p.id === id)?.name)
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[180px] w-[280px] overflow-hidden rounded-lg border-glow border-glow-hover card-shadow surface-gradient bg-card p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Plane size={14} className="text-amber-400" />
            <span className="font-data text-xs text-amber-400">Flight Log</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold text-foreground">{origin}</span>
            <span className="text-muted-foreground">→</span>
            <span className="font-display text-sm font-semibold text-foreground">{destination}</span>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {passengerNames.slice(0, 3).map((name) => (
              <span key={name} className="rounded-sm bg-muted px-1.5 py-0.5 font-data text-[10px] text-muted-foreground">
                {name}
              </span>
            ))}
            {passengerNames.length > 3 && (
              <span className="rounded-sm bg-muted px-1.5 py-0.5 font-data text-[10px] text-primary">
                +{passengerNames.length - 3}
              </span>
            )}
          </div>
          <span className="font-data text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
