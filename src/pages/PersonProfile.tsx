import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Plane, Clock, Users, ExternalLink, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoModal from "@/components/VideoModal";
import { topPersons, releasedVideos, type Video } from "@/data/mockData";
import { allIndividuals } from "@/data/allIndividuals";
import { getEnrichedProfile } from "@/data/profileEnrichment";

const personNameMap = new Map(allIndividuals.map((person) => [person.id, person.name]));

const PersonProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Look up person from top 10 first, then from all individuals
  const topPerson = topPersons.find((p) => p.id === id);
  const indexedPerson = !topPerson ? allIndividuals.find((p) => p.id === id) : null;
  const source = topPerson || indexedPerson;

  if (!source || !id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Person not found.</p>
          <button onClick={() => navigate("/individuals")} className="font-body text-sm text-primary hover:underline">
            Browse all individuals
          </button>
        </div>
      </div>
    );
  }

  const name = source.name;
  const mentionCount = source.mention_count;
  const photoUrl = source.photo_url || "";
  const category = indexedPerson?.category || "Multiple Sources";
  const description = topPerson?.description ||
    `Referenced individual appearing in ${category} records. Mentioned ${mentionCount.toLocaleString()} times across publicly released documents and depositions.`;
  const firstMentioned = topPerson?.first_mentioned_date || "Referenced in released documents";

  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const personNameMap = useMemo(() => new Map(allIndividuals.map((person) => [person.id, person.name])), []);

  // Get enriched profile data (works for ALL individuals)
  const enriched = getEnrichedProfile(id, name, mentionCount);
  const personVideos = releasedVideos.filter((v) => v.referenced_persons.includes(id));

  const topRank = topPersons.findIndex((p) => p.id === id) + 1;
  const globalRank = allIndividuals.findIndex((p) => p.id === id) + 1;
  const displayRank = topRank > 0 ? topRank : globalRank;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
      <main className="pt-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 red-glow opacity-50 pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 py-16">
            <Link to="/individuals" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={14} />
              Back to Individuals
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col gap-8 md:flex-row md:items-end"
            >
              <div className="relative">
                <div className="h-40 w-40 rounded-sm border-glow bg-card flex items-center justify-center card-shadow overflow-hidden">
                  {photoUrl ? (
                    <img src={photoUrl} alt={name} className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.svg"; }} />
                  ) : (
                    <span className="font-display text-4xl font-bold text-muted-foreground/30">{initials}</span>
                  )}
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-auto min-w-8 items-center justify-center rounded-sm bg-primary px-1.5">
                  <span className="font-data text-xs font-bold text-primary-foreground">#{displayRank.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="font-display text-3xl font-black text-foreground md:text-4xl tracking-tight">{name}</h1>
                <p className="mt-1 font-data text-xs text-primary/70">{category}</p>
                <p className="mt-2 font-body text-base text-muted-foreground max-w-xl">{description}</p>
                <div className="mt-4 flex flex-wrap gap-6">
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-primary">{mentionCount.toLocaleString()}</p>
                    <p className="font-body text-xs text-muted-foreground">Mentions</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-foreground">{enriched.documents.length}</p>
                    <p className="font-body text-xs text-muted-foreground">Documents</p>
                  </div>
                  {enriched.flights.length > 0 && (
                    <div className="border-l border-border/50 pl-4">
                      <p className="font-data text-xl font-bold text-foreground">{enriched.flights.length}</p>
                      <p className="font-body text-xs text-muted-foreground">Flights</p>
                    </div>
                  )}
                  {personVideos.length > 0 && (
                    <div className="border-l border-border/50 pl-4">
                      <p className="font-data text-xl font-bold text-foreground">{personVideos.length}</p>
                      <p className="font-body text-xs text-muted-foreground">Videos</p>
                    </div>
                  )}
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-foreground">{enriched.connections.length}</p>
                    <p className="font-body text-xs text-muted-foreground">Connections</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-sm text-muted-foreground">{firstMentioned}</p>
                    <p className="font-body text-xs text-muted-foreground">First Appeared</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sections */}
        <div className="mx-auto max-w-[1400px] px-6 pb-24 space-y-16">
          {/* Timeline */}
          {enriched.timeline.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <Clock size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Timeline</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{enriched.timeline.length}</span>
              </div>
              <div className="space-y-4">
                {enriched.timeline.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className="flex gap-4 border-l-2 border-border/50 pl-6 py-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex-shrink-0 w-24">
                      <span className="font-data text-xs text-primary">{event.date}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{event.event_title}</h3>
                      <p className="mt-1 font-body text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Videos */}
          {personVideos.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <Play size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Video Evidence</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{personVideos.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {personVideos.map((video, i) => (
                  <motion.div key={video.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.06, duration: 0.4 }}
                    className="group flex items-center justify-between rounded-sm border-glow border-glow-hover bg-card surface-gradient p-4 cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-data text-[10px] text-primary/70">{video.category}</span>
                        <span className="text-border">•</span>
                        <span className="font-data text-[10px] text-muted-foreground">{video.duration}</span>
                      </div>
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{video.title}</h3>
                    </div>
                    <Play size={14} className="text-muted-foreground/30 group-hover:text-primary transition-colors ml-4 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Documents */}
          {enriched.documents.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <FileText size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Referenced Documents</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{enriched.documents.length}</span>
              </div>
              <div className="grid gap-3">
                {enriched.documents.map((doc, i) => (
                  <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                    className="group flex items-center justify-between rounded-sm border-glow border-glow-hover bg-card surface-gradient p-4 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-data text-[10px] text-primary/70">{doc.document_type}</span>
                        <span className="text-border">•</span>
                        <span className="font-data text-[10px] text-muted-foreground">{doc.dataset_number}</span>
                      </div>
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{doc.title}</h3>
                      <p className="mt-1 font-body text-xs text-muted-foreground truncate">{doc.summary}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                      <span className="font-data text-[10px] text-muted-foreground">{doc.release_date}</span>
                      <ExternalLink size={14} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Flight Records */}
          {enriched.flights.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-cyan-glow/10">
                  <Plane size={16} className="text-cyan-glow" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Flight Records</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{enriched.flights.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {enriched.flights.map((flight, i) => (
                  <motion.div key={flight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.04, duration: 0.4 }}
                    className="rounded-sm border-glow bg-card surface-gradient p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-data text-[10px] text-cyan-glow">{flight.date}</span>
                      <span className="font-data text-[10px] text-muted-foreground">{flight.document_reference}</span>
                    </div>
                    <p className="font-display text-sm font-semibold text-foreground">
                      {flight.origin} → {flight.destination}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {flight.passengers.map((pid) => {
                        const p = topPersons.find((tp) => tp.id === pid);
                        const pName = p?.name || (pid === id ? name : pid);
                        return (
                          <span key={pid} className={`rounded-sm px-1.5 py-0.5 font-data text-[10px] ${pid === id ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"}`}>
                            {pName}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Connections */}
          {enriched.connections.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <Users size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Known Connections</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{enriched.connections.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {enriched.connections.map((conn, i) => (
                  <motion.div key={conn.personId} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}>
                    <Link
                      to={`/person/${conn.personId}`}
                      className="block rounded-sm border-glow border-glow-hover bg-card surface-gradient p-4 hover:translate-y-[-2px] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary overflow-hidden">
                          {conn.photoUrl ? (
                            <img src={conn.photoUrl} alt={conn.personName} className="h-full w-full object-cover"
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.svg"; }} />
                          ) : (
                            <span className="font-display text-xs font-bold text-muted-foreground">
                              {conn.personName.split(" ").map(n => n[0]).join("")}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-display text-sm font-semibold text-foreground">{conn.personName}</p>
                          <p className="font-data text-[10px] text-primary">{conn.relationship}</p>
                        </div>
                      </div>
                      <p className="font-data text-xs text-muted-foreground">
                        {conn.sharedDocs} shared document references
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
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

export default PersonProfile;