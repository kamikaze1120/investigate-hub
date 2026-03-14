import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAcknowledge: () => void;
}

const DisclaimerModal = ({ isOpen, onAcknowledge }: DisclaimerModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-2xl"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)"
          }} />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="relative mx-4 max-w-md glass-surface border-glow rounded-sm p-8 card-shadow"
          >
            {/* Red accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="mb-6 flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-red" />
              <h2 className="font-display text-base font-bold tracking-tight text-foreground uppercase">
                Legal Disclaimer
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                Documents displayed on this platform are publicly released records
                obtained through court orders, FOIA requests, and official
                government disclosures.
              </p>

              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground font-medium">
                  Appearance of any name does not imply wrongdoing or criminal
                  activity.
                </span>{" "}
                All individuals are presumed innocent unless proven guilty in a
                court of law.
              </p>
            </div>

            <button
              onClick={onAcknowledge}
              className="w-full rounded-sm bg-primary px-6 py-3 font-display text-sm font-bold text-primary-foreground uppercase tracking-wider transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_30px_-5px_hsl(0_80%_50%/0.4)] active:scale-[0.98]"
            >
              I Acknowledge
            </button>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-border/50" />
              <p className="font-data text-[10px] text-muted-foreground tracking-wider uppercase">
                248,192 Documents Indexed
              </p>
              <div className="h-px flex-1 bg-border/50" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
