export default function TravelBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#00C896', opacity: 0.16 }}
      >
        <defs>

          {/* ── EIFFEL TOWER ── */}
          <symbol id="ic-eiffel" viewBox="0 0 52 84" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Antenna */}
            <line x1="26" y1="2" x2="26" y2="12"/>
            {/* Spire cap */}
            <path d="M23 12 L29 12 L30 22 L22 22 Z"/>
            {/* First platform */}
            <line x1="20" y1="22" x2="32" y2="22"/>
            {/* Detail bar */}
            <line x1="23" y1="17" x2="29" y2="17"/>
            {/* Upper section */}
            <path d="M18 22 L34 22 L37 40 L15 40 Z"/>
            {/* Second platform */}
            <line x1="13" y1="40" x2="39" y2="40"/>
            {/* Bar inside upper section */}
            <line x1="20" y1="33" x2="32" y2="33"/>
            {/* Lower section – legs splay out */}
            <path d="M15 40 L8 70 M37 40 L44 70"/>
            <path d="M20 40 L17 70 M32 40 L35 70"/>
            {/* The iconic arch connecting inner legs */}
            <path d="M17 70 C17 58 22 54 26 52 C30 54 35 58 35 70"/>
            {/* Base */}
            <line x1="4" y1="70" x2="48" y2="70"/>
            {/* Base corners */}
            <line x1="4" y1="70" x2="6" y2="74"/>
            <line x1="48" y1="70" x2="46" y2="74"/>
            <line x1="6" y1="74" x2="46" y2="74"/>
          </symbol>

          {/* ── BIG BEN ── */}
          <symbol id="ic-bigben" viewBox="0 0 46 92" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Gothic spire */}
            <path d="M23 2 L20 14 L26 14 Z"/>
            {/* Pinnacle base */}
            <rect x="18" y="14" width="10" height="5"/>
            {/* Belfry */}
            <rect x="14" y="19" width="18" height="5"/>
            {/* Clock tower section */}
            <rect x="12" y="24" width="22" height="20"/>
            {/* Clock face */}
            <circle cx="23" cy="34" r="8"/>
            {/* Clock hands */}
            <line x1="23" y1="27" x2="23" y2="34" strokeWidth="1.2"/>
            <line x1="23" y1="34" x2="28" y2="30" strokeWidth="1.2"/>
            {/* Cornice */}
            <line x1="10" y1="44" x2="36" y2="44"/>
            {/* Main tower shaft */}
            <rect x="10" y="44" width="26" height="42"/>
            {/* Horizontal string courses */}
            <line x1="10" y1="60" x2="36" y2="60"/>
            <line x1="10" y1="74" x2="36" y2="74"/>
            {/* Buttresses */}
            <path d="M4 56 L10 56 L10 86"/>
            <path d="M42 56 L36 56 L36 86"/>
            {/* Base plinth */}
            <line x1="4" y1="86" x2="42" y2="86"/>
          </symbol>

          {/* ── HOT AIR BALLOON ── */}
          <symbol id="ic-balloon" viewBox="0 0 58 78" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Envelope */}
            <path d="M29 5 C16 5 6 15 6 27 C6 40 15 50 29 53 C43 50 52 40 52 27 C52 15 42 5 29 5 Z"/>
            {/* Vertical panel seams */}
            <path d="M29 5 C26 14 25 24 26 37 C27 44 28 49 29 53"/>
            <path d="M29 5 C32 14 33 24 32 37 C31 44 30 49 29 53"/>
            <path d="M29 5 C20 10 14 18 12 28 C10 38 14 46 20 51"/>
            <path d="M29 5 C38 10 44 18 46 28 C48 38 44 46 38 51"/>
            {/* Equator band */}
            <path d="M7 29 Q29 22 51 29"/>
            {/* Suspension ropes */}
            <line x1="18" y1="52" x2="15" y2="64"/>
            <line x1="40" y1="52" x2="43" y2="64"/>
            <line x1="23" y1="53" x2="21" y2="64"/>
            <line x1="35" y1="53" x2="37" y2="64"/>
            {/* Basket */}
            <rect x="14" y="64" width="30" height="11" rx="2"/>
            <line x1="14" y1="70" x2="44" y2="70"/>
          </symbol>

          {/* ── COMPASS ROSE ── */}
          <symbol id="ic-compass" viewBox="0 0 58 58" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer bezel ring */}
            <circle cx="29" cy="29" r="27"/>
            {/* Cardinal tick marks */}
            <line x1="29" y1="2" x2="29" y2="8"/>
            <line x1="29" y1="50" x2="29" y2="56"/>
            <line x1="2" y1="29" x2="8" y2="29"/>
            <line x1="50" y1="29" x2="56" y2="29"/>
            {/* Ordinal ticks */}
            <line x1="10" y1="10" x2="14" y2="14" strokeWidth="0.7"/>
            <line x1="48" y1="10" x2="44" y2="14" strokeWidth="0.7"/>
            <line x1="10" y1="48" x2="14" y2="44" strokeWidth="0.7"/>
            <line x1="48" y1="48" x2="44" y2="44" strokeWidth="0.7"/>
            {/* Inner ring */}
            <circle cx="29" cy="29" r="14"/>
            {/* N-arrow (filled) */}
            <path d="M29 15 L31.5 29 L29 24 L26.5 29 Z" fill="currentColor" opacity="0.45"/>
            {/* S-arrow */}
            <path d="M29 43 L26.5 29 L29 34 L31.5 29 Z"/>
            {/* E-arrow */}
            <path d="M43 29 L29 26.5 L34 29 L29 31.5 Z"/>
            {/* W-arrow (filled) */}
            <path d="M15 29 L29 31.5 L24 29 L29 26.5 Z" fill="currentColor" opacity="0.25"/>
            {/* Centre jewel */}
            <circle cx="29" cy="29" r="3" fill="currentColor" opacity="0.5"/>
          </symbol>

          {/* ── AIRPLANE (top-down silhouette) ── */}
          <symbol id="ic-plane" viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Fuselage */}
            <path d="M8 22 C8 22 32 18 58 20 C64 20 69 21 70 22 C69 23 64 24 58 24 C32 26 8 22 8 22 Z"/>
            {/* Main wing – swept back */}
            <path d="M26 22 L14 8 L46 19 Z"/>
            <path d="M26 22 L14 36 L46 25 Z"/>
            {/* Vertical tail */}
            <path d="M10 22 L7 13 L16 20"/>
            {/* Horizontal stabiliser */}
            <path d="M10 22 L5 17 L15 21"/>
            <path d="M10 22 L5 27 L15 23"/>
            {/* Engine pods */}
            <path d="M34 19 C32 18 30 18 30 20 C30 22 32 22 34 21" strokeWidth="0.8"/>
            <path d="M34 25 C32 24 30 24 30 26 C30 28 32 28 34 27" strokeWidth="0.8"/>
          </symbol>

          {/* ── MOUNTAIN RANGE ── */}
          <symbol id="ic-mountain" viewBox="0 0 92 62" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Left/main peak */}
            <path d="M6 60 L36 6 L66 60 Z"/>
            {/* Snow cap */}
            <path d="M26 26 L36 6 L46 26 C40 22 32 22 26 26 Z"/>
            {/* Right secondary peak */}
            <path d="M50 60 L66 24 L84 60"/>
            {/* Snow cap 2 */}
            <path d="M58 38 L66 24 L74 38 C70 36 62 36 58 38 Z"/>
            {/* Ground */}
            <line x1="2" y1="60" x2="90" y2="60"/>
          </symbol>

          {/* ── PALM TREE ── */}
          <symbol id="ic-palm" viewBox="0 0 64 82" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Trunk – gentle S-curve */}
            <path d="M32 80 C31 67 30 54 31 40 C32 30 33 22 31 14"/>
            {/* Fronds – radiating from crown */}
            <path d="M31 14 C26 10 16 14 8 10 C15 12 23 16 29 20"/>
            <path d="M31 14 C29 6 31 0 29 0 C29 4 30 12 32 18"/>
            <path d="M31 14 C37 8 46 10 52 6 C45 10 37 15 31 20"/>
            <path d="M31 14 C22 10 14 12 8 8 C15 12 25 16 31 20"/>
            <path d="M31 14 C40 12 48 16 54 12 C46 14 38 18 31 20"/>
            {/* Coconuts */}
            <circle cx="28" cy="18" r="2.5"/>
            <circle cx="34" cy="19" r="2.5"/>
            {/* Ground mound */}
            <path d="M20 80 Q32 76 44 80"/>
          </symbol>

          {/* ── VINTAGE SUITCASE ── */}
          <symbol id="ic-suitcase" viewBox="0 0 62 54" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Handle */}
            <path d="M23 14 V8 C23 6 25 4 31 4 C37 4 39 6 39 8 V14"/>
            {/* Body */}
            <rect x="4" y="14" width="54" height="36" rx="5"/>
            {/* Mid seam */}
            <line x1="4" y1="32" x2="58" y2="32"/>
            {/* Strap / divider */}
            <line x1="31" y1="14" x2="31" y2="50"/>
            {/* Corner hardware */}
            <path d="M4 22 L4 14 L13 14" strokeWidth="1.4"/>
            <path d="M58 22 L58 14 L49 14" strokeWidth="1.4"/>
            <path d="M4 42 L4 50 L13 50" strokeWidth="1.4"/>
            <path d="M58 42 L58 50 L49 50" strokeWidth="1.4"/>
            {/* Label sticker */}
            <rect x="12" y="20" width="10" height="7" rx="1" strokeWidth="0.7"/>
            {/* Wheels */}
            <circle cx="14" cy="52" r="2.5"/>
            <circle cx="48" cy="52" r="2.5"/>
          </symbol>

          {/* ── MAP PIN ── */}
          <symbol id="ic-pin" viewBox="0 0 34 50" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 2 C10 2 3 8 3 16 C3 26 17 48 17 48 C17 48 31 26 31 16 C31 8 24 2 17 2 Z"/>
            <circle cx="17" cy="16" r="5.5"/>
          </symbol>

          {/* ── GLOBE ── */}
          <symbol id="ic-globe" viewBox="0 0 58 62" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Sphere */}
            <circle cx="29" cy="28" r="26"/>
            {/* Central meridian */}
            <ellipse cx="29" cy="28" rx="11" ry="26"/>
            {/* Outer meridian arcs (faint) */}
            <ellipse cx="29" cy="28" rx="22" ry="26" strokeWidth="0.6"/>
            {/* Latitude lines */}
            <path d="M4 17 Q29 11 54 17" strokeWidth="0.8"/>
            <line x1="3" y1="28" x2="55" y2="28"/>
            <path d="M4 39 Q29 45 54 39" strokeWidth="0.8"/>
            {/* Stand */}
            <line x1="29" y1="54" x2="29" y2="59"/>
            <line x1="21" y1="59" x2="37" y2="59"/>
          </symbol>

          {/* ── SAILBOAT ── */}
          <symbol id="ic-boat" viewBox="0 0 72 66" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Mast */}
            <line x1="36" y1="5" x2="36" y2="46"/>
            {/* Main sail */}
            <path d="M36 8 L14 44 L56 44 Z"/>
            {/* Jib foresail */}
            <path d="M36 12 L58 38 L36 44"/>
            {/* Hull */}
            <path d="M10 46 Q36 55 62 46 L58 50 Q36 62 14 50 Z"/>
            {/* Water line */}
            <path d="M5 54 Q36 60 67 54"/>
            {/* Wake ripples */}
            <path d="M2 58 Q12 54 22 58 Q32 62 42 58 Q52 54 62 58 Q68 60 70 58" strokeWidth="0.7"/>
          </symbol>

          {/* ── TAJ MAHAL ── */}
          <symbol id="ic-taj" viewBox="0 0 96 72" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* — Central dome — */}
            {/* Finial */}
            <line x1="48" y1="2" x2="48" y2="8"/>
            <circle cx="48" cy="5" r="2" fill="currentColor" opacity="0.4"/>
            {/* Onion dome */}
            <path d="M48 8 C42 8 36 13 34 19 C32 25 34 31 38 35 C40 37 42 39 48 41 C54 39 56 37 58 35 C62 31 64 25 62 19 C60 13 54 8 48 8 Z"/>
            {/* Drum base of dome */}
            <line x1="32" y1="41" x2="64" y2="41"/>
            {/* Iwan (central arch) */}
            <path d="M40 66 V56 Q40 46 48 46 Q56 46 56 56 V66"/>
            {/* Main body */}
            <rect x="32" y="41" width="32" height="26"/>
            {/* — Left corner minaret — */}
            <line x1="14" y1="4" x2="14" y2="66"/>
            <path d="M14 4 C11 4 9 7 9 10 C9 13 11 16 14 17 C17 16 19 13 19 10 C19 7 17 4 14 4 Z"/>
            <line x1="9" y1="22" x2="19" y2="22"/>
            <line x1="9" y1="36" x2="19" y2="36"/>
            <line x1="9" y1="50" x2="19" y2="50"/>
            {/* — Right corner minaret — */}
            <line x1="82" y1="4" x2="82" y2="66"/>
            <path d="M82 4 C79 4 77 7 77 10 C77 13 79 16 82 17 C85 16 87 13 87 10 C87 7 85 4 82 4 Z"/>
            <line x1="77" y1="22" x2="87" y2="22"/>
            <line x1="77" y1="36" x2="87" y2="36"/>
            <line x1="77" y1="50" x2="87" y2="50"/>
            {/* Side wings */}
            <rect x="19" y="46" width="13" height="20"/>
            <rect x="64" y="46" width="13" height="20"/>
            {/* Base terrace */}
            <line x1="4" y1="66" x2="92" y2="66"/>
            <rect x="4" y="66" width="88" height="4"/>
          </symbol>

          {/* ── CAMERA ── */}
          <symbol id="ic-camera" viewBox="0 0 62 46" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Body */}
            <rect x="4" y="12" width="54" height="30" rx="5"/>
            {/* Pentagon viewfinder top */}
            <path d="M21 12 L18 4 L44 4 L41 12"/>
            {/* Lens outer ring */}
            <circle cx="31" cy="27" r="12"/>
            {/* Lens mid ring */}
            <circle cx="31" cy="27" r="7.5"/>
            {/* Lens inner */}
            <circle cx="31" cy="27" r="3.5"/>
            {/* Flash unit */}
            <rect x="7" y="16" width="9" height="6" rx="1.5"/>
            {/* Shutter button */}
            <circle cx="49" cy="14" r="3.5"/>
            {/* Strap lug left */}
            <line x1="4" y1="18" x2="4" y2="24"/>
            {/* Strap lug right */}
            <line x1="58" y1="18" x2="58" y2="24"/>
          </symbol>

          {/* ── TRAVEL MAP (folded) ── */}
          <symbol id="ic-map" viewBox="0 0 62 52" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Map fold shape */}
            <path d="M4 8 L21 4 L38 8 L55 4 V48 L38 52 L21 48 L4 52 Z"/>
            {/* Fold seams */}
            <line x1="21" y1="4" x2="21" y2="48"/>
            <line x1="38" y1="8" x2="38" y2="52"/>
            {/* Dotted route */}
            <path d="M10 40 Q17 26 29 22 Q40 18 47 26" strokeDasharray="2.5 2" strokeWidth="0.9"/>
            {/* Start point */}
            <circle cx="10" cy="40" r="2.5" fill="currentColor" opacity="0.5"/>
            {/* Destination pin */}
            <path d="M47 26 C45 26 43 24 43 22 C43 18 47 12 47 12 C47 12 51 18 51 22 C51 24 49 26 47 26 Z" strokeWidth="0.9"/>
          </symbol>

          {/* ── 4-POINTED STAR SPARKLE ── */}
          <symbol id="ic-spark" viewBox="0 0 22 22" fill="currentColor">
            <path d="M11 1 L12.6 9.4 L21 11 L12.6 12.6 L11 21 L9.4 12.6 L1 11 L9.4 9.4 Z" opacity="0.7"/>
          </symbol>

          {/* ── SMALL DOT ── */}
          <symbol id="ic-dot" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="2.5" fill="currentColor" opacity="0.55"/>
          </symbol>

        </defs>

        {/* ════════════════════════════════════════════
            PRIMARY CLUSTERS
            ════════════════════════════════════════════ */}

        {/* ── C1: Top-left — Eiffel + plane ── */}
        <use href="#ic-eiffel"  x="52"   y="24"  width="56"  height="90"/>
        <use href="#ic-plane"   x="130"  y="42"  width="56"  height="34" transform="rotate(-18 158 59)"/>
        <use href="#ic-spark"   x="132"  y="14"  width="20"  height="20"/>
        <use href="#ic-dot"     x="178"  y="76"  width="8"   height="8"/>
        <use href="#ic-dot"     x="108"  y="118" width="7"   height="7"/>

        {/* ── C2: Top-right — Big Ben + balloon ── */}
        <use href="#ic-bigben"  x="1088" y="10"  width="44"  height="86"/>
        <use href="#ic-balloon" x="1018" y="14"  width="56"  height="78"/>
        <use href="#ic-spark"   x="1080" y="4"   width="18"  height="18"/>
        <use href="#ic-dot"     x="1148" y="90"  width="8"   height="8"/>
        <use href="#ic-dot"     x="1022" y="96"  width="7"   height="7"/>

        {/* ── C3: Upper-center — Globe + compass ── */}
        <use href="#ic-globe"   x="566"  y="14"  width="62"  height="66"/>
        <use href="#ic-compass" x="648"  y="22"  width="58"  height="58"/>
        <use href="#ic-pin"     x="534"  y="24"  width="30"  height="44"/>
        <use href="#ic-spark"   x="616"  y="6"   width="16"  height="16"/>
        <use href="#ic-dot"     x="526"  y="78"  width="7"   height="7"/>

        {/* ── C4: Left-middle — Mountain + map + palm ── */}
        <use href="#ic-mountain" x="30"  y="250" width="88"  height="60"/>
        <use href="#ic-map"      x="136" y="256" width="62"  height="52"/>
        <use href="#ic-palm"     x="214" y="242" width="52"  height="86"/>
        <use href="#ic-spark"    x="22"  y="240" width="16"  height="16"/>
        <use href="#ic-dot"      x="186" y="318" width="7"   height="7"/>

        {/* ── C5: Right-middle — Taj Mahal + palm ── */}
        <use href="#ic-taj"  x="1128" y="238" width="100" height="76"/>
        <use href="#ic-palm" x="1248" y="252" width="48"  height="64"/>
        <use href="#ic-spark" x="1122" y="230" width="16" height="16"/>
        <use href="#ic-dot"  x="1304" y="322" width="7"   height="7"/>

        {/* ── C6: Center — plane + compass + pin ── */}
        <use href="#ic-plane"   x="534"  y="354" width="68"  height="42" transform="rotate(22 568 375)"/>
        <use href="#ic-compass" x="636"  y="340" width="60"  height="60"/>
        <use href="#ic-pin"     x="498"  y="348" width="30"  height="44"/>
        <use href="#ic-spark"   x="592"  y="336" width="14"  height="14"/>
        <use href="#ic-dot"     x="502"  y="400" width="8"   height="8"/>

        {/* ── C7: Bottom-left — Suitcase + camera + map ── */}
        <use href="#ic-suitcase" x="56"  y="554" width="62"  height="58"/>
        <use href="#ic-camera"   x="140" y="544" width="62"  height="46"/>
        <use href="#ic-map"      x="62"  y="624" width="58"  height="48"/>
        <use href="#ic-spark"    x="42"  y="546" width="16"  height="16"/>
        <use href="#ic-dot"      x="204" y="598" width="7"   height="7"/>

        {/* ── C8: Bottom-center — Sailboat + globe ── */}
        <use href="#ic-boat"   x="560"  y="638" width="76"  height="68"/>
        <use href="#ic-globe"  x="654"  y="634" width="60"  height="64"/>
        <use href="#ic-pin"    x="528"  y="645" width="26"  height="38"/>
        <use href="#ic-spark"  x="552"  y="630" width="14"  height="14"/>
        <use href="#ic-dot"    x="720"  y="700" width="7"   height="7"/>

        {/* ── C9: Bottom-right — Balloon + Taj ── */}
        <use href="#ic-balloon" x="1074" y="570" width="58"  height="80"/>
        <use href="#ic-taj"     x="1152" y="604" width="80"  height="60"/>
        <use href="#ic-spark"   x="1142" y="562" width="16"  height="16"/>
        <use href="#ic-dot"     x="1244" y="668" width="7"   height="7"/>


        {/* ════════════════════════════════════════════
            SECONDARY / SCATTERED ELEMENTS  (slightly reduced opacity)
            ════════════════════════════════════════════ */}

        {/* Upper-mid-left: small Eiffel + plane */}
        <use href="#ic-eiffel"  x="310"  y="60"  width="42"  height="68"  opacity="0.72"/>
        <use href="#ic-plane"   x="374"  y="38"  width="46"  height="28"  transform="rotate(10 397 52)"  opacity="0.68"/>

        {/* Upper-mid-right: Big Ben + compass */}
        <use href="#ic-bigben"  x="846"  y="30"  width="36"  height="72"  opacity="0.7"/>
        <use href="#ic-compass" x="800"  y="46"  width="44"  height="44"  opacity="0.65"/>

        {/* Mid-left: pin + map */}
        <use href="#ic-pin"     x="276"  y="390" width="28"  height="42"  opacity="0.68"/>
        <use href="#ic-map"     x="236"  y="444" width="54"  height="44"  opacity="0.62"/>

        {/* Mid-right: mountain + boat */}
        <use href="#ic-mountain" x="990" y="352" width="76"  height="52"  opacity="0.68"/>
        <use href="#ic-boat"    x="1080" y="344" width="66"  height="60"  opacity="0.62"/>

        {/* Center-left: balloon */}
        <use href="#ic-balloon" x="428"  y="448" width="44"  height="62"  opacity="0.65"/>

        {/* Center-right: Eiffel */}
        <use href="#ic-eiffel"  x="806"  y="422" width="46"  height="74"  opacity="0.65"/>

        {/* More planes */}
        <use href="#ic-plane"   x="202"  y="158" width="42"  height="26"  transform="rotate(-28 223 171)" opacity="0.6"/>
        <use href="#ic-plane"   x="930"  y="228" width="46"  height="28"  transform="rotate(16 953 242)" opacity="0.6"/>

        {/* Globe scattered */}
        <use href="#ic-globe"   x="172"  y="618" width="48"  height="52"  opacity="0.62"/>

        {/* Mountain top-center */}
        <use href="#ic-mountain" x="684" y="110" width="66"  height="44"  opacity="0.62"/>

        {/* Camera bottom-center-left */}
        <use href="#ic-camera"  x="348"  y="698" width="56"  height="44"  opacity="0.65"/>

        {/* Suitcase right */}
        <use href="#ic-suitcase" x="1262" y="596" width="56" height="50"  opacity="0.65"/>

        {/* Additional pins */}
        <use href="#ic-pin"     x="404"  y="212" width="26"  height="38"  opacity="0.6"/>
        <use href="#ic-pin"     x="762"  y="286" width="24"  height="35"  opacity="0.55"/>

        {/* Palm scattered */}
        <use href="#ic-palm"    x="1318" y="118" width="44"  height="58"  opacity="0.6"/>

        {/* Map scattered */}
        <use href="#ic-map"     x="878"  y="618" width="54"  height="44"  opacity="0.62"/>

        {/* ── SPARKLES scattered ── */}
        <use href="#ic-spark"   x="436"  y="142" width="18"  height="18"  opacity="0.48"/>
        <use href="#ic-spark"   x="736"  y="180" width="16"  height="16"  opacity="0.44"/>
        <use href="#ic-spark"   x="930"  y="126" width="14"  height="14"  opacity="0.40"/>
        <use href="#ic-spark"   x="332"  y="574" width="14"  height="14"  opacity="0.44"/>
        <use href="#ic-spark"   x="782"  y="522" width="18"  height="18"  opacity="0.48"/>
        <use href="#ic-spark"   x="434"  y="698" width="14"  height="14"  opacity="0.40"/>
        <use href="#ic-spark"   x="684"  y="452" width="14"  height="14"  opacity="0.44"/>
        <use href="#ic-spark"   x="1272" y="430" width="16"  height="16"  opacity="0.44"/>
        <use href="#ic-spark"   x="116"  y="444" width="13"  height="13"  opacity="0.38"/>
        <use href="#ic-spark"   x="484"  y="524" width="13"  height="13"  opacity="0.38"/>
        <use href="#ic-spark"   x="854"  y="304" width="14"  height="14"  opacity="0.42"/>
        <use href="#ic-spark"   x="1166" y="460" width="14"  height="14"  opacity="0.40"/>

        {/* ── DOTS scattered ── */}
        <use href="#ic-dot"     x="492"  y="144" width="8"   height="8"   opacity="0.5"/>
        <use href="#ic-dot"     x="748"  y="122" width="7"   height="7"   opacity="0.45"/>
        <use href="#ic-dot"     x="952"  y="280" width="8"   height="8"   opacity="0.48"/>
        <use href="#ic-dot"     x="362"  y="324" width="7"   height="7"   opacity="0.44"/>
        <use href="#ic-dot"     x="640"  y="560" width="8"   height="8"   opacity="0.50"/>
        <use href="#ic-dot"     x="912"  y="604" width="7"   height="7"   opacity="0.44"/>
        <use href="#ic-dot"     x="266"  y="704" width="7"   height="7"   opacity="0.40"/>
        <use href="#ic-dot"     x="824"  y="748" width="8"   height="8"   opacity="0.42"/>
        <use href="#ic-dot"     x="456"  y="356" width="7"   height="7"   opacity="0.42"/>
        <use href="#ic-dot"     x="1056" y="208" width="7"   height="7"   opacity="0.40"/>

      </svg>
    </div>
  )
}
