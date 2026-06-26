// Mock data for Bengaluru UHI demo
export type Ward = {
  id: string;
  name: string;
  lst: number; // °C
  ndvi: number;
  albedo: number;
  isf: number; // impervious surface fraction
  populationExposed: number;
  area: number; // km²
  // Normalized position on the schematic map (0..1)
  x: number;
  y: number;
};

export const WARDS: Ward[] = [
  { id: "w1",  name: "Whitefield",       lst: 47.2, ndvi: 0.18, albedo: 0.14, isf: 0.78, populationExposed: 218000, area: 14.2, x: 0.82, y: 0.42 },
  { id: "w2",  name: "Electronic City",  lst: 49.8, ndvi: 0.15, albedo: 0.12, isf: 0.84, populationExposed: 184000, area: 12.9, x: 0.68, y: 0.86 },
  { id: "w3",  name: "Koramangala",      lst: 44.1, ndvi: 0.28, albedo: 0.17, isf: 0.68, populationExposed: 152000, area:  6.4, x: 0.55, y: 0.62 },
  { id: "w4",  name: "Indiranagar",      lst: 42.6, ndvi: 0.34, albedo: 0.19, isf: 0.61, populationExposed: 128000, area:  5.1, x: 0.60, y: 0.46 },
  { id: "w5",  name: "MG Road",          lst: 46.4, ndvi: 0.12, albedo: 0.13, isf: 0.86, populationExposed: 96000,  area:  3.2, x: 0.48, y: 0.50 },
  { id: "w6",  name: "Jayanagar",        lst: 38.9, ndvi: 0.46, albedo: 0.22, isf: 0.48, populationExposed: 142000, area:  7.8, x: 0.42, y: 0.70 },
  { id: "w7",  name: "Hebbal",           lst: 45.7, ndvi: 0.22, albedo: 0.15, isf: 0.74, populationExposed: 168000, area: 10.5, x: 0.50, y: 0.20 },
  { id: "w8",  name: "Yelahanka",        lst: 43.3, ndvi: 0.31, albedo: 0.18, isf: 0.62, populationExposed: 132000, area: 11.8, x: 0.52, y: 0.10 },
  { id: "w9",  name: "Banashankari",     lst: 40.2, ndvi: 0.42, albedo: 0.21, isf: 0.52, populationExposed: 116000, area:  8.4, x: 0.32, y: 0.72 },
  { id: "w10", name: "Rajajinagar",      lst: 44.8, ndvi: 0.24, albedo: 0.16, isf: 0.72, populationExposed: 124000, area:  5.9, x: 0.30, y: 0.46 },
  { id: "w11", name: "Cubbon Park",      lst: 33.4, ndvi: 0.72, albedo: 0.24, isf: 0.18, populationExposed:  12000, area:  1.2, x: 0.50, y: 0.42 },
  { id: "w12", name: "Marathahalli",     lst: 46.1, ndvi: 0.20, albedo: 0.14, isf: 0.76, populationExposed: 178000, area:  9.1, x: 0.72, y: 0.50 },
];

export const CITY = {
  name: "Bengaluru",
  state: "Karnataka",
  meanLST: 43.6,
  populationTotal: 1.31e7,
  satellite: "Landsat 9 · Band 10 Thermal",
  capturedOn: "2025-04-18",
};

export type Material = {
  name: string;
  albedo: number;
  surfaceTemp: number;
  cooling: number;
  cost: number; // ₹/m²
  durability: number; // years
};

export const MATERIALS: Material[] = [
  { name: "Conventional Asphalt",   albedo: 0.05, surfaceTemp: 64.2, cooling: 0.0,  cost: 480,  durability: 12 },
  { name: "Cool Roof Coating",      albedo: 0.78, surfaceTemp: 38.4, cooling: 12.4, cost: 920,  durability: 15 },
  { name: "White Portland Cement",  albedo: 0.62, surfaceTemp: 41.1, cooling: 9.8,  cost: 1240, durability: 25 },
  { name: "Green Roof System",      albedo: 0.32, surfaceTemp: 44.7, cooling: 7.1,  cost: 3200, durability: 20 },
  { name: "Permeable Pavers",       albedo: 0.41, surfaceTemp: 46.3, cooling: 6.3,  cost: 1850, durability: 22 },
  { name: "Reflective Paint (TiO₂)", albedo: 0.71, surfaceTemp: 40.0, cooling: 10.2, cost: 1100, durability: 10 },
];

export const COOLING_STRATEGIES = [
  { name: "Cool Roofs",        reduction: 12.4, cost: 920,  coverage: 42 },
  { name: "Reflective Paint",  reduction: 10.2, cost: 1100, coverage: 28 },
  { name: "Cool Pavements",    reduction:  9.8, cost: 1240, coverage: 35 },
  { name: "Green Roofs",       reduction:  7.1, cost: 3200, coverage: 18 },
  { name: "Permeable Pavers",  reduction:  6.3, cost: 1850, coverage: 22 },
  { name: "Urban Greening",    reduction:  5.4, cost:  650, coverage: 56 },
];

export const AI_DRIVERS = [
  { feature: "Impervious Surface Fraction", impact: 0.34, confidence: 96, direction: "increase" as const },
  { feature: "Low NDVI (Vegetation Deficit)", impact: 0.28, confidence: 94, direction: "increase" as const },
  { feature: "Low Albedo Roof Materials",   impact: 0.21, confidence: 91, direction: "increase" as const },
  { feature: "Building Density",            impact: 0.11, confidence: 86, direction: "increase" as const },
  { feature: "Elevation",                   impact: 0.06, confidence: 78, direction: "decrease" as const },
];

export function heatColor(lst: number): string {
  // 30 -> cool, 55+ -> extreme
  if (lst < 36) return "var(--heat-cool)";
  if (lst < 42) return "var(--heat-mild)";
  if (lst < 46) return "var(--heat-warm)";
  if (lst < 49) return "var(--heat-hot)";
  return "var(--heat-extreme)";
}

export function riskIndex(w: Ward): number {
  // simple weighted index 0..100
  const t = Math.min(1, Math.max(0, (w.lst - 32) / 22));
  const p = Math.min(1, w.populationExposed / 220000);
  const v = 1 - w.ndvi;
  return Math.round((t * 0.55 + p * 0.25 + v * 0.20) * 100);
}
