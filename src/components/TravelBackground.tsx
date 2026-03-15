export default function TravelBackground() {
  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ color: '#00C896', opacity: 0.13 }}>
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

          {/* ════════════════════════════
              THE TILE  (360 × 350)
              ════════════════════════════ */}
          <pattern id="travel-tile" x="0" y="0" width="360" height="350" patternUnits="userSpaceOnUse">

            {/* ── ROW 1  y=2 ── */}
            <use href="#s-eiffel"   x="4"   y="2"  width="30" height="50"/>
            <use href="#s-balloon"  x="42"  y="4"  width="28" height="44"/>
            <text x="76" y="28" fontFamily="Georgia,serif" fontSize="8" letterSpacing="2" fill="currentColor">PARIS</text>
            <use href="#s-bigben"   x="110" y="2"  width="22" height="52"/>
            <text x="136" y="28" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">LONDON</text>
            <use href="#s-mountain" x="196" y="6"  width="48" height="28"/>
            <use href="#s-camera"   x="254" y="10" width="38" height="24"/>
            <use href="#s-plane"    x="300" y="18" width="42" height="22"/>
            <text x="300" y="10" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">TOKYO</text>
            <use href="#s-spark"    x="348" y="5"  width="12" height="12"/>

            {/* ── ROW 2  y=60 ── */}
            <use href="#s-compass"  x="4"   y="60" width="30" height="30"/>
            <use href="#s-pin"      x="44"  y="60" width="18" height="26"/>
            <use href="#s-taj"      x="70"  y="58" width="56" height="42"/>
            <text x="132" y="83" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">DUBAI</text>
            <use href="#s-colosseum" x="184" y="62" width="52" height="30"/>
            <text x="242" y="77" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">ROME</text>
            <use href="#s-palm"     x="288" y="57" width="22" height="42"/>
            <use href="#s-globe"    x="316" y="60" width="30" height="34"/>
            <use href="#s-spark"    x="352" y="72" width="11" height="11"/>

            {/* ── ROW 3  y=112 ── */}
            <use href="#s-sydney"   x="4"   y="114" width="50" height="28"/>
            <text x="58" y="132" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">SYDNEY</text>
            <use href="#s-pisa"     x="116" y="110" width="20" height="44"/>
            <use href="#s-boat"     x="146" y="112" width="38" height="36"/>
            <text x="190" y="135" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">VENICE</text>
            <use href="#s-eiffel"   x="238" y="112" width="24" height="40"/>
            <use href="#s-balloon"  x="270" y="114" width="24" height="36"/>
            <use href="#s-mountain" x="302" y="118" width="44" height="26"/>
            <use href="#s-spark"    x="350" y="118" width="11" height="11"/>

            {/* ── ROW 4  y=168 ── */}
            <use href="#s-camera"   x="4"   y="170" width="34" height="22"/>
            <text x="46" y="186" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">ISTANBUL</text>
            <use href="#s-pin"      x="136" y="170" width="16" height="24"/>
            <use href="#s-taj"      x="160" y="166" width="50" height="38"/>
            <use href="#s-balloon"  x="220" y="168" width="24" height="34"/>
            <use href="#s-globe"    x="252" y="168" width="28" height="32"/>
            <text x="286" y="187" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">NYC</text>
            <use href="#s-bigben"   x="322" y="165" width="20" height="44"/>
            <use href="#s-spark"    x="348" y="170" width="11" height="11"/>

            {/* ── ROW 5  y=224 ── */}
            <use href="#s-colosseum" x="4"  y="226" width="46" height="28"/>
            <use href="#s-palm"      x="58" y="222" width="22" height="42"/>
            <text x="86" y="248" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">BALI</text>
            <use href="#s-boat"      x="120" y="224" width="36" height="34"/>
            <use href="#s-sydney"    x="166" y="228" width="44" height="26"/>
            <use href="#s-compass"   x="220" y="226" width="28" height="28"/>
            <text x="254" y="245" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">MALDIVES</text>
            <use href="#s-pisa"      x="330" y="220" width="18" height="42"/>
            <use href="#s-spark"     x="352" y="228" width="11" height="11"/>

            {/* ── ROW 6  y=282 ── */}
            <use href="#s-balloon"  x="4"   y="282" width="26" height="38"/>
            <use href="#s-eiffel"   x="40"  y="282" width="26" height="44"/>
            <text x="72" y="306" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">SANTORINI</text>
            <use href="#s-taj"      x="168" y="282" width="50" height="38"/>
            <use href="#s-globe"    x="228" y="284" width="28" height="32"/>
            <use href="#s-camera"   x="264" y="286" width="34" height="22"/>
            <text x="306" y="303" fontFamily="Georgia,serif" fontSize="7.5" letterSpacing="2" fill="currentColor">NEPAL</text>
            <use href="#s-plane"    x="306" y="316" width="40" height="22"/>
            <use href="#s-spark"    x="350" y="286" width="11" height="11"/>

          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#travel-tile)"/>
      </svg>
    </div>
  )
}
