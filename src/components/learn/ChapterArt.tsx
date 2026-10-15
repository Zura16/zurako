import type { CSSProperties, ReactNode } from "react";
import type { Category } from "@/content/path";

/**
 * Small flat illustrations behind the chapter cards, drawn in SVG on the
 * card's 136×144 box. They sit still; hovering a card (or opening it on a
 * phone) plays their animation, set up in globals.css under `.chapter-art`.
 * The category color arrives as `--chroma` from the card.
 *
 * Animated parts carry a class (a-float, a-spin, a-wave, …) and an optional
 * delay; `transform-box: fill-box` makes each part turn around its own center.
 */

const C = "var(--chroma)";
const INK = "#f5f2ea";
const MUTED = "#aab4cf";
const DEEP = "#1c2f5e";
const MID = "#2a3f74";

const part = (cls: string, delay = 0, origin?: string): { className: string; style: CSSProperties } => ({
  className: cls,
  style: { animationDelay: `${delay}s`, ...(origin ? { transformOrigin: origin } : {}) },
});

const bubble = (x: number, y: number, w: number, h: number, fill: string, tailRight = false) => (
  <>
    <rect x={x} y={y} width={w} height={h} rx={h / 2.4} fill={fill} />
    <path d={tailRight ? `M${x + w - 14} ${y + h - 2} l10 10 l-2 -12z` : `M${x + 12} ${y + h - 2} l-10 10 l12 -4z`} fill={fill} />
  </>
);

