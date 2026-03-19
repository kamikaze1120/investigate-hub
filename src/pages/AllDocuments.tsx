import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, FileText, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { documentTypes } from "@/data/mockData";
import { queryDocuments, TOTAL_DOCUMENTS_INDEXED } from "@/data/allDocuments";

const PAGE_SIZE = 60;

const AllDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const state = location.state as { filter?: string } | null;
    const requestedFilter = state?.filter;

    if (requestedFilter && (requestedFilter === "All" || documentTypes.includes(requestedFilter))) {
      setTypeFilter(requestedFilter);
      setPage(0);
      return;
    }

    if (!requestedFilter) {
      setTypeFilter("All");
      setPage(0);
    }
  }, [location.key]);

  const result = useMemo(
    () => queryDocuments({ page, pageSize: PAGE_SIZE, search, typeFilter }),
    [page, search, typeFilter]
  );

  const typeColors: Record<string, string> = {
    "Legal Filing": "bg-amber-500/20 text-amber-400",
    "Law Enforcement": "bg-blue-500/20 text-blue-400",
    "Flight Log": "bg-emerald-500/20 text-emerald-400",
    "Financial Record": "bg-purple-500/20 text-purple-400",
    "Witness Testimony": "bg-primary/20 text-primary",
    "Photo Evidence": "bg-pink-500/20 text-pink-400",
    "Surveillance": "bg-orange-500/20 text-orange-400",
  };

  const currentStart = result.total === 0 ? 0 : page * PAGE_SIZE + 1;
  const currentEnd = Math.min((page + 1) * PAGE_SIZE, result.total);

  const openSource = (sourceUrl: string) => {
    if (!sourceUrl || sourceUrl === "#") return;

    const isExternal = /^https?:\/\//.test(sourceUrl);
    if (isExternal) {
      window.open(sourceUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open(sourceUrl, "_self");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-[200px] red-glow" />
          <div className="mx-auto max-w-[1400px] px-6 py-12">
            <button onClick={() => navigate("/")} className="mb-8 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft size={14} /> Back to Archive
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-2 flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <span className="font-data text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Document Archive</span>
              </div>
              <h1 className="font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                All <span className="text-primary">Documents</span>
              </h1>
              <p className="mt-2 max-w-xl font-body text-sm text-muted-foreground">
                Browsing {TOTAL_DOCUMENTS_INDEXED.toLocaleString()} indexed records with filtering and search.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-2">
              {documentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setTypeFilter(type);
                    setPage(0);
                  }}
                  className={typeFilter === type ? "category-pill category-pill-active" : "category-pill category-pill-inactive"}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-8 mt-6">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                  }}
                  placeholder="Search documents..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">
                {result.total.toLocaleString()} documents found · Showing {currentStart.toLocaleString()}–{currentEnd.toLocaleString()}
              </p>
            </div>

            <div className="space-y-3">
              {result.documents.map((doc, i) => {
                const hasSource = doc.source_url && doc.source_url !== "#";

                return (
                  <motion.div
                    key={`${doc.id}-${page}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.01, duration: 0.3 }}
                    className="group rounded-sm border border-border/40 bg-card/50 p-5 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-secondary">
                        <FileText size={18} className="text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-3">
                          <h3 className="font-display text-sm font-semibold leading-snug text-foreground">{doc.title}</h3>
                          <span className={`shrink-0 rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${typeColors[doc.document_type] || "bg-muted text-muted-foreground"}`}>
                            {doc.document_type}
                          </span>
                        </div>
                        <p className="line-clamp-2 font-body text-xs leading-relaxed text-muted-foreground">{doc.summary}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-4">
                          <span className="font-data text-[10px] text-muted-foreground/60">{doc.dataset_number}</span>
                          <span className="font-data text-[10px] text-muted-foreground/60">{doc.release_date}</span>
                          <button
                            onClick={() => openSource(doc.source_url)}
                            disabled={!hasSource}
                            className="inline-flex items-center gap-1 font-data text-[10px] uppercase tracking-wider text-primary transition-colors disabled:cursor-not-allowed disabled:text-muted-foreground/40"
                          >
                            Open source <ExternalLink size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {result.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setPage((prev) => Math.max(0, prev - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={page === 0}
                  className="inline-flex items-center gap-1 rounded-sm border border-border px-4 py-2 font-data text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft size={12} /> Previous
                </button>
                <span className="font-data text-xs text-muted-foreground">
                  Page {page + 1} of {result.totalPages.toLocaleString()}
                </span>
                <button
                  onClick={() => {
                    setPage((prev) => Math.min(result.totalPages - 1, prev + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={page >= result.totalPages - 1}
                  className="inline-flex items-center gap-1 rounded-sm border border-border px-4 py-2 font-data text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                >
                  Next <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 border-t border-border/30">
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

export default AllDocuments;
