import type { Plot } from "@/content/site";

/**
 * Line drawings for the land portfolio cards, until the client sends aerial photos.
 * Gold on dark green, after the client's inspiration: a blueprint plot outline, topographic
 * contours, and an aerial-style street plan with a dashed site boundary. All in a 400 × 300 box.
 */

const W = 400;
const H = 300;
const GOLD = "var(--color-gold)";
const LAUREL = "var(--color-laurel)";
const CREAM = "var(--color-cream)";

// Fine drafting grid: every 20 units, stronger every 100
function grid() {
  let fine = "";
  let bold = "";
  for (let x = 0; x <= W; x += 20) {
    if (x % 100) fine += `M${x} 0V${H}`;
    else bold += `M${x} 0V${H}`;
  }
  for (let y = 0; y <= H; y += 20) {
    if (y % 100) fine += `M0 ${y}H${W}`;
    else bold += `M0 ${y}H${W}`;
  }
  return (
    <>
      <path d={fine} stroke={LAUREL} strokeOpacity={0.08} strokeWidth={0.75} />
      <path d={bold} stroke={LAUREL} strokeOpacity={0.16} strokeWidth={0.75} />
    </>
  );
}

const points = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");

function Blueprint({ area }: { area: string }) {
  const plot = [
    [122, 72],
    [284, 84],
    [274, 230],
    [112, 220],
  ];
  const setback = [
    [138, 89],
    [267, 99],
    [259, 214],
    [129, 205],
  ];
  return (
    <>
      {grid()}
      <polygon points={points(plot)} fill={GOLD} fillOpacity={0.07} stroke={GOLD} strokeWidth={1.5} />
      <polygon points={points(setback)} fill="none" stroke={GOLD} strokeOpacity={0.55} strokeWidth={0.75} strokeDasharray="5 4" />
      {/* hatching in one corner, like a drawn reserved zone */}
      <g stroke={GOLD} strokeOpacity={0.35} strokeWidth={0.75}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={138 + i * 9} y1={89 + i * 0.7} x2={129 + i * 2} y2={128 - i * 6} />
        ))}
      </g>
      {plot.map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r={3} fill="none" stroke={GOLD} strokeWidth={1} />
      ))}
      {/* dimension lines along the top and left edges */}
      <g stroke={CREAM} strokeOpacity={0.45} strokeWidth={0.75}>
        <line x1={123} y1={52} x2={286} y2={64} />
        <line x1={123} y1={46} x2={122} y2={66} />
        <line x1={286} y1={58} x2={285} y2={78} />
        <line x1={92} y1={71} x2={82} y2={219} />
        <line x1={86} y1={71} x2={104} y2={72} />
        <line x1={76} y1={219} x2={98} y2={220} />
      </g>
      <text x={196} y={160} textAnchor="middle" fill={CREAM} fillOpacity={0.85} fontSize={13} fontWeight={600} letterSpacing={2}>
        {area}
      </text>
      {/* north arrow */}
      <g transform="translate(352 58)" stroke={GOLD} strokeWidth={1} fill="none">
        <circle r={16} strokeOpacity={0.6} />
        <path d="M0 -12L5 6L0 2L-5 6Z" fill={GOLD} fillOpacity={0.8} stroke="none" />
        <text y={-21} textAnchor="middle" fill={GOLD} stroke="none" fontSize={10} fontWeight={600} letterSpacing={1}>
          N
        </text>
      </g>
    </>
  );
}

// Nested topographic rings: wobbly circles that wobble a little differently as they grow
function Contour() {
  const rings = Array.from({ length: 9 }, (_, k) => {
    const base = 22 + k * 19;
    let d = "";
    for (let i = 0; i <= 96; i++) {
      const t = (i / 96) * Math.PI * 2;
      const r = base * (1 + 0.13 * Math.sin(3 * t + 0.6 + k * 0.18) + 0.07 * Math.sin(5 * t + 1.9 - k * 0.11) + 0.04 * Math.cos(2 * t + k * 0.3));
      d += `${i ? "L" : "M"}${(205 + r * 1.25 * Math.cos(t)).toFixed(1)} ${(150 + r * Math.sin(t)).toFixed(1)}`;
    }
    return { d: d + "Z", k };
  });
  return (
    <>
      {grid()}
      {rings.map(({ d, k }) => (
        <path key={k} d={d} fill="none" stroke={GOLD} strokeOpacity={k % 3 === 2 ? 0.75 : 0.4} strokeWidth={k % 3 === 2 ? 1.25 : 0.75} />
      ))}
      <polygon points="178,128 238,122 244,170 184,177" fill={CREAM} fillOpacity={0.06} stroke={CREAM} strokeOpacity={0.8} strokeWidth={1} strokeDasharray="4 3" />
      <circle cx={211} cy={149} r={3} fill={GOLD} />
    </>
  );
}

// Street plan from above: roads, faint parcels, and the plot outlined in a dashed line
function Aerial() {
  const parcels: number[][] = [];
  for (let gx = 0; gx < 6; gx++)
    for (let gy = 0; gy < 5; gy++) if (!(gx >= 2 && gx <= 3 && gy >= 1 && gy <= 2)) parcels.push([-40 + gx * 82, -20 + gy * 70]);
  return (
    <>
      <g transform="rotate(-14 200 150)">
        {parcels.map(([x, y]) => (
          <rect key={`${x},${y}`} x={x} y={y} width={66} height={54} rx={2} fill={LAUREL} fillOpacity={0.07} stroke={LAUREL} strokeOpacity={0.14} />
        ))}
        <g stroke={LAUREL} strokeOpacity={0.14} strokeWidth={5}>
          {[-48, 34, 116, 198, 280, 362, 444].map((x) => (
            <line key={x} x1={x} y1={-60} x2={x} y2={360} />
          ))}
          {[-28, 42, 112, 182, 252, 322].map((y) => (
            <line key={y} x1={-60} y1={y} x2={480} y2={y} />
          ))}
        </g>
        <polygon points="128,58 268,52 274,170 122,176" fill={GOLD} fillOpacity={0.1} stroke={GOLD} strokeWidth={1.5} strokeDasharray="7 5" />
      </g>
      {/* main road sweeping across */}
      <path d="M-20 262 C 90 228, 170 250, 260 214 S 380 168, 420 176" fill="none" stroke={LAUREL} strokeOpacity={0.22} strokeWidth={14} />
      <path d="M-20 262 C 90 228, 170 250, 260 214 S 380 168, 420 176" fill="none" stroke={CREAM} strokeOpacity={0.25} strokeWidth={0.75} strokeDasharray="8 8" />
      <circle cx={200} cy={118} r={10} fill={GOLD} fillOpacity={0.18} />
      <circle cx={200} cy={118} r={4} fill={GOLD} />
      {/* scale bar */}
      <g stroke={CREAM} strokeOpacity={0.5} strokeWidth={1}>
        <line x1={24} y1={278} x2={104} y2={278} />
        {[24, 44, 64, 104].map((x) => (
          <line key={x} x1={x} y1={273} x2={x} y2={283} />
        ))}
      </g>
    </>
  );
}

export default function PlotArt({ plot, className = "" }: { plot: Plot; className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      {plot.art === "blueprint" ? <Blueprint area={plot.area} /> : plot.art === "contour" ? <Contour /> : <Aerial />}
    </svg>
  );
}
