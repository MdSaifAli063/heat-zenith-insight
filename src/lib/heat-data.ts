// Multi-city UHI demo data
export type Ward = {
  id: string;
  name: string;
  lst: number; // baseline daytime °C
  ndvi: number;
  albedo: number;
  isf: number;
  populationExposed: number;
  area: number;
  x: number;
  y: number;
};

export type City = {
  id: string;
  name: string;
  state: string;
  lat: string;
  lon: string;
  meanLST: number;
  populationTotal: number;
  satellite: string;
  capturedOn: string;
  climate: string;
  wards: Ward[];
};

const BENGALURU_WARDS: Ward[] = [
  { id: "blr-1",  name: "Whitefield",      lst: 47.2, ndvi: 0.18, albedo: 0.14, isf: 0.78, populationExposed: 218000, area: 14.2, x: 0.82, y: 0.42 },
  { id: "blr-2",  name: "Electronic City", lst: 49.8, ndvi: 0.15, albedo: 0.12, isf: 0.84, populationExposed: 184000, area: 12.9, x: 0.68, y: 0.86 },
  { id: "blr-3",  name: "Koramangala",     lst: 44.1, ndvi: 0.28, albedo: 0.17, isf: 0.68, populationExposed: 152000, area:  6.4, x: 0.55, y: 0.62 },
  { id: "blr-4",  name: "Indiranagar",     lst: 42.6, ndvi: 0.34, albedo: 0.19, isf: 0.61, populationExposed: 128000, area:  5.1, x: 0.60, y: 0.46 },
  { id: "blr-5",  name: "MG Road",         lst: 46.4, ndvi: 0.12, albedo: 0.13, isf: 0.86, populationExposed:  96000, area:  3.2, x: 0.48, y: 0.50 },
  { id: "blr-6",  name: "Jayanagar",       lst: 38.9, ndvi: 0.46, albedo: 0.22, isf: 0.48, populationExposed: 142000, area:  7.8, x: 0.42, y: 0.70 },
  { id: "blr-7",  name: "Hebbal",          lst: 45.7, ndvi: 0.22, albedo: 0.15, isf: 0.74, populationExposed: 168000, area: 10.5, x: 0.50, y: 0.20 },
  { id: "blr-8",  name: "Yelahanka",       lst: 43.3, ndvi: 0.31, albedo: 0.18, isf: 0.62, populationExposed: 132000, area: 11.8, x: 0.52, y: 0.10 },
  { id: "blr-9",  name: "Banashankari",    lst: 40.2, ndvi: 0.42, albedo: 0.21, isf: 0.52, populationExposed: 116000, area:  8.4, x: 0.32, y: 0.72 },
  { id: "blr-10", name: "Rajajinagar",     lst: 44.8, ndvi: 0.24, albedo: 0.16, isf: 0.72, populationExposed: 124000, area:  5.9, x: 0.30, y: 0.46 },
  { id: "blr-11", name: "Cubbon Park",     lst: 33.4, ndvi: 0.72, albedo: 0.24, isf: 0.18, populationExposed:  12000, area:  1.2, x: 0.50, y: 0.42 },
  { id: "blr-12", name: "Marathahalli",    lst: 46.1, ndvi: 0.20, albedo: 0.14, isf: 0.76, populationExposed: 178000, area:  9.1, x: 0.72, y: 0.50 },
];

