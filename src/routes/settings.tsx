import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Waves, Palette, MousePointer2 } from "lucide-react";
import { THEMES, useSettings, type ThemeId } from "@/lib/settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Customize — Rin Aoki Portfolio" },
      {
        name: "description",
        content:
          "Tune the portfolio: performance vs quality, motion blur, cursor tilt, and four Persona-inspired color themes.",
      },
      { property: "og:title", content: "Customize — Rin Aoki Portfolio" },
      {
        property: "og:description",
        content: "Performance mode, motion blur, 3D tilt, and four color themes.",
      },
    ],
  }),
  component: SettingsPage;
});

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-8 w-14 shrink-0 rounded-full transition-all duration-500"
      style={{
        background: on
          ? "linear-gradient(135deg, var(--primary), var(--primary-glow))"
          : "color-mix(in oklab, var(--foreground) 14%, transparent)",
        border: "1px solid var(--glass-edge)",
      }}
    >
      <span
        className="absolute top-1 size-6 rounded-full transition-all duration-500"
        style={{
          left: on ? "1.75rem" : "0.25rem",
          background: "var(--foreground)",
          boxShadow: "0 4px 12px -4px var(--ink)",
        }}
      />
    </button>
  );
}

function Row({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: typeof Gauge;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass flex items-center gap-4 rounded-3xl p-5">
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: "color-mix(in oklab, var(--primary) 22%, transparent)" }}
      >
        <Icon className="size-5" style={{ color: "var(--primary)" }} />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg tracking-wide">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const { theme, perf, motionBlur, tilt, set } = useSettings();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-40 pt-16 sm:pt-24">
      <p
        className="tag-slant inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em]"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        Config
      </p>
      <h1 className="mt-6 text-5xl sm:text-7xl">
        SETTINGS<span style={{ color: "var(--primary)" }}>.</span>
      </h1>

      <div className="mt-10 space-y-4">
        <Row
          icon={Gauge}
          title="Render mode"
          desc="Performance strips blur and long animations for low-power devices."
        >
          <div className="glass flex shrink-0 rounded-full p-1">
            {(["quality", "performance"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => set("perf", m)}
                className="relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                style={{
                  background:
                    perf === m ? "linear-gradient(135deg, var(--primary), var(--primary-glow))" : "transparent",
                  color: perf === m ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </Row>

        <Row icon={Waves} title="Motion blur" desc="Adds velocity smear to cards and transitions.">
          <Toggle on={motionBlur} onChange={(v) => set("motionBlur", v)} label="Motion blur" />
        </Row>

        <Row icon={MousePointer2} title="3D cursor tilt" desc="Photo card follows your pointer in 3D.">
          <Toggle on={tilt} onChange={(v) => set("tilt", v)} label="3D cursor tilt" />
        </Row>

        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-4">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: "color-mix(in oklab, var(--primary) 22%, transparent)" }}
            >
              <Palette className="size-5" style={{ color: "var(--primary)" }} />
            </div>
            <div>
              <h2 className="text-lg tracking-wide">Theme</h2>
              <p className="text-sm text-muted-foreground">Four palettes, applied instantly.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => set("theme", t.id as ThemeId)}
                className="glass-sheen flex items-center gap-3 rounded-2xl p-4 text-left transition-transform duration-500 hover:-translate-y-0.5"
                style={{
                  border:
                    theme === t.id
                      ? "1px solid var(--primary)"
                      : "1px solid var(--glass-edge)",
                  boxShadow: theme === t.id ? "0 12px 40px -18px var(--primary)" : undefined,
                }}
              >
                <span className="flex -space-x-2">
                  {t.swatch.map((c) => (
                    <span
                      key={c}
                      className="size-6 rounded-full"
                      style={{ background: c, border: "1px solid var(--glass-edge)" }}
                    />
                  ))}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold uppercase tracking-widest">{t.label}</span>
                  <span className="block text-xs text-muted-foreground">{t.tagline}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
        Preferences are saved on this device.
      </p>
    </div>
  );
}
