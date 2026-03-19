import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

interface DocumentCardProps {
  title: string;
  dataset_number: string;
  release_date: string;
  document_type: string;
  summary: string;
  source_url?: string;
  delay?: number;
}

const typeColors: Record<string, string> = {
  "Legal Filing": "bg-primary/20 text-primary",
  "Law Enforcement": "bg-amber-500/20 text-amber-400",
  "Flight Log": "bg-cyan-glow/20 text-cyan-glow",
  "Financial Record": "bg-emerald-500/20 text-emerald-400",
  "Witness Testimony": "bg-violet-500/20 text-violet-400",
  "Photo Evidence": "bg-orange-500/20 text-orange-400",
};

const DocumentCard = ({ title, dataset_number, release_date, document_type, summary, source_url, delay = 0 }: DocumentCardProps) => {
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
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      onClick={handleOpenSource}
      className={`group relative flex-shrink-0 ${hasSource ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="relative h-[230px] w-[330px] overflow-hidden rounded-sm border-glow border-glow-hover card-shadow surface-gradient bg-card">
        <div className="flex items-start justify-between p-4 pb-2">
          <span className={`rounded-sm px-2 py-0.5 font-data text-[10px] font-medium ${typeColors[document_type] || "bg-muted text-muted-foreground"}`}>
            {document_type}
          </span>
          <ExternalLink size={14} className={`transition-all duration-200 ${hasSource ? "text-muted-foreground/0 group-hover:text-muted-foreground" : "text-muted-foreground/20"}`} />
        </div>

        <div className="px-4">
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 font-body text-xs leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border/30 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-muted-foreground/60" />
            <span className="font-data text-[10px] text-muted-foreground">{dataset_number}</span>
          </div>
          <span className="font-data text-[10px] text-muted-foreground">{release_date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
