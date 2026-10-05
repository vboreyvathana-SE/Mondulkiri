// The hexagon "spider" chart. Give it 6 items: { label, value } with value from 0 to 1.
// Order: top, upper-right, lower-right, bottom, lower-left, upper-left.

const CENTER = 120;
const RADIUS = 100; // how far a value of 1 reaches

// where each label sits (same spots as the Stitch design)
const labelSpots = [
  { x: 120, y: 12, anchor: "middle", main: true },
  { x: 216, y: 74, anchor: "start" },
  { x: 216, y: 174, anchor: "start" },
  { x: 120, y: 236, anchor: "middle" },
  { x: 24, y: 174, anchor: "end" },
  { x: 24, y: 74, anchor: "end" },
];

// angle of each corner, in degrees (-90 = straight up)
const angles = [-90, -30, 30, 90, 150, 210];

function pointAt(index, value) {
  const radians = (angles[index] * Math.PI) / 180;
  return {
    x: Math.round((CENTER + RADIUS * value * Math.cos(radians)) * 10) / 10,
    y: Math.round((CENTER + RADIUS * value * Math.sin(radians)) * 10) / 10,
  };
}

function polygonPoints(valueFor) {
  return angles.map((_, index) => {
    const p = pointAt(index, valueFor(index));
    return `${p.x},${p.y}`;
  }).join(" ");
}

export default function RadarChart({ axes }) {
  const dataPoints = axes.map((axis, index) => pointAt(index, axis.value));

  return (
    // the wide viewBox leaves room so the side labels aren't cut off
    <svg
      className="h-full w-full text-[#514537]"
      viewBox="-50 0 340 248"
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label={`Flavor radar: ${axes.map((a) => `${a.label} ${Math.round(a.value * 100)}%`).join(", ")}`}
    >
      {/* the three guide hexagons */}
      <polygon className="opacity-40" points={polygonPoints(() => 1)} strokeDasharray="2 2" strokeWidth="1" />
      <polygon className="opacity-30" points={polygonPoints(() => 0.7)} strokeDasharray="2 2" strokeWidth="1" />
      <polygon className="opacity-20" points={polygonPoints(() => 0.34)} strokeWidth="1" />

      {/* the 3 lines through the middle */}
      <line className="opacity-30" strokeWidth="0.75" x1="120" y1="20" x2="120" y2="220" />
      <line className="opacity-30" strokeWidth="0.75" x1="33.4" y1="70" x2="206.6" y2="170" />
      <line className="opacity-30" strokeWidth="0.75" x1="33.4" y1="170" x2="206.6" y2="70" />

      {/* the person's own shape */}
      <polygon
        data-testid="radar-shape"
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="#d99b43"
        fillOpacity="0.25"
        stroke="#fcba5f"
        strokeWidth="2"
      />
      {dataPoints.map((p, index) => (
        <circle key={axes[index].label} cx={p.x} cy={p.y} r="3.5" fill="#fcba5f" stroke="none" />
      ))}

      {axes.map((axis, index) => (
        <text
          key={axis.label}
          x={labelSpots[index].x}
          y={labelSpots[index].y}
          textAnchor={labelSpots[index].anchor}
          fill={labelSpots[index].main ? "#fcba5f" : "#ede0da"}
          fontFamily="Space Grotesk, sans-serif"
          fontSize={labelSpots[index].main ? 9 : 8}
          stroke="none"
        >
          {axis.label.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}
