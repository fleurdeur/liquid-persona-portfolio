import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Ghost, Rocket, Wand2, Radio, Boxes } from "lucide-react";
import { Reveal, AnimatedText } from "@/components/Reveal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Experience & Side Quests — Rin Aoki" },
      {
        name: "description",
        content:
          "Engineering log: realtime platforms, design systems, robot telemetry, plus the side projects that ate my weekends.",
      },
      { property: "og:title", content: "Experience & Side Quests — Rin Aoki" },
      {
        property: "og:description",
        content: "Realtime platforms, design systems, robot telemetry, and weekend-eating side projects.",
      },
    ],
  }),
  component: Projects,
});

const TIMELINE = [
  {
    arcana: "Now playing",
    role: "Staff Engineer · Kuro Systems",
    years: "2023 — present",
    icon: Rocket,
    body: "Realtime edge platform at 40k msg/s. Cut dashboard hydration from 1.4s to under 200ms — mostly by deleting things I wrote in 2023.",
    tags: ["Rust", "Edge", "Observability"],
  },
  {
    arcana: "Previously on",
    role: "Senior Frontend · Neon Atelier",
    years: "2021 — 2023",
    icon: Wand2,
    body: "Built a token-driven glass UI kit adopted by seven squads. Enforced a motion budget, which is a polite way of saying I removed a lot of bounce easing.",
    tags: ["React", "Motion", "Design systems"],
  },
  {
    arcana: "Origin arc",
    role: "Engineer · Mecha Labs",
    years: "2019 — 2021",
    icon: Cpu,
    body: "Firmware-to-cloud telemetry for warehouse robots. Chased a race condition that only fired on Tuesdays. It was, of course, a timezone.",
    tags: ["Go", "MQTT", "Embedded"],
  },
];

const PROJECTS = [
  {
    icon: Ghost,
    title: "Palace Router",
    kicker: "Open source",
    body: "A tiny state-machine router for cinematic page transitions. 3.1k stars, zero dependencies, one very confused issue tracker.",
  },
  {
    icon: Radio,
    title: "Aether FM",
    kicker: "Weekend build",
    body: "Listening rooms with WebRTC and waveform shaders. Shipped in 48 hours, still up, still slightly held together with hope.",
  },
  {
    icon: Boxes,
    title: "Chibi Engine",
    kicker: "Experiment",
    body: "WebGPU sprite engine for small 2D RPGs. 20k sprites at a locked 120fps, and exactly one finished game: mine.",
  },
];

function Projects() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-40 pt-14 sm:pt-20">
      <span
        className="tag-slant hover-pop-sm inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em]"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          animation: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        the changelog
      </span>

      <h1 className="mt-6 text-5xl sm:text-7xl">
        <AnimatedText text="EXPERIENCE" delay={120} />
        <span style={{ color: "var(--primary)" }}>.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        <AnimatedText
          text="Three jobs, a handful of outages, and the slow realisation that most engineering is deleting code you were proud of."
          delay={320}
          step={22}
        />
      </p>

      <div className="mt-12 space-y-5">
        {TIMELINE.map((item, i) => (
          <Reveal key={item.role} delay={i * 110} as="article">
            <div className="glass glass-sheen hover-pop group rounded-3xl p-6">
              <div className="flex flex-wrap items-start gap-5">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--primary-glow))",
                    boxShadow: "0 12px 40px -14px var(--primary)",
                  }}
                >
                  <item.icon className="size-6" style={{ color: "var(--primary-foreground)" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                      {item.arcana}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{item.years}</span>
                  </div>
                  <h2 className="underline-sweep mt-1 inline-block text-2xl tracking-wide">{item.role}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="tag-slant hover-pop-sm inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                        style={{ border: "1px solid var(--glass-edge)", color: "var(--accent)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2 className="mt-16 text-3xl tracking-widest">SIDE QUESTS</h2>
        <p className="mt-2 text-sm text-muted-foreground">Started for fun. Maintained out of guilt.</p>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 110}>
            <div className="glass glass-sheen hover-pop group h-full rounded-3xl p-5">
              <p.icon
                className="size-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                style={{ color: "var(--primary)" }}
              />
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.kicker}</p>
              <h3 className="mt-1 text-xl tracking-wide">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
