import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

interface DocumentCardProps {
  title: string;
  dataset_number: string;
  release_date: string;
  document_type: string;
  summary: string;
  delay?: number;
}

const typeColors: Record<string, string> = {
  "Legal Filing": "text-primary",
  "Law Enforcement": "text-evidence-red",
  "Flight Log": "text-amber-400",
  "Financial Record": "text-emerald-400",
  "Witness Testimony": "text-violet-400",
  "Photo Evidence": "text-orange-400",
};

const DocumentCard = ({ title, dataset_number, release_date, document_type, summary, delay = 0 }: DocumentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative flex-shrink-0 cursor-pointer"
    >
      <div className="relative h-[220px] w-[320px] overflow-hidden rounded-lg border-glow border-glow-hover card-shadow surface-gradient bg-card">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            <FileText size={14} className={typeColors[document_type] || "text-muted-foreground"} />
            <span className={`font-data text-xs ${typeColors[document_type] || "text-muted-foreground"}`}>
              {document_type}
            </span>
          </div>
          <ExternalLink size={14} className="text-muted-foreground/0 transition-all duration-200 group-hover:text-muted-foreground" />
        </div>

        {/* Content */}
        <div className="px-4">
          <h3 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 font-body text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {summary}
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border/50 px-4 py-3">
          <span className="font-data text-xs text-muted-foreground">{dataset_number}</span>
          <span className="font-data text-xs text-muted-foreground">{release_date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
