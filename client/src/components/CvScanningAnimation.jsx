import { FiSearch, FiCheckCircle } from "react-icons/fi";
import { TbSparkles2Filled } from "react-icons/tb";

const CvScanningAnimation = () => {
  return (
    <div className="relative flex h-130 w-175 items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Floating dots */}
      <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
      <div className="absolute right-[18%] top-[30%] h-2 w-2 animate-pulse rounded-full bg-purple-400 [animation-delay:1s]" />
      <div className="absolute bottom-[22%] left-[25%] h-2 w-2 animate-pulse rounded-full bg-indigo-300 [animation-delay:2s]" />

      {/* CV Document */}
      <div className="relative z-10 h-90 w-67 -rotate-3 rounded-2xl border border-slate-200 bg-[#4A3B39] p-6 shadow-2xl">
        {/* CV Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-600">
            FK
          </div>

          <div>
            <div className="h-3 w-28 rounded bg-slate-800" />
            <div className="mt-2 h-2 w-20 rounded bg-slate-300" />
          </div>
        </div>

        {/* Resume sections */}
        <div className="space-y-5">
          <div>
            <div className="mb-3 h-2 w-20 rounded bg-slate-700" />

            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-slate-200" />
              <div className="h-2 w-[90%] rounded bg-slate-200" />
              <div className="h-2 w-[75%] rounded bg-slate-200" />
            </div>
          </div>

          <div>
            <div className="mb-3 h-2 w-24 rounded bg-slate-700" />

            <div className="flex flex-wrap gap-2">
              {["mongoDb", "express.js", "react.js", "node.js"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-medium text-indigo-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 h-2 w-20 rounded bg-slate-700" />

            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-slate-200" />
              <div className="h-2 w-[85%] rounded bg-slate-200" />
              <div className="h-2 w-[65%] rounded bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Scanning line */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-1 overflow-hidden">
          <div className="absolute h-1 w-full animate-cv-scan bg-linear-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_18px_rgba(99,102,241,0.9)]" />
        </div>

        {/* Search icon */}
        <div className="absolute -right-7 top-1/2 flex h-14 w-14 animate-search-scan items-center justify-center rounded-full border border-indigo-200 bg-white text-indigo-600 shadow-xl">
         <FiSearch size={25} strokeWidth={2.5} />
        </div>
      </div>

      {/* AI Analysis card */}
      <div className="absolute bottom-2 right-[8%] z-20 w-52 animate-float rounded-2xl border border-slate-200 bg-[#4A3B39] p-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <TbSparkles2Filled size={18} />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-800">
              AI Analysis
            </p>
            <p className="text-[10px] text-slate-400">
              Analyzing resume...
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-2/3 animate-analysis-progress rounded-full bg-indigo-500" />
        </div>
      </div>

      {/* Match Score */}
      <div className="absolute left-[8%] top-17 z-20 animate-score-appear rounded-2xl border border-slate-200 bg-[#4A3B39] p-4 shadow-xl">
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Match Score
        </p>

        <div className="mt-1 flex items-end gap-1">
          <span className="text-3xl font-bold text-slate-900">83</span>
          <span className="mb-1 text-sm font-medium text-slate-400">%</span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-500">
          <FiCheckCircle size={12} />
          Good match
        </div>
      </div>
    </div>
  );
};

export default CvScanningAnimation;