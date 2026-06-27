# ThermaNet AI — All-India Heat Intelligence Upgrade

Adapting the spec to the **existing TanStack Start + Vite** stack (not Next.js). All UX, data shape, and component behaviour from the spec are preserved; only the framework wiring changes (`src/routes/*` instead of `app/*`, TanStack Router instead of Next App Router).

## Stack decisions

- **Routing**: TanStack Start file routes under `src/routes/` (already in place).
- **Map**: keep the current stylized SVG/CSS `HeatMapCanvas` and upgrade it to a proper India-aware schematic with layer toggles (LST / NDVI / Albedo / ISF), ward polygons drawn from centroids, and a vertical color-scale legend. Skip MapLibre GL for now — it adds ~250KB + tile dependency and is not required for the hackathon demo. Easy to swap in later behind the same component interface.
- **State**: Zustand store exactly as specified (`useHeatData`), URL-synced via TanStack Router search params.
- **Styling**: extend the existing dark theme in `src/styles.css` with the `heat.*` and `space.*` tokens from spec Part 13 (CSS variables, since Tailwind v4 is CSS-first here).
- **Charts**: Recharts (already installed).
- **Fonts**: Space Grotesk + Space Mono via `<link>` in `__root.tsx`.

## Build phases

I'll ship this in 4 phases so the preview stays usable. This plan covers **Phase 1 + Phase 2** — the core platform. Phases 3–4 are listed so you can approve the full arc.

### Phase 1 — Data + Landing + Dashboard shell (this turn)

1. **`src/lib/indiaData.ts`** — all 36 states/UTs with the exact ward lists from the spec, realistic LST by climate zone, NDVI/Albedo/ISF/population/area, 12-month `lstTrend` arrays, and `materialType`. Auto-derived `heatRiskIndex`, `priorityScore`, `coolingPotential` via helpers so the file stays maintainable (~1500 lines vs 5000+).
2. **`src/lib/computeMetrics.ts`** — `effectiveLST(ward, tod, horizon)`, diurnal multipliers, horizon deltas, region/national aggregates.
3. **`src/lib/alertsEngine.ts`** — threshold-based alert generation (>45 moderate, >50 high, >55 critical).
4. **`src/lib/csvExport.ts`** — full column set from spec Part 7.
5. **`src/hooks/useHeatData.ts`** — Zustand store with all controls + derived getters, URL hydration.
6. **`src/styles.css`** — add `heat.*` / `space.*` tokens, Space Grotesk + Space Mono families.
7. **`src/routes/__root.tsx`** — font `<link>` tags, SEO metadata from spec Part 15.
8. **`src/routes/index.tsx`** — new landing page: navbar, hero, 4 stat tiles, region-tabbed searchable state grid (all 36), 3-step "How it works", schematic India SVG preview, footer.
9. **`src/routes/dashboard.tsx`** — refactor to new shell: sidebar + topbar + 5-row grid placeholder so Phase 2 can fill panels.

### Phase 2 — Dashboard panels (next turn)

10. `components/layout/Sidebar.tsx` (9 nav items, collapsible icon rail).
11. `components/layout/TopBar.tsx` (state/city dropdowns, TOD toggle, horizon toggle, CSV, alerts bell).
12. `components/panels/StatCards.tsx` (4 cards with count-up).
13. Upgrade `HeatMapCanvas` with layer toggles + legend + ward polygons.
14. Refresh `AIInsightsPanel` with the 4 auto-generated insights from spec Part 9.
15. Refresh `LSTTrendChart`, `MaterialTable`, `NeighborhoodTable` (+ search), `AlertsFeed`, `BenchmarkStrip`, `ScenarioSimulator` (6 sliders + live formula from spec).

### Phase 3 — Secondary pages

16. `/heat-maps`, `/materials`, `/analysis`, `/predictions`, `/optimization`, `/alerts`, `/reports`, `/settings` routes per spec Part 14.

### Phase 4 — Polish

17. Responsive breakpoints (Part 10), animations (Part 11), performance pass — virtualized neighborhood table, memoized trend series, lazy state-data imports.

## Out of scope (explicit)

- MapLibre GL JS — replaced by upgraded stylized canvas. Note in a follow-up if you want real tiles.
- PDF report generation — `/reports` will list CSVs only.
- `scripts/buildGeo.ts` precompute — ward polygons computed at runtime from centroid + area (cheap, ~350 wards).
- React Window virtualization — added in Phase 4 only if perf warrants.

## Technical notes

- `INDIA_DATA` lives in one file initially; if bundle size becomes an issue in Phase 4 I'll split per-region with dynamic imports.
- Ward `id`s are slugs (`karnataka-bengaluru-whitefield`) for stable URL/store keys.
- `selectedCity` in the store represents a ward-group within a state (e.g. `bengaluru` covers the three Bengaluru wards); the grid on the landing page navigates to `?state=karnataka&city=bengaluru`.
- Climate horizon multiplier for the simulator (`Today=1.0 | 2030=0.95 | 2050=0.88`) is separate from the additive horizon delta on raw LST — both applied per spec.
- No `any`, strict TypeScript throughout.

Reply **approve** to ship Phase 1, or tell me what to change.
