import type { GalleryItem } from "./site";
export type VerifiedCoordinates = { latitude: number; longitude: number; verified: true; source: string };
export type RecordedRun = {
  id: string; chapter: number; location: string; city: string; title: string;
  date: string | null; description: string; story: string; editorialStatus: "proposed" | "approved";
  coordinates: VerifiedCoordinates | null; media: GalleryItem[];
  route: [number, number][] | null; publication: "published" | "draft";
};
export const runs: RecordedRun[] = [{
  id: "001", chapter: 1, location: "Reem Central Park", city: "Abu Dhabi", title: "The first chapter.", date: null,
  description: "First run. First chapter. The beginning of the Before 9 story.",
  story: "Every story starts somewhere. For Before 9, the first recorded run chapter is Reem Central Park, Al Reem Island, Abu Dhabi. The photographs and first-hand stories from that morning will live here as the collection grows.",
  editorialStatus: "proposed",
  // Exact Google Maps place coordinates supplied and confirmed by the owner.
  coordinates: { latitude: 24.5042039, longitude: 54.407309, verified: true, source: "https://maps.app.goo.gl/e4VixiPSwbGmQb9XA" },
  media: [], route: null, publication: "published",
}];
export const publishedRuns = runs.filter(run => run.publication === "published");
export function getRun(id: string) { return publishedRuns.find(run => run.id === id); }
