import type { Vehicle } from "@/types/vehicle";

export type MakeModelFacets = {
  makes: string[];
  modelsByMake: Record<string, string[]>;
};

export function buildMakeModelFacets(vehicles: Vehicle[]): MakeModelFacets {
  const byMake = new Map<string, Set<string>>();
  for (const v of vehicles) {
    if (!byMake.has(v.make)) byMake.set(v.make, new Set());
    byMake.get(v.make)!.add(v.model);
  }
  const makes = [...byMake.keys()].sort((a, b) => a.localeCompare(b));
  const modelsByMake: Record<string, string[]> = {};
  for (const [m, set] of byMake) {
    modelsByMake[m] = [...set].sort((a, b) => a.localeCompare(b));
  }
  return { makes, modelsByMake };
}
