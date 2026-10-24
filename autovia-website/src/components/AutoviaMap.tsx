/**
 * Illustrated location map for Autovia, after Misr Italia's development maps, in RD.K colours.
 * Schematic, not to scale, but laid out like Google Maps: Autovia on the west side of the Ring Road
 * next to Aian Business Park, with The Drive, 5A by Waterway and Park Street East across the road.
 * The important part sits in the middle so phones (which crop the sides) still show it.
 */
const C = { green: "#0A3B25", moss: "#2A6151", laurel: "#B2B7AA", cream: "#FCF7F0", gold: "#D8C2A4" };

// Ring Road runs top to bottom, leaning slightly right like the real road; service road alongside to the east
const RING = "M600 -40 C612 160 628 420 650 680";
const SERVICE = "M668 -40 C680 160 694 420 716 680";

type Side = "left" | "right" | "above" | "below";

function Pin({ x, y, label, side = "right" }: { x: number; y: number; label: string | string[]; side?: Side }) {
  const lines = Array.isArray(label) ? label : [label];
  const centred = side === "above" || side === "below";
  const tx = centred ? x : side === "right" ? x + 18 : x - 18;
  const ty = side === "below" ? y + 40 : side === "above" ? y - 22 - (lines.length - 1) * 23 : y + 6 - ((lines.length - 1) * 23) / 2;
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill={C.cream} opacity={0.18} />
      <circle cx={x} cy={y} r={6} fill={C.cream} />
      <text
        x={tx}
        y={ty}
        textAnchor={centred ? "middle" : side === "right" ? "start" : "end"}
        fill={C.cream}
        fontSize={19}
        fontWeight={600}
        letterSpacing="0.06em"
        style={{ textTransform: "uppercase" }}
      >
        {lines.map((line, i) => (
          <tspan key={line} x={tx} dy={i === 0 ? 0 : 23}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function AutoviaMap() {
  return (
    <svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="autovia-map-title" className="size-full">
      <title id="autovia-map-title">
        Map of Autovia on the west side of the Ring Road, next to Aian Business Park, near The Drive, 5A by Waterway and Park
        Street East (not to scale)
      </title>
      <rect width="1200" height="640" fill={C.green} />

      {/* City blocks */}
      <g fill={C.moss}>
        <path d="M-20 40 L440 20 L470 250 L250 290 L-20 280Z" opacity={0.3} />
        <path d="M-20 330 L470 310 L500 660 L-20 660Z" opacity={0.22} />
        <path d="M760 -20 L1220 -20 L1220 210 L780 230Z" opacity={0.3} />
        <path d="M790 280 L1220 260 L1220 470 L810 490Z" opacity={0.38} />
        <path d="M800 540 L1220 520 L1220 660 L820 660Z" opacity={0.24} />
      </g>

      {/* Local roads: the road west of Autovia, and streets into The Drive, 5A and Park Street East */}
      <g fill="none" stroke={C.laurel} strokeLinecap="round" opacity={0.45}>
        <path d="M470 -40 C482 180 500 420 560 680" strokeWidth={9} />
        <path d="M700 250 C800 246 900 240 1230 232" strokeWidth={6} />
        <path d="M712 520 C820 515 940 509 1230 501" strokeWidth={6} />
        <path d="M-30 300 C150 296 330 292 478 300" strokeWidth={5} />
      </g>

      {/* Service road (thin) and Ring Road (wide band with a dashed centre line) */}
      <path d={SERVICE} fill="none" stroke={C.laurel} strokeWidth={7} opacity={0.6} />
      <path d={RING} fill="none" stroke={C.laurel} strokeWidth={26} opacity={0.9} />
      <path id="ring" d={RING} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="14 12" />
      <text fontSize={16} fontWeight={700} letterSpacing="0.3em" fill={C.green} dy={6}>
        <textPath href="#ring" startOffset="31%">
          RING ROAD
        </textPath>
      </text>

      {/* Landmarks, placed as on Google Maps */}
      <Pin x={495} y={170} label={["Aian", "Business Park"]} side="above" />
      <Pin x={760} y={150} label="The Drive" />
      <Pin x={850} y={330} label={["5A by", "Waterway"]} side="below" />
      <Pin x={740} y={455} label={["Park Street", "East"]} side="right" />

      {/* Autovia: gold pin between the Ring Road and the road to its west, with its label below */}
      <circle cx={540} cy={320} r={28} fill={C.gold} opacity={0.2} />
      <circle cx={540} cy={320} r={12} fill={C.gold} />
      <circle cx={540} cy={320} r={4.5} fill={C.green} />
      <line x1={540} y1={346} x2={540} y2={402} stroke={C.gold} strokeWidth={2} strokeDasharray="5 6" />
      <g transform="translate(330 402)">
        <rect width={250} height={96} rx={14} fill={C.moss} />
        <image href="/images/autovia/autovia-wordmark.png" x={25} y={22} width={200} height={17} />
        <rect x={49} y={56} width={152} height={26} rx={4} fill="none" stroke={C.gold} strokeDasharray="4 4" />
        <text x={125} y={74} textAnchor="middle" fontSize={13} fontWeight={600} letterSpacing="0.16em" fill={C.gold}>
          RING ROAD
        </text>
      </g>

      {/* North arrow and scale note */}
      <g transform="translate(1120 64)" fill={C.cream} opacity={0.75}>
        <path d="M0 -26 L10 6 L0 0 L-10 6Z" />
        <text y={30} textAnchor="middle" fontSize={14} fontWeight={600}>
          N
        </text>
      </g>
      <text x={40} y={44} fontSize={13} fill={C.cream} opacity={0.55} letterSpacing="0.08em">
        Map not to scale
      </text>
    </svg>
  );
}
