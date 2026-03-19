import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plane, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { flightLogs, topPersons } from "@/data/mockData";

const PAGE_SIZE = 80;

const AllFlights = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const personMap = useMemo(() => new Map(topPersons.map((person) => [person.id, person.name])), []);

  const sorted = useMemo(
    () => [...flightLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sorted;

    return sorted.filter((flight) => {
      const passengerNames = flight.passengers.map((id) => personMap.get(id) || id).join(" ").toLowerCase();
      const haystack = `${flight.date} ${flight.origin} ${flight.destination} ${flight.document_reference} ${passengerNames}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search, sorted, personMap]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const paged = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="relative">
          <div className="absolute left-0 right-0 top-0 h-[200px] red-glow pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 py-12">
            <button onClick={() => navigate("/")} className="mb-8 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft size={14} /> Back to Archive
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-2 flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <span className="font-data text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Flight Records</span>
              </div>
              <h1 className="font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                All <span className="text-primary">Flight Logs</span>
              </h1>
            </motion.div>

            <div className="mb-6 mt-8">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(0);
                  }}
                  placeholder="Search flights, locations, people..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">
                {filtered.length.toLocaleString()} flight record{filtered.length !== 1 ? "s" : ""} · Page {(page + 1).toLocaleString()} of {totalPages.toLocaleString()}
              </p>
            </div>

            <div className="space-y-3">
              {paged.map((flight, i) => {
                const passengers = flight.passengers.map((id) => personMap.get(id)).filter(Boolean);
                return (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.01, 0.35), duration: 0.3 }}
                    className="rounded-sm border border-border/40 bg-card/50 p-5 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-secondary">
                        <Plane size={18} className="text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-data text-xs font-medium text-primary">{flight.date}</span>
                          <span className="font-data text-[10px] text-muted-foreground/60">{flight.document_reference}</span>
                        </div>
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          {flight.origin} → {flight.destination}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {passengers.map((name) => (
                            <span key={name} className="rounded-sm bg-secondary/80 px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">{name}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={page === 0}
                  className="inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 font-data text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                >
                  <ChevronLeft size={12} /> Prev
                </button>
                <span className="font-data text-xs text-muted-foreground">{(page + 1).toLocaleString()} / {totalPages.toLocaleString()}</span>
                <button
                  onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={page >= totalPages - 1}
                  className="inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 font-data text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                >
                  Next <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 border-t border-border/30">
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

export default AllFlights;
