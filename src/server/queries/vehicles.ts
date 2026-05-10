import "server-only";
import { VEHICLES } from "@/lib/data/vehicles";
import type { Vehicle, VehicleCategory } from "@/types/vehicle";

export type VehicleListParams = {
  category?: VehicleCategory;
  featured?: boolean;
  limit?: number;
};

export async function getVehicles(params: VehicleListParams = {}): Promise<Vehicle[]> {
  let items = [...VEHICLES];
  if (params.category) items = items.filter((v) => v.category === params.category);
  if (params.featured) items = items.filter((v) => v.featured);
  if (params.limit) items = items.slice(0, params.limit);
  return items;
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  return getVehicles({ featured: true, limit });
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return VEHICLES.find((v) => v.slug === slug) ?? null;
}

export async function getRelatedVehicles(
  slug: string,
  limit = 4,
): Promise<Vehicle[]> {
  const base = await getVehicleBySlug(slug);
  if (!base) return [];
  return VEHICLES.filter(
    (v) => v.slug !== slug && (v.make === base.make || v.bodyStyle === base.bodyStyle),
  ).slice(0, limit);
}
