import { motion, AnimatePresence } from "framer-motion";

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-4 max-w-lg glass-surface border-glow rounded-lg p-8 card-shadow"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-evidence-red animate-pulse" />
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                Legal Disclaimer
              </h2>
            </div>

            <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
              Documents displayed on this platform are publicly released records
              obtained through court orders, FOIA requests, and official
              government disclosures.
            </p>

            <p className="mb-8 font-body text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground font-medium">
                Appearance of any name does not imply wrongdoing or criminal
                activity.
              </span>{" "}
              All individuals are presumed innocent unless proven guilty in a
              court of law.
            </p>

            <button
              onClick={onAcknowledge}
              className="w-full rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              I Acknowledge
            </button>

            <p className="mt-4 text-center font-data text-xs text-muted-foreground">
              248,192 Documents Indexed
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
