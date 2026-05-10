import type { Metadata } from "next";
import { stubPageMeta, StubPage } from "@/components/marketing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = await stubPageMeta("dealerDetail");
  return {
    ...base,
    title: slug.replace(/-/g, " "),
  };
}

export default async function DealerSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  return (
    <StubPage
      route="dealerDetail"
      title={title}
      phase={3}
      backHref="/dealers"
    />
  );
}
