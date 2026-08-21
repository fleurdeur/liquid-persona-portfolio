import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeId = "crimson" | "azure" | "gold" | "violet";
export type PerfMode = "quality" | "performance";

export type Settings = {
  theme: ThemeId;
  perf: PerfMode;
  motionBlur: boolean;
  tilt: boolean;
};

const DEFAULTS: Settings = {
  theme: "crimson",
  perf: "quality",
  motionBlur: true,
  tilt: true,
};

const STORAGE_KEY = "persona-portfolio-settings";

type Ctx = Settings & { set: <K extends keyof Settings>(k: K, v: Settings[K]) => void };

const SettingsContext = createContext<Ctx>({ ...DEFAULTS, set: () => {} });

export const THEMES: { id: ThemeId; label: string; tagline: string; swatch: string[] }[] = [
  { id: "crimson", label: "Phantom", tagline: "Rebellion red", swatch: ["#e0304a", "#ff6a4d", "#150a0c"] },
  { id: "azure", label: "Velvet", tagline: "Midnight blue", swatch: ["#4a7dff", "#5fd7e8", "#0b1024"] },
  { id: "gold", label: "Investigation", tagline: "TV gold", swatch: ["#ffcc33", "#ffe680", "#1b1608"] },
  { id: "violet", label: "Metaverse", tagline: "Neon violet", swatch: ["#c34dff", "#ff6ad5", "#160a1e"] },
];

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.perf = settings.perf;
    root.dataset.blur = settings.motionBlur && settings.perf === "quality" ? "on" : "off";
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const set = useCallback(<K extends keyof Settings>(k: K, v: Settings[K]) => {
    setSettings((s) => ({ ...s, [k]: v }));
  }, []);

  const value = useMemo(() => ({ ...settings, set }), [settings, set]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
