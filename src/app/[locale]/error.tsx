"use client";

import { useEffect } from "react";
import Link from "next/link";

type LocaleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: LocaleErrorProps) {
  useEffect(() => {
    console.error("[locale] render error:", error);
  }, [error]);

  return (
    <div className="section-y mx-auto flex max-w-lg flex-col items-center justify-center gap-5 px-4 text-center font-primary">
      <h1 className="font-headline-lg text-headline-lg text-text-strong">Something went wrong</h1>
      <p className="text-body-md text-text-body">
        Try again, or go home. After a bad build, stop the server, delete the{" "}
        <code className="rounded-md border border-outline-variant bg-surface-container-low px-1.5 py-0.5 text-sm">
          .next
        </code>{" "}
        folder, then run{" "}
        <code className="rounded-md border border-outline-variant bg-surface-container-low px-1.5 py-0.5 text-sm">
          pnpm dev
        </code>
        .
      </p>
      {process.env.NODE_ENV === "development" ? (
        <pre className="max-h-48 w-full max-w-full overflow-auto rounded-xl border border-outline-variant bg-surface-container-low p-4 text-left text-xs leading-relaxed text-text-muted">
          {error.message}
          {error.digest ? `\nDigest: ${error.digest}` : ""}
        </pre>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brand-primary px-8 py-3 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-outline-variant px-8 py-3 font-label-caps text-sm font-bold uppercase tracking-[0.12em] text-text-strong transition-colors hover:border-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
