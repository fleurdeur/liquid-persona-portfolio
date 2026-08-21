import { useCallback, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { useSettings } from "@/lib/settings";

export function PhotoCard() {
  const { tilt, perf, motionBlur } = useSettings();
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  const enabled = tilt && perf === "quality";

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setT({
        rx: (0.5 - py) * 22,
        ry: (px - 0.5) * 24,
        mx: px * 100,
        my: py * 100,
        active: true,
      });
    },
    [enabled],
  );

  const reset = () => setT({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  return (
    <>
      <div className="[perspective:1400px]">
        <button
          ref={ref}
          type="button"
          onMouseMove={onMove}
          onMouseLeave={reset}
          onClick={() => setOpen(true)}
          aria-label="Open a larger view of the portrait"
          className="group relative block w-full max-w-sm cursor-pointer rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? 1.03 : 1})`,
            transformStyle: "preserve-3d",
            transition: t.active
              ? "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            filter: t.active && motionBlur && perf === "quality" ? "saturate(1.1)" : undefined,
          }}
        >
          <div className="glass grain ink-slash relative overflow-hidden rounded-[2rem] p-3">
            <img
              src={portrait}
              alt="Portrait illustration of the site owner"
              width={912}
              height={1200}
              className="w-full rounded-[1.6rem] object-cover"
              style={{ transform: "translateZ(40px)" }}
            />
            {/* Liquid specular highlight following the cursor */}
            <span
              className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-500"
              style={{
                opacity: t.active ? 1 : 0,
                background: `radial-gradient(340px circle at ${t.mx}% ${t.my}%, color-mix(in oklab, var(--foreground) 30%, transparent), transparent 60%)`,
                mixBlendMode: "overlay",
              }}
            />
            <span
              className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                transform: "translateZ(70px)",
                background: "color-mix(in oklab, var(--ink) 55%, transparent)",
                border: "1px solid var(--glass-edge)",
                backdropFilter: "blur(14px)",
                color: "var(--foreground)",
              }}
            >
              Arcana · Engineer
              <Maximize2 className="size-3.5" />
            </span>
          </div>
          <span
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.4rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: "var(--primary)", filter: "blur(48px)" }}
          />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portrait full view"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{
            background: "color-mix(in oklab, var(--ink) 70%, transparent)",
            backdropFilter: perf === "quality" ? "blur(24px)" : undefined,
            animation: "rise 0.4s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <div className="glass-strong relative max-h-[86vh] overflow-hidden rounded-[2rem] p-3">
            <img
              src={portrait}
              alt="Portrait illustration of the site owner, enlarged"
              width={912}
              height={1200}
              className="max-h-[78vh] w-auto rounded-[1.6rem] object-contain"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="glass absolute right-5 top-5 rounded-full p-2 text-foreground transition-transform duration-300 hover:rotate-90"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