const DELHI_WARDS: Ward[] = [
  { id: "del-1",  name: "Connaught Place",  lst: 48.6, ndvi: 0.14, albedo: 0.13, isf: 0.88, populationExposed: 142000, area:  4.2, x: 0.50, y: 0.48 },
  { id: "del-2",  name: "Karol Bagh",       lst: 47.9, ndvi: 0.12, albedo: 0.12, isf: 0.86, populationExposed: 186000, area:  5.1, x: 0.42, y: 0.46 },
  { id: "del-3",  name: "Dwarka",           lst: 46.4, ndvi: 0.22, albedo: 0.16, isf: 0.72, populationExposed: 312000, area: 14.6, x: 0.18, y: 0.62 },
  { id: "del-4",  name: "Rohini",           lst: 50.1, ndvi: 0.16, albedo: 0.14, isf: 0.80, populationExposed: 286000, area: 16.2, x: 0.32, y: 0.18 },
  { id: "del-5",  name: "Saket",            lst: 45.7, ndvi: 0.28, albedo: 0.18, isf: 0.66, populationExposed: 168000, area:  7.4, x: 0.48, y: 0.78 },
  { id: "del-6",  name: "Lajpat Nagar",     lst: 46.8, ndvi: 0.20, albedo: 0.15, isf: 0.74, populationExposed: 198000, area:  5.8, x: 0.56, y: 0.66 },
  { id: "del-7",  name: "Lodhi Garden",     lst: 36.2, ndvi: 0.68, albedo: 0.23, isf: 0.20, populationExposed:  14000, area:  1.6, x: 0.52, y: 0.58 },
  { id: "del-8",  name: "Mayur Vihar",      lst: 49.4, ndvi: 0.18, albedo: 0.13, isf: 0.78, populationExposed: 224000, area: 11.2, x: 0.72, y: 0.52 },
  { id: "del-9",  name: "Narela",           lst: 51.2, ndvi: 0.14, albedo: 0.12, isf: 0.82, populationExposed: 168000, area: 18.4, x: 0.36, y: 0.08 },
  { id: "del-10", name: "Vasant Kunj",      lst: 44.3, ndvi: 0.32, albedo: 0.19, isf: 0.60, populationExposed: 152000, area:  9.6, x: 0.28, y: 0.74 },
  { id: "del-11", name: "Shahdara",         lst: 48.7, ndvi: 0.16, albedo: 0.13, isf: 0.80, populationExposed: 246000, area:  8.9, x: 0.76, y: 0.40 },
  { id: "del-12", name: "Yamuna Bank",      lst: 42.1, ndvi: 0.38, albedo: 0.20, isf: 0.48, populationExposed:  68000, area:  6.4, x: 0.66, y: 0.46 },
];

const AHMEDABAD_WARDS: Ward[] = [
  { id: "amd-1",  name: "Maninagar",     lst: 49.2, ndvi: 0.16, albedo: 0.13, isf: 0.82, populationExposed: 198000, area:  7.6, x: 0.52, y: 0.62 },
  { id: "amd-2",  name: "Naranpura",     lst: 47.8, ndvi: 0.22, albedo: 0.16, isf: 0.74, populationExposed: 168000, area:  6.4, x: 0.40, y: 0.42 },
  { id: "amd-3",  name: "Vastrapur",     lst: 46.4, ndvi: 0.26, albedo: 0.17, isf: 0.68, populationExposed: 154000, area:  5.8, x: 0.34, y: 0.50 },
  { id: "amd-4",  name: "Bopal",         lst: 48.6, ndvi: 0.18, albedo: 0.14, isf: 0.78, populationExposed: 132000, area: 10.4, x: 0.22, y: 0.58 },
  { id: "amd-5",  name: "Sabarmati",     lst: 44.2, ndvi: 0.34, albedo: 0.19, isf: 0.58, populationExposed: 178000, area:  8.2, x: 0.46, y: 0.22 },
  { id: "amd-6",  name: "Kankaria",      lst: 41.6, ndvi: 0.44, albedo: 0.22, isf: 0.42, populationExposed:  86000, area:  3.6, x: 0.56, y: 0.66 },
  { id: "amd-7",  name: "Naroda",        lst: 51.4, ndvi: 0.12, albedo: 0.11, isf: 0.86, populationExposed: 214000, area: 14.2, x: 0.70, y: 0.34 },
  { id: "amd-8",  name: "Vatva",         lst: 52.1, ndvi: 0.10, albedo: 0.10, isf: 0.88, populationExposed: 186000, area: 13.6, x: 0.66, y: 0.76 },
  { id: "amd-9",  name: "Gota",          lst: 47.2, ndvi: 0.20, albedo: 0.15, isf: 0.72, populationExposed: 124000, area:  9.4, x: 0.28, y: 0.30 },
  { id: "amd-10", name: "Chandkheda",    lst: 45.8, ndvi: 0.24, albedo: 0.17, isf: 0.66, populationExposed: 142000, area:  8.6, x: 0.48, y: 0.16 },
];

