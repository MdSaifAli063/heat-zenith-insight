import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Sliders, Zap } from "lucide-react";

export function ScenarioSimulator({ baselineLST }: { baselineLST: number }) {
  const [coolRoofs, setCoolRoofs] = useState(35);
  const [trees, setTrees] = useState(20);
  const [pavement, setPavement] = useState(15);

  const { deltaT, cost, co2, beneficiaries } = useMemo(() => {
    // Simple weighted physics-informed model (mock)
    const dT =
      (coolRoofs / 100) * 4.2 +
      (trees / 100) * 3.6 +
      (pavement / 100) * 2.4;
    const cost =
      coolRoofs * 18.2 + trees * 6.4 + pavement * 24.5; // ₹ lakhs
    const co2 = trees * 0.14 + coolRoofs * 0.06; // kt/yr
    const beneficiaries = Math.round((coolRoofs + trees + pavement) * 2800);
    return { deltaT: dT, cost, co2, beneficiaries };
  }, [coolRoofs, trees, pavement]);

  const projected = baselineLST - deltaT;

  return (
    <div className="glass-panel rounded-lg p-5">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-accent/15 p-1.5 text-accent">
          <Sliders className="h-4 w-4" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Counterfactual engine
          </div>
          <div className="text-sm font-semibold">Scenario Simulator · 2030 horizon</div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <SliderRow
            label="Cool-roof conversion"
            value={coolRoofs}
            onChange={setCoolRoofs}
            unit="%"
            hint="Albedo 0.05 → 0.78"
          />
          <SliderRow
            label="Urban tree canopy added"
            value={trees}
            onChange={setTrees}
            unit="%"
            hint="NDVI uplift · Penman-Monteith"
          />
          <SliderRow
            label="Permeable pavement"
            value={pavement}
            onChange={setPavement}
            unit="%"
            hint="ISF reduction"
          />
        </div>

        <div className="rounded-lg border border-border/60 bg-background/40 p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Projected outcome
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <div className="text-4xl font-semibold tabular-nums">
              {projected.toFixed(1)}
              <span className="text-lg text-muted-foreground">°C</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
              <Zap className="h-3 w-3" />−{deltaT.toFixed(2)}°C
            </div>
          </div>
          <div className="mt-1 font-mono text-[10px] text-muted-foreground">
            Baseline {baselineLST.toFixed(1)}°C · mean ward LST
          </div>

          {/* Thermal bar */}
          <div className="relative mt-4 h-2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--heat-cool), var(--heat-mild), var(--heat-warm), var(--heat-hot), var(--heat-extreme))",
            }}
          >
            <div
              className="absolute -top-1 h-4 w-0.5 bg-foreground"
              style={{ left: `${Math.min(95, Math.max(5, ((projected - 30) / 25) * 100))}%` }}
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Outcome label="Capex" value={`₹${cost.toFixed(0)}L`} />
            <Outcome label="CO₂ offset" value={`${co2.toFixed(2)} kt/yr`} />
            <Outcome label="Benefited" value={`${(beneficiaries / 1000).toFixed(1)}k`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  unit,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  hint: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-medium text-foreground/90">{label}</label>
        <span className="font-mono text-sm tabular-nums text-primary">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        max={100}
        step={1}
        onValueChange={(v) => onChange(v[0])}
        className="mt-2"
      />
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {hint}
      </div>
    </div>
  );
}

function Outcome({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-sm font-semibold tabular-nums">{value}</div>
    </div>
  );
}
