import { getTranslations } from "next-intl/server";
import type { Vehicle } from "@/types/vehicle";
import { Container } from "@/components/ui/Container";
import { browseTilesOrder } from "@/content/homePageReference";
import {
  BrowseTypeCarousel,
  type BrowseTile,
} from "./BrowseTypeCarousel";

type Tile = {
  key: string;
  label: string;
  href: string;
  cover: string;
  match: (v: Vehicle) => boolean;
  description: string;
};

const TILE_MAP: Record<string, Tile> = {
  coupe: {
    key: "coupe",
    label: "Coupe",
    href: "/vehicles?body=coupe",
    cover:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=85&auto=format&fit=crop",
    description: "Two-door expression.",
    match: (v) => v.bodyStyle === "coupe",
  },
  "grand-tourer": {
    key: "grand-tourer",
    label: "Grand Tourer",
    href: "/vehicles?body=grand-tourer",
    cover:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&q=85&auto=format&fit=crop",
    description: "For the long drive.",
    match: (v) => v.bodyStyle === "grand-tourer",
  },
  suv: {
    key: "suv",
    label: "SUV",
    href: "/vehicles?body=suv",
    cover:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=85&auto=format&fit=crop",
    description: "Considered presence.",
    match: (v) => v.bodyStyle === "suv",
  },
  sedan: {
    key: "sedan",
    label: "Sedan",
    href: "/vehicles?body=sedan",
    cover:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1600&q=85&auto=format&fit=crop",
    description: "Executive composure.",
    match: (v) => v.bodyStyle === "sedan",
  },
  hatchback: {
    key: "hatchback",
    label: "Hatchback",
    href: "/vehicles?body=hatchback",
    cover:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=85&auto=format&fit=crop",
    description: "Urban versatility.",
    match: (v) => v.bodyStyle === "hatchback",
  },
  convertible: {
    key: "convertible",
    label: "Convertible",
    href: "/vehicles?body=convertible",
    cover:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=85&auto=format&fit=crop",
    description: "An open season.",
    match: (v) => v.bodyStyle === "convertible",
  },
};

const ORDERED_TILES: Tile[] = browseTilesOrder
  .map((k) => TILE_MAP[k])
  .filter(Boolean) as Tile[];

type BrowseByTypeProps = {
  vehicles: Vehicle[];
};

export async function BrowseByType({ vehicles }: BrowseByTypeProps) {
  const t = await getTranslations("HomeBrowseByType");
  const tilesI18n = t.raw("tiles") as Record<string, { label: string; description: string }>;

  const tiles: BrowseTile[] = ORDERED_TILES.map((tile) => {
    const copy = tilesI18n[tile.key];
    return {
      key: tile.key,
      label: copy?.label ?? tile.label,
      href: tile.href,
      cover: tile.cover,
      description: copy?.description ?? tile.description,
      count: vehicles.filter(tile.match).length,
    };
  });

  return (
    <section className="section-y bg-surface font-primary">
      <Container>
        <div className="mb-12 flex flex-col gap-3 text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg text-text-strong">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-4xl font-body-lg text-body-lg text-text-body md:mx-0">
            {t("lede")}
          </p>
        </div>
        <BrowseTypeCarousel tiles={tiles} />
      </Container>
    </section>
  );
}
