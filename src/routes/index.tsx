import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Terminal, Swords, Gamepad2 } from "lucide-react";
import { PhotoCard } from "@/components/PhotoCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rin Aoki — Engineer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Rin Aoki: full-stack engineer, anime-obsessed tinkerer, and builder of glassy interfaces.",
      },
      { property: "og:title", content: "Rin Aoki — Engineer Portfolio" },
      {
        property: "og:description",
        content: "Full-stack engineer building liquid-glass interfaces with a Persona-grade sense of style.",
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { label: "Knowledge", value: 5, note: "TypeScript, Rust, Go" },
  { label: "Guts", value: 4, note: "Ships on Fridays" },
  { label: "Proficiency", value: 5, note: "Systems + UI" },
  { label: "Charm", value: 4, note: "Design reviews" },
  { label: "Kindness", value: 3, note: "Reviews with care" },
];

function Index() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-40 pt-16 sm:pt-24">
      <p
        className="tag-slant animate-rise inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em]"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        Take your heart
      </p>

      <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="animate-rise" style={{ animationDelay: "80ms" }}>
          <h1 className="text-6xl leading-[0.88] sm:text-8xl">
            RIN
            <span className="text-glow block" style={{ color: "var(--primary)" }}>
              AOKI
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Full-stack engineer by day, dungeon-crawler by night. I build interfaces that feel like
            liquid glass — soft, reactive, and a little theatrical. Six years turning chaotic ideas
            into calm, fast products.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: Terminal, text: "TypeScript · Rust" },
              { icon: Sparkles, text: "Motion & shaders" },
              { icon: Swords, text: "Systems design" },
              { icon: Gamepad2, text: "Game jams" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="glass glass-sheen flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground"
              >
                <Icon className="size-4" style={{ color: "var(--primary)" }} />
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-rise flex justify-center lg:justify-end" style={{ animationDelay: "160ms" }}>
          <PhotoCard />
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl tracking-widest">SOCIAL STATS</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="glass glass-sheen animate-rise rounded-2xl p-5"
              style={{ animationDelay: `${200 + i * 70}ms` }}
            >
              <div className="flex items-baseline justify-between">
                <span className="display text-xl tracking-widest">{s.label}</span>
                <span className="font-mono text-xs text-muted-foreground">Rank {s.value}/5</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: 5 }).map((_, n) => (
                  <span
                    key={n}
                    className="h-2 flex-1 rounded-full transition-all duration-700"
                    style={{
                      background:
                        n < s.value
                          ? "linear-gradient(90deg, var(--primary), var(--primary-glow))"
                          : "color-mix(in oklab, var(--foreground) 12%, transparent)",
                    }}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
