import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { TOTAL_DOCUMENTS_INDEXED } from "@/data/allDocuments";
import { allIndividuals } from "@/data/allIndividuals";
import { TOTAL_FLIGHT_LOGS } from "@/data/mockData";

const stats = [
  { label: "Documents Indexed", value: TOTAL_DOCUMENTS_INDEXED, suffix: "" },
  { label: "Individuals Referenced", value: allIndividuals.length, suffix: "" },
  { label: "Flight Records", value: TOTAL_FLIGHT_LOGS, suffix: "" },
  { label: "Datasets Released", value: 47, suffix: "" },
];

const categories = [
  { label: "All Records", filter: "All", path: "/documents" },
  { label: "Legal Filings", filter: "Legal Filing", path: "/documents" },
  { label: "Flight Logs", filter: "Flight Log", path: "/flights" },
  { label: "Financial Records", filter: "Financial Record", path: "/documents" },
  { label: "Testimonies", filter: "Witness Testimony", path: "/documents" },
  { label: "Surveillance", filter: "Surveillance", path: "/documents" },
];

const AnimatedCounter = ({ target, delay }: { target: number; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, target, delay]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const HeroStats = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryClick = (cat: typeof categories[0], index: number) => {
    setActiveCategory(index);
    if (cat.path === "/flights") {
      navigate("/flights");
    } else {
      navigate("/documents", { state: { filter: cat.filter } });
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[500px] flex flex-col justify-center">
      {/* Immersive background elements */}
      <div className="absolute top-0 left-0 right-0 h-full red-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,9,20,0.05)_0%,transparent_50%)]" />
      <div className="absolute -right-[10%] -top-[10%] w-[50%] h-[70%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-data text-[10px] text-primary tracking-[0.3em] uppercase font-bold">
                Live Intelligence Portal
              </span>
            </div>
            <h1
              className="font-display font-black text-foreground text-balance leading-[0.9] tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
            >
              EXPOSING THE
              <br />
              <span className="text-primary italic">UNSEEN.</span>
            </h1>
            <p className="mt-6 max-w-lg font-body text-lg text-muted-foreground/90 leading-relaxed border-l-2 border-primary/20 pl-6">
              Access the world's most comprehensive public record archive. 
              Search across thousands of verified documents and flight logs.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat, i)}
                  className={i === activeCategory ? "category-pill category-pill-active scale-105" : "category-pill category-pill-inactive"}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-6 bg-secondary/10 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex flex-col"
              >
                <p className="font-data text-3xl font-black text-foreground md:text-4xl tracking-tighter">
                  <AnimatedCounter target={stat.value} delay={0.8 + i * 0.1} />
                </p>
                <p className="mt-1 font-body text-[10px] text-primary uppercase tracking-widest font-bold opacity-70">{stat.label}</p>
              </motion.div>
            ))}
            
            <div className="col-span-2 pt-6 mt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                        <div className="h-8 w-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold">
                            +12k
                        </div>
                    </div>
                    <span className="font-data text-[10px] text-muted-foreground uppercase tracking-widest">Active Researchers</span>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroStats;
