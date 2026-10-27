import Link from "next/link";
import { developments, landPortfolio as copy } from "@/content/site";

/**
 * The land portfolio as an illustrated map (option B, after the client's map references):
 * warm paper, a hand-styled map of Greater Cairo with gold roads and the Ring Road in moss,
 * each plot as a dark label pinned to the map, a list beside it, and outlined number cards below.
 * Positions are indicative only: the brief keeps exact locations private.
 */

const autovia = developments[0];

// PLACEHOLDER: Autovia's pin is real (Ring Road, New Cairo); the other positions are mock until the client says where to show them
const PINS: { name: string; x: number; y: number; note?: string; side: "left" | "right" }[] = [
  { name: autovia.name, x: 728, y: 392, note: autovia.status, side: "right" },
  { name: "Plot 9000", x: 852, y: 478, side: "right" },
  { name: "Engineers Syndicate plot", x: 120, y: 540, side: "right" },
  { name: "Sadat plot", x: 92, y: 96, note: "Sadat City · ≈ 90 km", side: "right" },
];

const LANDMARKS: { label: string; x: number; y: number; anchor?: "start" | "end" | "middle" }[] = [
  { label: "Downtown Cairo", x: 498, y: 318 },
  { label: "Cairo Airport", x: 770, y: 120 },
  { label: "Giza Pyramids", x: 344, y: 412 },
  { label: "Sheikh Zayed", x: 128, y: 300 },
  { label: "6th of October", x: 70, y: 430 },
  { label: "Maadi", x: 530, y: 470 },
  { label: "New Cairo", x: 840, y: 400 },
  { label: "New Capital", x: 948, y: 214, anchor: "end" },
];

const ROADS = [
  "M330 296 C 250 230, 150 140, 20 40", // Cairo–Alex Desert Road (to Sadat City)
  "M470 330 C 380 340, 260 352, 120 372", // 26th of July Corridor
  "M708 262 C 790 250, 880 236, 990 226", // Suez Road
  "M716 420 C 790 440, 870 462, 990 480", // 90th Street / Ain Sokhna side
  "M330 470 C 300 520, 260 580, 230 680", // south-west
];
const RING = "M336 226 C 390 120, 610 104, 704 196 S 772 420, 664 504 S 404 566, 334 474 S 286 300, 336 226 Z";
const NILE = "M488 680 C 476 590, 468 520, 470 450 S 462 330, 452 250 S 430 110, 404 0";

// Faint street texture: short segments in loose blocks, same every render
function streets() {
  let s = 7;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  let d = "";
  for (let i = 0; i < 140; i++) {
    const x = 60 + rand() * 900;
    const y = 30 + rand() * 620;
    const len = 30 + rand() * 70;
    const a = (rand() < 0.5 ? -0.25 : 1.3) + rand() * 0.2;
    d += `M${x.toFixed(0)} ${y.toFixed(0)}l${(Math.cos(a) * len).toFixed(0)} ${(Math.sin(a) * len).toFixed(0)}`;
  }
  return d;
}

function Pin({ name, x, y, note, side }: (typeof PINS)[number]) {
  const w = Math.max(name.length * 9.6, (note?.length ?? 0) * 6.6) + 28;
  const h = note ? 46 : 32;
  const bx = side === "right" ? x + 18 : x - 18 - w;
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill="var(--color-gold)" fillOpacity={0.35} />
      <circle cx={x} cy={y} r={6} fill="var(--color-green)" stroke="var(--color-cream)" strokeWidth={2} />
      <line x1={x} y1={y} x2={side === "right" ? bx : bx + w} y2={y - h / 2 - 8} stroke="var(--color-green)" strokeWidth={1} />
      <rect x={bx} y={y - h - 8} width={w} height={h} rx={3} fill="var(--color-green)" />
      <text x={bx + 14} y={y - h + 13} fill="var(--color-cream)" fontSize={12} fontWeight={600} letterSpacing={1.6}>
        {name.toUpperCase()}
      </text>
      {note && (
        <text x={bx + 14} y={y - h + 30} fill="var(--color-gold)" fontSize={10.5} fontWeight={500} letterSpacing={1}>
          {note}
        </text>
      )}
    </g>
  );
}

