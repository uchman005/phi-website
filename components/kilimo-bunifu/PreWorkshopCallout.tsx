import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import { preConferenceWorkshop, preWorkshopRegistrationOpen } from "@/lib/kilimo-bunifu";

/** Strip inviting people to register; disappears once registration closes. */
export default function PreWorkshopCallout() {
  if (!preWorkshopRegistrationOpen()) return null;

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
