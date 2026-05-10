import "server-only";
import { EVENTS } from "@/lib/data/events";
import type { AutoEvent } from "@/types/event";

export async function getUpcomingEvents(limit = 3): Promise<AutoEvent[]> {
  return [...EVENTS]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}
