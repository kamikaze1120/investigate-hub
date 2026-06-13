const isAbsoluteUrl = (value: string) => /^https?:\/\//.test(value);

export const buildDocumentSourceUrl = (datasetNumber: string) => {
  if (!datasetNumber) return "/documents";
  return `/documents?search=${encodeURIComponent(datasetNumber)}`;
};

export const buildFlightSearchUrl = (documentReference: string) => {
  if (!documentReference) return "/flights";
  return `/flights?search=${encodeURIComponent(documentReference)}`;
};

export const buildPersonProfileUrl = (personId: string) => {
  if (!personId) return "/individuals";
  return `/person/${encodeURIComponent(personId)}`;
};

export const openArchiveUrl = (url: string) => {
  if (!url) return;

  if (isAbsoluteUrl(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.assign(url);
};

export const isInternalArchiveUrl = (url?: string | null) => {
  if (!url) return false;
  return !isAbsoluteUrl(url) && url.startsWith("/");
};