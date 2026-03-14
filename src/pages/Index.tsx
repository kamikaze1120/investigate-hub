import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroStats from "@/components/HeroStats";
import PersonCard from "@/components/PersonCard";
import DocumentCard from "@/components/DocumentCard";
import FlightCard from "@/components/FlightCard";
import TimelineCard from "@/components/TimelineCard";
import VideoCard from "@/components/VideoCard";
import ContentRow from "@/components/ContentRow";
import DisclaimerModal from "@/components/DisclaimerModal";
import { topPersons, recentDocuments, flightLogs, timelineEvents, releasedVideos } from "@/data/mockData";

const Index = () => {
  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <DisclaimerModal
        isOpen={!disclaimerAcknowledged}
        onAcknowledge={() => setDisclaimerAcknowledged(true)}
      />

      {disclaimerAcknowledged && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <main className="pt-16">
            <HeroStats />

            {/* Top 10 Individuals */}
            <ContentRow title="Top 10 Most Mentioned" count={10} accent>
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

            {/* Released Videos */}
            <ContentRow title="Released Video Evidence" count={releasedVideos.length} accent>
              {releasedVideos.map((video, i) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  description={video.description}
                  duration={video.duration}
                  release_date={video.release_date}
                  category={video.category}
                  referenced_persons={video.referenced_persons}
                  delay={i * 0.06}
                />
              ))}
            </ContentRow>

            {/* Recently Released */}
            <ContentRow title="Recently Released Documents" count={recentDocuments.length}>
              {recentDocuments.map((doc, i) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  dataset_number={doc.dataset_number}
                  release_date={doc.release_date}
                  document_type={doc.document_type}
                  summary={doc.summary}
                  delay={i * 0.05}
                />
              ))}
            </ContentRow>

            {/* Flight Logs */}
            <ContentRow title="Flight Logs" count={flightLogs.length}>
              {flightLogs.map((flight, i) => (
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

            {/* Timeline */}
            <ContentRow title="Timeline Highlights" count={timelineEvents.length}>
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
            <footer className="border-t border-border/30 mt-8">
              <div className="mx-auto max-w-[1400px] px-6 py-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="font-display text-lg font-black text-primary">EPI</span>
                      <span className="font-display text-lg font-light text-foreground/40">—</span>
                      <span className="font-display text-lg font-black text-foreground">FLIX</span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground max-w-xs">
                      Public investigative document intelligence platform. All documents are publicly released records.
                    </p>
                  </div>
                  <div className="flex gap-12">
                    <div>
                      <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-wider mb-3">Archive</h3>
                      <div className="space-y-2">
                        {["Documents", "Individuals", "Flight Logs", "Timeline"].map((link) => (
                          <p key={link} className="font-body text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{link}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-wider mb-3">Legal</h3>
                      <div className="space-y-2">
                        {["Disclaimer", "Sources", "FOIA Requests", "Contact"].map((link) => (
                          <p key={link} className="font-body text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{link}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-border/20 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="font-data text-[10px] text-muted-foreground/50 tracking-wider">
                    THIS PLATFORM DOES NOT HOST ORIGINAL FILES. METADATA AND SOURCE LINKS ONLY.
                  </p>
                  <p className="font-data text-[10px] text-muted-foreground/40">
                    © {new Date().getFullYear()} EPI-FLIX
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
