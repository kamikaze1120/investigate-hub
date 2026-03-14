import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Documents Indexed", value: 248192, suffix: "" },
  { label: "Individuals Referenced", value: 21847, suffix: "" },
  { label: "Flight Records", value: 3291, suffix: "" },
  { label: "Datasets Released", value: 47, suffix: "" },
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
  return (
    <div className="relative">
      {/* Red glow at top */}
      <div className="absolute top-0 left-0 right-0 h-[300px] red-glow pointer-events-none" />
      
      <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">
              Public Intelligence Archive
            </span>
          </div>
          <h1
            className="font-display font-black text-foreground text-balance leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            The Archive
            <br />
            <span className="text-primary">is Open.</span>
          </h1>
          <p className="mt-4 max-w-lg font-body text-base text-muted-foreground leading-relaxed">
            Publicly released investigative records, indexed and organized for research. 
            Every document traceable to its official source.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="border-l border-border/50 pl-4"
            >
              <p className="font-data text-2xl font-bold text-foreground md:text-3xl">
                <AnimatedCounter target={stat.value} delay={0.6 + i * 0.15} />
              </p>
              <p className="mt-1 font-body text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {["All Records", "Legal Filings", "Flight Logs", "Financial Records", "Testimonies", "Surveillance"].map((cat, i) => (
            <button
              key={cat}
              className={i === 0 ? "category-pill category-pill-active" : "category-pill category-pill-inactive"}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroStats;
