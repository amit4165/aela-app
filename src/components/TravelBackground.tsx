export default function TravelBackground() {
  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <svg
        width="100%" height="100%"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#00C896', opacity: 0.13 }}
      >
        <defs>

          {/* ── Eiffel Tower 30×50 ── */}
          <symbol id="s-eiffel" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="15" y1="1" x2="15" y2="5"/>
            <path d="M13 5L17 5L18 11L12 11Z"/>
            <line x1="11" y1="11" x2="19" y2="11"/>
            <line x1="13" y1="8" x2="17" y2="8"/>
            <path d="M10 11L20 11L22 22L8 22Z"/>
            <line x1="7" y1="22" x2="23" y2="22"/>
            <line x1="12" y1="17" x2="18" y2="17"/>
            <path d="M8 22L3 38M22 22L27 38"/>
            <path d="M11 22L9 38M19 22L21 38"/>
            <path d="M9 38C9 32 12 30 15 29C18 30 21 32 21 38"/>
            <line x1="1" y1="38" x2="29" y2="38"/>
          </symbol>

          {/* ── Big Ben 22×52 ── */}
          <symbol id="s-bigben" viewBox="0 0 22 52" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 1L9 7L13 7Z"/>
            <rect x="7" y="7" width="8" height="4"/>
            <rect x="5" y="11" width="12" height="12"/>
            <circle cx="11" cy="17" r="4.5"/>
            <line x1="11" y1="12.5" x2="11" y2="17" strokeWidth="1"/>
            <line x1="11" y1="17" x2="14" y2="15" strokeWidth="1"/>
            <rect x="4" y="23" width="14" height="28"/>
            <line x1="4" y1="33" x2="18" y2="33"/>
            <line x1="4" y1="42" x2="18" y2="42"/>
            <line x1="1" y1="33" x2="4" y2="33"/>
            <line x1="21" y1="33" x2="18" y2="33"/>
            <line x1="4" y1="51" x2="18" y2="51"/>
          </symbol>

          {/* ── Hot Air Balloon 28×44 ── */}
          <symbol id="s-balloon" viewBox="0 0 28 44" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3C7 3 2 9 2 16C2 24 7 30 14 31C21 30 26 24 26 16C26 9 21 3 14 3Z"/>
            <path d="M14 3C11 10 11 18 12 24C13 28 14 31 14 31"/>
            <path d="M14 3C17 10 17 18 16 24C15 28 14 31 14 31"/>
            <path d="M14 3C7 7 3 12 2 18"/>
            <path d="M14 3C21 7 25 12 26 18"/>
            <path d="M2 17Q14 13 26 17"/>
            <line x1="9" y1="31" x2="7" y2="37"/>
            <line x1="19" y1="31" x2="21" y2="37"/>
            <rect x="6" y="37" width="16" height="7" rx="1.5"/>
            <line x1="6" y1="41" x2="22" y2="41"/>
          </symbol>

          {/* ── Compass 30×30 ── */}
          <symbol id="s-compass" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15" cy="15" r="13"/>
            <circle cx="15" cy="15" r="7"/>
            <path d="M15 4L16.3 15L15 10.5L13.7 15Z" fill="currentColor" opacity="0.5"/>
            <path d="M15 26L13.7 15L15 19.5L16.3 15Z"/>
            <line x1="15" y1="2" x2="15" y2="5"/>
            <line x1="15" y1="25" x2="15" y2="28"/>
            <line x1="2" y1="15" x2="5" y2="15"/>
            <line x1="25" y1="15" x2="28" y2="15"/>
            <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.5"/>
          </symbol>

          {/* ── Airplane 42×22 ── */}
          <symbol id="s-plane" viewBox="0 0 42 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11C4 11 20 8 33 9.5C37 10 40 10.5 41 11C40 11.5 37 12 33 12.5C20 14 4 11 4 11Z"/>
            <path d="M15 11L8 3L27 9.5Z"/>
            <path d="M15 11L8 19L27 12.5Z"/>
            <path d="M6 11L4 7L10 10"/>
            <path d="M6 11L4 15L10 12"/>
          </symbol>

          {/* ── Mountain 48×28 ── */}
          <symbol id="s-mountain" viewBox="0 0 48 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 26L18 3L34 26Z"/>
            <path d="M12 13L18 3L24 13C21 11 15 11 12 13Z"/>
            <path d="M28 26L37 11L46 26"/>
            <path d="M32 17L37 11L42 17C40 16 34 16 32 17Z"/>
            <line x1="0" y1="26" x2="48" y2="26"/>
          </symbol>

          {/* ── Camera 38×24 ── */}
          <symbol id="s-camera" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="34" height="17" rx="3"/>
            <path d="M13 6L11 1L27 1L25 6"/>
            <circle cx="19" cy="14.5" r="6.5"/>
            <circle cx="19" cy="14.5" r="3.5"/>
            <circle cx="29" cy="9" r="2.5"/>
            <rect x="4" y="9" width="5" height="4" rx="1" strokeWidth="0.6"/>
          </symbol>

          {/* ── Map Pin 18×26 ── */}
          <symbol id="s-pin" viewBox="0 0 18 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 1C5 1 1 5 1 9C1 16 9 25 9 25C9 25 17 16 17 9C17 5 13 1 9 1Z"/>
            <circle cx="9" cy="9" r="3.5"/>
          </symbol>

          {/* ── Globe 30×34 ── */}
          <symbol id="s-globe" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15" cy="14" r="13"/>
            <ellipse cx="15" cy="14" rx="6" ry="13"/>
            <path d="M2 9Q15 5 28 9" strokeWidth="0.6"/>
            <line x1="2" y1="14" x2="28" y2="14" strokeWidth="0.7"/>
            <path d="M2 19Q15 23 28 19" strokeWidth="0.6"/>
            <line x1="15" y1="27" x2="15" y2="31"/>
            <line x1="9" y1="31" x2="21" y2="31"/>
          </symbol>

          {/* ── Taj Mahal 56×42 ── */}
          <symbol id="s-taj" viewBox="0 0 56 42" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="28" y1="1" x2="28" y2="4"/>
            <path d="M28 4C23 4 19 7 18 11C17 15 19 19 22 21C24 22 26 23 28 24C30 23 32 22 34 21C37 19 39 15 38 11C37 7 33 4 28 4Z"/>
            <line x1="16" y1="24" x2="40" y2="24"/>
            <rect x="18" y="24" width="20" height="17"/>
            <path d="M21 41V34Q21 28 28 28Q35 28 35 34V41"/>
            <line x1="8" y1="2" x2="8" y2="41"/>
            <path d="M8 2C6 2 5 4 5 6C5 8 6 9 8 10C10 9 11 8 11 6C11 4 10 2 8 2Z"/>
            <line x1="5" y1="16" x2="11" y2="16"/>
            <line x1="5" y1="28" x2="11" y2="28"/>
            <line x1="48" y1="2" x2="48" y2="41"/>
            <path d="M48 2C46 2 45 4 45 6C45 8 46 9 48 10C50 9 51 8 51 6C51 4 50 2 48 2Z"/>
            <line x1="45" y1="16" x2="51" y2="16"/>
            <line x1="45" y1="28" x2="51" y2="28"/>
            <rect x="11" y="30" width="7" height="11"/>
            <rect x="38" y="30" width="7" height="11"/>
            <line x1="2" y1="41" x2="54" y2="41"/>
          </symbol>

          {/* ── Colosseum 52×30 ── */}
          <symbol id="s-colosseum" viewBox="0 0 52 30" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 28L4 18Q4 6 26 6Q48 6 48 18L48 28"/>
            <line x1="2" y1="28" x2="50" y2="28"/>
            <line x1="4" y1="22" x2="48" y2="22"/>
            <line x1="6" y1="15" x2="46" y2="15"/>
            <line x1="12" y1="28" x2="12" y2="22" strokeWidth="0.6"/>
            <line x1="20" y1="28" x2="20" y2="22" strokeWidth="0.6"/>
            <line x1="28" y1="28" x2="28" y2="22" strokeWidth="0.6"/>
            <line x1="36" y1="28" x2="36" y2="22" strokeWidth="0.6"/>
            <line x1="44" y1="28" x2="44" y2="22" strokeWidth="0.6"/>
            <line x1="14" y1="22" x2="14" y2="15" strokeWidth="0.6"/>
            <line x1="22" y1="22" x2="22" y2="15" strokeWidth="0.6"/>
            <line x1="30" y1="22" x2="30" y2="15" strokeWidth="0.6"/>
            <line x1="38" y1="22" x2="38" y2="15" strokeWidth="0.6"/>
          </symbol>

          {/* ── Sydney Opera House 50×28 ── */}
          <symbol id="s-sydney" viewBox="0 0 50 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="26" x2="48" y2="26"/>
            <rect x="2" y="26" width="46" height="2" strokeWidth="0.6"/>
            <path d="M20 26C16 20 12 13 18 5C23 13 25 20 25 26"/>
            <path d="M25 26C27 20 31 13 36 5C41 13 43 21 39 26"/>
            <path d="M39 26C40 22 41 18 42 14C44 18 44 22 43 26"/>
            <path d="M13 26C12 22 11 18 11 14C9 18 9 22 10 26"/>
          </symbol>

          {/* ── Leaning Tower of Pisa 20×44 ── */}
          <symbol id="s-pisa" viewBox="0 0 20 44" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="10" cy="41" rx="8" ry="2.5"/>
            <path d="M3 41L5 7"/>
            <path d="M17 41L15 7"/>
            <ellipse cx="10" cy="7" rx="6" ry="2"/>
            <line x1="4" y1="14" x2="16" y2="14"/>
            <line x1="4" y1="21" x2="16" y2="21"/>
            <line x1="4" y1="28" x2="16" y2="28"/>
            <line x1="4" y1="35" x2="16" y2="35"/>
            <path d="M6 7L5 2L15 2L14 7"/>
            <line x1="5" y1="4" x2="15" y2="4"/>
          </symbol>

          {/* ── Sailboat 38×36 ── */}
          <symbol id="s-boat" viewBox="0 0 38 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="3" x2="19" y2="24"/>
            <path d="M19 5L5 22L33 22Z"/>
            <path d="M19 8L33 20L19 24"/>
            <path d="M5 24Q19 30 33 24L31 27Q19 34 7 27Z"/>
            <path d="M2 29Q19 35 36 29" strokeWidth="0.6"/>
          </symbol>

          {/* ── Palm Tree 22×42 ── */}
          <symbol id="s-palm" viewBox="0 0 22 42" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 42C11 33 10 25 11 17C12 11 13 7 12 3"/>
            <path d="M12 3C8 1 3 3 1 0C5 2 9 5 11 9"/>
            <path d="M12 3C12 0 14 0 14 0C13 3 13 7 12 9"/>
            <path d="M12 3C16 1 20 3 21 0C18 2 14 5 12 9"/>
            <path d="M12 3C7 2 3 4 1 2C5 4 10 6 12 9"/>
            <circle cx="10" cy="7" r="1.5"/>
            <circle cx="13" cy="8" r="1.5"/>
          </symbol>

          {/* ── Sparkle 14×14 ── */}
          <symbol id="s-spark" viewBox="0 0 14 14">
            <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7Z" fill="currentColor" opacity="0.65"/>
          </symbol>

        </defs>

        {/* ── Sketchy flight-route arcs ── */}
        <g fill="none" stroke="currentColor" strokeWidth="0.55" strokeDasharray="4 9" opacity="0.4">
          <path d="M 55 95 Q 310 -30 610 115"/>
          <path d="M 190 310 Q 520 160 870 290"/>
          <path d="M 40 530 Q 390 390 760 545"/>
          <path d="M 480 720 Q 780 600 1150 690"/>
          <path d="M 130 840 Q 560 740 1020 860"/>
          <path d="M 720 80 Q 960 200 1180 140"/>
          <path d="M 300 460 Q 560 380 820 470"/>
        </g>

        {/* ════════════════════════════════════════════
            CLUSTER A — top-left  (Paris doodle corner)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-20, 62, 62)"><use href="#s-eiffel"  x="47"  y="37"  width="30" height="50"/></g>
        <g transform="rotate(13,  104, 55)"><use href="#s-balloon" x="90"  y="37"  width="28" height="36"/></g>
        <text transform="rotate(-7, 76, 100)" x="60" y="104" fontFamily="Georgia,serif" fontSize="9" letterSpacing="2.5" fill="currentColor">PARIS</text>
        <g transform="rotate(28,  136, 28)"><use href="#s-spark"   x="130" y="22"  width="12" height="12"/></g>
        <g transform="rotate(-35, 32,  130)"><use href="#s-pin"    x="23"  y="117" width="18" height="26"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER B — top band, scattered eastward
            ════════════════════════════════════════════ */}
        <g transform="rotate(26,  235, 50)"><use href="#s-plane"   x="214" y="39"  width="42" height="22"/></g>
        <g transform="rotate(-32, 320, 74)"><use href="#s-compass" x="305" y="59"  width="30" height="30"/></g>
        <g transform="rotate(19,  378, 36)"><use href="#s-pin"     x="369" y="23"  width="18" height="26"/></g>
        <g transform="rotate(-14, 366, 80)"><use href="#s-spark"   x="360" y="74"  width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER C — top center  (London cluster)
            ════════════════════════════════════════════ */}
        <g transform="rotate(9,   464, 40)"><use href="#s-bigben"  x="453" y="14"  width="22" height="52"/></g>
        <g transform="rotate(-24, 518, 62)"><use href="#s-camera"  x="499" y="50"  width="38" height="24"/></g>
        <text transform="rotate(5, 488, 97)" x="458" y="101" fontFamily="Georgia,serif" fontSize="8.5" letterSpacing="2" fill="currentColor">LONDON</text>
        <g transform="rotate(16,  445, 78)"><use href="#s-spark"   x="439" y="72"  width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER D — top right  (mountain + Tokyo)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-13, 660, 44)"><use href="#s-mountain" x="636" y="30" width="48" height="28"/></g>
        <g transform="rotate(22,  728, 36)"><use href="#s-sydney"   x="703" y="23" width="50" height="26"/></g>
        <text transform="rotate(-9, 764, 72)" x="750" y="76" fontFamily="Georgia,serif" fontSize="8" letterSpacing="2" fill="currentColor">TOKYO</text>
        <g transform="rotate(-6,  822, 32)"><use href="#s-spark"    x="816" y="26" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER E — far top-right
            ════════════════════════════════════════════ */}
        <g transform="rotate(30,  898, 47)"><use href="#s-taj"     x="870" y="26"  width="56" height="42"/></g>
        <g transform="rotate(-19, 976, 40)"><use href="#s-pisa"    x="966" y="18"  width="20" height="44"/></g>
        <g transform="rotate(14, 1030, 52)"><use href="#s-boat"    x="1011" y="34" width="38" height="36"/></g>
        <g transform="rotate(-9, 1088, 26)"><use href="#s-spark"   x="1082" y="20" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER F — upper-right edge
            ════════════════════════════════════════════ */}
        <g transform="rotate(-17, 1162, 46)"><use href="#s-bigben"  x="1151" y="20" width="22" height="52"/></g>
        <g transform="rotate(21,  1212, 48)"><use href="#s-balloon" x="1198" y="30" width="28" height="36"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER G — left side, mid-upper  (Istanbul)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-11, 55, 220)"><use href="#s-colosseum" x="29"  y="205" width="52" height="30"/></g>
        <g transform="rotate(21,  106, 196)"><use href="#s-palm"     x="95"  y="175" width="22" height="42"/></g>
        <text transform="rotate(-5, 46, 255)" x="26" y="259" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">ISTANBUL</text>
        <g transform="rotate(-26, 64, 294)"><use href="#s-globe"     x="49"  y="277" width="30" height="34"/></g>
        <g transform="rotate(18,  130, 244)"><use href="#s-spark"    x="124" y="238" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER H — centre-left mid
            ════════════════════════════════════════════ */}
        <g transform="rotate(33,  252, 207)"><use href="#s-eiffel"  x="237" y="182"  width="30" height="50"/></g>
        <g transform="rotate(-20, 318, 224)"><use href="#s-camera"  x="299" y="212"  width="38" height="24"/></g>
        <g transform="rotate(14,  374, 202)"><use href="#s-spark"   x="368" y="196"  width="12" height="12"/></g>
        <g transform="rotate(-30, 404, 238)"><use href="#s-pin"     x="395" y="225"  width="18" height="26"/></g>
        <text transform="rotate(16, 362, 272)" x="340" y="276" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">BALI</text>

        {/* ════════════════════════════════════════════
            CLUSTER I — centre mid  (Venice)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-7,  504, 210)"><use href="#s-taj"      x="476" y="189" width="56" height="42"/></g>
        <g transform="rotate(24,  570, 220)"><use href="#s-mountain" x="546" y="206" width="48" height="28"/></g>
        <g transform="rotate(-18, 638, 206)"><use href="#s-boat"     x="619" y="188" width="38" height="36"/></g>
        <text transform="rotate(9, 622, 244)" x="604" y="248" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">VENICE</text>
        <g transform="rotate(-10, 664, 188)"><use href="#s-spark"    x="658" y="182" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER J — centre-right mid
            ════════════════════════════════════════════ */}
        <g transform="rotate(-15, 744, 198)"><use href="#s-sydney"  x="719" y="184" width="50" height="28"/></g>
        <g transform="rotate(20,  824, 188)"><use href="#s-plane"   x="803" y="177" width="42" height="22"/></g>
        <g transform="rotate(-22, 884, 202)"><use href="#s-palm"    x="873" y="181" width="22" height="42"/></g>
        <g transform="rotate(14,  934, 186)"><use href="#s-spark"   x="928" y="180" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER K — right mid  (NYC)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-19, 1022, 192)"><use href="#s-globe"     x="1007" y="175" width="30" height="34"/></g>
        <g transform="rotate(26,  1102, 200)"><use href="#s-colosseum" x="1076" y="185" width="52" height="30"/></g>
        <text transform="rotate(-11, 1094, 234)" x="1084" y="238" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">NYC</text>
        <g transform="rotate(-9,  1190, 184)"><use href="#s-pisa"      x="1180" y="162" width="20" height="44"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER L — left lower band
            ════════════════════════════════════════════ */}
        <g transform="rotate(17,  60, 374)"><use href="#s-bigben"  x="49"  y="348" width="22" height="52"/></g>
        <g transform="rotate(-24, 112, 386)"><use href="#s-taj"    x="84"  y="365" width="56" height="42"/></g>
        <g transform="rotate(30,  158, 378)"><use href="#s-spark"  x="152" y="372" width="12" height="12"/></g>
        <text transform="rotate(22, 56, 418)" x="42" y="422" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">DUBAI</text>

        {/* ════════════════════════════════════════════
            CLUSTER M — centre-left lower
            ════════════════════════════════════════════ */}
        <g transform="rotate(-11, 248, 376)"><use href="#s-boat"    x="229" y="358" width="38" height="36"/></g>
        <g transform="rotate(-7,  302, 370)"><use href="#s-pisa"    x="292" y="348" width="20" height="44"/></g>
        <g transform="rotate(30,  342, 385)"><use href="#s-camera"  x="323" y="373" width="38" height="24"/></g>
        <g transform="rotate(-34, 390, 372)"><use href="#s-compass" x="375" y="357" width="30" height="30"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER N — centre lower  (Nepal)
            ════════════════════════════════════════════ */}
        <g transform="rotate(21,  482, 368)"><use href="#s-mountain" x="458" y="354" width="48" height="28"/></g>
        <g transform="rotate(-17, 552, 362)"><use href="#s-eiffel"   x="537" y="337" width="30" height="50"/></g>
        <g transform="rotate(15,  590, 380)"><use href="#s-pin"      x="581" y="367" width="18" height="26"/></g>
        <g transform="rotate(-26, 626, 357)"><use href="#s-balloon"  x="612" y="339" width="28" height="36"/></g>
        <text transform="rotate(-9, 572, 406)" x="552" y="410" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">NEPAL</text>
        <g transform="rotate(0,   660, 360)"><use href="#s-spark"    x="654" y="354" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER O — centre-right lower  (Maldives)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-24, 720, 372)"><use href="#s-globe"  x="705" y="355" width="30" height="34"/></g>
        <g transform="rotate(11,  778, 364)"><use href="#s-palm"   x="767" y="343" width="22" height="42"/></g>
        <g transform="rotate(-26, 836, 376)"><use href="#s-camera" x="817" y="364" width="38" height="24"/></g>
        <g transform="rotate(0,   870, 360)"><use href="#s-spark"  x="864" y="354" width="12" height="12"/></g>
        <text transform="rotate(-14, 880, 398)" x="856" y="402" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">MALDIVES</text>

        {/* ════════════════════════════════════════════
            CLUSTER P — right lower
            ════════════════════════════════════════════ */}
        <g transform="rotate(15,  980, 368)"><use href="#s-taj"     x="952" y="347" width="56" height="42"/></g>
        <g transform="rotate(-21, 1048, 375)"><use href="#s-bigben" x="1037" y="349" width="22" height="52"/></g>
        <g transform="rotate(26, 1116, 362)"><use href="#s-sydney"  x="1091" y="348" width="50" height="28"/></g>
        <g transform="rotate(-11, 1180, 356)"><use href="#s-pisa"   x="1170" y="334" width="20" height="44"/></g>
        <g transform="rotate(0,  1196, 370)"><use href="#s-spark"   x="1190" y="364" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER Q — bottom-left
            ════════════════════════════════════════════ */}
        <g transform="rotate(-16, 72, 496)"><use href="#s-colosseum" x="46"  y="481" width="52" height="30"/></g>
        <g transform="rotate(24,  142, 478)"><use href="#s-balloon"  x="128" y="460" width="28" height="36"/></g>
        <text transform="rotate(-11, 192, 510)" x="172" y="514" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">ROME</text>
        <g transform="rotate(18,  44,  548)"><use href="#s-spark"    x="38"  y="542" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER R — bottom centre-left
            ════════════════════════════════════════════ */}
        <g transform="rotate(-9,  304, 492)"><use href="#s-plane"    x="283" y="481" width="42" height="22"/></g>
        <g transform="rotate(28,  358, 480)"><use href="#s-pin"      x="349" y="467" width="18" height="26"/></g>
        <g transform="rotate(17,  414, 486)"><use href="#s-mountain" x="390" y="472" width="48" height="28"/></g>
        <g transform="rotate(-30, 468, 488)"><use href="#s-camera"   x="449" y="476" width="38" height="24"/></g>
        <g transform="rotate(0,   504, 476)"><use href="#s-spark"    x="498" y="470" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER S — bottom centre  (Santorini)
            ════════════════════════════════════════════ */}
        <g transform="rotate(34,  576, 490)"><use href="#s-eiffel"  x="561" y="465" width="30" height="50"/></g>
        <g transform="rotate(-15, 628, 483)"><use href="#s-globe"   x="613" y="466" width="30" height="34"/></g>
        <g transform="rotate(22,  686, 489)"><use href="#s-compass" x="671" y="474" width="30" height="30"/></g>
        <text transform="rotate(-18, 726, 506)" x="702" y="510" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">SANTORINI</text>

        {/* ════════════════════════════════════════════
            CLUSTER T — bottom right
            ════════════════════════════════════════════ */}
        <g transform="rotate(-9,  880, 486)"><use href="#s-palm"    x="869" y="465" width="22" height="42"/></g>
        <g transform="rotate(17,  944, 492)"><use href="#s-boat"    x="925" y="474" width="38" height="36"/></g>
        <g transform="rotate(-26, 1014, 485)"><use href="#s-taj"    x="986" y="464" width="56" height="42"/></g>
        <g transform="rotate(9,   1094, 484)"><use href="#s-pisa"   x="1084" y="462" width="20" height="44"/></g>
        <g transform="rotate(-17, 1154, 492)"><use href="#s-bigben" x="1143" y="466" width="22" height="52"/></g>
        <g transform="rotate(0,   1188, 478)"><use href="#s-spark"  x="1182" y="472" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER U — very bottom strip
            ════════════════════════════════════════════ */}
        <g transform="rotate(20,  122, 614)"><use href="#s-mountain" x="98"  y="600" width="48" height="28"/></g>
        <g transform="rotate(-22, 262, 622)"><use href="#s-plane"    x="241" y="611" width="42" height="22"/></g>
        <text transform="rotate(11, 340, 644)" x="318" y="648" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">SYDNEY</text>
        <g transform="rotate(-13, 434, 612)"><use href="#s-compass"  x="419" y="597" width="30" height="30"/></g>
        <g transform="rotate(30,  554, 622)"><use href="#s-palm"     x="543" y="601" width="22" height="42"/></g>
        <g transform="rotate(-19, 684, 616)"><use href="#s-camera"   x="665" y="604" width="38" height="24"/></g>
        <g transform="rotate(15,  794, 622)"><use href="#s-globe"    x="779" y="605" width="30" height="34"/></g>
        <g transform="rotate(-27, 904, 612)"><use href="#s-balloon"  x="890" y="594" width="28" height="36"/></g>
        <text transform="rotate(-7, 978, 636)" x="958" y="640" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">NEPAL</text>
        <g transform="rotate(22, 1074, 622)"><use href="#s-colosseum" x="1048" y="607" width="52" height="30"/></g>
        <g transform="rotate(-16, 1198, 614)"><use href="#s-spark"    x="1192" y="608" width="12" height="12"/></g>

        {/* ════════════════════════════════════════════
            CLUSTER V — deep bottom  (extra density)
            ════════════════════════════════════════════ */}
        <g transform="rotate(-14, 76,  760)"><use href="#s-taj"     x="48"  y="739" width="56" height="42"/></g>
        <g transform="rotate(25,  188, 772)"><use href="#s-boat"    x="169" y="754" width="38" height="36"/></g>
        <g transform="rotate(-8,  310, 758)"><use href="#s-sydney"  x="285" y="744" width="50" height="28"/></g>
        <g transform="rotate(18,  430, 768)"><use href="#s-balloon" x="416" y="750" width="28" height="36"/></g>
        <text transform="rotate(-12, 510, 790)" x="490" y="794" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">BALI</text>
        <g transform="rotate(30,  610, 762)"><use href="#s-eiffel"  x="595" y="737" width="30" height="50"/></g>
        <g transform="rotate(-20, 706, 774)"><use href="#s-compass" x="691" y="759" width="30" height="30"/></g>
        <g transform="rotate(12,  820, 760)"><use href="#s-pisa"    x="810" y="738" width="20" height="44"/></g>
        <g transform="rotate(-18, 940, 768)"><use href="#s-mountain" x="916" y="754" width="48" height="28"/></g>
        <text transform="rotate(10, 1020, 788)" x="1002" y="792" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">VENICE</text>
        <g transform="rotate(-26, 1120, 762)"><use href="#s-globe"  x="1105" y="745" width="30" height="34"/></g>
        <g transform="rotate(14,  1200, 770)"><use href="#s-spark"  x="1194" y="764" width="12" height="12"/></g>

      </svg>
    </div>
  )
}
