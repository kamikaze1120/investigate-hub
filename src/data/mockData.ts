import { Person, Document, TimelineEvent, Flight } from "./types";

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  release_date: string;
  source_url: string;
  category: string;
  referenced_persons: string[];
}

export interface PersonConnection {
  person_id: string;
  connected_to: string;
  shared_documents: number;
  relationship: string;
}

export const topPersons: Person[] = [
  { id: "1", name: "Jeffrey Epstein", photo_url: "", mention_count: 14892, first_mentioned_date: "1998-03-15", description: "Central figure in investigation. Financier and convicted offender." },
  { id: "2", name: "Ghislaine Maxwell", photo_url: "", mention_count: 9841, first_mentioned_date: "1999-06-22", description: "British socialite and convicted accomplice." },
  { id: "3", name: "Jean-Luc Brunel", photo_url: "", mention_count: 4210, first_mentioned_date: "2001-01-10", description: "French modeling agent referenced across multiple depositions." },
  { id: "4", name: "Sarah Kellen", photo_url: "", mention_count: 3856, first_mentioned_date: "2000-11-03", description: "Personal assistant referenced in multiple witness testimonies." },
  { id: "5", name: "Nadia Marcinkova", photo_url: "", mention_count: 3201, first_mentioned_date: "2002-04-18", description: "Referenced in flight logs and witness depositions." },
  { id: "6", name: "Lesley Groff", photo_url: "", mention_count: 2987, first_mentioned_date: "1999-09-12", description: "Executive assistant mentioned in organizational records." },
  { id: "7", name: "Virginia Giuffre", photo_url: "", mention_count: 2754, first_mentioned_date: "2001-07-28", description: "Key witness and plaintiff in civil litigation." },
  { id: "8", name: "Adriana Ross", photo_url: "", mention_count: 2341, first_mentioned_date: "2003-02-14", description: "Referenced in multiple depositions and flight records." },
  { id: "9", name: "Emmy Tayler", photo_url: "", mention_count: 1998, first_mentioned_date: "2002-08-05", description: "Personal assistant referenced in UK-related documents." },
  { id: "10", name: "Haley Robson", photo_url: "", mention_count: 1756, first_mentioned_date: "2004-01-20", description: "Referenced in Palm Beach investigation documents." },
];

export const recentDocuments: Document[] = [
  { id: "d1", title: "Palm Beach Police Department Investigation Report", dataset_number: "DOC-2006-0847", release_date: "2024-01-15", document_type: "Law Enforcement", thumbnail_url: "", source_url: "#", summary: "Initial investigation report filed by Palm Beach PD detailing complaints received in 2005.", referenced_persons: ["1", "4", "6"] },
  { id: "d2", title: "Flight Manifest — Lolita Express N908JE", dataset_number: "DOC-2009-1203", release_date: "2024-01-12", document_type: "Flight Log", thumbnail_url: "", source_url: "#", summary: "Complete passenger manifests for aircraft N908JE covering flights from 1995 to 2013.", referenced_persons: ["1", "2", "5", "8"] },
  { id: "d3", title: "Deposition of Virginia Giuffre — Civil Case", dataset_number: "DOC-2015-3291", release_date: "2024-01-10", document_type: "Legal Filing", thumbnail_url: "", source_url: "#", summary: "Sworn testimony detailing interactions and events from 2000 to 2002.", referenced_persons: ["1", "2", "7"] },
  { id: "d4", title: "FBI Field Office Memorandum — New York", dataset_number: "DOC-2007-0562", release_date: "2024-01-08", document_type: "Law Enforcement", thumbnail_url: "", source_url: "#", summary: "Internal memorandum regarding investigation status and coordination between field offices.", referenced_persons: ["1", "2", "3"] },
  { id: "d5", title: "Non-Prosecution Agreement — Southern District of Florida", dataset_number: "DOC-2008-0091", release_date: "2024-01-05", document_type: "Legal Filing", thumbnail_url: "", source_url: "#", summary: "Controversial plea agreement granting immunity to potential co-conspirators.", referenced_persons: ["1"] },
  { id: "d6", title: "Property Records — Little St. James Island", dataset_number: "DOC-2010-2847", release_date: "2024-01-03", document_type: "Financial Record", thumbnail_url: "", source_url: "#", summary: "Land deed transfers and property records for USVI holdings.", referenced_persons: ["1"] },
  { id: "d7", title: "Grand Jury Transcript — 2006 Proceedings", dataset_number: "DOC-2019-4501", release_date: "2023-12-28", document_type: "Legal Filing", thumbnail_url: "", source_url: "#", summary: "Partial transcript of grand jury proceedings in Palm Beach County.", referenced_persons: ["1", "4", "10"] },
  { id: "d8", title: "Maxwell Deposition — Giuffre v. Maxwell", dataset_number: "DOC-2016-5102", release_date: "2023-12-22", document_type: "Legal Filing", thumbnail_url: "", source_url: "#", summary: "Sealed deposition released by court order. Testimony regarding recruitment activities.", referenced_persons: ["2", "7"] },
];

