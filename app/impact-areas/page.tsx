import { redirect } from "next/navigation";

// Impact Areas has been merged into the Impact page (areas now appear
// before the impact stories). Redirect any old links to the new location.
export default function ImpactAreasPage() {
  redirect("/impact");
}
