import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { allIndividuals } from "@/data/allIndividuals";
import { topPersons } from "@/data/mockData";

const PAGE_SIZE = 100;

const AllIndividuals = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () => allIndividuals.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-primary" />
                <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">Complete Index</span>
              </div>
              <h1 className="font-display text-3xl font-black text-foreground tracking-tight md:text-4xl">
                All Referenced <span className="text-primary">Individuals</span>
              </h1>
              <p className="mt-2 font-body text-sm text-muted-foreground max-w-lg">
                Every individual mentioned across publicly released documents, flight logs, and depositions.
              </p>
            </motion.div>

            {/* Search */}
            <div className="mt-8 mb-6">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                  placeholder="Search individuals..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">
                {filtered.length.toLocaleString()} individual{filtered.length !== 1 ? "s" : ""} found
                {totalPages > 1 && ` · Page ${page + 1} of ${totalPages.toLocaleString()}`}
              </p>
            </div>

            {/* Pagination top */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 font-data text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={12} /> Prev
                </button>
                {[0, 1, 2, 3, 4].filter(i => i < totalPages).map(i => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-8 w-8 rounded-sm font-data text-xs transition-colors ${page === i ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 5 && (
                  <>
                    <span className="font-data text-xs text-muted-foreground">...</span>
                    <button
                      onClick={() => setPage(totalPages - 1)}
                      className={`h-8 min-w-8 px-2 rounded-sm font-data text-xs transition-colors ${page === totalPages - 1 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 font-data text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  Next <ChevronRight size={12} />
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {paged.map((person, i) => {
                const initials = person.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
                const globalRank = page * PAGE_SIZE + i + 1;
                const _isTop10 = topPersons.some((p) => p.id === person.id);
                return (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.01, 0.5), duration: 0.3 }}
                    whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`/person/${person.id}`)}
                    className="group relative cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm border-glow border-glow-hover card-shadow">
                      {/* Photo or initials */}
                      <div className="relative z-10 flex h-full w-full items-center justify-center bg-muted/20 overflow-hidden">
                        {person.photo_url ? (
                          <img
                            src={person.photo_url}
                            alt={person.name}
                            className="h-full w-full object-cover grayscale-hover"
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              img.onerror = null;
                              img.src = "/placeholder.svg";
                            }}
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-secondary">
                            <span className="font-display text-lg font-bold text-muted-foreground/50 group-hover:text-primary transition-colors">
                              {initials}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 z-20 card-overlay-gradient" />
                      <div className="absolute bottom-0 left-0 right-0 z-30 p-2.5">
                        <p className="font-display text-xs font-bold text-foreground leading-tight text-shadow-heavy">
                          {person.name}
                        </p>
                        <p className="mt-0.5 font-data text-[10px] text-primary font-medium">
                          {person.mention_count.toLocaleString()} mentions
                        </p>
                        <p className="font-data text-[9px] text-muted-foreground/60">{person.category}</p>
                      </div>
                      <div className="absolute left-1.5 top-1.5 z-30">
                        <div className="flex h-5 w-auto min-w-5 items-center justify-center rounded-sm bg-primary/80 backdrop-blur-sm px-1">
                          <span className="font-data text-[9px] font-bold text-primary-foreground">
                            #{globalRank.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination bottom */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => { setPage(Math.max(0, page - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 0}
                  className="flex items-center gap-1 rounded-sm border border-border px-4 py-2 font-data text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={12} /> Previous
                </button>
                <span className="font-data text-xs text-muted-foreground">
                  Page {page + 1} of {totalPages.toLocaleString()}
                </span>
                <button
                  onClick={() => { setPage(Math.min(totalPages - 1, page + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-1 rounded-sm border border-border px-4 py-2 font-data text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  Next <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="border-t border-border/30 mt-8">
          <div className="mx-auto max-w-[1400px] px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-display text-lg font-black text-primary">DREAD</span>
                <span className="font-display text-lg font-black text-foreground">FLIX</span>
              </div>
              <p className="font-data text-[10px] text-muted-foreground/40">© {new Date().getFullYear()} DREADFLIX</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AllIndividuals;
