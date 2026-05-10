import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type SceneFallbackPosterProps = {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function SceneFallbackPoster({
  src,
  alt,
  className,
  priority,
}: SceneFallbackPosterProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-surface-container-high",
        className,
      )}
      aria-hidden={src ? undefined : true}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 55%, rgba(49, 48, 45, 0.28), transparent 70%)," +
              "linear-gradient(180deg, rgba(227, 226, 223, 0.6), rgba(230, 226, 215, 0.3))",
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-inverse-surface/30 via-transparent to-transparent"
      />
    </div>
  );
}