const MUMBAI_WARDS: Ward[] = [
  { id: "mum-1",  name: "Bandra",          lst: 42.3, ndvi: 0.28, albedo: 0.18, isf: 0.70, populationExposed: 178000, area:  6.8, x: 0.32, y: 0.50 },
  { id: "mum-2",  name: "Andheri",         lst: 44.6, ndvi: 0.22, albedo: 0.16, isf: 0.76, populationExposed: 312000, area: 14.2, x: 0.30, y: 0.36 },
  { id: "mum-3",  name: "Dadar",           lst: 43.8, ndvi: 0.20, albedo: 0.15, isf: 0.78, populationExposed: 224000, area:  4.2, x: 0.38, y: 0.62 },
  { id: "mum-4",  name: "Worli",           lst: 41.2, ndvi: 0.32, albedo: 0.20, isf: 0.62, populationExposed: 142000, area:  3.6, x: 0.30, y: 0.70 },
  { id: "mum-5",  name: "BKC",             lst: 45.4, ndvi: 0.16, albedo: 0.14, isf: 0.84, populationExposed:  68000, area:  3.2, x: 0.38, y: 0.52 },
  { id: "mum-6",  name: "Powai",           lst: 40.8, ndvi: 0.42, albedo: 0.21, isf: 0.54, populationExposed: 168000, area:  7.4, x: 0.48, y: 0.42 },
  { id: "mum-7",  name: "Thane West",      lst: 46.2, ndvi: 0.18, albedo: 0.14, isf: 0.78, populationExposed: 286000, area: 12.6, x: 0.62, y: 0.28 },
  { id: "mum-8",  name: "Navi Mumbai",     lst: 45.1, ndvi: 0.24, albedo: 0.16, isf: 0.72, populationExposed: 246000, area: 16.8, x: 0.66, y: 0.62 },
  { id: "mum-9",  name: "Borivali",        lst: 39.4, ndvi: 0.52, albedo: 0.23, isf: 0.44, populationExposed: 158000, area: 10.2, x: 0.22, y: 0.20 },
  { id: "mum-10", name: "Colaba",          lst: 38.6, ndvi: 0.34, albedo: 0.21, isf: 0.56, populationExposed:  62000, area:  2.4, x: 0.34, y: 0.88 },
];

const CHENNAI_WARDS: Ward[] = [
  { id: "chn-1",  name: "T. Nagar",       lst: 45.8, ndvi: 0.18, albedo: 0.14, isf: 0.80, populationExposed: 162000, area:  4.2, x: 0.42, y: 0.52 },
  { id: "chn-2",  name: "Adyar",          lst: 42.4, ndvi: 0.34, albedo: 0.19, isf: 0.58, populationExposed: 138000, area:  6.6, x: 0.52, y: 0.70 },
  { id: "chn-3",  name: "Velachery",      lst: 46.2, ndvi: 0.22, albedo: 0.16, isf: 0.72, populationExposed: 184000, area:  8.4, x: 0.48, y: 0.80 },
  { id: "chn-4",  name: "Anna Nagar",     lst: 44.6, ndvi: 0.26, albedo: 0.17, isf: 0.68, populationExposed: 198000, area:  5.8, x: 0.36, y: 0.36 },
  { id: "chn-5",  name: "OMR Sholinganallur", lst: 47.8, ndvi: 0.18, albedo: 0.14, isf: 0.76, populationExposed: 212000, area: 12.6, x: 0.62, y: 0.86 },
  { id: "chn-6",  name: "Mylapore",       lst: 43.2, ndvi: 0.28, albedo: 0.18, isf: 0.64, populationExposed: 124000, area:  3.8, x: 0.52, y: 0.62 },
  { id: "chn-7",  name: "Porur",          lst: 48.4, ndvi: 0.16, albedo: 0.13, isf: 0.78, populationExposed: 168000, area:  9.2, x: 0.22, y: 0.50 },
  { id: "chn-8",  name: "Tambaram",       lst: 47.1, ndvi: 0.20, albedo: 0.15, isf: 0.74, populationExposed: 246000, area: 14.4, x: 0.38, y: 0.92 },
  { id: "chn-9",  name: "Marina Beach",   lst: 38.4, ndvi: 0.16, albedo: 0.22, isf: 0.40, populationExposed:  42000, area:  3.6, x: 0.62, y: 0.48 },
  { id: "chn-10", name: "Guindy",         lst: 44.8, ndvi: 0.30, albedo: 0.18, isf: 0.64, populationExposed: 142000, area:  6.2, x: 0.42, y: 0.66 },
];

