import { TbLeaf, TbUsers, TbChartBar } from "react-icons/tb";

export default function EquationBanner() {
  return (
    <div className="bg-green py-5 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-3 text-white font-sans font-semibold text-sm sm:text-base">
        <span className="flex items-center gap-2">
          <TbLeaf className="text-green-bright text-lg" aria-hidden />
          Planet
        </span>
        <span className="text-green-bright font-bold text-lg">+</span>
        <span className="flex items-center gap-2">
          <TbUsers className="text-green-bright text-lg" aria-hidden />
          People
        </span>
        <span className="text-green-bright font-bold text-lg">=</span>
        <span className="flex items-center gap-2">
          <TbChartBar className="text-green-bright text-lg" aria-hidden />
          Productivity
        </span>
        <span className="hidden sm:inline text-white/50 mx-2">·</span>
        <span className="text-white/80 font-normal text-sm italic font-display">
          The triple bottom line
        </span>
      </div>
    </div>
  );
}