const MOTIFS = {
  wave: (
    <>
      <g {...part("a-wave", 0, "50% 100%")}>
        <rect x="62" y="74" width="44" height="50" rx="18" fill={C} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={64 + i * 10} y={50 - (i === 1 || i === 2 ? 6 : 0)} width="9" height="36" rx="4.5" fill={C} />
        ))}
        <rect x="46" y="88" width="26" height="10" rx="5" fill={C} transform="rotate(-35 58 93)" />
      </g>
      <path
        d="M112 54 q8 8 0 18 M120 48 q12 14 0 30"
        stroke={MUTED}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        {...part("a-blink")}
      />
    </>
  ),
  levels: (
    <>
      {[
        ["#4fd8cc", 0, 30],
        ["#7cc4ff", 1, 52],
        ["#c3a8ff", 2, 74],
      ].map(([color, i, h]) => (
        <rect
          key={i as number}
          x={44 + (i as number) * 26}
          y={128 - (h as number)}
          width="20"
          height={h as number}
          rx="5"
          fill={color as string}
          {...part("a-rise", (i as number) * 0.15, "50% 100%")}
        />
      ))}
      <circle cx="108" cy="36" r="9" fill={C} {...part("a-float", 0.3)} />
      <path d="M100 52 q8 -8 16 0" stroke={C} strokeWidth="4" fill="none" strokeLinecap="round" {...part("a-float", 0.3)} />
    </>
  ),
  badge: (
    <g {...part("a-swing", 0, "50% 0%")}>
      <path d="M86 26 v20" stroke={MUTED} strokeWidth="3" />
      <rect x="42" y="46" width="88" height="66" rx="10" fill={INK} />
      <rect x="42" y="46" width="88" height="22" rx="10" fill={C} />
      <rect x="42" y="58" width="88" height="10" fill={C} />
      <rect x="54" y="80" width="54" height="8" rx="4" fill={DEEP} />
      <rect x="54" y="94" width="36" height="6" rx="3" fill={MUTED} />
    </g>
  ),
  people: (
    <>
      {[
        [58, 0.0, MUTED],
        [104, 0.2, MUTED],
        [81, 0.1, C],
      ].map(([x, d, fill]) => (
        <g key={x as number} {...part("a-bob", d as number)}>
          <circle cx={x as number} cy={x === 81 ? 66 : 76} r="13" fill={fill as string} />
          <path
            d={`M${(x as number) - 22} 140 q0 -${x === 81 ? 52 : 42} 22 -${x === 81 ? 52 : 42} q22 0 22 ${x === 81 ? 52 : 42}z`}
            fill={fill as string}
          />
        </g>
      ))}
    </>
  ),
  bubbles: (
    <>
      <g {...part("a-pop", 0)}>{bubble(34, 52, 62, 30, MID)}</g>
      <g {...part("a-pop", 0.25)}>{bubble(60, 92, 66, 30, C, true)}</g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={53 + i * 12} cy="67" r="3.5" fill={INK} {...part("a-blink", i * 0.2)} />
      ))}
    </>
  ),
  equals: (
    <>
      <rect x="30" y="78" width="36" height="36" rx="9" fill={MID} {...part("a-bob", 0)} />
      <rect x="98" y="78" width="36" height="36" rx="9" fill={C} {...part("a-bob", 0.2)} />
      <g {...part("a-pulse", 0.1)}>
        <rect x="72" y="88" width="20" height="5" rx="2.5" fill={INK} />
        <rect x="72" y="99" width="20" height="5" rx="2.5" fill={INK} />
      </g>
    </>
  ),
  box: (
    <>
      <path d="M86 46 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z" fill={C} {...part("a-float", 0)} />
      <path d="M44 88 h84 v44 h-84z" fill={MID} />
      <path d="M44 88 l-8 -14 h40 l10 14z M128 88 l8 -14 h-40 l-10 14z" fill={DEEP} {...part("a-flap", 0, "50% 100%")} />
      <rect x="44" y="88" width="84" height="8" fill={DEEP} />
    </>
  ),
  pin: (
    <>
      <path d="M30 104 l30 -10 30 10 30 -10 v36 l-30 10 -30 -10 -30 10z" fill={MID} />
      <path d="M60 94 v36 M90 104 v36" stroke={DEEP} strokeWidth="2" />
      <g {...part("a-bounce", 0)}>
        <path d="M90 96 c-14 -16 -18 -24 -18 -32 a18 18 0 0 1 36 0 c0 8 -4 16 -18 32z" fill={C} />
        <circle cx="90" cy="64" r="7" fill={DEEP} />
      </g>
    </>
  ),
  link: (
    <>
      <g {...part("a-swing", 0, "0% 50%")}>
        <rect x="34" y="78" width="50" height="26" rx="13" fill="none" stroke={MUTED} strokeWidth="8" />
        <rect x="70" y="78" width="50" height="26" rx="13" fill="none" stroke={C} strokeWidth="8" />
      </g>
      <path d="M102 40 h24 l8 10 -8 10 h-24z" fill={C} {...part("a-swing", 0.2, "100% 50%")} />
    </>
  ),
  question: (
    <g {...part("a-wave", 0, "50% 90%")}>
      <circle cx="88" cy="88" r="40" fill={MID} />
      <path d="M76 76 a12 12 0 1 1 18 10 c-5 3 -6 6 -6 12" stroke={C} strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="112" r="5" fill={C} />
    </g>
  ),
  gears: (
    <>
      <g {...part("a-spin", 0)}>
        <circle cx="70" cy="96" r="28" fill="none" stroke={MID} strokeWidth="12" strokeDasharray="9 7" />
        <circle cx="70" cy="96" r="18" fill={MID} />
        <circle cx="70" cy="96" r="7" fill={DEEP} />
      </g>
      <g {...part("a-spin-rev", 0)}>
        <circle cx="112" cy="60" r="18" fill="none" stroke={C} strokeWidth="9" strokeDasharray="7 6" />
        <circle cx="112" cy="60" r="11" fill={C} />
        <circle cx="112" cy="60" r="4" fill={DEEP} />
      </g>
    </>
  ),
  heart: (
    <>
      <path
        d="M88 126 c-34 -22 -44 -40 -44 -56 a22 22 0 0 1 44 -6 a22 22 0 0 1 44 6 c0 16 -10 34 -44 56z"
        fill={C}
        {...part("a-pulse", 0)}
      />
      <path d="M40 54 c-6 -4 -8 -8 -8 -11 a4.5 4.5 0 0 1 8 -1 a4.5 4.5 0 0 1 8 1 c0 3 -2 7 -8 11z" fill={MUTED} {...part("a-float", 0.2)} />
      <path d="M118 36 c-5 -3 -6 -6 -6 -8 a3.5 3.5 0 0 1 6 -1 a3.5 3.5 0 0 1 6 1 c0 2 -1 5 -6 8z" fill={MUTED} {...part("a-float", 0.5)} />
    </>
  ),
  no: (
    <g {...part("a-shake", 0)}>
      <circle cx="88" cy="90" r="36" fill="none" stroke={C} strokeWidth="10" />
      <path d="M63 65 l50 50" stroke={C} strokeWidth="10" strokeLinecap="round" />
    </g>
  ),
  clock: (
    <>
      <circle cx="86" cy="90" r="40" fill={MID} />
      <circle cx="86" cy="90" r="32" fill={DEEP} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="84" y="60" width="4" height="8" rx="2" fill={MUTED} transform={`rotate(${i * 90} 86 90)`} />
      ))}
      <rect x="84" y="70" width="4" height="22" rx="2" fill={INK} {...part("a-spin-slow", 0, "50% 90%")} />
      <rect x="84" y="88" width="20" height="4" rx="2" fill={C} {...part("a-spin", 0, "10% 50%")} />
      <circle cx="86" cy="90" r="4" fill={C} />
    </>
  ),
  calendar: (
    <>
      <rect x="38" y="52" width="80" height="78" rx="10" fill={INK} />
      <rect x="38" y="52" width="80" height="20" rx="10" fill={C} />
      <rect x="38" y="62" width="80" height="10" fill={C} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect
          key={i}
          x={48 + (i % 3) * 22}
          y={80 + Math.floor(i / 3) * 15}
          width="14"
          height="9"
          rx="2"
          fill={i === 4 ? C : MUTED}
          {...(i === 4 ? part("a-blink") : {})}
        />
      ))}
      <path d="M126 50 l4 -10 M132 60 l10 -4" stroke={C} strokeWidth="3" strokeLinecap="round" {...part("a-blink", 0.3)} />
    </>
  ),
  house: (
    <>
      <path d="M100 40 h10 v20 h-10z" fill={MID} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={105 + i * 4} cy={32 - i * 9} r={4 + i} fill={MUTED} opacity="0.6" {...part("a-steam", i * 0.3)} />
      ))}
      <path d="M86 46 l50 40 h-100z" fill={C} />
      <rect x="46" y="86" width="80" height="48" fill={MID} />
      <rect x="58" y="98" width="20" height="18" rx="2" fill="#fdbe02" {...part("a-blink", 0)} />
      <rect x="94" y="102" width="18" height="32" rx="2" fill={DEEP} />
    </>
  ),
  bowl: (
    <>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${66 + i * 16} 70 q-6 -8 0 -16 q6 -8 0 -16`}
          stroke={MUTED}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          {...part("a-steam", i * 0.25)}
        />
      ))}
      <path d="M100 30 l30 56 M112 26 l24 58" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M38 84 h100 a50 44 0 0 1 -100 0z" fill={C} />
      <rect x="66" y="126" width="44" height="8" rx="4" fill={C} />
      <path d="M38 84 h100" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  cup: (
    <>
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${74 + i * 18} 62 q-6 -8 0 -16 q6 -8 0 -16`}
          stroke={MUTED}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          {...part("a-steam", i * 0.3)}
        />
      ))}
      <path d="M48 70 h70 v34 a26 26 0 0 1 -26 26 h-18 a26 26 0 0 1 -26 -26z" fill={C} />
      <path d="M118 80 h6 a12 12 0 0 1 0 24 h-8" stroke={C} strokeWidth="7" fill="none" />
      <rect x="40" y="132" width="88" height="6" rx="3" fill={MID} />
    </>
  ),
  book: (
    <>
      <path d="M86 64 q-22 -12 -50 -6 v66 q28 -6 50 6z" fill={INK} />
      <path d="M86 64 q22 -12 50 -6 v66 q-28 -6 -50 6z" fill={MUTED} />
      <path d="M86 64 q22 -12 50 -6 v66 q-28 -6 -50 6z" fill={C} {...part("a-page", 0, "0% 50%")} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="46" y={74 + i * 12} width="30" height="4" rx="2" fill={MUTED} />
      ))}
    </>
  ),
  sound: (
    <>
      {[16, 30, 46, 30, 54, 24, 38, 18].map((h, i) => (
        <rect
          key={i}
          x={36 + i * 12}
          y={92 - h / 2}
          width="7"
          height={h}
          rx="3.5"
          fill={i % 3 === 1 ? C : MUTED}
          {...part("a-eq", i * 0.1, "50% 50%")}
        />
      ))}
    </>
  ),
  train: (
    <>
      <path d="M20 134 h116" stroke={MUTED} strokeWidth="3" />
      <g {...part("a-drive", 0)}>
        <rect x="34" y="66" width="104" height="56" rx="16" fill={C} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={46 + i * 28} y="78" width="20" height="18" rx="4" fill={DEEP} />
        ))}
        <rect x="34" y="104" width="104" height="5" fill={DEEP} opacity="0.4" />
        <circle cx="54" cy="126" r="7" fill={MID} />
        <circle cx="116" cy="126" r="7" fill={MID} />
      </g>
    </>
  ),
  car: (
    <>
      <path d="M14 136 h122" stroke={MUTED} strokeWidth="3" strokeDasharray="12 10" {...part("a-road")} />
      <g {...part("a-bob", 0)}>
        <path d="M30 116 v-18 q0 -8 8 -10 l14 -4 l14 -18 h44 q8 0 12 8 l8 18 q10 2 10 12 v12z" fill={C} />
        <path d="M70 70 h36 l8 16 h-56z" fill={DEEP} />
      </g>
      {[52, 114].map((x) => (
        <g key={x} {...part("a-spin", 0)}>
          <circle cx={x} cy="118" r="11" fill={MID} />
          <circle cx={x} cy="118" r="11" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="5 6" />
        </g>
      ))}
    </>
  ),
  bag: (
    <>
      <path d="M70 66 v-8 a16 16 0 0 1 32 0 v8" stroke={INK} strokeWidth="5" fill="none" />
      <path d="M50 66 h72 l8 66 h-88z" fill={C} {...part("a-bob", 0)} />
      {[0, 1, 2].map((i) => (
        <g key={i} {...part("a-float", i * 0.2)}>
          <circle cx={36 + i * 6} cy={110 - i * 14} r="9" fill="#fdbe02" />
          <circle cx={36 + i * 6} cy={110 - i * 14} r="5" fill="none" stroke={DEEP} strokeWidth="2" />
        </g>
      ))}
    </>
  ),
  phone: (
    <>
      <rect x="58" y="38" width="60" height="100" rx="12" fill={MID} />
      <rect x="64" y="48" width="48" height="80" rx="6" fill={DEEP} />
      <g {...part("a-pop", 0)}>{bubble(68, 56, 32, 14, MUTED)}</g>
      <g {...part("a-pop", 0.3)}>{bubble(78, 78, 30, 14, C, true)}</g>
      <g {...part("a-pop", 0.6)}>{bubble(68, 100, 26, 14, MUTED)}</g>
      <circle cx="128" cy="44" r="8" fill="#ff8a80" {...part("a-pulse", 0.2)} />
    </>
  ),
  briefcase: (
    <>
      <path d="M72 66 v-8 q0 -6 6 -6 h20 q6 0 6 6 v8" stroke={MUTED} strokeWidth="6" fill="none" />
      <g {...part("a-bob", 0)}>
        <rect x="36" y="66" width="104" height="66" rx="10" fill={C} />
        <rect x="36" y="90" width="104" height="6" fill={DEEP} opacity="0.35" />
        <rect x="80" y="86" width="16" height="14" rx="3" fill={INK} />
      </g>
      <path d="M126 40 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={INK} {...part("a-twinkle", 0.2)} />
    </>
  ),
  weather: (
    <>
      <g {...part("a-spin-slow", 0)}>
        <circle cx="96" cy="62" r="18" fill="#fdbe02" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x="94" y="30" width="4" height="9" rx="2" fill="#fdbe02" transform={`rotate(${i * 45} 96 62)`} />
        ))}
      </g>
      <g {...part("a-drift", 0)}>
        <path d="M44 120 a16 16 0 0 1 4 -31 a22 22 0 0 1 42 -4 a15 15 0 0 1 12 35z" fill={INK} />
      </g>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${56 + i * 16} 128 l-4 10`} stroke={C} strokeWidth="4" strokeLinecap="round" {...part("a-rain", i * 0.2)} />
      ))}
    </>
  ),
  pulse: (
    <>
      <path d="M88 128 c-34 -22 -44 -40 -44 -56 a22 22 0 0 1 44 -6 a22 22 0 0 1 44 6 c0 16 -10 34 -44 56z" fill={MID} />
      <path
        d="M30 92 h30 l8 -18 l12 36 l10 -26 l6 8 h40"
        stroke={C}
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="100"
        className="a-draw"
      />
    </>
  ),
  face: (
    <>
      <circle cx="88" cy="88" r="40" fill={C} />
      <g {...part("a-blink-eye", 0, "50% 50%")}>
        <ellipse cx="74" cy="80" rx="5" ry="7" fill={DEEP} />
        <ellipse cx="102" cy="80" rx="5" ry="7" fill={DEEP} />
      </g>
      <path d="M70 100 q18 16 36 0" stroke={DEEP} strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="64" cy="98" r="6" fill="#ff8a80" opacity="0.6" />
      <circle cx="112" cy="98" r="6" fill="#ff8a80" opacity="0.6" />
    </>
  ),
  shapes: (
    <>
      <circle cx="58" cy="108" r="22" fill={MID} {...part("a-pulse", 0)} />
      <rect x="84" y="70" width="40" height="40" rx="6" fill={C} {...part("a-spin-slow", 0)} />
      <path d="M100 136 l18 -30 18 30z" fill={MUTED} {...part("a-bob", 0.2)} />
    </>
  ),
  stars: (
    <>
      {[
        [56, 104, 1, 0],
        [92, 78, 1.5, 0.15],
        [122, 108, 1, 0.3],
      ].map(([x, y, s, d]) => (
        <path
          key={x}
          d="M0 -14 l4 9 10 1 -8 7 2 10 -8 -5 -8 5 2 -10 -8 -7 10 -1z"
          transform={`translate(${x} ${y}) scale(${s})`}
          fill={s > 1 ? C : MUTED}
          {...part("a-twinkle", d)}
        />
      ))}
    </>
  ),
  blocks: (
    <>
      <rect x="40" y="108" width="40" height="26" rx="6" fill={MID} {...part("a-drop", 0)} />
      <rect x="84" y="108" width="40" height="26" rx="6" fill={MUTED} {...part("a-drop", 0.15)} />
      <rect x="62" y="78" width="40" height="26" rx="6" fill={C} {...part("a-drop", 0.3)} />
      <path d="M118 52 q10 -2 12 -12" stroke={C} strokeWidth="3" fill="none" strokeLinecap="round" {...part("a-blink", 0.5)} />
    </>
  ),
  lantern: (
    <>
      <path d="M20 46 q66 -26 132 0 l-10 6 q-56 -20 -112 0z" fill={MID} />
      <g {...part("a-swing", 0, "50% 0%")}>
        <path d="M88 50 v14" stroke={MUTED} strokeWidth="2" />
        <rect x="70" y="64" width="36" height="8" rx="3" fill={DEEP} />
        <rect x="66" y="72" width="44" height="46" rx="18" fill={C} />
        <rect x="70" y="118" width="36" height="8" rx="3" fill={DEEP} />
        <path d="M88 126 v12" stroke={C} strokeWidth="3" />
      </g>
    </>
  ),
  frame: (
    <>
      <path d="M44 62 h-10 v60 h10 M128 62 h10 v60 h-10" stroke={MUTED} strokeWidth="6" fill="none" />
      <rect x="48" y="80" width="30" height="24" rx="5" fill={MID} />
      <rect x="86" y="80" width="34" height="24" rx="5" fill="none" stroke={C} strokeWidth="3" strokeDasharray="5 4" />
      <rect x="88" y="82" width="30" height="20" rx="4" fill={C} {...part("a-slide", 0)} />
    </>
  ),
  bow: (
    <>
      <circle cx="104" cy="58" r="12" fill={MUTED} />
      <g {...part("a-bow", 0, "30% 100%")}>
        <circle cx="62" cy="62" r="12" fill={C} />
        <path d="M50 78 h24 v38 h-24z" fill={C} />
      </g>
      <path d="M92 74 h24 v42 h-24z" fill={MUTED} />
      <rect x="44" y="116" width="80" height="6" rx="3" fill={MID} />
      <rect x="50" y="122" width="10" height="16" rx="3" fill={C} />
      <rect x="64" y="122" width="10" height="16" rx="3" fill={C} />
      <rect x="94" y="122" width="10" height="16" rx="3" fill={MUTED} />
      <rect x="108" y="122" width="10" height="16" rx="3" fill={MUTED} />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type Motif = keyof typeof MOTIFS;

/** Number tiles, labelled per chapter: 하나 둘 셋 for native numbers, 일 이 삼 for Sino-Korean. */
function NumberTiles({ labels }: { labels: [string, string, string] }) {
  return (
    <>
      {labels.map((label, i) => (
        <g key={label} {...part("a-flip", i * 0.15)}>
          <rect x={34 + i * 34} y={i === 1 ? 72 : 86} width="30" height="38" rx="7" fill={i === 1 ? C : MID} />
          <text
            x={49 + i * 34}
            y={i === 1 ? 97 : 111}
            textAnchor="middle"
            fontSize={label.length > 1 ? 11 : 16}
            fontWeight="700"
            fill={i === 1 ? DEEP : INK}
          >
            {label}
          </text>
        </g>
      ))}
    </>
  );
}

/** Which picture each chapter gets, by slug. Unlisted chapters fall back to their category's picture. */
const BY_SLUG: Record<string, Motif | [string, string, string]> = {
  greetings: "wave",
  "speech-levels": "levels",
  introductions: "badge",
  people: "people",
  "yes-no": "bubbles",
  ida: "equals",
  itda: "box",
  "this-that": "pin",
  particles: "link",
  questions: "question",
  haeyo: "gears",
  "verbs-1": "gears",
  likes: "heart",
  negation: "no",
  "native-numbers": ["하나", "둘", "셋"],
  "sino-numbers": ["일", "이", "삼"],
  "days-time": "calendar",
  "time-words": "clock",
  family: "house",
  ordering: "bowl",
  "food-words": "bowl",
  places: "pin",
  survival: "book",
  "verbs-2": "gears",
  sounds: "sound",
  "verbs-3": "gears",
  "daily-actions": "clock",
  "first-patterns": "blocks",
  "first-talk": "bubbles",
  "daily-life": "weather",
  reactions: "face",
  "casual-when": "people",
  "casual-sentences": "blocks",
  "casual-friends": "bubbles",
  "talk-words-1": "bubbles",
  "start-talking": "wave",
  "five-patterns": "frame",
  "sound-natural": "sound",
  "talk-words-2": "bubbles",
  "grammar-in-use": "blocks",
  "natural-friends": "people",
  "order-formula": "frame",
  "two-numbers": ["1", "하나", "일"],
  counters: "cup",
  "describe-food": "bowl",
  "real-order": "cup",
  "shopping-words": "bag",
  cafes: "cup",
  directions: "pin",
  "subway-bus": "train",
  taxi: "car",
  driving: "car",
  "place-words": "pin",
  "transport-words": "train",
  "sounds-culture": "lantern",
  present: "clock",
  past: "calendar",
  future: "calendar",
  "three-tenses": "clock",
  feelings: "face",
  "no-want": "no",
  "can-if": "link",
  "family-members": "house",
  dating: "heart",
  "in-laws": "bow",
  "family-verbs": "people",
  body: "pulse",
  "polite-endings": "bow",
  "honorific-verbs": "levels",
  titles: "badge",
  "honorific-talk": "bow",
  "polite-patterns": "frame",
  "speech-wild": "levels",
  weather: "weather",
  texting: "phone",
  "slang-reactions": "phone",
  "transport-2": "train",
  "eat-shop": "bag",
  appearance: "face",
  taste: "bowl",
  "culture-2": "lantern",
  "friends-work": "briefcase",
  "daily-stories": "book",
  "blind-date": "heart",
  connecting: "link",
  quality: "stars",
  slang: "phone",
  tech: "phone",
  work: "briefcase",
  "study-work": "book",
  stories: "book",
  size: "shapes",
  "shop-move": "bag",
  "social-3": "lantern",
  nuance: "briefcase",
  frames: "frame",
};

const BY_CATEGORY: Record<Category, Motif> = {
  hangul: "sound",
  grammar: "blocks",
  vocabulary: "book",
  conversation: "bubbles",
  culture: "lantern",
};

/** The slug part of a chapter id: "chapter.1-greetings" → "greetings". */
export const chapterSlug = (id: string) => id.replace(/^chapter\.\d+-/, "");

export const hasOwnArt = (id: string) => chapterSlug(id) in BY_SLUG;

export function ChapterArt({ id, category }: { id: string; category: Category }) {
  const pick = BY_SLUG[chapterSlug(id)] ?? BY_CATEGORY[category];
  return (
    <svg viewBox="0 0 136 144" preserveAspectRatio="xMidYMid slice" className="chapter-art" aria-hidden>
      {Array.isArray(pick) ? <NumberTiles labels={pick} /> : MOTIFS[pick]}
    </svg>
  );
}
