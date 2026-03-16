'use client'
import { useMemo } from 'react'

// ═══════════════════════════════════════════════════════════════
//  TravelBackground — static clustered messy travel icons
//  No animations, icons clustered in organic groups, heavy tilts
// ═══════════════════════════════════════════════════════════════

type PlacedIcon = { icon: string; x: number; y: number; w: number; h: number; pivX: number; pivY: number; rot: number; opacity: number }

// [id, natural-width, natural-height]
const DEFS: [string, number, number][] = [
  ['s-plane',42,22],['s-suitcase',28,28],['s-globe',30,34],
  ['s-passport',24,30],['s-compass',30,30],['s-camera',38,24],
  ['s-train',44,26],['s-ship',54,28],['s-beachumbrella',40,32],
  ['s-pin',18,26],['s-cocktail',24,34],['s-sunhat',40,22],
  ['s-sunglasses',38,16],['s-tent',36,28],['s-lighthouse',18,44],
  ['s-mountain',48,28],['s-balloon',28,44],['s-anchor',22,34],
  ['s-bike',36,26],['s-palm',22,42],['s-snowflake',24,24],
  ['s-binoculars',30,20],['s-boat',38,36],['s-eiffel',30,50],
  ['s-bigben',22,52],['s-windsurfer',40,36],['s-flipflops',36,22],
  ['s-snorkel',28,36],['s-pyramids',48,28],['s-dolphin',44,24],
  ['s-lifering',32,32],['s-beachball',28,28],['s-wave',38,18],
  ['s-scooter',34,22],['s-cactus',22,40],['s-ferris',36,40],
  // new icons
  ['s-backpack',28,36],['s-boarding',40,20],['s-foldmap',38,28],
  ['s-hotel',32,38],['s-bed',38,22],['s-taxi',42,22],
  ['s-calendar',28,28],['s-boot',34,26],['s-campfire',26,28],
  ['s-island',38,28],['s-ski',36,16],['s-surfboard',16,38],
  ['s-polaroid',32,36],['s-wallet',30,20],['s-worldclock',32,32],
]

// Grid-based even distribution — one icon per cell, no overlap
const COLS = 10
const ROWS = 6

function buildItems(): PlacedIcon[] {
  let s = 58312
  const r = () => { s = (Math.imul(1664525, s) + 1013904223) | 0; return (s >>> 0) / 4294967296 }
  const W = 1200, H = 900
  const cellW = W / COLS
  const cellH = H / ROWS
  const items: PlacedIcon[] = []
  let idx = 0

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const [icon, nw, nh] = DEFS[idx % DEFS.length]
      idx++
      const sc = 1.1 + r() * 0.7          // scale 1.1 – 1.8×
      const w = nw * sc, h = nh * sc
      const pad = 8
      // random position inside the cell, clamped so icon doesn't escape
      const x = col * cellW + pad + r() * Math.max(0, cellW - w - pad * 2)
      const y = row * cellH + pad + r() * Math.max(0, cellH - h - pad * 2)
      const rot = -40 + r() * 80           // tilt −40° … +40°
      const opacity = 0.13 + r() * 0.09   // 0.13 – 0.22, clearly visible
      items.push({ icon, x, y, w, h, pivX: x + w / 2, pivY: y + h / 2, rot, opacity })
    }
  }
  return items
}

