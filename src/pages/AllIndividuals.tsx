import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { topPersons } from "@/data/mockData";

const AllIndividuals = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = topPersons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[200px] red-glow pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 py-12">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Archive
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-primary" />
                <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">
                  Complete Index
                </span>
              </div>
              <h1 className="font-display text-3xl font-black text-foreground tracking-tight md:text-4xl">
                All Referenced <span className="text-primary">Individuals</span>
              </h1>
              <p className="mt-2 font-body text-sm text-muted-foreground max-w-lg">
                Every individual mentioned across publicly released documents, flight logs, and depositions.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 mb-10"
            >
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search individuals..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">
                {filtered.length} individual{filtered.length !== 1 ? "s" : ""} found
              </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((person, i) => {
                const initials = person.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
                const rank = topPersons.findIndex((p) => p.id === person.id) + 1;
                return (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`/person/${person.id}`)}
                    className="group relative cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm border-glow border-glow-hover card-shadow">
                      {/* Rank behind */}
                      <div
                        className="absolute -left-2 bottom-10 z-0 select-none font-display text-[100px] font-black leading-none opacity-[0.06]"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
                      >
                        {rank}
                      </div>

                      {/* Photo */}
                      <div className="relative z-10 flex h-full w-full items-center justify-center bg-muted/20 grayscale-hover overflow-hidden">
                        {person.photo_url ? (
                          <img
                            src={person.photo_url}
                            alt={person.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10 bg-secondary">
                            <span className="font-display text-xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors">
                              {initials}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 z-20 card-overlay-gradient" />

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 z-30 p-3">
                        <p className="font-display text-sm font-bold text-foreground leading-tight text-shadow-heavy">
                          {person.name}
                        </p>
                        <p className="mt-0.5 font-data text-xs text-primary font-medium">
                          {person.mention_count.toLocaleString()} mentions
                        </p>
                      </div>

                      {/* Rank badge */}
                      <div className="absolute left-2 top-2 z-30">
                        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary/90 backdrop-blur-sm">
                          <span className="font-data text-[10px] font-bold text-primary-foreground">
                            {rank}
                          </span>
                        </div>
                      </div>

                      {/* Red glow hover */}
                      <div
                        className="absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(0 80% 50% / 0.08) 0%, transparent 70%)" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/30 mt-8">
          <div className="mx-auto max-w-[1400px] px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-display text-lg font-black text-primary">DREAD</span>
                <span className="font-display text-lg font-black text-foreground">FLIX</span>
              </div>
              <p className="font-data text-[10px] text-muted-foreground/40">
                © {new Date().getFullYear()} DREADFLIX
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AllIndividuals;
