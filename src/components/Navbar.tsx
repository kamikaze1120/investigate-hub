import { useState } from "react";
import { Search, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Archive", path: "/" },
  { label: "Individuals", path: "/" },
  { label: "Timeline", path: "/" },
  { label: "Videos", path: "/" },
  { label: "Connections", path: "/" },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar bg
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    }, { passive: true });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? "glass-surface border-b border-border/30" : "bg-gradient-to-b from-background to-transparent"
    }`}>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-display text-xl font-black tracking-tighter text-primary">EPI</span>
            <span className="font-display text-xl font-light tracking-tighter text-foreground/40">—</span>
            <span className="font-display text-xl font-black tracking-tighter text-foreground">FLIX</span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="rounded-sm px-3 py-1.5 font-body text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents, individuals..."
                    className="h-9 w-full rounded-sm border border-border bg-secondary/50 pl-9 pr-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
          >
            {searchOpen ? <X size={16} /> : <Search size={16} />}
          </button>
          <div className="hidden font-data text-[10px] text-muted-foreground/60 md:block tracking-wider">
            LAST UPDATE {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground md:hidden hover:text-foreground"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden glass-surface border-b border-border/30 md:hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-sm px-3 py-2 font-body text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
