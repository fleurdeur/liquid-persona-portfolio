import { createFileRoute } from "@tanstack/react-router";
import { Terminal, Sparkles, Swords, Gamepad2 } from "lucide-react";
import { AvatarCard } from "@/components/AvatarCard";
import { Reveal, AnimatedText } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rin Aoki — Engineer Who Ships" },
      {
        name: "description",
        content:
          "Fleur: full-stack engineer, part-time anime apologist. Liquid-glass interfaces, honest changelogs, zero stock photos.",
      },
      { property: "og:title", content: "Rin Aoki — Engineer Who Ships" },
      {
        property: "og:description",
        content: "Full-stack engineer building liquid-glass interfaces. Honest stats, no stock photos.",
      },
    ],
  }),
  component: Index,
});

const TICKER = [
  "still reading the docs",
  "renamed the variable twice",
  "shipped on a Friday, survived",
  "my rubber duck has opinions",
  "2026 and I still center divs by feel",
  "prompt-free portrait, hand-drawn in CSS",
];

const STATS = [
  { label: "TypeScript", value: 4, note: "Genuinely a mtn successor of JS" },
  { label: "Rust", value: 3, note: "I dont like this at all." },
  { label: "Interface craft", value: 4, note: "I care about the 8px nobody notices." },
  { label: "Systems design", value: 3, note: "Larping PS: RELOAD" },
  { label: "Patience in review", value: 4, note: "Status : Unknown " },
];

function Index() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-40 pt-14 sm:pt-20">
      {/* ticker */}
      <div className="glass grain relative mb-10 overflow-hidden rounded-full py-2">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8">
              {t}
              <span style={{ color: "var(--primary)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <span
        className="tag-slant hover-pop-sm inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em]"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          animation: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        currently: MANIPULATING PAWNS
      </span>

      <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h1 className="text-6xl leading-[0.86] sm:text-8xl">
            <AnimatedText text="FLEUR" delay={100} />
            <span className="text-glow block" style={{ color: "var(--primary)" }}>
              <AnimatedText text="2h.eth" delay={220} />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            <AnimatedText
              text="Full-stack LARPER. I build nonsense."
              delay={420}
              step={26}
            />
            <span className="caret ml-1 inline-block h-5 w-[2px] align-middle" style={{ background: "var(--primary)" }} />
          </p>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Terminal, text: "Coding" },
                { icon: Sparkles, text: "Photo/Video Editing" },
                { icon: Swords, text: "Horrible Graphic Designer" },
                { icon: Gamepad2, text: "Hates VALORANT." },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="glass glass-sheen hover-pop flex cursor-default items-center gap-2 rounded-full px-4 py-2 text-sm"
                >
                  <Icon className="size-4" style={{ color: "var(--primary)" }} />
                  {text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="flex justify-center lg:justify-end">
          <AvatarCard />
        </Reveal>
      </div>

      <section className="mt-24">
        <Reveal>
          <h2 className="text-3xl tracking-widest">LOSER STATS</h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Busy creating slop even though i have tons of assignment.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="glass glass-sheen hover-pop h-full rounded-2xl p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="display text-xl tracking-widest">{s.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.value}/5</span>
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
                        transitionDelay: `${n * 70}ms`,
                      }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal delay={80}>
        <p className="mt-16 font-mono text-xs text-muted-foreground">
          <span style={{ color: "var(--primary)" }}>$</span> whoami --honest
          <br />
          Did you actually read those? What an easy pawn.
        </p>
      </Reveal>
    </div>
  );
}
