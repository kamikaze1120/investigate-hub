import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ContentRowProps {
  title: string;
  count?: number;
  children: ReactNode;
}

const ContentRow = ({ title, count, children }: ContentRowProps) => {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              {title}
            </h2>
            {count !== undefined && (
              <span className="font-data text-xs text-muted-foreground">
                {count.toLocaleString()}
              </span>
            )}
          </div>
          <button className="flex items-center gap-1 font-body text-xs text-muted-foreground transition-colors hover:text-primary">
            View All <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentRow;
