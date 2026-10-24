/**
 * Illustrated location map for Autovia, after Misr Italia's development maps, in RD.K colours.
 * Schematic, not to scale: Ring Road, the nearby landmarks named in the Autovia book, and Autovia's pin.
 * The important part sits in the middle so phones (which crop the sides) still show it.
 */
const C = { green: "#0A3B25", moss: "#2A6151", laurel: "#B2B7AA", cream: "#FCF7F0", gold: "#D8C2A4" };

// Ring Road runs top to bottom through the middle
const RING = "M700 -40 C660 120 600 250 600 360 S640 560 700 720";

function Pin({ x, y, label, side = "right" }: { x: number; y: number; label: string | string[]; side?: "left" | "right" | "below" }) {
  const right = side === "right";
  const lines = Array.isArray(label) ? label : [label];
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill={C.cream} opacity={0.18} />
      <circle cx={x} cy={y} r={6} fill={C.cream} />
      <text
        x={side === "below" ? x : right ? x + 18 : x - 18}
        y={side === "below" ? y + 40 : y + 6}
        textAnchor={side === "below" ? "middle" : right ? "start" : "end"}
        fill={C.cream}
        fontSize={19}
        fontWeight={600}
        letterSpacing="0.06em"
        style={{ textTransform: "uppercase" }}
      >
        {lines.map((line, i) => (
          <tspan key={line} x={side === "below" ? x : right ? x + 18 : x - 18} dy={i === 0 ? 0 : 23}>
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
        Map of Autovia on the Ring Road, near The Drive, 5A by The Waterway, Park Street and South 90th Street (not to scale)
      </title>
      <rect width="1200" height="640" fill={C.green} />

      {/* City blocks */}
      <g fill={C.moss}>
        <path d="M-20 60 L470 30 L520 230 L300 300 L-20 260Z" opacity={0.35} />
        <path d="M-20 300 L520 290 L540 470 L230 560 L-20 520Z" opacity={0.22} />
        <path d="M-20 560 L540 520 L600 660 L-20 660Z" opacity={0.3} />
        <path d="M760 20 L1220 -10 L1220 170 L800 200Z" opacity={0.28} />
        <path d="M740 250 L1220 220 L1220 440 L770 470Z" opacity={0.38} />
        <path d="M770 540 L1220 500 L1220 660 L800 660Z" opacity={0.24} />
      </g>

      {/* Secondary roads */}
      <g fill="none" stroke={C.laurel} strokeLinecap="round">
        <path id="park-st" d="M632 230 C780 222 960 206 1230 196" strokeWidth={7} opacity={0.55} />
        <path id="s90" d="M622 500 C800 488 980 492 1230 470" strokeWidth={9} opacity={0.6} />
        <path d="M-30 384 C200 376 420 368 600 362" strokeWidth={5} opacity={0.35} />
        <path d="M612 300 C660 300 700 340 740 340" strokeWidth={4} opacity={0.4} />
      </g>
      {/* Street names hide on phones, where the sides are cropped (the distances below name them) */}
      <text fontSize={15} fontWeight={600} letterSpacing="0.18em" fill={C.laurel} opacity={0.85} className="max-sm:hidden">
        <textPath href="#park-st" startOffset="22%">PARK STREET</textPath>
      </text>
      <text fontSize={15} fontWeight={600} letterSpacing="0.18em" fill={C.laurel} opacity={0.85} dy={-12} className="max-sm:hidden">
        <textPath href="#s90" startOffset="12%">SOUTH 90TH STREET</textPath>
      </text>

      {/* Ring Road: wide band with a dashed centre line */}
      <path d={RING} fill="none" stroke={C.laurel} strokeWidth={22} opacity={0.9} />
      <path id="ring" d={RING} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="14 12" />
      <text fontSize={16} fontWeight={700} letterSpacing="0.3em" fill={C.green} dy={6}>
        <textPath href="#ring" startOffset="66%">
          RING ROAD
        </textPath>
      </text>

      {/* Landmarks */}
      <Pin x={700} y={190} label="The Drive" />
      <Pin x={740} y={340} label={["5A by", "The Waterway"]} side="below" />

      {/* Autovia: gold pin, dashed line up to its label */}
      <line x1={540} y1={196} x2={540} y2={352} stroke={C.gold} strokeWidth={2} strokeDasharray="5 6" />
      <circle cx={540} cy={366} r={26} fill={C.gold} opacity={0.2} />
      <circle cx={540} cy={366} r={11} fill={C.gold} />
      <circle cx={540} cy={366} r={4} fill={C.green} />
      <g transform="translate(400 76)">
        <rect width={280} height={120} rx={14} fill={C.moss} />
        <image href="/images/autovia-logo.png" x={30} y={26} width={220} height={35} />
        <rect x={64} y={78} width={152} height={26} rx={4} fill="none" stroke={C.gold} strokeDasharray="4 4" />
        <text x={140} y={96} textAnchor="middle" fontSize={13} fontWeight={600} letterSpacing="0.16em" fill={C.gold}>
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
