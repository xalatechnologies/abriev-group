import type { Metadata } from "next";
import { StubPage } from "@/components/marketing";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Dealer — ${slug}`,
    description: `Profile, inventory, and credibility markers for ${slug} on ABRIEV.`,
  };
}

export default async function DealerDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return (
    <StubPage
      eyebrow="Dealer"
      title={slug.replace(/-/g, " ")}
      description="Dealer hero, profile, contact, inventory feed, and credibility markers arrive in Phase 3."
      phase={3}
      backHref="/dealers"
      backLabel="All dealers"
    />
  );
}
