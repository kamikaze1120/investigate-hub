import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import { recentDocuments, documentTypes } from "@/data/mockData";

const AllDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFilter = (location.state as any)?.filter || "All";
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(initialFilter);

  const filtered = useMemo(
    () => recentDocuments.filter((d) => {
      const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.summary.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || d.document_type === typeFilter;
      return matchesSearch && matchesType;
    }),
    [search, typeFilter]
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[200px] red-glow pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 py-12">
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Archive
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-primary" />
                <span className="font-data text-[10px] text-primary tracking-[0.2em] uppercase font-medium">Document Archive</span>
              </div>
              <h1 className="font-display text-3xl font-black text-foreground tracking-tight md:text-4xl">
                All <span className="text-primary">Documents</span>
              </h1>
            </motion.div>

            {/* Filters */}
            <div className="mt-8 flex flex-wrap gap-2">
              {documentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type === "All" ? "All" : type)}
                  className={typeFilter === type || (type === "All" && typeFilter === "All")
                    ? "category-pill category-pill-active"
                    : "category-pill category-pill-inactive"}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-6 mb-8">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..."
                  className="h-10 w-full rounded-sm border border-border bg-card pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <p className="mt-3 font-data text-xs text-muted-foreground">{filtered.length} document{filtered.length !== 1 ? "s" : ""} found</p>
            </div>

            {/* Document list */}
            <div className="space-y-3">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="group rounded-sm border border-border/40 bg-card/50 p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-secondary">
                      <FileText size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display text-sm font-semibold text-foreground leading-snug">{doc.title}</h3>
                        <span className={`shrink-0 rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${typeColors[doc.document_type] || "bg-muted text-muted-foreground"}`}>
                          {doc.document_type}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">{doc.summary}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="font-data text-[10px] text-muted-foreground/60">{doc.dataset_number}</span>
                        <span className="font-data text-[10px] text-muted-foreground/60">{doc.release_date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <footer className="border-t border-border/30 mt-8">
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
