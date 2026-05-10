"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroSearchBar } from "./HeroSearchBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroStub() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background layer — Phase 2 replaces with <HeroScene /> (R3F) */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(1200px 600px at 70% 20%, rgba(227, 226, 223, 0.7), transparent 70%)," +
              "radial-gradient(900px 500px at 20% 90%, rgba(230, 226, 215, 0.6), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 0%, transparent 70%, var(--background) 100%)",
          }}
        />
        <div className="grain-overlay absolute inset-0" aria-hidden />
      </div>

      <Container>
        <div className="flex min-h-[calc(100dvh-72px)] flex-col justify-between gap-16 py-20 md:py-28">
          <div className="grid flex-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex max-w-2xl flex-col gap-8">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="font-label-caps text-label-caps uppercase text-on-surface-variant"
              >
                A curated automotive marketplace
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.05 }}
                className="font-display-lg text-display-lg text-balance text-on-background"
              >
                Find the vehicle{" "}
                <em className="italic text-tertiary">that belongs</em> to you.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.15 }}
                className="max-w-xl font-body-lg text-body-lg text-on-surface-variant text-pretty"
              >
                New, pre-owned, and private rentals from verified dealers —
                presented with editorial care. Discover your next drive without
                the noise of a classifieds board.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
                className="flex items-center gap-6 pt-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-2 rounded-full bg-tertiary" aria-hidden />
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                    Now accepting private listings
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Visual column — Phase 2 replaces with cinematic 3D scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="editorial-shadow-lg relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-container-high">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(145deg, rgba(28, 28, 25, 0.08), rgba(28, 28, 25, 0) 40%)," +
                      "radial-gradient(60% 50% at 50% 55%, rgba(49, 48, 45, 0.22), transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-label-caps text-label-caps uppercase text-inverse-on-surface/80">
                      Editors Spotlight
                    </span>
                    <p className="font-headline-md text-headline-md leading-tight text-inverse-on-surface">
                      Cinematic hero — 3D scene lands in Phase 2.
                    </p>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent"
                />
              </div>

              <div className="editorial-shadow absolute -left-10 bottom-10 hidden w-[240px] md:block">
                <div className="glass-card-strong rounded-xl p-5">
                  <span className="font-label-caps text-label-caps uppercase text-tertiary">
                    Trust
                  </span>
                  <p className="mt-2 font-headline-md text-headline-md leading-tight text-on-background">
                    Verified inventory from premier dealers.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
            className="flex w-full flex-col items-center gap-8"
          >
            <HeroSearchBar className="mx-auto" />
            <div className="flex items-center gap-3 text-on-surface-variant">
              <ArrowDown className="size-4" aria-hidden />
              <span className="font-label-caps text-label-caps uppercase">
                Scroll to browse
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
