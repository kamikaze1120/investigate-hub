import { ChevronRight } from "lucide-react";
import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ContentRowProps {
  title: string;
  count?: number;
  children: ReactNode;
  accent?: boolean;
  sectionId?: string;
  exploreAllPath?: string;
}

const ContentRow = ({ title, count, children, accent = false, sectionId, exploreAllPath }: ContentRowProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  return (
    <motion.section
      ref={ref}
      id={sectionId}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="py-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {accent && <div className="h-5 w-1 rounded-full bg-primary" />}
            <h2 className="font-display text-lg font-bold text-foreground tracking-tight">
              {title}
            </h2>
            {count !== undefined && (
              <span className="font-data text-xs text-muted-foreground bg-secondary rounded-sm px-2 py-0.5">
                {count.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={() => exploreAllPath ? navigate(exploreAllPath) : undefined}
            className="flex items-center gap-1 font-body text-xs text-muted-foreground transition-colors hover:text-primary group/btn"
          >
            Explore All
            <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="relative row-fade-right">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 pr-8">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContentRow;
