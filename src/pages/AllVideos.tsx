import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Play, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoModal from "@/components/VideoModal";
import { releasedVideos, type Video } from "@/data/mockData";
import { allIndividuals } from "@/data/allIndividuals";

const categoryColors: Record<string, string> = {
  Surveillance: "bg-primary/20 text-primary",
  "Legal Proceeding": "bg-amber-500/20 text-amber-400",
  "Press Conference": "bg-blue-500/20 text-blue-400",
  Evidence: "bg-destructive/20 text-destructive",
  Interview: "bg-emerald-500/20 text-emerald-400",
};

const PAGE_SIZE = 48;

const AllVideos = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return releasedVideos;

    return releasedVideos.filter((video) => {
      const haystack = `${video.title} ${video.description} ${video.category}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search]);

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
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
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
                <span className="font-data text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Video Evidence</span>
              </div>
              <h1 className="font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                All <span className="text-primary">Videos</span>
              </h1>
            </motion.div>

            <div className="mb-8 mt-8">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(0);
                  }}
                  placeholder="Search videos..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">
                {filtered.length.toLocaleString()} video{filtered.length !== 1 ? "s" : ""} found · Page {(page + 1).toLocaleString()} of {totalPages.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((video, i) => {
                const persons = video.referenced_persons
                  .map((id) => allIndividuals.find((person) => person.id === id)?.name || id)
                  .filter(Boolean);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.35 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedVideo(video)}
                    className="group cursor-pointer overflow-hidden rounded-sm border border-border/40 bg-card/50 transition-colors hover:border-primary/30"
                  >
                    <div className="relative aspect-video bg-muted/20">
                      <img
                        src={video.thumbnail_url || "/placeholder.svg"}
                        alt={`${video.title} thumbnail`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        onError={(event) => {
                          const img = event.currentTarget;
                          img.onerror = null;
                          img.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 opacity-60 transition-opacity group-hover:opacity-100">
                          <Play size={24} className="ml-1 text-primary-foreground" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-sm bg-background/80 px-2 py-1">
                        <Clock size={10} className="text-muted-foreground" />
                        <span className="font-data text-[10px] text-foreground">{video.duration}</span>
                      </div>
                      <div className="absolute left-3 top-3">
                        <span className={`rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${categoryColors[video.category] || "bg-muted text-muted-foreground"}`}>
                          {video.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground">{video.title}</h3>
                      <p className="mt-1 line-clamp-2 font-body text-xs text-muted-foreground">{video.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {persons.slice(0, 3).map((name) => (
                          <span key={name} className="rounded-sm bg-secondary/80 px-1.5 py-0.5 font-data text-[10px] text-secondary-foreground">{name}</span>
                        ))}
                        <span className="font-data text-[10px] text-muted-foreground">{video.release_date}</span>
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

export default AllVideos;
