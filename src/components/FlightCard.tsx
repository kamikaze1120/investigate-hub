import { motion } from "framer-motion";
import { Plane, ArrowRight } from "lucide-react";
import { allIndividuals } from "@/data/allIndividuals";

interface FlightCardProps {
  date: string;
  origin: string;
  destination: string;
  passengers: string[];
  delay?: number;
}

const personMap = new Map(allIndividuals.map((person) => [person.id, person.name]));

const FlightCard = ({ date, origin, destination, passengers, delay = 0 }: FlightCardProps) => {
  const passengerNames = passengers
    .map((id) => personMap.get(id) || id)
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      className="group flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[190px] w-[290px] overflow-hidden rounded-sm border-glow border-glow-hover card-shadow surface-gradient bg-card p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-cyan-glow/10">
              <Plane size={12} className="text-cyan-glow" />
            </div>
            <span className="font-data text-[10px] text-cyan-glow font-medium">FLIGHT LOG</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold text-foreground">{origin}</span>
            <ArrowRight size={14} className="text-muted-foreground/40 flex-shrink-0" />
            <span className="font-display text-sm font-semibold text-foreground">{destination}</span>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {passengerNames.slice(0, 3).map((name) => (
              <span key={name} className="rounded-sm bg-secondary px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">
                {name}
              </span>
            ))}
            {passengerNames.length > 3 && (
              <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-data text-[10px] text-primary">
                +{passengerNames.length - 3}
              </span>
            )}
          </div>
          <span className="font-data text-[10px] text-muted-foreground">{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
