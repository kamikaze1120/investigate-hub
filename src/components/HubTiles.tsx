import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Users, Plane, History, PlayCircle } from "lucide-react";

const hubs = [
  { id: "docs", label: "Documents", icon: FileText, path: "/documents", color: "from-blue-600/20" },
  { id: "persons", label: "Individuals", icon: Users, path: "/individuals", color: "from-red-600/20" },
  { id: "flights", label: "Flight Logs", icon: Plane, path: "/flights", color: "from-amber-600/20" },
  { id: "timeline", label: "Timeline", icon: History, path: "/timeline", color: "from-purple-600/20" },
  { id: "videos", label: "Videos", icon: PlayCircle, path: "/videos", color: "from-emerald-600/20" },
];

const HubTiles = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        {hubs.map((hub, i) => (
          <motion.button
            key={hub.id}
            onClick={() => navigate(hub.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
            className="group relative flex aspect-[16/9] flex-col items-center justify-center overflow-hidden rounded-md border border-border/50 bg-secondary/30 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-secondary/50"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${hub.color} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            <hub.icon size={24} className="mb-2 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {hub.label}
            </span>
            
            {/* Glossy overlay effect like Disney+ */}
            <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-t from-black/20 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HubTiles;
