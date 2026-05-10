"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

type VehicleFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  onApply?: () => void;
  activeCount: number;
  children: ReactNode;
};

export function VehicleFilterDrawer({
  open,
  onClose,
  onApply,
  activeCount,
  children,
}: VehicleFilterDrawerProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-inverse-surface/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface-container-lowest shadow-editorial lg:hidden"
            aria-label="Filter inventory"
          >
            <header className="flex items-center justify-between border-b border-outline-variant px-6 py-5">
              <span className="font-label-caps text-sm font-bold uppercase tracking-[0.14em] text-on-background">
                Filter inventory {activeCount > 0 ? `(${activeCount})` : ""}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
                aria-label="Close filters"
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
            <footer className="flex items-center gap-3 border-t border-outline-variant p-4">
              <button
                type="button"
                onClick={onApply ?? onClose}
                className="flex h-14 flex-1 items-center justify-center rounded-sm bg-on-background text-base font-semibold text-background transition-colors duration-200 hover:bg-inverse-surface"
              >
                View inventory
              </button>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
