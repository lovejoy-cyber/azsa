/**
 * Category -> photograph mapping for events. Uses the community's own
 * photos so an event card is never a bare text block. Falls back to a
 * general community image for any unmapped category.
 */
const BY_CATEGORY: Record<string, string> = {
  cultural: "/images/cultural-celebration.jpg",
  social: "/images/football-team.jpg",
  sport: "/images/football-team.jpg",
  academic: "/images/graduates-2024.jpg",
  graduation: "/images/caps-thrown.jpg",
  embassy: "/images/embassy-reception.jpg",
  community: "/images/graduation-group.jpg",
  outdoors: "/images/students-hiking.jpg",
};

export function eventImage(category?: string | null): string {
  if (!category) return "/images/graduation-group.jpg";
  return BY_CATEGORY[category.toLowerCase()] ?? "/images/graduation-group.jpg";
}