const HYDERABAD_WARDS: Ward[] = [
  { id: "hyd-1", name: "Hitec City",    lst: 47.6, ndvi: 0.18, albedo: 0.14, isf: 0.80, populationExposed: 196000, area:  8.4, x: 0.30, y: 0.40 },
  { id: "hyd-2", name: "Gachibowli",    lst: 46.8, ndvi: 0.22, albedo: 0.16, isf: 0.74, populationExposed: 184000, area:  9.2, x: 0.26, y: 0.48 },
  { id: "hyd-3", name: "Banjara Hills", lst: 42.4, ndvi: 0.38, albedo: 0.20, isf: 0.54, populationExposed:  88000, area:  6.2, x: 0.46, y: 0.42 },
  { id: "hyd-4", name: "Jubilee Hills", lst: 41.8, ndvi: 0.42, albedo: 0.21, isf: 0.50, populationExposed:  72000, area:  5.4, x: 0.42, y: 0.36 },
  { id: "hyd-5", name: "Secunderabad",  lst: 46.2, ndvi: 0.20, albedo: 0.15, isf: 0.76, populationExposed: 224000, area:  7.6, x: 0.62, y: 0.32 },
  { id: "hyd-6", name: "Charminar",     lst: 48.3, ndvi: 0.14, albedo: 0.12, isf: 0.84, populationExposed: 168000, area:  4.8, x: 0.56, y: 0.72 },
  { id: "hyd-7", name: "Kukatpally",    lst: 49.2, ndvi: 0.16, albedo: 0.13, isf: 0.82, populationExposed: 246000, area: 11.4, x: 0.34, y: 0.22 },
  { id: "hyd-8", name: "LB Nagar",      lst: 47.4, ndvi: 0.18, albedo: 0.14, isf: 0.78, populationExposed: 198000, area:  8.8, x: 0.70, y: 0.66 },
  { id: "hyd-9", name: "Hussain Sagar", lst: 36.8, ndvi: 0.18, albedo: 0.22, isf: 0.32, populationExposed:  18000, area:  4.2, x: 0.54, y: 0.50 },
  { id: "hyd-10", name: "Uppal",        lst: 48.8, ndvi: 0.16, albedo: 0.13, isf: 0.80, populationExposed: 172000, area:  9.6, x: 0.78, y: 0.46 },
];

export const CITIES: City[] = [
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    lat: "12.97°N",
    lon: "77.59°E",
    meanLST: 43.6,
    populationTotal: 1.31e7,
    satellite: "Landsat 9 · Band 10",
    capturedOn: "2025-04-18",
    climate: "Tropical savanna",
    wards: BENGALURU_WARDS,
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "NCT",
    lat: "28.61°N",
    lon: "77.20°E",
    meanLST: 46.8,
    populationTotal: 3.21e7,
    satellite: "Landsat 9 · Band 10",
    capturedOn: "2025-05-22",
    climate: "Humid subtropical",
    wards: DELHI_WARDS,
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    lat: "23.02°N",
    lon: "72.57°E",
    meanLST: 47.5,
    populationTotal: 8.4e6,
    satellite: "Resourcesat-2A LISS-IV",
    capturedOn: "2025-05-14",
    climate: "Hot semi-arid",
    wards: AHMEDABAD_WARDS,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    lat: "19.08°N",
    lon: "72.88°E",
    meanLST: 42.8,
    populationTotal: 2.04e7,
    satellite: "Sentinel-2 + Landsat 9",
    capturedOn: "2025-04-30",
    climate: "Tropical wet & dry",
    wards: MUMBAI_WARDS,
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    lat: "13.08°N",
    lon: "80.27°E",
    meanLST: 44.9,
    populationTotal: 1.16e7,
    satellite: "INSAT-3DR thermal",
    capturedOn: "2025-05-08",
    climate: "Tropical wet & dry",
    wards: CHENNAI_WARDS,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    lat: "17.39°N",
    lon: "78.49°E",
    meanLST: 45.5,
    populationTotal: 1.08e7,
    satellite: "Landsat 9 · Band 10",
    capturedOn: "2025-05-02",
    climate: "Tropical wet & dry",
    wards: HYDERABAD_WARDS,
  },
];

