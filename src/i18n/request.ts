import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

async function mergeMessages(locale: string) {
  const modules = [
    "site",
    "navigation",
    "footer",
    "notFound",
    "catalog",
    "services",
    "marketing",
    "stubPages",
    "homeCore",
    "testimonials",
    "carReviews",
    "auth",
  ] as const;

  const fallbackLocale = routing.defaultLocale;

  const parts = await Promise.all(
    modules.map(async (name) => {
      const data = (
        await import(`../../messages/${locale}/${name}.json`).then((m) => m.default as Record<string, unknown>)
      );
      if (locale !== fallbackLocale && Object.keys(data).length === 0) {
        return (
          await import(`../../messages/${fallbackLocale}/${name}.json`).then((m) => m.default as Record<
            string,
            unknown
          >)
        );
      }
      return data;
    }),
  );

  return Object.assign({}, ...parts);

}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await mergeMessages(locale),
  };
});
