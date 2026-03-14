import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-surface border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
            EPI<span className="text-primary">—</span>FLIX
          </h1>
          <div className="hidden items-center gap-6 md:flex">
            {["Archive", "Individuals", "Timeline", "Connections"].map((item) => (
              <button
                key={item}
                className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="overflow-hidden"
              >
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents, individuals..."
                  className="h-9 w-full rounded-sm border border-border bg-muted/50 px-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <div className="hidden font-data text-xs text-muted-foreground md:block">
            Last update: {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
