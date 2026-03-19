/**
 * Procedural profile enrichment engine.
 * Generates deterministic documents, flights, timeline events, and connections
 * for any individual based on their ID and mention count.
 * Uses seeded PRNG so data is stable across page loads.
 */

import type { Document, TimelineEvent, Flight } from "./types";
import { topPersons, recentDocuments, flightLogs, timelineEvents, personConnections } from "./mockData";
import { allIndividuals } from "./allIndividuals";

// ── Seeded PRNG ──────────────────────────────────────────────────────────────

function seededRng(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  let s = h >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// ── Reference data ───────────────────────────────────────────────────────────

const documentTypes = [
  "Legal Filing", "Law Enforcement", "Flight Log", "Financial Record",
  "Witness Testimony", "Court Order", "Deposition Transcript", "Grand Jury Record",
  "FBI Memo", "Phone Record", "Email Correspondence", "Property Record",
  "Tax Filing", "Bank Record", "Travel Document", "Surveillance Report",
  "Interview Transcript", "Subpoena", "Search Warrant", "Insurance Document",
];

const docTitlePrefixes: Record<string, string[]> = {
  "Legal Filing": ["Motion to Compel —", "Civil Complaint —", "Response Brief —", "Amended Complaint —", "Memorandum of Law —", "Court Filing —"],
  "Law Enforcement": ["Police Report —", "FBI Field Report —", "DEA Intelligence Brief —", "Investigation Summary —", "Incident Report —"],
  "Flight Log": ["Flight Manifest —", "Passenger Log —", "Aircraft Record —", "FAA Filing —", "Tail Number Record —"],
  "Financial Record": ["Wire Transfer Record —", "Bank Statement —", "Tax Return Excerpt —", "Trust Document —", "Foundation Filing —"],
  "Witness Testimony": ["Witness Statement —", "Sworn Affidavit —", "Interview Summary —", "Testimony Excerpt —"],
  "Court Order": ["Sealed Court Order —", "Judicial Directive —", "Protective Order —", "Discovery Order —"],
  "Deposition Transcript": ["Deposition —", "Video Deposition Transcript —", "Sworn Testimony —"],
  "Grand Jury Record": ["Grand Jury Exhibit —", "Grand Jury Transcript —", "Grand Jury Subpoena —"],
  "FBI Memo": ["FBI Memorandum —", "FBI Case File —", "FBI Intelligence Report —", "FBI Summary —"],
  "Phone Record": ["Phone Log —", "Call Detail Record —", "Cellular Tower Data —", "Voicemail Transcript —"],
  "Email Correspondence": ["Email Chain —", "Email Record —", "Electronic Communication —"],
  "Property Record": ["Property Deed —", "Land Transfer —", "Real Estate Record —", "Title Search —"],
  "Tax Filing": ["Tax Return —", "IRS Filing —", "Tax Assessment —"],
  "Bank Record": ["Bank Wire —", "Account Statement —", "Transaction Record —"],
  "Travel Document": ["Passport Record —", "Customs Declaration —", "Immigration Filing —", "Visa Application —"],
  "Surveillance Report": ["Surveillance Log —", "Monitoring Report —", "Security Footage Log —"],
  "Interview Transcript": ["Recorded Interview —", "Investigative Interview —", "Witness Interview —"],
  "Subpoena": ["Subpoena Duces Tecum —", "Grand Jury Subpoena —", "Congressional Subpoena —"],
  "Search Warrant": ["Search Warrant —", "Seizure Inventory —", "Warrant Application —"],
  "Insurance Document": ["Insurance Claim —", "Policy Record —", "Underwriting File —"],
};

const jurisdictions = [
  "Southern District of New York", "Southern District of Florida", "District of Columbia",
  "Eastern District of New York", "Palm Beach County", "U.S. Virgin Islands",
  "Northern District of Illinois", "Central District of California", "District of New Mexico",
  "State of New York", "State of Florida", "United Kingdom Courts",
  "Paris Tribunal", "Middle District of Florida",
];

const airports = [
  "Teterboro, NJ", "Palm Beach, FL", "St. Thomas, USVI", "Paris, France",
  "London, UK", "Santa Fe, NM", "Columbus, OH", "Los Angeles, CA",
  "Miami, FL", "JFK, New York", "Hanscom Field, MA", "Dulles, VA",
  "Midway, Chicago", "Scottsdale, AZ", "Aspen, CO", "Nantucket, MA",
];

const eventTemplates = [
  { title: "Referenced in Court Filing", desc: "Name appears in sealed court documents released under FOIA." },
  { title: "Mentioned in Deposition", desc: "Referenced during sworn deposition testimony by a cooperating witness." },
  { title: "Appears in Flight Manifest", desc: "Name listed on flight manifest for private aircraft travel." },
  { title: "Named in Police Report", desc: "Referenced in law enforcement investigation files." },
  { title: "Financial Record Cross-Reference", desc: "Name appears in financial transaction records and wire transfers." },
  { title: "Phone Record Match", desc: "Phone number associated with this individual appears in seized records." },
  { title: "Email Correspondence Reference", desc: "Name mentioned in electronic communications obtained via subpoena." },
  { title: "Property Record Association", desc: "Linked to property records through corporate entity filings." },
  { title: "Witness Statement Mention", desc: "Named by a witness during recorded law enforcement interview." },
  { title: "Surveillance Log Entry", desc: "Identified in surveillance footage or monitoring logs." },
  { title: "Grand Jury Exhibit", desc: "Name appears in exhibits presented to the grand jury." },
  { title: "FBI Intelligence Report", desc: "Referenced in internal FBI intelligence assessment." },
];

const relationships = ["Associate", "Referenced", "Co-traveler", "Financial Link", "Witness", "Legal Counsel", "Employee", "Business Partner"];

// ── Generators ───────────────────────────────────────────────────────────────

function generateDate(rand: () => number, startYear: number, endYear: number): string {
  const year = startYear + Math.floor(rand() * (endYear - startYear + 1));
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 28);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generateDocNumber(rand: () => number): string {
  const year = 2000 + Math.floor(rand() * 24);
  const seq = Math.floor(rand() * 9999) + 1;
  return `DOC-${year}-${String(seq).padStart(4, "0")}`;
}

export interface EnrichedProfile {
  documents: Document[];
  flights: Flight[];
  timeline: TimelineEvent[];
  connections: { personId: string; personName: string; relationship: string; sharedDocs: number; photoUrl?: string }[];
}

export function getEnrichedProfile(personId: string, personName: string, mentionCount: number): EnrichedProfile {
  // For top-10 persons, return existing curated data
  const isTop10 = topPersons.some(p => p.id === personId);
  if (isTop10) {
    const docs = recentDocuments.filter(d => d.referenced_persons.includes(personId));
    const flights = flightLogs.filter(f => f.passengers.includes(personId));
    const events = timelineEvents.filter(e => e.associated_persons.includes(personId));
    const conns = personConnections
      .filter(c => c.person_id === personId || c.connected_to === personId)
      .map(c => {
        const connId = c.person_id === personId ? c.connected_to : c.person_id;
        const connPerson = topPersons.find(p => p.id === connId);
        return connPerson ? {
          personId: connPerson.id,
          personName: connPerson.name,
          relationship: c.relationship,
          sharedDocs: c.shared_documents,
          photoUrl: connPerson.photo_url,
        } : null;
      })
      .filter(Boolean) as EnrichedProfile["connections"];

    return { documents: docs, flights, timeline: events, connections: conns };
  }

  // Generate deterministic enrichment data based on mention count
  const rand = seededRng(personId + personName);

  // Scale data volume by mention count
  const docCount = Math.min(50, Math.max(3, Math.floor(mentionCount / 40)));
  const flightCount = Math.min(20, Math.max(0, Math.floor(mentionCount / 200)));
  const eventCount = Math.min(15, Math.max(2, Math.floor(mentionCount / 100)));
  const connCount = Math.min(12, Math.max(1, Math.floor(mentionCount / 150)));

  // Generate documents
  const documents: Document[] = [];
  for (let i = 0; i < docCount; i++) {
    const docType = documentTypes[Math.floor(rand() * documentTypes.length)];
    const prefixes = docTitlePrefixes[docType] || [`${docType} —`];
    const prefix = prefixes[Math.floor(rand() * prefixes.length)];
    const jurisdiction = jurisdictions[Math.floor(rand() * jurisdictions.length)];

    documents.push({
      id: `${personId}-doc-${i}`,
      title: `${prefix} ${jurisdiction}`,
      dataset_number: generateDocNumber(rand),
      release_date: generateDate(rand, 2023, 2024),
      document_type: docType,
      thumbnail_url: "",
      source_url: "#",
      summary: `Document referencing ${personName} obtained from ${jurisdiction}. Part of ${mentionCount.toLocaleString()} total indexed references.`,
      referenced_persons: [personId],
    });
  }

  // Generate flights
  const flights: Flight[] = [];
  for (let i = 0; i < flightCount; i++) {
    const originIdx = Math.floor(rand() * airports.length);
    let destIdx = Math.floor(rand() * airports.length);
    if (destIdx === originIdx) destIdx = (destIdx + 1) % airports.length;

    // Add some co-passengers from top persons
    const passengers = [personId];
    if (rand() > 0.4) {
      const coPassenger = topPersons[Math.floor(rand() * 3)]; // Epstein, Maxwell, or Brunel
      passengers.push(coPassenger.id);
    }

    flights.push({
      id: `${personId}-flight-${i}`,
      date: generateDate(rand, 1998, 2013),
      origin: airports[originIdx],
      destination: airports[destIdx],
      document_reference: generateDocNumber(rand),
      passengers,
    });
  }

  // Generate timeline events
  const timeline: TimelineEvent[] = [];
  const usedTemplates = new Set<number>();
  for (let i = 0; i < eventCount; i++) {
    let templateIdx = Math.floor(rand() * eventTemplates.length);
    while (usedTemplates.has(templateIdx) && usedTemplates.size < eventTemplates.length) {
      templateIdx = (templateIdx + 1) % eventTemplates.length;
    }
    usedTemplates.add(templateIdx);
    const template = eventTemplates[templateIdx];

    timeline.push({
      id: `${personId}-event-${i}`,
      date: generateDate(rand, 2000, 2024),
      event_title: template.title,
      description: template.desc.replace("this individual", personName),
      associated_persons: [personId],
    });
  }
  timeline.sort((a, b) => a.date.localeCompare(b.date));

  // Generate connections
  const connections: EnrichedProfile["connections"] = [];
  const usedConnIds = new Set<string>();
  // Always connect to some top persons
  for (let i = 0; i < Math.min(connCount, 3); i++) {
    const topIdx = Math.floor(rand() * topPersons.length);
    const tp = topPersons[topIdx];
    if (!usedConnIds.has(tp.id)) {
      usedConnIds.add(tp.id);
      connections.push({
        personId: tp.id,
        personName: tp.name,
        relationship: relationships[Math.floor(rand() * relationships.length)],
        sharedDocs: Math.floor(rand() * 200) + 5,
        photoUrl: tp.photo_url,
      });
    }
  }
  // Connect to other notable individuals
  const notableIds = ["notable-donald-trump", "notable-bill-clinton", "notable-prince-andrew", "notable-alan-dershowitz"];
  for (let i = connections.length; i < connCount; i++) {
    if (rand() > 0.5 && notableIds.length > 0) {
      const nId = notableIds[Math.floor(rand() * notableIds.length)];
      const nPerson = allIndividuals.find(p => p.id === nId);
      if (nPerson && !usedConnIds.has(nId)) {
        usedConnIds.add(nId);
        connections.push({
          personId: nPerson.id,
          personName: nPerson.name,
          relationship: relationships[Math.floor(rand() * relationships.length)],
          sharedDocs: Math.floor(rand() * 100) + 2,
          photoUrl: nPerson.photo_url,
        });
        continue;
      }
    }
    // Connect to random generated individuals
    const rIdx = Math.floor(rand() * Math.min(500, allIndividuals.length));
    const rPerson = allIndividuals[rIdx];
    if (rPerson && rPerson.id !== personId && !usedConnIds.has(rPerson.id)) {
      usedConnIds.add(rPerson.id);
      connections.push({
        personId: rPerson.id,
        personName: rPerson.name,
        relationship: relationships[Math.floor(rand() * relationships.length)],
        sharedDocs: Math.floor(rand() * 50) + 1,
        photoUrl: rPerson.photo_url,
      });
    }
  }

  return { documents, flights, timeline, connections };
}
