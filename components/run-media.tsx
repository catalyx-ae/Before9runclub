import type { RecordedRun } from "@/content/runs";
import { Gallery } from "./gallery";
export function RunMedia({ run }: { run: RecordedRun }) {
  return <Gallery items={run.media.length ? run.media : [{ id: `${run.id}-pending`, title: "First memories to come.", description: `Photography and footage specifically from Run ${run.id} have not yet been supplied. This is a labeled visual study, not an image from the event.`, asset: { kind: "image", src: null, alt: `Run ${run.id} media placeholder` }, status: "placeholder", color: "orange", runId: run.id }]} />;
}
