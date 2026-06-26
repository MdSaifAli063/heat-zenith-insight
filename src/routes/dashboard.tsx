import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Download,
  Layers,
  Thermometer,
  Users,
} from "lucide-react";
import { HeatMapCanvas, getWard } from "@/components/HeatMapCanvas";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { CoolingStrategyChart } from "@/components/CoolingStrategyChart";
import { ScenarioSimulator } from "@/components/ScenarioSimulator";
import { NeighborhoodTable } from "@/components/NeighborhoodTable";
import { MaterialTable } from "@/components/MaterialTable";
import { CITY, WARDS } from "@/lib/heat-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mission Control · ThermaGrid Dashboard" },
      {
        name: "description",
        content:
          "Live urban heat island dashboard for Bengaluru — ward-level LST, AI heat drivers, cooling scenarios.",
      },
      { property: "og:title", content: "ThermaGrid · Bengaluru Mission Control" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [selectedId, setSelectedId] = useState<string | null>("w2"); // Electronic City
  const selected = getWard(selectedId);
  const hottest = [...WARDS].sort((a, b) => b.lst - a.lst)[0];
  const totalAlerts = WARDS.filter((w) => w.lst >= 46).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded bg-gradient-to-br from-primary to-accent" />
                <div className="absolute inset-[2px] rounded-[3px] bg-background" />
                <div className="absolute inset-[4px] rounded-sm bg-gradient-to-br from-primary to-accent" />
              </div>
              <div className="font-semibold">
                Therma<span className="text-primary">Grid</span>
              </div>
              <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:inline">
                Mission Control · {CITY.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-card/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {CITY.satellite}
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted">
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-5 px-6 py-6">
        {/* KPI strip */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPI
            icon={Thermometer}
            label="Mean LST"
            value={`${CITY.meanLST.toFixed(1)}°C`}
            delta="+2.4°C vs 2020"
            tone="warn"
          />
          <KPI
            icon={Activity}
            label="Hottest ward"
            value={hottest.name}
            delta={`${hottest.lst.toFixed(1)}°C peak`}
            tone="hot"
          />
          <KPI
            icon={Users}
            label="Population at risk"
            value="1.84 M"
            delta="14% of metro"
            tone="muted"
          />
          <KPI
            icon={AlertTriangle}
            label="Active alerts"
            value={String(totalAlerts)}
            delta="zones > 46°C"
            tone="alert"
          />
        </div>

        {/* Map + Insights */}
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <div className="glass-panel rounded-lg p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Thermal map · LST overlay
                  </div>
                  <div className="text-sm font-semibold">
                    {CITY.name} · captured {CITY.capturedOn}
                  </div>
                </div>
                <LayerSwitcher />
              </div>
              <HeatMapCanvas selectedId={selectedId} onSelect={setSelectedId} />
            </div>

            {selected && (
              <div className="glass-panel rounded-lg p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Inspecting zone
                    </div>
                    <div className="text-2xl font-semibold">{selected.name}</div>
                  </div>
                  <div className="flex gap-6 font-mono text-xs text-muted-foreground">
                    <Detail label="LST" value={`${selected.lst.toFixed(1)}°C`} />
                    <Detail label="NDVI" value={selected.ndvi.toFixed(2)} />
                    <Detail label="Albedo" value={selected.albedo.toFixed(2)} />
                    <Detail label="ISF" value={selected.isf.toFixed(2)} />
                    <Detail label="Area" value={`${selected.area} km²`} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <AIInsightsPanel ward={selected} />
        </div>

        {/* Scenario simulator */}
        <ScenarioSimulator baselineLST={selected?.lst ?? CITY.meanLST} />

        {/* Charts + table */}
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <CoolingStrategyChart />
          <NeighborhoodTable selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        {/* Materials */}
        <MaterialTable />

        <footer className="pt-4 pb-8 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Data sources: Landsat-9 · Sentinel-2 · ISRO Bhuvan · MOSDAC · OSM · Census 2021
        </footer>
      </main>
    </div>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  delta: string;
  tone: "warn" | "hot" | "muted" | "alert";
}) {
  const toneClass = {
    warn: "text-[var(--heat-warm)] bg-[var(--heat-warm)]/10",
    hot: "text-[var(--heat-hot)] bg-[var(--heat-hot)]/10",
    muted: "text-accent bg-accent/10",
    alert: "text-[var(--heat-extreme)] bg-[var(--heat-extreme)]/10",
  }[tone];

  return (
    <div className="glass-panel flex items-center gap-4 rounded-lg p-4">
      <div className={`rounded-md p-2.5 ${toneClass}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="truncate text-lg font-semibold">{value}</div>
        <div className="font-mono text-[10px] text-muted-foreground">{delta}</div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-widest">{label}</div>
      <div className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{value}</div>
    </div>
  );
}

function LayerSwitcher() {
  const layers = ["LST", "NDVI", "Albedo", "Density"] as const;
  const [active, setActive] = useState<(typeof layers)[number]>("LST");
  return (
    <div className="flex items-center gap-1 rounded-md border border-border/60 bg-card/60 p-1">
      <Layers className="ml-1 h-3 w-3 text-muted-foreground" />
      {layers.map((l) => (
        <button
          key={l}
          onClick={() => setActive(l)}
          className={`rounded px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
            active === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
