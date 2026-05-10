"use client";

import dynamic from "next/dynamic";

const Vehicle3DViewer = dynamic(() => import("./Vehicle3DViewer"), {
  ssr: false,
  loading: () => null,
});

type Vehicle3DViewerClientProps = {
  accent?: string;
};

export function Vehicle3DViewerClient(props: Vehicle3DViewerClientProps) {
  return <Vehicle3DViewer {...props} />;
}
