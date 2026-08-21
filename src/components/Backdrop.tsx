import { useSettings } from "@/lib/settings";

/** Animated liquid-glass backdrop: drifting color blobs + halftone grain. */
export function Backdrop() {
  const { perf } = useSettings();
  const still = perf === "performance";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className={`absolute -left-40 -top-40 h-[70vmax] w-[70vmax] rounded-full opacity-40 ${
          still ? "" : "animate-drift"
        }`}
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 62%)",
          filter: still ? "blur(60px)" : "blur(120px)",
        }}
      />
      <div
        className={`absolute -bottom-52 -right-32 h-[60vmax] w-[60vmax] rounded-full opacity-35 ${
          still ? "" : "animate-float-slow"
        }`}
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
          filter: still ? "blur(60px)" : "blur(130px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1px, transparent 1px), radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "6px 6px, 6px 6px",
          backgroundPosition: "0 0, 3px 3px",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--glass-edge), transparent)" }}
      />
    </div>
  );
}
