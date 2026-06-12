import { motion } from "framer-motion";
import { FileText, ExternalLink, ShieldCheck } from "lucide-react";

interface DocumentCardProps {
  title: string;
  dataset_number: string;
  release_date: string;
  document_type: string;
  summary: string;
  source_url?: string;
  delay?: number;
  isVerified?: boolean;
}

const typeColors: Record<string, string> = {
  "Legal Filing": "bg-primary/20 text-primary",
  "Law Enforcement": "bg-amber-500/20 text-amber-400",
  "Flight Log": "bg-cyan-400/20 text-cyan-400",
  "Financial Record": "bg-emerald-500/20 text-emerald-400",
  "Witness Testimony": "bg-violet-500/20 text-violet-400",
  "Photo Evidence": "bg-orange-500/20 text-orange-400",
};

const DocumentCard = ({ title, dataset_number, release_date, document_type, summary, source_url, delay = 0, isVerified = true }: DocumentCardProps) => {
  const hasSource = Boolean(source_url) && source_url !== "#";

  const handleOpenSource = () => {
    if (!hasSource || !source_url) return;

    const isExternal = /^https?:\/\//.test(source_url);
    if (isExternal) {
      window.open(source_url, "_blank", "noopener,noreferrer");
    } else {
      window.open(source_url, "_self");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
      onClick={handleOpenSource}
      className={`group relative flex-shrink-0 ${hasSource ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="relative h-[240px] w-[320px] overflow-hidden rounded-md border-glow border-glow-hover card-shadow surface-gradient bg-card transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        
        <div className="flex items-start justify-between p-4 pb-2">
          <span className={`rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${typeColors[document_type] || "bg-muted text-muted-foreground"}`}>
            {document_type}
          </span>
          {isVerified && (
            <div className="flex items-center gap-1 text-[10px] font-data text-muted-foreground/60">
              <ShieldCheck size={10} className="text-emerald-500" />
              <span>VERIFIED</span>
            </div>
          )}
        </div>

        <div className="px-4 mt-2">
          <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-3 line-clamp-4 font-body text-xs leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
            {summary}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border/30 px-4 py-3 bg-secondary/20">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-muted-foreground/60" />
            <span className="font-data text-[10px] text-muted-foreground">{dataset_number}</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="font-data text-[10px] text-muted-foreground">{release_date}</span>
             <ExternalLink size={12} className={`transition-all duration-300 ${hasSource ? "text-primary opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0" : "hidden"}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
