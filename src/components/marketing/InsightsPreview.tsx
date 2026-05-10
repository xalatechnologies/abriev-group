import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { BookOpenText } from "lucide-react";
import type { Article, ArticleCategory } from "@/types/article";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { pickArticleExcerpt, pickArticleTitle, pickCoverAlt } from "@/lib/i18n/articleLocale";
import { formatDate } from "@/lib/utils/format";

type InsightsPreviewProps = {
  articles: Article[];
};

export async function InsightsPreview({ articles }: InsightsPreviewProps) {
  if (articles.length === 0) return null;
  const [hero, second] = articles;
  const t = await getTranslations("InsightsPreview");
  const tc = await getTranslations("ArticleCategories");
  const locale = await getLocale();
  const formatDateIso = (iso: string) => formatDate(iso, locale);

  return (
    <section className="section-y bg-surface font-primary">
      <Container>
        <div className="grid grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <span className="font-label-caps text-label-caps uppercase text-text-muted">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-headline-lg text-headline-lg italic leading-tight text-text-strong">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-sm font-body-lg text-body-lg text-text-body">
              {t("lede")}
            </p>
            <div className="mt-10 space-y-8">
              <SecondaryArticle
                article={hero}
                categoryLabel={tc}
                locale={locale}
                formatDateIso={formatDateIso}
              />
              {second ? (
                <SecondaryArticle
                  article={second}
                  categoryLabel={tc}
                  locale={locale}
                  formatDateIso={formatDateIso}
                />
              ) : null}
            </div>
          </div>

          <div className="relative col-span-12 grid grid-cols-2 gap-6 md:col-span-7">
            <div className="asymmetric-mask relative h-[420px] overflow-hidden rounded-xl bg-surface-container md:mt-16 md:h-[560px]">
              <Image
                src={hero.cover.src}
                alt={pickCoverAlt(hero, locale)}
                fill
                sizes="(max-width: 1024px) 45vw, 35vw"
                className="object-cover grayscale"
              />
            </div>
            <div className="asymmetric-mask relative h-[420px] overflow-hidden rounded-xl bg-surface-container-high md:-mt-16 md:h-[560px]">
              <Image
                src={(second ?? hero).cover.src}
                alt={pickCoverAlt(second ?? hero, locale)}
                fill
                sizes="(max-width: 1024px) 45vw, 35vw"
                className="object-cover"
              />
            </div>
            <Link
              href="/insights"
              className="absolute bottom-4 right-4 max-w-[260px] rounded-xl bg-brand-primary px-6 py-6 text-white shadow-editorial transition-transform duration-300 hover:-translate-y-1 md:bottom-[-30px] md:right-[-10px]"
            >
              <BookOpenText className="size-6" aria-hidden />
              <h4 className="mt-3 font-headline-md text-headline-md leading-tight">
                {t("ctaTitle")}
              </h4>
              <p className="mt-1 font-body-md text-body-md opacity-85">
                {t("ctaSubtitle")}
              </p>
              <span className="mt-4 block text-sm font-semibold underline underline-offset-2">
                {t("allInsights")}
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SecondaryArticle({
  article,
  categoryLabel,
  locale,
  formatDateIso,
}: {
  article: Article;
  categoryLabel: (c: ArticleCategory) => string;
  locale: string;
  formatDateIso: (iso: string) => string;
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col gap-3 border-t border-card-divider pt-6 transition-colors duration-300 hover:border-card-divider-hover"
    >
      <span className="font-label-caps text-label-caps uppercase text-text-muted">
        {categoryLabel(article.category)} · {formatDateIso(article.publishedAt)}
      </span>
      <h4 className="font-headline-md text-headline-md leading-tight text-text-strong transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand-primary">
        {pickArticleTitle(article, locale)}
      </h4>
      <p className="line-clamp-2 font-body-md text-body-md text-text-body">
        {pickArticleExcerpt(article, locale)}
      </p>
    </Link>
  );
}
