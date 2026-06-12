import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroStats from "@/components/HeroStats";
import HubTiles from "@/components/HubTiles";
import PersonCard from "@/components/PersonCard";
import DocumentCard from "@/components/DocumentCard";
import FlightCard from "@/components/FlightCard";
import TimelineCard from "@/components/TimelineCard";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import ContentRow from "@/components/ContentRow";
import DisclaimerModal from "@/components/DisclaimerModal";
import { topPersons, recentDocuments, flightLogs, timelineEvents, releasedVideos, type Video } from "@/data/mockData";

const DISCLAIMER_STORAGE_KEY = "dreadflix_disclaimer_acknowledged_v1";
const HOME_VIDEO_PREVIEW_LIMIT = 12;
const HOME_FLIGHT_PREVIEW_LIMIT = 16;
const HOME_RECENT_VIDEO_LIMIT = 12;
const HOME_CURATED_DOC_LIMIT = 10;

const Index = () => {
  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(DISCLAIMER_STORAGE_KEY) === "true";
  });
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const homeVideoPreview = releasedVideos.slice(0, HOME_VIDEO_PREVIEW_LIMIT);
  const newestVideoPreview = [...releasedVideos].sort((a, b) => b.release_date.localeCompare(a.release_date)).slice(0, HOME_RECENT_VIDEO_LIMIT);
  const curatedDocuments = [...recentDocuments].sort((a, b) => b.release_date.localeCompare(a.release_date)).slice(0, HOME_CURATED_DOC_LIMIT);
  const homeFlightPreview = flightLogs.slice(0, HOME_FLIGHT_PREVIEW_LIMIT);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo && disclaimerAcknowledged) {
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, disclaimerAcknowledged]);

  const handleDisclaimerAcknowledge = () => {
    setDisclaimerAcknowledged(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DisclaimerModal
        isOpen={!disclaimerAcknowledged}
        onAcknowledge={handleDisclaimerAcknowledge}
      />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />

      {disclaimerAcknowledged && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <main className="pt-16 pb-20">
            <HeroStats />
            
            <HubTiles />

            <ContentRow title="Trending Now" count={10} accent sectionId="section-individuals" exploreAllPath="/individuals">
              {topPersons.map((person, i) => (
                <PersonCard
                  key={person.id}
                  name={person.name}
                  mention_count={person.mention_count}
                  rank={i + 1}
                  photo_url={person.photo_url}
                  description={person.description}
                  onClick={() => navigate(`/person/${person.id}`)}
                  delay={i * 0.06}
                />
              ))}
            </ContentRow>

            <ContentRow title="Continue Watching Evidence" count={releasedVideos.length} accent sectionId="section-videos" exploreAllPath="/videos">
              {homeVideoPreview.map((video, i) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  description={video.description}
                  duration={video.duration}
                  release_date={video.release_date}
                  category={video.category}
                  thumbnail_url={video.thumbnail_url}
                  referenced_persons={video.referenced_persons}
                  onClick={() => setSelectedVideo(video)}
                  delay={i * 0.06}
                  isTrending={i < 3}
                />
              ))}
            </ContentRow>

            <ContentRow title="Because You Opened Case Files" count={newestVideoPreview.length} sectionId="section-recents" exploreAllPath="/videos">
              {newestVideoPreview.map((video, i) => (
                <VideoCard
                  key={`${video.id}-recent`}
                  title={video.title}
                  description={video.description}
                  duration={video.duration}
                  release_date={video.release_date}
                  category={video.category}
                  thumbnail_url={video.thumbnail_url}
                  referenced_persons={video.referenced_persons}
                  onClick={() => setSelectedVideo(video)}
                  delay={i * 0.04}
                />
              ))}
            </ContentRow>

            <ContentRow title="New Releases" count={curatedDocuments.length} sectionId="section-documents" exploreAllPath="/documents">
              {curatedDocuments.map((doc, i) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  dataset_number={doc.dataset_number}
                  release_date={doc.release_date}
                  document_type={doc.document_type}
                  summary={doc.summary}
                  source_url={doc.source_url}
                  delay={i * 0.05}
                />
              ))}
            </ContentRow>

            <ContentRow title="Route History" count={flightLogs.length} sectionId="section-flights" exploreAllPath="/flights">
              {homeFlightPreview.map((flight, i) => (
                <FlightCard
                  key={flight.id}
                  date={flight.date}
                  origin={flight.origin}
                  destination={flight.destination}
                  passengers={flight.passengers}
                  delay={i * 0.05}
                />
              ))}
            </ContentRow>

            <ContentRow title="Historical Archives" count={timelineEvents.length} sectionId="section-timeline" exploreAllPath="/timeline">
              {timelineEvents.map((event, i) => (
                <TimelineCard
                  key={event.id}
                  date={event.date}
                  event_title={event.event_title}
                  description={event.description}
                  associated_persons={event.associated_persons}
                  delay={i * 0.05}
                />
              ))}
            </ContentRow>

            {/* Footer */}
            <footer className="border-t border-border/10 mt-20">
              <div className="mx-auto max-w-[1400px] px-6 py-16">
                <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="font-display text-2xl font-black text-primary tracking-tighter">DREAD</span>
                      <span className="font-display text-2xl font-black text-foreground tracking-tighter">FLIX</span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
                      Streaming-style investigative archive interface for navigating public records, linked entities, and evidence collections.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-16">
                    <div>
                      <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-[0.2em] mb-6">Archive</h3>
                      <div className="space-y-3">
                        <p onClick={() => navigate("/documents")} className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Documents</p>
                        <p onClick={() => navigate("/individuals")} className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Individuals</p>
                        <p onClick={() => navigate("/flights")} className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Flight Logs</p>
                        <p onClick={() => navigate("/timeline")} className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Timeline</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-[0.2em] mb-6">Support</h3>
                      <div className="space-y-3">
                        <p className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">How it works</p>
                        <p className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Verify Record</p>
                        <p className="font-body text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">API Access</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-20 pt-8 border-t border-border/5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="font-data text-[10px] text-muted-foreground/40 tracking-widest uppercase">
                    PRODUCED FOR PUBLIC INTELLIGENCE PURPOSES ONLY.
                  </p>
                  <p className="font-data text-[10px] text-muted-foreground/30">
                    © {new Date().getFullYear()} DREADFLIX INTEL. ALL RECORDS PUBLIC.
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