export const flightLogs: Flight[] = [
  { id: "f1", date: "2002-03-12", origin: "Teterboro, NJ", destination: "St. Thomas, USVI", document_reference: "DOC-2009-1203", passengers: ["1", "2", "5"] },
  { id: "f2", date: "2002-06-18", origin: "St. Thomas, USVI", destination: "Paris, France", document_reference: "DOC-2009-1203", passengers: ["1", "3"] },
  { id: "f3", date: "2003-01-05", origin: "Palm Beach, FL", destination: "Teterboro, NJ", document_reference: "DOC-2009-1203", passengers: ["1", "2", "4", "8"] },
  { id: "f4", date: "2003-09-22", origin: "Teterboro, NJ", destination: "Santa Fe, NM", document_reference: "DOC-2009-1203", passengers: ["1", "6"] },
  { id: "f5", date: "2004-02-14", origin: "Palm Beach, FL", destination: "St. Thomas, USVI", document_reference: "DOC-2009-1203", passengers: ["1", "2", "5", "9"] },
  { id: "f6", date: "2005-07-30", origin: "Paris, France", destination: "Teterboro, NJ", document_reference: "DOC-2009-1203", passengers: ["1", "3"] },
];

export const timelineEvents: TimelineEvent[] = [
  { id: "t1", date: "2005-03-15", event_title: "Palm Beach PD Opens Investigation", description: "Local police begin investigation following initial complaint.", associated_persons: ["1"] },
  { id: "t2", date: "2006-05-01", event_title: "FBI Begins Federal Investigation", description: "Case escalated to federal authorities after local investigation findings.", associated_persons: ["1", "2"] },
  { id: "t3", date: "2007-06-30", event_title: "Grand Jury Convened", description: "Palm Beach County grand jury convened to review evidence.", associated_persons: ["1"] },
  { id: "t4", date: "2008-06-30", event_title: "Non-Prosecution Agreement Signed", description: "Controversial plea deal reached with federal prosecutors.", associated_persons: ["1"] },
  { id: "t5", date: "2015-01-05", event_title: "Giuffre v. Maxwell Filed", description: "Civil defamation lawsuit filed revealing new allegations.", associated_persons: ["2", "7"] },
  { id: "t6", date: "2019-07-06", event_title: "Arrest at Teterboro Airport", description: "Arrested on federal charges upon arrival from Paris.", associated_persons: ["1"] },
  { id: "t7", date: "2020-07-02", event_title: "Maxwell Arrested", description: "Arrested in New Hampshire on federal charges.", associated_persons: ["2"] },
  { id: "t8", date: "2024-01-03", event_title: "Document Release — Court Order", description: "Federal court orders release of sealed documents from civil case.", associated_persons: ["1", "2", "7"] },
];

export const releasedVideos: Video[] = [
  { id: "v1", title: "Surveillance Footage — Palm Beach Residence", description: "Security camera recordings from the Palm Beach property obtained during the 2005 investigation by Palm Beach PD.", duration: "12:34", release_date: "2024-01-18", source_url: "#", category: "Surveillance", referenced_persons: ["1", "4"] },
  { id: "v2", title: "Deposition Video — Virginia Giuffre (2016)", description: "Video recording of sworn deposition testimony in the Giuffre v. Maxwell civil case.", duration: "2:15:08", release_date: "2024-01-14", source_url: "#", category: "Legal Proceeding", referenced_persons: ["7"] },
  { id: "v3", title: "News Conference — SDNY Indictment (2019)", description: "Press conference announcing federal indictment by the Southern District of New York.", duration: "28:41", release_date: "2024-01-10", source_url: "#", category: "Press Conference", referenced_persons: ["1"] },
  { id: "v4", title: "Courtroom Footage — Maxwell Trial Day 1", description: "Public courtroom video from the opening day of the Ghislaine Maxwell federal trial.", duration: "1:42:19", release_date: "2024-01-06", source_url: "#", category: "Legal Proceeding", referenced_persons: ["2"] },
  { id: "v5", title: "FBI Evidence Presentation — Grand Jury", description: "Compilation of visual evidence presented during grand jury proceedings.", duration: "45:22", release_date: "2023-12-30", source_url: "#", category: "Evidence", referenced_persons: ["1", "2", "3"] },
  { id: "v6", title: "Aerial Footage — Little St. James Island", description: "Drone and aerial footage of the private island property in the U.S. Virgin Islands.", duration: "8:17", release_date: "2023-12-25", source_url: "#", category: "Evidence", referenced_persons: ["1"] },
  { id: "v7", title: "Interview Footage — Palm Beach Detective", description: "Recorded interview with lead detective from the Palm Beach Police Department investigation.", duration: "34:56", release_date: "2023-12-20", source_url: "#", category: "Interview", referenced_persons: ["1", "6"] },
  { id: "v8", title: "Deposition Video — Ghislaine Maxwell (2016)", description: "Sealed video deposition released by federal court order from the civil defamation case.", duration: "3:08:44", release_date: "2023-12-15", source_url: "#", category: "Legal Proceeding", referenced_persons: ["2"] },
];

export const personConnections: PersonConnection[] = [
  { person_id: "1", connected_to: "2", shared_documents: 847, relationship: "Associate" },
  { person_id: "1", connected_to: "3", shared_documents: 312, relationship: "Associate" },
  { person_id: "1", connected_to: "4", shared_documents: 567, relationship: "Employee" },
  { person_id: "1", connected_to: "5", shared_documents: 234, relationship: "Referenced" },
  { person_id: "1", connected_to: "6", shared_documents: 445, relationship: "Employee" },
  { person_id: "2", connected_to: "3", shared_documents: 198, relationship: "Associate" },
  { person_id: "2", connected_to: "7", shared_documents: 523, relationship: "Legal Dispute" },
  { person_id: "4", connected_to: "6", shared_documents: 156, relationship: "Colleague" },
  { person_id: "7", connected_to: "1", shared_documents: 412, relationship: "Plaintiff" },
];

export const documentTypes = ["All", "Legal Filing", "Law Enforcement", "Flight Log", "Financial Record", "Witness Testimony", "Photo Evidence", "Surveillance"];
