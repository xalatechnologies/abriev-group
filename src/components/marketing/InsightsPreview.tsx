import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BookOpenText } from "lucide-react";
import type { Article } from "@/types/article";
import { Container } from "@/components/ui/Container";
import { articleCategoryLabel } from "@/lib/utils/articleCategoryLabel";
import { formatDate } from "@/lib/utils/format";

type InsightsPreviewProps = {
  articles: Article[];
};

export function InsightsPreview({ articles }: InsightsPreviewProps) {
  if (articles.length === 0) return null;
  const [hero, second] = articles;

  return (
    <section className="section-y bg-surface font-primary">
      <Container>
        <div className="grid grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <span className="font-label-caps text-label-caps uppercase text-text-muted">
              Editorial intelligence
            </span>
            <h2 className="mt-4 font-headline-lg text-headline-lg italic leading-tight text-text-strong">
              The visionary&apos;s log
            </h2>
            <p className="mt-6 max-w-sm font-body-lg text-body-lg text-text-body">
              Deep dives into engineering, ownership patterns, and collector
              behavior shaping elite mobility.
            </p>
            <div className="mt-10 space-y-8">
              <SecondaryArticle article={hero} />
              {second ? <SecondaryArticle article={second} /> : null}
            </div>
          </div>

          <div className="relative col-span-12 grid grid-cols-2 gap-6 md:col-span-7">
            <div className="asymmetric-mask relative h-[420px] overflow-hidden rounded-xl bg-surface-container md:mt-16 md:h-[560px]">
              <Image
                src={hero.cover.src}
                alt={hero.cover.alt}
                fill
                sizes="(max-width: 1024px) 45vw, 35vw"
                className="object-cover grayscale"
              />
            </div>
            <div className="asymmetric-mask relative h-[420px] overflow-hidden rounded-xl bg-surface-container-high md:-mt-16 md:h-[560px]">
              <Image
                src={(second ?? hero).cover.src}
                alt={(second ?? hero).cover.alt}
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
                Quarterly Print Edition
              </h4>
              <p className="mt-1 font-body-md text-body-md opacity-85">
                Available for concierge members.
              </p>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SecondaryArticle({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col gap-3 border-t border-card-divider pt-6 transition-colors duration-300 hover:border-card-divider-hover"
    >
      <span className="font-label-caps text-label-caps uppercase text-text-muted">
        {articleCategoryLabel(article.category)} ·{" "}
        {formatDate(article.publishedAt)}
      </span>
      <h4 className="font-headline-md text-headline-md leading-tight text-text-strong transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand-primary">
        {article.title}
      </h4>
      <p className="line-clamp-2 font-body-md text-body-md text-text-body">
        {article.excerpt}
      </p>
    </Link>
  );
}
