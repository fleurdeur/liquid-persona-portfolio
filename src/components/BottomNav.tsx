import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Layers, SlidersHorizontal } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/settings", label: "Settings", icon: SlidersHorizontal },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-5">
      <div className="glass-strong grain relative flex items-center gap-1 rounded-full p-1.5">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="group relative flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-500"
              style={{
                color: active ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              {active && (
                <span
                  className="absolute inset-0 rounded-full transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--primary-glow))",
                    boxShadow: "0 8px 30px -8px var(--primary)",
                  }}
                />
              )}
              <Icon className="relative z-10 size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
