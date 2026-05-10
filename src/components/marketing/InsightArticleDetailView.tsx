import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronRight, Clock } from "lucide-react";

import type { Article } from "@/types/article";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { pickArticleExcerpt, pickArticleTitle, pickCoverAlt } from "@/lib/i18n/articleLocale";
import { formatDate } from "@/lib/utils/format";

const AVATAR_TONES = [
  "bg-emerald-700",
  "bg-sky-600",
  "bg-cyan-600",
  "bg-lime-600",
  "bg-violet-600",
  "bg-amber-600",
] as const;

export async function InsightArticleDetailView({ article }: { article: Article }) {
  const locale = await getLocale();
  const t = await getTranslations("InsightsArticle");
  const tc = await getTranslations("ArticleCategories");
  const title = pickArticleTitle(article, locale) ?? article.title;
  const excerpt = pickArticleExcerpt(article, locale) ?? article.excerpt;
  const paragraphs = splitArticleBody(article);
  const authorTone =
    AVATAR_TONES[article.author.name.charCodeAt(0) % AVATAR_TONES.length];
  const formatDateIso = (iso: string) => formatDate(iso, locale);

  return (
    <article className="font-primary bg-surface">
      <header className="section-y bg-surface">
        <Container>
          <nav aria-label={t("breadcrumbAria")}>
            <ol className="mb-8 flex flex-wrap items-center gap-2 md:justify-start">
              <li>
                <Link
                  href="/"
                  className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-text-muted underline-offset-4 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                >
                  {t("breadcrumbHome")}
                </Link>
              </li>
              <li aria-hidden className="text-text-muted">
                <ChevronRight className="size-4" aria-hidden />
              </li>
              <li>
                <Link
                  href="/insights"
                  className="font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-text-muted underline-offset-4 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                >
                  {t("breadcrumbNews")}
                </Link>
              </li>
              <li aria-hidden className="text-text-muted">
                <ChevronRight className="size-4" aria-hidden />
              </li>
              <li
                aria-current="page"
                className="line-clamp-2 max-w-xl font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-text-strong md:max-w-2xl"
              >
                {title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center md:mx-0 md:text-left">
            <span className="mx-auto inline-flex rounded-full border border-card-border px-4 py-1.5 font-label-caps text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary md:mx-0">
              {tc(article.category)}
            </span>
            <h1 className="text-balance font-display-lg text-[clamp(1.875rem,4.4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-text-strong md:text-[2.75rem]">
              {title}
            </h1>
            <p className="font-body-lg text-body-lg leading-relaxed text-text-body md:max-w-2xl">
              {excerpt}
            </p>
          </div>

          <dl className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-outline-variant py-6 text-body-md md:mx-0 md:justify-start">
            <div className="flex items-center gap-3">
              <dt className="sr-only">{t("authorSr")}</dt>
              <dd className="inline-flex items-center gap-3 font-semibold text-text-strong">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
                    authorTone,
                  )}
                  aria-hidden
                >
                  {(article.author.name.trim().charAt(0) || "?").toUpperCase()}
                </span>
                <span>
                  <span>{article.author.name}</span>
                  {article.author.title ? (
                    <span className="block text-sm font-semibold opacity-95 text-text-muted">
                      {article.author.title}
                    </span>
                  ) : null}
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t("publishedSr")}</dt>
              <dd>
                <time
                  dateTime={article.publishedAt}
                  className="tabular-nums font-semibold text-text-strong"
                >
                  {formatDateIso(article.publishedAt)}
                </time>
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t("readingTimeSr")}</dt>
              <dd className="inline-flex items-center gap-2 font-semibold text-text-strong">
                <Clock className="size-5 shrink-0 text-text-muted" aria-hidden />
                {t("minRead", { minutes: article.readingTime })}
              </dd>
            </div>
          </dl>
        </Container>
      </header>

      <div className="section-y pt-0">
        <Container>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-card-border shadow-editorial">
            <div className="relative aspect-[16/10] w-full bg-surface-container-highest lg:aspect-[21/10]">
              <Image
                src={article.cover.src}
                alt={pickCoverAlt(article, locale)}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-body-lg leading-[1.8] text-text-body">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-5 border-t border-card-divider pt-10">
            <Link
              href="/insights"
              prefetch={false}
              className="inline-flex items-center rounded-full bg-brand-primary px-8 py-3 font-label-caps text-xs font-bold uppercase tracking-[0.14em] text-white shadow-editorial transition-colors hover:bg-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              {t("backToNews")}
            </Link>
          </div>
        </Container>
      </div>
    </article>
  );
}

function splitArticleBody(article: Article): string[] {
  const raw =
    typeof article.content === "string"
      ? article.content
      : article.excerpt.trim();
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
