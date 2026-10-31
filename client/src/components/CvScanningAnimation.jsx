import { FiSearch, FiCheckCircle } from "react-icons/fi";
import { TbSparkles2Filled } from "react-icons/tb";

const CvScanningAnimation = () => {
  return (
    <div className="relative flex h-130 w-175 items-center justify-center overflow-hidden">

      {/* Background glow */}
      <div className="absolute h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Floating dots */}
      <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-orange-400" />
      <div className="absolute right-[18%] top-[30%] h-2 w-2 animate-pulse rounded-full bg-orange-300 [animation-delay:1s]" />
      <div className="absolute bottom-[22%] left-[25%] h-2 w-2 animate-pulse rounded-full bg-orange-400 [animation-delay:2s]" />

      {/* CV Document */}
      <div
        className="relative z-10 h-90 w-67 -rotate-3 rounded-2xl border p-6 shadow-2xl"
        style={{
          backgroundColor: "var(--card-color)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)"
        }}
      >

        {/* CV Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-sm font-bold text-orange-500">
            FK
          </div>

          <div>
            <div className="h-3 w-28 rounded bg-[var(--text-color)] opacity-80" />
            <div className="mt-2 h-2 w-20 rounded bg-[var(--secondary-color)] opacity-50" />
          </div>
        </div>

        {/* Resume sections */}
        <div className="space-y-5">

          <div>
            <div className="mb-3 h-2 w-20 rounded bg-[var(--text-color)] opacity-70" />

            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-[var(--secondary-color)] opacity-25" />
              <div className="h-2 w-[90%] rounded bg-[var(--secondary-color)] opacity-25" />
              <div className="h-2 w-[75%] rounded bg-[var(--secondary-color)] opacity-25" />
            </div>
          </div>

          <div>
            <div className="mb-3 h-2 w-24 rounded bg-[var(--text-color)] opacity-70" />

            <div className="flex flex-wrap gap-2">
              {["MongoDB", "Express.js", "React.js", "Node.js"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-orange-500/10 px-2 py-1 text-[10px] font-medium text-orange-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 h-2 w-20 rounded bg-[var(--text-color)] opacity-70" />

            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-[var(--secondary-color)] opacity-25" />
              <div className="h-2 w-[85%] rounded bg-[var(--secondary-color)] opacity-25" />
              <div className="h-2 w-[65%] rounded bg-[var(--secondary-color)] opacity-25" />
            </div>
          </div>
        </div>

        {/* Scanning line */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-1 overflow-hidden">
          <div className="absolute h-1 w-full animate-cv-scan bg-linear-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_18px_rgba(249,115,22,0.9)]" />
        </div>

        {/* Search icon */}
        <div className="absolute -right-7 top-1/2 flex h-14 w-14 animate-search-scan items-center justify-center rounded-full border shadow-xl"
          style={{
            backgroundColor: "var(--card-color)",
            color: "var(--primary-color)",
            borderColor: "var(--border-color)"
          }}
        >
          <FiSearch size={25} strokeWidth={2.5} />
        </div>
      </div>

      {/* AI Analysis card */}
      <div
        className="absolute bottom-2 right-[8%] z-20 w-52 animate-float rounded-2xl border p-4 shadow-xl"
        style={{
          backgroundColor: "var(--card-color)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)"
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500">
            <TbSparkles2Filled size={18} />
          </div>

          <div>
            <p className="text-xs font-semibold">
              AI Analysis
            </p>
            <p className="text-[10px]" style={{ color: "var(--secondary-color)" }}>
              Analyzing resume...
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--secondary-color)]/20">
          <div className="h-full w-2/3 animate-analysis-progress rounded-full bg-orange-500" />
        </div>
      </div>

      {/* Match Score */}
      <div
        className="absolute left-[8%] top-17 z-20 animate-score-appear rounded-2xl border p-4 shadow-xl"
        style={{
          backgroundColor: "var(--card-color)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)"
        }}
      >
        <p className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: "var(--secondary-color)" }}
        >
          Match Score
        </p>

        <div className="mt-1 flex items-end gap-1">
          <span className="text-3xl font-bold">83</span>
          <span className="mb-1 text-sm font-medium"
            style={{ color: "var(--secondary-color)" }}
          >
            %
          </span>
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
