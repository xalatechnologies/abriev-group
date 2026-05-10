import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type SectionPlaceholderProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  note?: string;
  className?: string;
  variant?: "low" | "base" | "high" | "lowest";
};

/**
 * Marker section used during Phase 1 stubs. Future phases replace
 * these with their real implementations (grids, spotlights, etc.)
 */
export function SectionPlaceholder({
  eyebrow,
  title,
  lede,
  note = "This section will be implemented in a later phase.",
  className,
  variant = "lowest",
}: SectionPlaceholderProps) {
  return (
    <section className={cn("section-y", className)}>
      <Container>
        <div className="flex flex-col gap-10">
          <SectionIntro eyebrow={eyebrow} title={title} lede={lede} />
          <SurfaceCard
            variant={variant}
            radius="xl"
            bordered
            className="flex min-h-[320px] items-center justify-center px-8 py-16"
          >
            <div className="flex max-w-md flex-col items-center gap-3 text-center">
              <span className="font-label-caps text-label-caps uppercase text-tertiary">
                Coming soon
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {note}
              </p>
            </div>
          </SurfaceCard>
        </div>
      </Container>
    </section>
  );
}
