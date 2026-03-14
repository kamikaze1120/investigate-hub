import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroStats from "@/components/HeroStats";
import PersonCard from "@/components/PersonCard";
import DocumentCard from "@/components/DocumentCard";
import FlightCard from "@/components/FlightCard";
import TimelineCard from "@/components/TimelineCard";
import ContentRow from "@/components/ContentRow";
import DisclaimerModal from "@/components/DisclaimerModal";
import { topPersons, recentDocuments, flightLogs, timelineEvents } from "@/data/mockData";

const Index = () => {
  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DisclaimerModal
        isOpen={!disclaimerAcknowledged}
        onAcknowledge={() => setDisclaimerAcknowledged(true)}
      />

      {disclaimerAcknowledged && (
        <>
          <Navbar />
          <main className="pt-16">
            <HeroStats />

            {/* Top 10 Individuals */}
            <ContentRow title="Top 10 Most Mentioned" count={10}>
              {topPersons.map((person, i) => (
                <PersonCard
                  key={person.id}
                  name={person.name}
                  mention_count={person.mention_count}
                  rank={i + 1}
                  photo_url={person.photo_url}
                  delay={i * 0.08}
                />
              ))}
            </ContentRow>

            {/* Recently Released */}
            <ContentRow title="Recently Released" count={recentDocuments.length}>
              {recentDocuments.map((doc, i) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  dataset_number={doc.dataset_number}
                  release_date={doc.release_date}
                  document_type={doc.document_type}
                  summary={doc.summary}
                  delay={i * 0.06}
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
                  delay={i * 0.06}
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
                  delay={i * 0.06}
                />
              ))}
            </ContentRow>

            {/* Footer */}
            <footer className="border-t border-border/50 py-12">
              <div className="mx-auto max-w-[1400px] px-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">
                      EPI<span className="text-primary">—</span>FLIX
                    </p>
                    <p className="mt-1 font-body text-xs text-muted-foreground">
                      Public investigative document intelligence platform.
                    </p>
                  </div>
                  <p className="font-data text-xs text-muted-foreground">
                    All documents are publicly released records. This platform does not host original files.
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
