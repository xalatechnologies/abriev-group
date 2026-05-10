import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type StubPageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  phase?: 2 | 3 | 4 | 5;
  backHref?: string;
  backLabel?: string;
};

/**
 * Generic Phase 1 page stub. Keeps every route in the IA rendering
 * while later phases implement the real content.
 */
export function StubPage({
  eyebrow = "Route",
  title,
  description,
  phase,
  backHref,
  backLabel,
}: StubPageProps) {
  return (
    <Container>
      <div className="flex flex-col gap-12 py-24 md:py-32">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase text-on-surface-variant transition-colors duration-200 hover:text-tertiary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {backLabel ?? "Back"}
          </Link>
        ) : null}

        <div className="flex flex-col gap-5">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {eyebrow}
          </span>
          <EditorialHeading as="h1" variant="display">
            {title}
          </EditorialHeading>
          {description ? (
            <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant text-pretty">
              {description}
            </p>
          ) : null}
        </div>

        <SurfaceCard
          variant="lowest"
          radius="xl"
          bordered
          className="flex min-h-[320px] flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center"
        >
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps uppercase text-tertiary">
              In development
            </span>
            <p className="max-w-xl font-body-md text-body-md text-on-surface">
              This route is scaffolded and ready. The full editorial experience
              lands in{" "}
              <span className="font-medium text-on-background">
                Phase {phase ?? 2}
              </span>
              .
            </p>
          </div>
          <Link
            href="/"
            className="font-label-caps text-label-caps uppercase text-on-background underline-offset-4 hover:text-tertiary hover:underline"
          >
            Return home
          </Link>
        </SurfaceCard>
      </div>
    </Container>
  );
}
