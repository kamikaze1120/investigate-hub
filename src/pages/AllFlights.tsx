import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plane } from "lucide-react";
import Navbar from "@/components/Navbar";
import { flightLogs, topPersons } from "@/data/mockData";

const sorted = [...flightLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const AllFlights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[200px] red-glow pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 py-12">
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Archive
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-primary" />
                <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">Flight Records</span>
              </div>
              <h1 className="font-display text-3xl font-black text-foreground tracking-tight md:text-4xl">
                All <span className="text-primary">Flight Logs</span>
              </h1>
            </motion.div>

            <p className="mt-3 font-data text-xs text-muted-foreground">{sorted.length} flight record{sorted.length !== 1 ? "s" : ""}</p>

            <div className="mt-8 space-y-3">
              {sorted.map((flight, i) => {
                const passengers = flight.passengers.map((id) => topPersons.find((p) => p.id === id)?.name).filter(Boolean);
                return (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="rounded-sm border border-border/40 bg-card/50 p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-secondary">
                        <Plane size={18} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-data text-xs text-primary font-medium">{flight.date}</span>
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

export default AllFlights;
