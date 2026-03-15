import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Play, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoModal from "@/components/VideoModal";
import { releasedVideos, topPersons, type Video } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  "Surveillance": "bg-primary/20 text-primary",
  "Legal Proceeding": "bg-amber-500/20 text-amber-400",
  "Press Conference": "bg-blue-500/20 text-blue-400",
  "Evidence": "bg-destructive/20 text-destructive",
  "Interview": "bg-emerald-500/20 text-emerald-400",
};

const AllVideos = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filtered = releasedVideos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
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
                <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">Video Evidence</span>
              </div>
              <h1 className="font-display text-3xl font-black text-foreground tracking-tight md:text-4xl">
                All <span className="text-primary">Videos</span>
              </h1>
            </motion.div>

            <div className="mt-8 mb-8">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search videos..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">{filtered.length} video{filtered.length !== 1 ? "s" : ""} found</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((video, i) => {
                const persons = video.referenced_persons.map((id) => topPersons.find((p) => p.id === id)?.name).filter(Boolean);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedVideo(video)}
                    className="group cursor-pointer rounded-sm border border-border/40 bg-card/50 overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <div className="relative aspect-video bg-muted/20">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 opacity-60 group-hover:opacity-100 transition-opacity">
                          <Play size={24} className="text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-background/80 px-2 py-1">
                        <Clock size={10} className="text-muted-foreground" />
                        <span className="font-data text-[10px] text-foreground">{video.duration}</span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${categoryColors[video.category] || "bg-muted text-muted-foreground"}`}>
                          {video.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2">{video.title}</h3>
                      <p className="mt-1 font-body text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
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

export default AllVideos;
