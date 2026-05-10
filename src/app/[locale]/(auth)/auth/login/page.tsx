import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LoginPageView } from "@/components/auth/LoginPageView";
import { SITE } from "@/lib/constants/site";
import { buildAuthScreenPath } from "@/lib/auth/oauth-return-path";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("LoginPage");
  return {
    title: `${t("metaTitle")} · ${SITE.name}`,
    description: t("metaDescription"),
  };
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ params, searchParams }: Props) {
  const [{ locale }, { error }] = await Promise.all([params, searchParams]);
  const oauthReturnPath = buildAuthScreenPath(locale, "login");
  return <LoginPageView bannerCode={error} oauthReturnPath={oauthReturnPath} />;
}
