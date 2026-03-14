import { motion } from "framer-motion";

const stats = [
  { label: "Documents Indexed", value: "248,192" },
  { label: "Individuals Referenced", value: "21,847" },
  { label: "Flight Records", value: "3,291" },
  { label: "Datasets", value: "47" },
];

const HeroStats = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1
          className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance"
          style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
        >
          The Archive is Open.
        </h1>
        <p className="mt-3 max-w-xl font-body text-base text-muted-foreground">
          Publicly released investigative records, indexed and organized for research.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8 flex flex-wrap gap-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
          >
            <p className="font-data text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroStats;