export default function TravelBackground() {
  const items = useMemo(() => { try { return buildItems() } catch { return [] } }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#00C896' }}>
        <defs>

          {/* ── Airplane 42×22 ── */}
          <symbol id="s-plane" viewBox="0 0 42 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11C4 11 20 8 33 9.5C37 10 40 10.5 41 11C40 11.5 37 12 33 12.5C20 14 4 11 4 11Z"/>
            <path d="M15 11L8 3L27 9.5Z"/><path d="M15 11L8 19L27 12.5Z"/>
            <path d="M6 11L4 7L10 10"/><path d="M6 11L4 15L10 12"/>
          </symbol>

          {/* ── Suitcase 28×28 ── */}
          <symbol id="s-suitcase" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 8Q10 3 14 3Q18 3 18 8"/>
            <rect x="2" y="8" width="24" height="16" rx="3"/>
            <line x1="2" y1="14" x2="26" y2="14"/>
            <rect x="11" y="11" width="6" height="6" rx="1"/>
            <circle cx="8" cy="26" r="2"/><circle cx="20" cy="26" r="2"/>
          </symbol>

          {/* ── Globe 30×34 ── */}
          <symbol id="s-globe" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15" cy="14" r="13"/><ellipse cx="15" cy="14" rx="6" ry="13"/>
            <path d="M2 9Q15 5 28 9" strokeWidth="0.6"/>
            <line x1="2" y1="14" x2="28" y2="14" strokeWidth="0.7"/>
            <path d="M2 19Q15 23 28 19" strokeWidth="0.6"/>
            <line x1="15" y1="27" x2="15" y2="31"/>
            <line x1="9" y1="31" x2="21" y2="31"/>
          </symbol>

          {/* ── Passport 24×30 ── */}
          <symbol id="s-passport" viewBox="0 0 24 30" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="26" rx="2"/>
            <line x1="6" y1="2" x2="6" y2="28"/>
            <circle cx="15" cy="12" r="5"/>
            <ellipse cx="15" cy="12" rx="2.5" ry="5"/>
            <line x1="10" y1="12" x2="20" y2="12"/>
            <line x1="8" y1="20" x2="20" y2="20"/>
            <line x1="8" y1="23" x2="17" y2="23"/>
          </symbol>

          {/* ── Compass 30×30 ── */}
          <symbol id="s-compass" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15" cy="15" r="13"/><circle cx="15" cy="15" r="7"/>
            <path d="M15 4L16.3 15L15 10.5L13.7 15Z" fill="currentColor" opacity="0.5"/>
            <path d="M15 26L13.7 15L15 19.5L16.3 15Z"/>
            <line x1="15" y1="2" x2="15" y2="5"/><line x1="15" y1="25" x2="15" y2="28"/>
            <line x1="2" y1="15" x2="5" y2="15"/><line x1="25" y1="15" x2="28" y2="15"/>
            <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.5"/>
          </symbol>

          {/* ── Camera 38×24 ── */}
          <symbol id="s-camera" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="34" height="17" rx="3"/>
            <path d="M13 6L11 1L27 1L25 6"/>
            <circle cx="19" cy="14.5" r="6.5"/><circle cx="19" cy="14.5" r="3.5"/>
            <circle cx="29" cy="9" r="2.5"/>
            <rect x="4" y="9" width="5" height="4" rx="1" strokeWidth="0.6"/>
          </symbol>

          {/* ── Steam Train 44×26 ── */}
          <symbol id="s-train" viewBox="0 0 44 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="30" height="12" rx="2"/>
            <rect x="28" y="3" width="12" height="16" rx="1"/>
            <rect x="7" y="1" width="5" height="7"/>
            <line x1="5" y1="2" x2="14" y2="2"/>
            <ellipse cx="18" cy="7" rx="4" ry="2.5"/>
            <circle cx="10" cy="21" r="3"/><circle cx="20" cy="21" r="3"/>
            <circle cx="30" cy="21" r="3"/><circle cx="38" cy="21" r="2.5"/>
            <line x1="10" y1="21" x2="30" y2="21" strokeWidth="1.2"/>
            <rect x="30" y="5" width="7" height="7" rx="0.5"/>
            <path d="M2 19L0 23L3 23"/>
          </symbol>

          {/* ── Cruise Ship 54×28 ── */}
          <symbol id="s-ship" viewBox="0 0 54 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20Q2 26 8 26L46 26Q52 26 52 20L50 18L4 18Z"/>
            <rect x="6" y="11" width="42" height="7"/>
            <rect x="12" y="5" width="30" height="6"/>
            <rect x="18" y="1" width="18" height="4"/>
            <rect x="24" y="0" width="6" height="3" rx="0.5"/>
            <circle cx="12" cy="22.5" r="1"/><circle cx="20" cy="22.5" r="1"/>
            <circle cx="28" cy="22.5" r="1"/><circle cx="36" cy="22.5" r="1"/>
            <circle cx="44" cy="22.5" r="1"/>
          </symbol>

          {/* ── Beach Umbrella 40×32 ── */}
          <symbol id="s-beachumbrella" viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18Q12 2 28 18Z"/>
            <line x1="15" y1="18" x2="12" y2="32"/>
            <line x1="12" y1="28" x2="8" y2="32"/>
            <path d="M22 22L38 18"/>
            <path d="M22 22L20 28"/>
            <path d="M38 18L36 28"/>
            <line x1="20" y1="28" x2="36" y2="28"/>
            <circle cx="30" cy="17" r="1.8" fill="currentColor" opacity="0.5"/>
          </symbol>

          {/* ── Map Pin 18×26 ── */}
          <symbol id="s-pin" viewBox="0 0 18 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 1C5 1 1 5 1 9C1 16 9 25 9 25C9 25 17 16 17 9C17 5 13 1 9 1Z"/>
            <circle cx="9" cy="9" r="3.5"/>
          </symbol>

          {/* ── Cocktail 24×34 ── */}
          <symbol id="s-cocktail" viewBox="0 0 24 34" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3L12 17L22 3Z"/>
            <line x1="2" y1="3" x2="22" y2="3"/>
            <line x1="12" y1="17" x2="12" y2="27"/>
            <line x1="5" y1="27" x2="19" y2="27"/>
            <line x1="16" y1="3" x2="22" y2="11"/>
            <circle cx="22" cy="11" r="2.5"/>
          </symbol>

          {/* ── Sun Hat 40×22 ── */}
          <symbol id="s-sunhat" viewBox="0 0 40 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="20" cy="19" rx="18" ry="4"/>
            <path d="M7 19Q7 9 20 9Q33 9 33 19"/>
            <ellipse cx="20" cy="9" rx="11" ry="3.5"/>
            <path d="M10 14Q20 12 30 14"/>
          </symbol>

          {/* ── Sunglasses 38×16 ── */}
          <symbol id="s-sunglasses" viewBox="0 0 38 16" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="14" height="10" rx="5"/>
            <rect x="23" y="4" width="14" height="10" rx="5"/>
            <path d="M15 8Q19 6 23 8"/>
            <line x1="1" y1="7" x2="0" y2="2"/>
            <line x1="37" y1="7" x2="38" y2="2"/>
          </symbol>

          {/* ── Tent 36×28 ── */}
          <symbol id="s-tent" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 26L18 3L34 26Z"/>
            <path d="M14 26L18 10L22 26"/>
            <line x1="0" y1="26" x2="36" y2="26"/>
            <line x1="5" y1="26" x2="2" y2="30"/>
            <line x1="31" y1="26" x2="34" y2="30"/>
          </symbol>

          {/* ── Lighthouse 18×44 ── */}
          <symbol id="s-lighthouse" viewBox="0 0 18 44" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="5" x2="9" y2="1"/>
            <line x1="7" y1="6" x2="3" y2="3"/><line x1="11" y1="6" x2="15" y2="3"/>
            <rect x="5" y="8" width="8" height="6" rx="1"/>
            <line x1="3" y1="14" x2="15" y2="14"/>
            <path d="M5 14L3 36L15 36L13 14Z"/>
            <line x1="3.5" y1="22" x2="14.5" y2="22"/>
            <line x1="3.2" y1="29" x2="14.8" y2="29"/>
            <rect x="1" y="36" width="16" height="5"/>
            <line x1="0" y1="41" x2="18" y2="41"/>
          </symbol>

          {/* ── Mountain with flag 48×28 ── */}
          <symbol id="s-mountain" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 30L18 3L34 30Z"/>
            <path d="M12 15L18 3L24 15C21 13 15 13 12 15Z"/>
            <path d="M28 30L37 13L46 30"/>
            <path d="M32 19L37 13L42 19C40 18 34 18 32 19Z"/>
            <line x1="0" y1="30" x2="48" y2="30"/>
            <line x1="18" y1="3" x2="18" y2="0"/>
            <path d="M18 0L24 1.5L18 3Z" fill="currentColor" opacity="0.6"/>
          </symbol>

          {/* ── Hot Air Balloon 28×44 ── */}
          <symbol id="s-balloon" viewBox="0 0 28 44" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3C7 3 2 9 2 16C2 24 7 30 14 31C21 30 26 24 26 16C26 9 21 3 14 3Z"/>
            <path d="M14 3C11 10 11 18 12 24C13 28 14 31 14 31"/>
            <path d="M14 3C17 10 17 18 16 24C15 28 14 31 14 31"/>
            <path d="M14 3C7 7 3 12 2 18"/><path d="M14 3C21 7 25 12 26 18"/>
            <path d="M2 17Q14 13 26 17"/>
            <line x1="9" y1="31" x2="7" y2="37"/><line x1="19" y1="31" x2="21" y2="37"/>
            <rect x="6" y="37" width="16" height="7" rx="1.5"/>
            <line x1="6" y1="41" x2="22" y2="41"/>
          </symbol>

          {/* ── Anchor 22×34 ── */}
          <symbol id="s-anchor" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="4" r="3"/>
            <line x1="11" y1="7" x2="11" y2="27"/>
            <line x1="3" y1="11" x2="19" y2="11"/>
            <path d="M11 27C8 31 2 31 2 26"/>
            <path d="M11 27C14 31 20 31 20 26"/>
            <circle cx="2" cy="25" r="2"/><circle cx="20" cy="25" r="2"/>
          </symbol>

          {/* ── Bicycle 36×26 ── */}
          <symbol id="s-bike" viewBox="0 0 36 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="18" r="7"/><circle cx="29" cy="18" r="7"/>
            <path d="M7 18L15 8L22 8L29 18"/>
            <line x1="15" y1="8" x2="13" y2="4"/>
            <line x1="10" y1="4" x2="16" y2="4"/>
            <line x1="22" y1="8" x2="26" y2="4"/>
            <line x1="24" y1="3" x2="28" y2="6"/>
            <circle cx="18" cy="16" r="2"/>
          </symbol>

          {/* ── Palm Tree 22×42 ── */}
          <symbol id="s-palm" viewBox="0 0 22 42" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 42C11 33 10 25 11 17C12 11 13 7 12 3"/>
            <path d="M12 3C8 1 3 3 1 0C5 2 9 5 11 9"/>
            <path d="M12 3C12 0 14 0 14 0C13 3 13 7 12 9"/>
            <path d="M12 3C16 1 20 3 21 0C18 2 14 5 12 9"/>
            <path d="M12 3C7 2 3 4 1 2C5 4 10 6 12 9"/>
          </symbol>

          {/* ── Snowflake 24×24 ── */}
          <symbol id="s-snowflake" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <line x1="1" y1="12" x2="23" y2="12"/>
            <line x1="3.5" y1="3.5" x2="20.5" y2="20.5"/>
            <line x1="20.5" y1="3.5" x2="3.5" y2="20.5"/>
            <line x1="9" y1="6" x2="12" y2="9"/><line x1="15" y1="6" x2="12" y2="9"/>
            <line x1="9" y1="18" x2="12" y2="15"/><line x1="15" y1="18" x2="12" y2="15"/>
            <line x1="6" y1="9" x2="9" y2="12"/><line x1="6" y1="15" x2="9" y2="12"/>
            <line x1="18" y1="9" x2="15" y2="12"/><line x1="18" y1="15" x2="15" y2="12"/>
          </symbol>

          {/* ── Binoculars 30×20 ── */}
          <symbol id="s-binoculars" viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="0" y="3" width="12" height="14" rx="6"/>
            <circle cx="6" cy="10" r="4.5"/>
            <rect x="18" y="3" width="12" height="14" rx="6"/>
            <circle cx="24" cy="10" r="4.5"/>
            <path d="M12 7Q15 5 18 7"/>
            <path d="M12 13Q15 15 18 13"/>
            <rect x="3" y="2" width="6" height="3" rx="0.8"/>
            <rect x="21" y="2" width="6" height="3" rx="0.8"/>
          </symbol>

          {/* ── Sailboat 38×36 ── */}
          <symbol id="s-boat" viewBox="0 0 38 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="3" x2="19" y2="24"/>
            <path d="M19 5L5 22L33 22Z"/><path d="M19 8L33 20L19 24"/>
            <path d="M5 24Q19 30 33 24L31 27Q19 34 7 27Z"/>
            <path d="M2 29Q19 35 36 29" strokeWidth="0.6"/>
          </symbol>

          {/* ── Eiffel Tower 30×50 ── */}
          <symbol id="s-eiffel" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="15" y1="1" x2="15" y2="5"/>
            <path d="M13 5L17 5L18 11L12 11Z"/>
            <line x1="11" y1="11" x2="19" y2="11"/><line x1="13" y1="8" x2="17" y2="8"/>
            <path d="M10 11L20 11L22 22L8 22Z"/>
            <line x1="7" y1="22" x2="23" y2="22"/><line x1="12" y1="17" x2="18" y2="17"/>
            <path d="M8 22L3 38M22 22L27 38"/>
            <path d="M11 22L9 38M19 22L21 38"/>
            <path d="M9 38C9 32 12 30 15 29C18 30 21 32 21 38"/>
            <line x1="1" y1="38" x2="29" y2="38"/>
          </symbol>

          {/* ── Big Ben 22×52 ── */}
          <symbol id="s-bigben" viewBox="0 0 22 52" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 1L9 7L13 7Z"/>
            <rect x="7" y="7" width="8" height="4"/><rect x="5" y="11" width="12" height="12"/>
            <circle cx="11" cy="17" r="4.5"/>
            <line x1="11" y1="12.5" x2="11" y2="17" strokeWidth="1"/>
            <line x1="11" y1="17" x2="14" y2="15" strokeWidth="1"/>
            <rect x="4" y="23" width="14" height="28"/>
            <line x1="4" y1="33" x2="18" y2="33"/><line x1="4" y1="42" x2="18" y2="42"/>
            <line x1="1" y1="33" x2="4" y2="33"/><line x1="21" y1="33" x2="18" y2="33"/>
            <line x1="4" y1="51" x2="18" y2="51"/>
          </symbol>

          {/* ── Windsurfer 40×36 ── */}
          <symbol id="s-windsurfer" viewBox="0 0 40 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 30Q20 34 36 30L34 33Q20 37 8 33Z"/>
            <line x1="20" y1="4" x2="20" y2="30"/>
            <path d="M20 6Q8 12 8 24Q10 28 20 28Z"/>
            <path d="M20 10Q30 14 32 22Q28 26 20 28"/>
            <line x1="20" y1="18" x2="10" y2="23"/>
            <circle cx="22" cy="28" r="1.5" fill="currentColor" opacity="0.6"/>
          </symbol>

          {/* ── Flip Flops 36×22 ── */}
          <symbol id="s-flipflops" viewBox="0 0 36 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="9" cy="16" rx="8" ry="5"/>
            <path d="M9 11Q7 7 9 5Q11 3 12 6"/>
            <path d="M9 11Q11 8 12 6"/>
            <ellipse cx="27" cy="16" rx="8" ry="5"/>
            <path d="M27 11Q25 7 27 5Q29 3 30 6"/>
            <path d="M27 11Q29 8 30 6"/>
          </symbol>

          {/* ── Diving Mask + Snorkel 28×36 ── */}
          <symbol id="s-snorkel" viewBox="0 0 28 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="20" height="14" rx="4"/>
            <rect x="9" y="12" width="8" height="6" rx="2"/>
            <path d="M3 13Q1 13 1 15Q1 18 3 18"/>
            <path d="M23 13Q25 13 25 15Q25 18 23 18"/>
            <path d="M22 8Q22 3 26 2"/>
            <path d="M24 2Q27 2 27 5L27 22"/>
            <path d="M25 22Q24 26 22 26"/>
          </symbol>

          {/* ── Pyramids 48×28 ── */}
          <symbol id="s-pyramids" viewBox="0 0 48 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 26L20 3L38 26Z"/>
            <path d="M30 26L38 14L46 26"/>
            <line x1="0" y1="26" x2="48" y2="26"/>
            <line x1="10" y1="16" x2="30" y2="16" strokeWidth="0.5"/>
            <line x1="34" y1="20" x2="44" y2="20" strokeWidth="0.5"/>
          </symbol>

          {/* ── Dolphin 44×24 ── */}
          <symbol id="s-dolphin" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 14C4 8 12 4 22 5C32 6 40 10 42 12"/>
            <path d="M42 12C44 9 44 15 42 15C40 13 42 12Z"/>
            <path d="M2 14C2 17 4 20 6 20C5 17 3 15 2 14Z"/>
            <path d="M20 5C21 2 25 3 24 6"/>
            <path d="M12 8C11 12 10 15 12 16"/>
            <circle cx="8" cy="11" r="1" fill="currentColor" opacity="0.7"/>
          </symbol>

          {/* ── Life Ring 32×32 ── */}
          <symbol id="s-lifering" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="16" r="14"/>
            <circle cx="16" cy="16" r="8"/>
            <line x1="16" y1="2" x2="16" y2="8"/>
            <line x1="16" y1="24" x2="16" y2="30"/>
            <line x1="2" y1="16" x2="8" y2="16"/>
            <line x1="24" y1="16" x2="30" y2="16"/>
          </symbol>

          {/* ── Beach Ball 28×28 ── */}
          <symbol id="s-beachball" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="14" r="12"/>
            <path d="M2 14Q8 6 14 14Q20 22 26 14"/>
            <path d="M8 3Q10 10 8 24"/>
            <path d="M20 3Q18 10 20 24"/>
          </symbol>

          {/* ── Wave 38×18 ── */}
          <symbol id="s-wave" viewBox="0 0 38 18" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 10C4 4 8 4 11 10C14 16 18 16 21 10C24 4 28 4 31 10C33 14 35 13 37 10"/>
            <path d="M1 15C4 11 7 11 10 15C13 18 16 18 19 15" strokeWidth="0.6"/>
          </symbol>

          {/* ── Scooter 34×22 ── */}
          <symbol id="s-scooter" viewBox="0 0 34 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="16" r="5"/><circle cx="27" cy="16" r="5"/>
            <path d="M7 16Q7 10 13 9L21 9Q26 9 27 12"/>
            <path d="M11 9Q13 4 20 4L20 9"/>
            <line x1="22" y1="4" x2="30" y2="6"/>
            <line x1="29" y1="4" x2="30" y2="8"/>
            <line x1="10" y1="14" x2="24" y2="14"/>
          </symbol>

          {/* ── Cactus 22×40 ── */}
          <symbol id="s-cactus" viewBox="0 0 22 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="11" y1="38" x2="11" y2="16"/>
            <path d="M8 16C8 10 14 10 14 16"/>
            <path d="M11 24L5 24L5 17"/><path d="M3 17C3 13 7 13 7 17"/>
            <path d="M11 30L17 30L17 23"/><path d="M15 23C15 19 19 19 19 23"/>
            <path d="M7 38Q11 36 15 38"/>
          </symbol>

          {/* ── Ferris Wheel 36×40 ── */}
          <symbol id="s-ferris" viewBox="0 0 36 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="14"/>
            <circle cx="18" cy="18" r="2.5"/>
            <line x1="18" y1="4" x2="18" y2="32"/>
            <line x1="4" y1="18" x2="32" y2="18"/>
            <line x1="8.1" y1="8.1" x2="27.9" y2="27.9"/>
            <line x1="27.9" y1="8.1" x2="8.1" y2="27.9"/>
            <rect x="14.5" y="1" width="7" height="5" rx="0.8"/>
            <rect x="30" y="14.5" width="6" height="7" rx="0.8"/>
            <rect x="14.5" y="30" width="7" height="5" rx="0.8"/>
            <rect x="0" y="14.5" width="6" height="7" rx="0.8"/>
            <line x1="12" y1="31" x2="8" y2="40"/>
            <line x1="24" y1="31" x2="28" y2="40"/>
            <line x1="5" y1="40" x2="31" y2="40"/>
          </symbol>

          {/* ════════════════ NEW ICONS ════════════════ */}

          {/* ── Backpack 28×36 ── */}
          <symbol id="s-backpack" viewBox="0 0 28 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 9Q10 4 14 4Q18 4 18 9"/>
            <rect x="3" y="9" width="22" height="22" rx="4"/>
            <line x1="3" y1="18" x2="25" y2="18"/>
            <rect x="9" y="20" width="10" height="7" rx="1.5"/>
            <path d="M3 12Q1 12 1 16Q1 20 3 20"/>
            <line x1="11" y1="31" x2="11" y2="33"/>
            <line x1="17" y1="31" x2="17" y2="33"/>
            <line x1="11" y1="33" x2="17" y2="33"/>
          </symbol>

          {/* ── Boarding Pass 40×20 ── */}
          <symbol id="s-boarding" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="2" width="38" height="16" rx="2"/>
            <path d="M14 2L14 18"/>
            <path d="M14 10Q12 10 12 10" strokeWidth="2" strokeDasharray="0.5 2"/>
            <line x1="4" y1="7" x2="11" y2="7"/>
            <line x1="4" y1="10" x2="10" y2="10"/>
            <line x1="4" y1="13" x2="11" y2="13"/>
            <line x1="17" y1="6" x2="35" y2="6" strokeWidth="0.6"/>
            <line x1="17" y1="10" x2="30" y2="10" strokeWidth="0.6"/>
            <line x1="17" y1="14" x2="33" y2="14" strokeWidth="0.6"/>
          </symbol>

          {/* ── Folded Map 38×28 ── */}
          <symbol id="s-foldmap" viewBox="0 0 38 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6L14 3L26 7L36 4L36 24L26 27L14 23L2 26Z"/>
            <line x1="14" y1="3" x2="14" y2="23"/>
            <line x1="26" y1="7" x2="26" y2="27"/>
            <path d="M6 13Q10 10 14 14Q19 19 22 14" strokeWidth="0.7"/>
            <circle cx="10" cy="11" r="2" strokeWidth="0.7"/>
          </symbol>

          {/* ── Hotel Building 32×38 ── */}
          <symbol id="s-hotel" viewBox="0 0 32 38" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10L16 2L29 10L29 37L3 37Z"/>
            <rect x="7" y="14" width="5" height="5" rx="0.5"/>
            <rect x="20" y="14" width="5" height="5" rx="0.5"/>
            <rect x="7" y="23" width="5" height="5" rx="0.5"/>
            <rect x="20" y="23" width="5" height="5" rx="0.5"/>
            <rect x="12" y="30" width="8" height="7"/>
            <circle cx="16" cy="6" r="4.5"/>
            <line x1="14" y1="4" x2="14" y2="8"/>
            <line x1="18" y1="4" x2="18" y2="8"/>
            <line x1="14" y1="6" x2="18" y2="6"/>
          </symbol>

          {/* ── Bed 38×22 ── */}
          <symbol id="s-bed" viewBox="0 0 38 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 18L2 6Q2 4 4 4L34 4Q36 4 36 6L36 18"/>
            <rect x="2" y="9" width="34" height="9" rx="1"/>
            <ellipse cx="11" cy="9" rx="6" ry="3.5"/>
            <line x1="2" y1="18" x2="2" y2="22"/>
            <line x1="36" y1="18" x2="36" y2="22"/>
            <line x1="0" y1="22" x2="38" y2="22"/>
          </symbol>

          {/* ── Taxi / Car 42×22 ── */}
          <symbol id="s-taxi" viewBox="0 0 42 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="10" width="38" height="10" rx="3"/>
            <path d="M10 10L15 4L30 4L36 10"/>
            <rect x="15" y="5" width="6" height="5" rx="0.5"/>
            <rect x="24" y="5" width="6" height="5" rx="0.5"/>
            <circle cx="11" cy="22" r="3" strokeWidth="1.2"/>
            <circle cx="31" cy="22" r="3" strokeWidth="1.2"/>
            <rect x="17" y="2" width="8" height="3" rx="0.5"/>
            <rect x="5" y="14" width="6" height="3" rx="0.5" strokeWidth="0.6"/>
          </symbol>

          {/* ── Calendar 28×28 ── */}
          <symbol id="s-calendar" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="24" height="22" rx="2"/>
            <line x1="2" y1="11" x2="26" y2="11"/>
            <line x1="8" y1="2" x2="8" y2="8"/>
            <line x1="20" y1="2" x2="20" y2="8"/>
            <circle cx="8" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
            <circle cx="14" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
            <circle cx="20" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
            <circle cx="8" cy="22" r="1.5" fill="currentColor" opacity="0.7"/>
            <circle cx="14" cy="22" r="1.5" fill="currentColor" opacity="0.7"/>
            <rect x="18" y="19" width="6" height="5" rx="1" strokeWidth="0.7" fill="currentColor" fillOpacity="0.12"/>
          </symbol>

          {/* ── Hiking Boot 34×26 ── */}
          <symbol id="s-boot" viewBox="0 0 34 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 24L2 8Q2 4 7 4L15 4Q17 4 18 6L26 17Q30 18 32 20L32 24Z"/>
            <path d="M2 16L18 16"/>
            <path d="M15 4L15 9Q15 11 18 11L24 11"/>
            <line x1="0" y1="24" x2="34" y2="24"/>
            <line x1="7" y1="8" x2="13" y2="8" strokeWidth="0.6"/>
            <line x1="6" y1="11" x2="14" y2="11" strokeWidth="0.6"/>
          </symbol>

          {/* ── Campfire 26×28 ── */}
          <symbol id="s-campfire" viewBox="0 0 26 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 18Q9 14 11 8Q13 4 13 2Q15 5 14 10Q17 6 17 2Q19 7 17 11Q19 8 21 13Q21 18 13 18Z"/>
            <path d="M4 26Q13 18 22 26"/>
            <line x1="5" y1="26" x2="18" y2="22"/>
            <line x1="21" y1="26" x2="9" y2="22"/>
            <line x1="2" y1="26" x2="24" y2="26"/>
          </symbol>

          {/* ── Tropical Island 38×28 ── */}
          <symbol id="s-island" viewBox="0 0 38 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="19" cy="24" rx="17" ry="4.5"/>
            <line x1="19" y1="24" x2="20" y2="8"/>
            <path d="M20 8C16 6 11 8 9 5C13 7 18 10 20 14"/>
            <path d="M20 8C20 5 22 5 22 5C21 8 21 12 20 14"/>
            <path d="M20 8C24 6 29 8 31 5C27 7 22 10 20 14"/>
            <path d="M4 22Q19 18 34 22" strokeWidth="0.6"/>
          </symbol>

          {/* ── Ski 36×16 ── */}
          <symbol id="s-ski" viewBox="0 0 36 16" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 14Q4 14 6 12L30 5Q32 4 34 6"/>
            <rect x="13" y="7" width="10" height="4" rx="1.5"/>
            <line x1="14" y1="7" x2="12" y2="3"/>
            <line x1="22" y1="7" x2="24" y2="3"/>
            <line x1="12" y1="3" x2="24" y2="3"/>
            <path d="M2 12Q1 14 3 15"/>
            <path d="M6 14L8 16"/>
          </symbol>

          {/* ── Surfboard 16×38 ── */}
          <symbol id="s-surfboard" viewBox="0 0 16 38" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2C11 2 14 8 14 18C14 28 11 36 8 36C5 36 2 28 2 18C2 8 5 2 8 2Z"/>
            <line x1="8" y1="5" x2="8" y2="33" strokeWidth="0.6"/>
            <path d="M4 14Q8 12 12 14" strokeWidth="0.7"/>
            <path d="M5 22Q8 20 11 22" strokeWidth="0.7"/>
          </symbol>

          {/* ── Polaroid Photo Stack 32×36 ── */}
          <symbol id="s-polaroid" viewBox="0 0 32 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="26" height="30" rx="1" transform="rotate(6,17,19)"/>
            <rect x="2" y="2" width="26" height="30" rx="1" transform="rotate(-4,15,17)"/>
            <rect x="3" y="3" width="26" height="30" rx="1"/>
            <rect x="6" y="6" width="20" height="16" rx="0.5"/>
            <line x1="6" y1="26" x2="16" y2="26"/>
          </symbol>

          {/* ── Travel Wallet 30×20 ── */}
          <symbol id="s-wallet" viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="28" height="14" rx="2"/>
            <rect x="17" y="6" width="11" height="8" rx="2"/>
            <circle cx="23" cy="10" r="2.5"/>
            <line x1="4" y1="8" x2="13" y2="8"/>
            <line x1="4" y1="11" x2="11" y2="11"/>
            <line x1="1" y1="6" x2="1" y2="14"/>
          </symbol>

          {/* ── World Clock 32×32 ── */}
          <symbol id="s-worldclock" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="16" r="14"/>
            <circle cx="16" cy="16" r="8"/>
            <line x1="16" y1="8" x2="16" y2="16" strokeWidth="1.3"/>
            <line x1="16" y1="16" x2="22" y2="16" strokeWidth="1.3"/>
            <ellipse cx="16" cy="16" rx="5" ry="14" strokeWidth="0.7"/>
            <path d="M2 11Q16 7 30 11" strokeWidth="0.6"/>
            <path d="M2 21Q16 25 30 21" strokeWidth="0.6"/>
          </symbol>

        </defs>

        {(items || []).map(({ icon, x, y, w, h, pivX, pivY, rot, opacity }, i) => (
          <g key={i} transform={`rotate(${rot.toFixed(1)},${pivX.toFixed(1)},${pivY.toFixed(1)})`}
            style={{ opacity }}>
            <use href={`#${icon}`} x={x.toFixed(1)} y={y.toFixed(1)} width={w.toFixed(1)} height={h.toFixed(1)} />
          </g>
        ))}

      </svg>
    </div>
  )
}
