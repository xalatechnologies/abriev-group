import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { RegisterPageView } from "@/components/auth/RegisterPageView";
import { SITE } from "@/lib/constants/site";
import { buildAuthScreenPath } from "@/lib/auth/oauth-return-path";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("RegisterPage");
  return {
    title: `${t("metaTitle")} · ${SITE.name}`,
    description: t("metaDescription"),
  };
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function RegisterPage({ params, searchParams }: Props) {
  const [{ locale }, { error }] = await Promise.all([params, searchParams]);
  const oauthReturnPath = buildAuthScreenPath(locale, "register");
  return (
    <RegisterPageView bannerCode={error} oauthReturnPath={oauthReturnPath} />
  );
}