export function getCity(id: string): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}

export type Material = {
  name: string;
  albedo: number;
  surfaceTemp: number;
  cooling: number;
  cost: number;
  durability: number;
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
  { feature: "Impervious Surface Fraction",  impact: 0.34, confidence: 96, direction: "increase" as const },
  { feature: "Low NDVI (Vegetation Deficit)", impact: 0.28, confidence: 94, direction: "increase" as const },
  { feature: "Low Albedo Roof Materials",    impact: 0.21, confidence: 91, direction: "increase" as const },
  { feature: "Building Density",             impact: 0.11, confidence: 86, direction: "increase" as const },
  { feature: "Elevation",                    impact: 0.06, confidence: 78, direction: "decrease" as const },
];

export function heatColor(lst: number): string {
  if (lst < 36) return "var(--heat-cool)";
  if (lst < 42) return "var(--heat-mild)";
  if (lst < 46) return "var(--heat-warm)";
  if (lst < 49) return "var(--heat-hot)";
  return "var(--heat-extreme)";
}

export function riskIndex(w: Ward): number {
  const t = Math.min(1, Math.max(0, (w.lst - 32) / 22));
  const p = Math.min(1, w.populationExposed / 320000);
  const v = 1 - w.ndvi;
  return Math.round((t * 0.55 + p * 0.25 + v * 0.20) * 100);
}

// Time-of-day modifier for LST
export type TimeOfDay = "dawn" | "noon" | "dusk" | "night";
export const TOD_OFFSET: Record<TimeOfDay, number> = {
  dawn: -8.4,
  noon:  0,
  dusk: -3.2,
  night: -11.8,
};

// Climate horizon projection (warming)
export type Horizon = "now" | "2030" | "2050";
export const HORIZON_DELTA: Record<Horizon, number> = {
  now:    0,
  "2030": 1.8,
  "2050": 3.6,
};

export function adjustedLST(w: Ward, tod: TimeOfDay, horizon: Horizon): number {
  return w.lst + TOD_OFFSET[tod] + HORIZON_DELTA[horizon];
}

// Mock 12-month LST history for trend chart
export function ltsHistory(baseline: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // seasonal sine, peak in May
  return months.map((m, i) => {
    const seasonal = Math.sin(((i - 4) / 12) * Math.PI * 2) * 6;
    const noise = Math.sin(i * 2.7) * 0.6;
    return { month: m, lst: +(baseline + seasonal + noise).toFixed(1) };
  });
}

export type Alert = {
  id: string;
  wardId: string;
  wardName: string;
  city: string;
  severity: "extreme" | "high" | "moderate";
  triggeredAt: string;
  message: string;
};

export function generateAlerts(city: City): Alert[] {
  return city.wards
    .filter((w) => w.lst >= 45)
    .sort((a, b) => b.lst - a.lst)
    .map((w, i) => ({
      id: `${city.id}-alert-${i}`,
      wardId: w.id,
      wardName: w.name,
      city: city.name,
      severity: w.lst >= 49 ? "extreme" : w.lst >= 47 ? "high" : "moderate",
      triggeredAt: `${(2 + i * 3) % 23}h ago`,
      message:
        w.lst >= 49
          ? `Surface temp ${w.lst.toFixed(1)}°C — heatstroke risk for ${(w.populationExposed / 1000).toFixed(0)}k residents`
          : `LST ${w.lst.toFixed(1)}°C above safe threshold (45°C)`,
    }));
}
