import { useCallback, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { useSettings } from "@/lib/settings";

/**
 * Hand-built CSS/SVG identity card — no photography, no generated art.
 * Tilts in 3D toward the cursor and opens a larger view on click.
 */
function CardFace({ big = false }: { big?: boolean }) {
  return (
    <div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem]"
      style={{ background: "linear-gradient(160deg, var(--ink), color-mix(in oklab, var(--primary) 22%, var(--ink)))" }}
    >
      {/* halftone field */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1.6px, transparent 1.6px)",
          backgroundSize: "10px 10px",
          maskImage: "linear-gradient(200deg, black, transparent 70%)",
        }}
      />
      {/* angular slashes */}
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <polygon points="0,400 130,0 210,0 40,400" fill="var(--primary)" opacity="0.85" />
        <polygon points="150,400 260,0 300,0 300,120 210,400" fill="var(--primary-glow)" opacity="0.35" />
        <polygon points="0,340 300,240 300,300 0,400" fill="var(--foreground)" opacity="0.08" />
      </svg>
      {/* monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="display leading-none"
          style={{
            fontSize: big ? "11rem" : "7rem",
            color: "var(--foreground)",
            textShadow: "0 10px 40px color-mix(in oklab, var(--ink) 80%, transparent)",
          }}
        >
          RA
        </span>
        <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.5em] text-muted-foreground">
          no stock photo
        </span>
      </div>
      {/* status line */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest"
        style={{ background: "color-mix(in oklab, var(--ink) 60%, transparent)", border: "1px solid var(--glass-edge)" }}
      >
        <span className="pulse-ring size-2 rounded-full" style={{ background: "var(--accent)" }} />
        deployed &amp; caffeinated
      </div>
    </div>
  );
}

export function AvatarCard() {
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
      setT({ rx: (0.5 - py) * 20, ry: (px - 0.5) * 22, mx: px * 100, my: py * 100, active: true });
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
          aria-label="Open a larger view of the identity card"
          className="group relative block w-full max-w-sm cursor-pointer rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? 1.04 : 1})`,
            transformStyle: "preserve-3d",
            transition: t.active
              ? "transform 120ms cubic-bezier(0.22,1,0.36,1)"
              : "transform 900ms cubic-bezier(0.16,1,0.3,1)",
            filter:
              t.active && motionBlur && perf === "quality"
                ? "saturate(1.15) contrast(1.03)"
                : undefined,
          }}
        >
          <div className="glass grain relative overflow-hidden rounded-[2rem] p-3">
            <div style={{ transform: "translateZ(45px)" }}>
              <CardFace />
            </div>
            <span
              className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-500"
              style={{
                opacity: t.active ? 1 : 0,
                background: `radial-gradient(320px circle at ${t.mx}% ${t.my}%, color-mix(in oklab, var(--foreground) 32%, transparent), transparent 60%)`,
                mixBlendMode: "overlay",
              }}
            />
            <span
              className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-between rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                transform: "translateZ(75px)",
                background: "color-mix(in oklab, var(--ink) 55%, transparent)",
                border: "1px solid var(--glass-edge)",
                backdropFilter: "blur(14px)",
              }}
            >
              tap to zoom
              <Maximize2 className="size-3.5 transition-transform duration-500 group-hover:rotate-12" />
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
          aria-label="Identity card, enlarged"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{
            background: "color-mix(in oklab, var(--ink) 72%, transparent)",
            backdropFilter: perf === "quality" ? "blur(26px)" : undefined,
            animation: "rise 0.45s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <div className="glass-strong relative w-full max-w-md rounded-[2rem] p-3">
            <CardFace big />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="glass hover-pop-sm absolute right-5 top-5 rounded-full p-2"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
