import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Plane, Clock, Users, ExternalLink, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoModal from "@/components/VideoModal";
import { topPersons, recentDocuments, flightLogs, timelineEvents, personConnections, releasedVideos, type Video } from "@/data/mockData";

const PersonProfile = () => {
  const { id } = useParams();
  const person = topPersons.find((p) => p.id === id);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (!person) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Person not found.</p>
      </div>
    );
  }

  const initials = person.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const personDocs = recentDocuments.filter((d) => d.referenced_persons.includes(person.id));
  const personFlights = flightLogs.filter((f) => f.passengers.includes(person.id));
  const personEvents = timelineEvents.filter((e) => e.associated_persons.includes(person.id));
  const personVideos = releasedVideos.filter((v) => v.referenced_persons.includes(person.id));
  const connections = personConnections
    .filter((c) => c.person_id === person.id || c.connected_to === person.id)
    .map((c) => {
      const connectedId = c.person_id === person.id ? c.connected_to : c.person_id;
      const connectedPerson = topPersons.find((p) => p.id === connectedId);
      return { ...c, person: connectedPerson };
    })
    .filter((c) => c.person);

  const rank = topPersons.findIndex((p) => p.id === id) + 1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
      <main className="pt-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 red-glow opacity-50 pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 py-16">
            <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={14} />
              Back to Archive
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col gap-8 md:flex-row md:items-end"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="h-40 w-40 rounded-sm border-glow bg-card flex items-center justify-center card-shadow overflow-hidden">
                  {person.photo_url ? (
                    <img src={person.photo_url} alt={person.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-display text-4xl font-bold text-muted-foreground/30">{initials}</span>
                  )}
                </div>
                {rank <= 10 && (
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
                    <span className="font-data text-xs font-bold text-primary-foreground">#{rank}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="font-display text-3xl font-black text-foreground md:text-4xl tracking-tight">
                  {person.name}
                </h1>
                <p className="mt-2 font-body text-base text-muted-foreground max-w-xl">
                  {person.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-6">
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-primary">{person.mention_count.toLocaleString()}</p>
                    <p className="font-body text-xs text-muted-foreground">Mentions</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-foreground">{personDocs.length}</p>
                    <p className="font-body text-xs text-muted-foreground">Documents</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-foreground">{personFlights.length}</p>
                    <p className="font-body text-xs text-muted-foreground">Flights</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-foreground">{personVideos.length}</p>
                    <p className="font-body text-xs text-muted-foreground">Videos</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-xl font-bold text-foreground">{connections.length}</p>
                    <p className="font-body text-xs text-muted-foreground">Connections</p>
                  </div>
                  <div className="border-l border-border/50 pl-4">
                    <p className="font-data text-sm text-muted-foreground">{person.first_mentioned_date}</p>
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
          {personEvents.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <Clock size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Timeline</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{personEvents.length}</span>
              </div>
              <div className="space-y-4">
                {personEvents.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
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
          {personDocs.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <FileText size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Referenced Documents</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{personDocs.length}</span>
              </div>
              <div className="grid gap-3">
                {personDocs.map((doc, i) => (
                  <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
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
          {personFlights.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-cyan-glow/10">
                  <Plane size={16} className="text-cyan-glow" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Flight Records</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{personFlights.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {personFlights.map((flight, i) => (
                  <motion.div key={flight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
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
                        return p ? (
                          <span key={pid} className={`rounded-sm px-1.5 py-0.5 font-data text-[10px] ${pid === person.id ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"}`}>
                            {p.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Connections */}
          {connections.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10">
                  <Users size={16} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Known Connections</h2>
                <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">{connections.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {connections.map((conn, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}>
                    <Link
                      to={`/person/${conn.person!.id}`}
                      className="block rounded-sm border-glow border-glow-hover bg-card surface-gradient p-4 hover:translate-y-[-2px] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary overflow-hidden">
                          {conn.person!.photo_url ? (
                            <img src={conn.person!.photo_url} alt={conn.person!.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="font-display text-xs font-bold text-muted-foreground">
                              {conn.person!.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-display text-sm font-semibold text-foreground">{conn.person!.name}</p>
                          <p className="font-data text-[10px] text-primary">{conn.relationship}</p>
                        </div>
                      </div>
                      <p className="font-data text-xs text-muted-foreground">
                        {conn.shared_documents} shared document references
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
};

export default PersonProfile;
