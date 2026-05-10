"use client";

/**
 * Replaces the root layout when it fails. Keeps styling inline so it renders
 * even if `globals.css` / theme never loaded.
 */
type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.5rem",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          backgroundColor: "#fafafa",
          color: "#111",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", margin: 0 }}>Application error</h1>
        <p style={{ margin: 0, maxWidth: "32rem", textAlign: "center", opacity: 0.85 }}>
          The app could not render. Clear the <code>.next</code> folder and restart the dev server,
          or redeploy after a clean build.
        </p>
        {process.env.NODE_ENV === "development" ? (
          <pre
            style={{
              maxWidth: "100%",
              overflow: "auto",
              padding: "1rem",
              fontSize: "0.75rem",
              background: "#eee",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            {error.message}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            border: "none",
            background: "#008f4c",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
