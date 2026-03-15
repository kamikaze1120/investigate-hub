import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { timelineEvents, topPersons } from "@/data/mockData";

const sorted = [...timelineEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const AllTimeline = () => {
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
                <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">Complete Timeline</span>
              </div>
              <h1 className="font-display text-3xl font-black text-foreground tracking-tight md:text-4xl">
                Case <span className="text-primary">Timeline</span>
              </h1>
            </motion.div>

            <div className="mt-10 relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/50 md:left-1/2 md:-translate-x-px" />

              <div className="space-y-8">
                {sorted.map((event, i) => {
                  const persons = event.associated_persons.map((id) => topPersons.find((p) => p.id === id)?.name).filter(Boolean);
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="relative flex items-start gap-4 md:gap-0"
                    >
                      {/* Dot */}
                      <div className="absolute left-[15px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background z-10 md:left-1/2 md:-translate-x-1/2" />

                      {/* Content */}
                      <div className={`ml-10 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-8" : "md:ml-auto md:pl-8"}`}>
                        <div className="rounded-sm border border-border/40 bg-card/50 p-5 hover:border-primary/30 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={12} className="text-primary" />
                            <span className="font-data text-xs text-primary font-medium">{event.date}</span>
                          </div>
                          <h3 className="font-display text-sm font-bold text-foreground">{event.event_title}</h3>
                          <p className="mt-1 font-body text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                          {persons.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {persons.map((name) => (
                                <span key={name} className="rounded-sm bg-secondary/80 px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">{name}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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

export default AllTimeline;
