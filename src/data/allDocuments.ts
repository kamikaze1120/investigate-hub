import { Document } from "./types";
import { documentTypes, recentDocuments } from "./mockData";

export const TOTAL_DOCUMENTS_INDEXED = 248192;

interface QueryDocumentsOptions {
  page: number;
  pageSize: number;
  search: string;
  typeFilter: string;
}

interface QueryDocumentsResult {
  documents: Document[];
  total: number;
  totalPages: number;
}

const generatedDocumentTypes = documentTypes.filter((type) => type !== "All");
const adjectivePool = [
  "Federal",
  "Sealed",
  "Supplemental",
  "Redacted",
  "Judicial",
  "Investigative",
  "Forensic",
  "Cross-Referenced",
  "Clerk",
  "Grand Jury",
];
const subjectPool = [
  "Case File",
  "Evidence Packet",
  "Witness Log",
  "Deposition Record",
  "Financial Ledger",
  "Property Register",
  "Travel Manifest",
  "Communications Extract",
  "Procedural Filing",
  "Court Transcript",
];
const summaryPool = [
  "Contains indexed references, metadata anchors, and source custody notes for released material.",
  "Cataloged release with extracted names, timeline tags, and linked docket references.",
  "Publicly released record bundle cross-linked with flight logs and testimony metadata.",
  "Release index entry containing document provenance notes and associated person references.",
  "Structured archive item with searchable excerpts and source traceability markers.",
];
const personIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const toPadded = (value: number, size = 4) => value.toString().padStart(size, "0");

const buildReleaseDate = (index: number) => {
  const year = 1998 + (index % 27);
  const month = (index % 12) + 1;
  const day = (index % 28) + 1;
  return `${year}-${toPadded(month, 2)}-${toPadded(day, 2)}`;
};

const createGeneratedDocument = (position: number): Document => {
  const datasetSeed = position + 5000;
  const type = generatedDocumentTypes[position % generatedDocumentTypes.length];
  const adjective = adjectivePool[position % adjectivePool.length];
  const subject = subjectPool[(position * 3) % subjectPool.length];
  const summary = summaryPool[(position * 5) % summaryPool.length];
  const releaseDate = buildReleaseDate(position);

  const referenced = [
    personIds[position % personIds.length],
    personIds[(position + 3) % personIds.length],
  ];

  return {
    id: `gd-${position + 1}`,
    title: `${adjective} ${subject} — Archive Entry ${toPadded(position + 1, 6)}`,
    dataset_number: `DOC-${releaseDate.slice(0, 4)}-${toPadded(datasetSeed, 4)}`,
    release_date: releaseDate,
    document_type: type,
    thumbnail_url: "",
    source_url: "#",
    summary,
    referenced_persons: referenced,
  };
};

const getDocumentByIndex = (index: number): Document => {
  if (index < recentDocuments.length) {
    return recentDocuments[index];
  }

  return createGeneratedDocument(index - recentDocuments.length);
};

const documentMatches = (document: Document, search: string, typeFilter: string) => {
  const matchesType = typeFilter === "All" || document.document_type === typeFilter;
  if (!matchesType) return false;

  if (!search) return true;

  const haystack = `${document.title} ${document.summary} ${document.dataset_number}`.toLowerCase();
  return haystack.includes(search);
};

export const queryDocuments = ({
  page,
  pageSize,
  search,
  typeFilter,
}: QueryDocumentsOptions): QueryDocumentsResult => {
  const safePage = Math.max(0, page);
  const normalizedSearch = search.trim().toLowerCase();
  const start = safePage * pageSize;
  const end = start + pageSize;

  if (typeFilter === "All" && !normalizedSearch) {
    const documents: Document[] = [];
    const sliceEnd = Math.min(TOTAL_DOCUMENTS_INDEXED, end);

    for (let i = start; i < sliceEnd; i += 1) {
      documents.push(getDocumentByIndex(i));
    }

    return {
      documents,
      total: TOTAL_DOCUMENTS_INDEXED,
      totalPages: Math.ceil(TOTAL_DOCUMENTS_INDEXED / pageSize),
    };
  }

  const documents: Document[] = [];
  let total = 0;

  for (let i = 0; i < TOTAL_DOCUMENTS_INDEXED; i += 1) {
    const document = getDocumentByIndex(i);
    if (!documentMatches(document, normalizedSearch, typeFilter)) continue;

    if (total >= start && total < end) {
      documents.push(document);
    }

    total += 1;
  }

  return {
    documents,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
};
