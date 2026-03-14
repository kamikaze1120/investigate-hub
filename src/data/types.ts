export interface Person {
  id: string;
  name: string;
  photo_url: string;
  mention_count: number;
  first_mentioned_date: string;
  description: string;
}

export interface Document {
  id: string;
  title: string;
  dataset_number: string;
  release_date: string;
  document_type: string;
  thumbnail_url: string;
  source_url: string;
  summary: string;
  referenced_persons: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  event_title: string;
  description: string;
  associated_persons: string[];
}

export interface Flight {
  id: string;
  date: string;
  origin: string;
  destination: string;
  document_reference: string;
  passengers: string[];
}