function Map() {
  return (
    <svg viewBox="0 0 1000 680" role="img" aria-label="Map of Greater Cairo showing RD.K's plots (indicative)" className="h-auto w-full">
      <path d={streets()} stroke="var(--color-moss)" strokeOpacity={0.14} strokeWidth={1.2} fill="none" strokeLinecap="round" />
      {/* the Nile */}
      <path d={NILE} stroke="var(--color-laurel)" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d={NILE} stroke="var(--color-cream)" strokeOpacity={0.5} strokeWidth={4} fill="none" />
      <text x={438} y={600} fontSize={11} letterSpacing={3} fill="var(--color-moss)" transform="rotate(-84 438 600)">
        RIVER NILE
      </text>
      {/* roads: gold with a dashed centre line, the Ring Road in moss */}
      {ROADS.map((d) => (
        <g key={d}>
          <path d={d} stroke="var(--color-gold-deep)" strokeWidth={11} fill="none" strokeLinecap="round" />
          <path d={d} stroke="var(--color-cream)" strokeWidth={1.2} strokeDasharray="7 7" fill="none" />
        </g>
      ))}
      <path d={RING} stroke="var(--color-moss)" strokeWidth={12} fill="none" />
      <path d={RING} stroke="var(--color-cream)" strokeWidth={1.2} strokeDasharray="7 7" fill="none" />
      <text x={560} y={104} fontSize={11} fontWeight={600} letterSpacing={2.5} fill="var(--color-moss)" transform="rotate(8 560 104)">
        RING ROAD
      </text>
      <text x={150} y={170} fontSize={10} fontWeight={600} letterSpacing={2} fill="var(--color-gold-deep)" transform="rotate(38 150 170)">
        CAIRO–ALEX DESERT RD
      </text>
      {/* landmarks */}
      {LANDMARKS.map((l) => (
        <g key={l.label}>
          <circle cx={l.x} cy={l.y} r={4} fill="none" stroke="var(--color-moss)" strokeWidth={1.5} />
          <text
            x={l.anchor === "end" ? l.x - 9 : l.x + 9}
            y={l.y + 4}
            textAnchor={l.anchor ?? "start"}
            fontSize={11}
            fontWeight={500}
            letterSpacing={1.4}
            fill="var(--color-moss)"
          >
            {l.label.toUpperCase()}
          </text>
        </g>
      ))}
      {PINS.map((p) => (
        <Pin key={p.name} {...p} />
      ))}
      {/* north arrow and note */}
      <g transform="translate(950 620)" fill="var(--color-green)">
        <path d="M0 -18L7 8L0 2L-7 8Z" />
        <text y={-24} textAnchor="middle" fontSize={11} fontWeight={600}>
          N
        </text>
      </g>
      <text x={20} y={664} fontSize={10} letterSpacing={1.4} fill="var(--color-moss)" fillOpacity={0.8}>
        NOT TO SCALE · LOCATIONS INDICATIVE
      </text>
    </svg>
  );
}

const CARDS = [
  { value: copy.stats[0].value, unit: "plots", caption: "Across Greater Cairo", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { value: copy.stats[1].value.replace(" m²", ""), unit: "m²", caption: "Of commercial land", icon: "M4 4h16v16H4zM4 9h16M9 4v16" },
  { value: "1", unit: "launching", caption: `${autovia.name}, ${autovia.location}`, icon: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
];

export default function LandMap() {
  return (
    <div className="relative isolate overflow-hidden rounded-sm bg-gold/15 px-6 py-10 sm:px-10 md:py-14 lg:px-14">
      <span className="paper-grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-8">
        {/* The list, like the references' "Connectivity" column */}
        <div className="min-w-0 xl:col-span-4">
          <h3 className="type-h3 inline-block border-b-2 border-double border-gold-deep pb-2 pr-6">{copy.eyebrow}</h3>
          <ul className="mt-6 grid max-w-xl gap-4 text-sm">
            <li className="flex items-baseline justify-between gap-4">
              <span>
                <span className="font-semibold">{autovia.name}</span>
                <span className="ml-2 whitespace-nowrap rounded-full bg-green px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold">{autovia.status}</span>
              </span>
              <span className="shrink-0 text-green/80">13,000 m²</span>
            </li>
            {copy.plots.map((plot) => (
              <li key={plot.name} className="flex items-baseline justify-between gap-4">
                <span className="font-semibold">{plot.name}</span>
                <span className="shrink-0 text-green/80">{plot.area}</span>
              </li>
            ))}
          </ul>

          <h3 className="type-h3 mt-10 inline-block border-b-2 border-double border-gold-deep pb-2 pr-6">Use</h3>
          <p className="mt-6 text-sm">{copy.use}</p>

          <p className="mt-10 max-w-[38ch] text-sm text-green/75">{copy.note}</p>
          <Link href="#enquire" className="btn mt-6 bg-green text-cream hover:bg-moss">
            {copy.button}
          </Link>
        </div>

        {/* The map: scrolls sideways on phones so the labels stay readable */}
        <div className="min-w-0 xl:col-span-8">
          <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:thin] sm:mx-0 sm:px-0">
            <div className="min-w-[44rem] sm:min-w-0">
              <Map />
            </div>
          </div>
          <p className="mt-2 text-xs text-green/60 sm:hidden">Swipe to see the whole map</p>
        </div>
      </div>

      {/* Number cards, after the references' outlined travel-time boxes */}
      <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
        {CARDS.map((card) => (
          <li key={card.caption} className="relative rounded-xl border border-gold-deep px-6 pb-7 pt-10 text-center">
            <span className="absolute left-1/2 top-0 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-deep bg-[color-mix(in_srgb,var(--color-cream)_85%,var(--color-gold))] text-moss">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                <path d={card.icon} />
              </svg>
            </span>
            <p className="flex items-start justify-center gap-1.5">
              <span className="text-5xl font-light tracking-tight md:text-6xl">{card.value}</span>
              <span className="mt-1 text-sm font-medium italic text-moss">{card.unit}</span>
            </p>
            <p className="mt-3 text-sm text-green/75">{card.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
