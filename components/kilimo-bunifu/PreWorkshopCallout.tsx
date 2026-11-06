import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import { preConferenceWorkshop } from "@/lib/kilimo-bunifu";
import { eventPhase } from "@/lib/event-time";

/** Strip pointing to the pre-conference workshop; disappears once it's over. */
export default function PreWorkshopCallout() {
  if (eventPhase(new Date(), preConferenceWorkshop.dates) === "past") return null;

  return (
    <aside aria-label="Pre-conference workshop" className="bg-ochre px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2 font-sans text-sm text-green-ddd">
        <p>
          <strong>Pre-conference workshop:</strong> virtual, 14 November 2026
        </p>
        <Link
          href={preConferenceWorkshop.href}
          className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 hover:no-underline"
        >
          Register for 14 November
          <TbArrowRight aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
