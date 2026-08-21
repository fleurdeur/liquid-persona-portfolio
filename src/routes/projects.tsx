import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Ghost, Rocket, Wand2, Radio, Boxes } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Experience & Projects — Rin Aoki" },
      {
        name: "description",
        content:
          "Confidant-style log of engineering experience: distributed systems, realtime UIs, shaders, and anime-fueled side quests.",
      },
      { property: "og:title", content: "Experience & Projects — Rin Aoki" },
      {
        property: "og:description",
        content: "An anime-geek engineering log: realtime platforms, render pipelines, and side quests.",
      },
    ],
  }),
  component: Projects,
});

const TIMELINE = [
  {
    rank: "MAX",
    arcana: "The Tower",
    role: "Staff Engineer · Kuro Systems",
    years: "2023 — now",
    icon: Rocket,
    body: "Led a realtime edge platform pushing 40k msg/s. Rebuilt the render pipeline so dashboards hydrate in under 200ms — the Rider-kick of latency work.",
    tags: ["Rust", "Edge", "Observability"],
  },
  {
    rank: "IX",
    arcana: "The Magician",
    role: "Senior Frontend · Neon Atelier",
    years: "2021 — 2023",
    icon: Wand2,
    body: "Design-systems arc. Shipped a token-driven glass UI kit adopted by 7 squads. Motion budget enforced like a stand user with perfect timing.",
    tags: ["React", "Motion", "Design systems"],
  },
  {
    rank: "VII",
    arcana: "The Chariot",
    role: "Engineer · Mecha Labs",
    years: "2019 — 2021",
    icon: Cpu,
    body: "Firmware-to-cloud telemetry for warehouse robots. Debugged a race condition that only appeared on Tuesdays — my personal Angel fight.",
    tags: ["Go", "MQTT", "Embedded"],
  },
];

const PROJECTS = [
  {
    icon: Ghost,
    title: "Palace Router",
    kicker: "Open source",
    body: "A tiny state-machine router for cinematic page transitions. 3.1k stars, zero dependencies.",
  },
  {
    icon: Radio,
    title: "Aether FM",
    kicker: "Side quest",
    body: "Realtime listening rooms with WebRTC + waveform shaders. Built during a weekend jam, still running.",
  },
  {
    icon: Boxes,
    title: "Chibi Engine",
    kicker: "Experiment",
    body: "WebGPU sprite engine for tiny 2D RPGs. Batches 20k sprites at a locked 120fps.",
  },
];

function Projects() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-40 pt-16 sm:pt-24">
      <p
        className="tag-slant inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em]"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        Confidant log
      </p>
      <h1 className="mt-6 text-5xl sm:text-7xl">
        EXPERIENCE<span style={{ color: "var(--primary)" }}>.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Each role is a confidant rank. Level up happens after the boss fight, never before.
      </p>

      <div className="mt-12 space-y-5">
        {TIMELINE.map((item, i) => (
          <article
            key={item.role}
            className="glass glass-sheen animate-rise group rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="flex flex-wrap items-start gap-5">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-6"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--primary-glow))",
                  boxShadow: "0 12px 40px -14px var(--primary)",
                }}
              >
                <item.icon className="size-6" style={{ color: "var(--primary-foreground)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {item.arcana} · Rank {item.rank}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{item.years}</span>
                </div>
                <h2 className="mt-1 text-2xl tracking-wide">{item.role}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="tag-slant px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        border: "1px solid var(--glass-edge)",
                        color: "var(--accent)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-16 text-3xl tracking-widest">SIDE QUESTS</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="glass glass-sheen animate-rise rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1.5"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <p.icon className="size-6" style={{ color: "var(--primary)" }} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {p.kicker}
            </p>
            <h3 className="mt-1 text-xl tracking-wide">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
