// ═══════════════════════════════════════════════════════════════
//  TravelBackground — 40 travel icons + 12 tiny fillers
//  Dual hex-jittered grid → ~710 elements, wall-to-wall coverage
// ═══════════════════════════════════════════════════════════════

const M_ICONS = [
  's-eiffel','s-bigben','s-taj','s-colosseum','s-sydney',
  's-pisa','s-burj','s-arc','s-pagoda','s-lighthouse',
  's-moai','s-windmill','s-bridge','s-ferris',
  's-plane','s-train','s-ship','s-boat','s-balloon',
  's-helicopter','s-cable','s-scooter','s-anchor','s-bike',
  's-mountain','s-palm','s-cactus','s-wave','s-volcano','s-lantern',
  's-compass','s-globe','s-camera','s-pin','s-suitcase','s-passport',
  's-binoculars','s-tent','s-snowflake','s-spark',
]
const M_NW = [30,22,56,52,50,20,12,44,34,18,22,32,50,36,42,44,54,38,28,40,28,34,22,36,48,22,22,38,38,18,30,30,38,18,28,24,30,36,24,14]
const M_NH = [50,52,42,30,28,44,56,36,52,44,40,40,24,40,22,26,28,36,44,22,26,22,34,26,28,42,40,18,34,32,30,34,24,26,28,30,20,28,24,14]

const F_ICONS = ['s-star5','s-ring','s-diamond','s-heart','s-moon','s-sun','s-leaf','s-drop','s-tri','s-dot3','s-cross2','s-petal']
const F_NW   = [12,12,10,12,12,14,10,10,10,14,12,12]
const F_NH   = [12,12,14,11,12,14,14,14,12, 6,12,12]

// ── Main layer grid: 21 cols × 16 rows = 336 placements ──
const M_COLS=21, M_ROWS=16, M_CW=56, M_RH=60, M_SX=2,  M_SY=-8
const M_JX  = [-8,10,-12,4,-7,13,-15,3,-6,11,-10,6,-14,8,-4,-11,7,-8,14,-5,-16]
const M_JY  = [6,-8,5,-12,10,-5,-14,7,-9,12,-3,-10,4,-7,8,-4]
const M_SC  = [1.2,1.6,1.0,1.4,1.1,1.5]
const M_RO  = [-22,14,-38,6,-16,30,-8,20,-42,12,-35,18,-10,28,-24,8,-18,25,-32,10,-20,35,-6,15,-28,8,-40,20,-15,32,-45,5,-25,18,-12,38,-30,8,-22,16]
const M_RCOL= [0,5,-8,3,-5,8,0,-3,6,-6,4,-10,2,-4,9,-2,5,7,-7,3,-9]
const M_RROW= [5,-8,3,5,-8,3,5,-8,3,5,-8,3,5,-8,3,5]

// ── Filler layer grid: 22 cols × 17 rows = 374 placements ──
const F_COLS=22, F_ROWS=17, F_CW=54, F_RH=58, F_SX=28, F_SY=-28
const F_JX  = [-7,9,-11,5,-8,12,-16,3,-5,10,-9,7,-13,6,-3,-12,8,-6,13,-4,-14,4]
const F_JY  = [-6,8,-4,11,-9,5,13,-7,8,-11,3,10,-5,6,-8,11,-4]
const F_SC  = [2.0,2.6,1.6,2.3,1.8,2.8]
const F_RO  = [0,45,-45,30,-30,60,-60,15,-15,75,-75,90]
const F_RCOL= [-3,4,-6,2,-8,6,-4,8,-2,5,-7,3,-9,7,-3,6,-5,4,-8,2,-4,8]
const F_RROW= [-5,8,-3,-5,8,-3,-5,8,-3,-5,8,-3,-5,8,-3,8,-3]

type Item = { icon:string; x:number; y:number; w:number; h:number; cx:number; cy:number; rot:number }

function makeLayer(
  icons:string[], nw:number[], nh:number[],
  cols:number, rows:number, cw:number, rh:number, sx:number, sy:number,
  jx:number[], jy:number[], sc:number[], ro:number[], rcol:number[], rrow:number[]
): Item[] {
  const out: Item[] = []
  for (let r=0; r<rows; r++) {
    const hex = r%2===1 ? Math.round(cw/2) : 0
    for (let c=0; c<cols; c++) {
      const i  = r*cols+c
      const ii = i % icons.length
      const x  = sx + c*cw + hex + jx[c]
      const y  = sy + r*rh + jy[r]
      const s  = sc[i % sc.length]
      const w  = nw[ii]*s, h = nh[ii]*s
      out.push({ icon:icons[ii], x, y, w, h, cx:x+w/2, cy:y+h/2, rot:ro[ii]+rcol[c]+rrow[r] })
    }
  }
  return out
}

const mainItems = makeLayer(M_ICONS,M_NW,M_NH,M_COLS,M_ROWS,M_CW,M_RH,M_SX,M_SY,M_JX,M_JY,M_SC,M_RO,M_RCOL,M_RROW)
const fillItems = makeLayer(F_ICONS,F_NW,F_NH,F_COLS,F_ROWS,F_CW,F_RH,F_SX,F_SY,F_JX,F_JY,F_SC,F_RO,F_RCOL,F_RROW)

export default function TravelBackground() {
  return (
    <div style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden'}} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 900"
           preserveAspectRatio="xMidYMin slice"
           xmlns="http://www.w3.org/2000/svg"
           style={{color:'#00C896', opacity:0.13}}>
        <defs>

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

          {/* ── Taj Mahal 56×42 ── */}
          <symbol id="s-taj" viewBox="0 0 56 42" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="28" y1="1" x2="28" y2="4"/>
            <path d="M28 4C23 4 19 7 18 11C17 15 19 19 22 21C24 22 26 23 28 24C30 23 32 22 34 21C37 19 39 15 38 11C37 7 33 4 28 4Z"/>
            <line x1="16" y1="24" x2="40" y2="24"/><rect x="18" y="24" width="20" height="17"/>
            <path d="M21 41V34Q21 28 28 28Q35 28 35 34V41"/>
            <line x1="8" y1="2" x2="8" y2="41"/>
            <path d="M8 2C6 2 5 4 5 6C5 8 6 9 8 10C10 9 11 8 11 6C11 4 10 2 8 2Z"/>
            <line x1="5" y1="16" x2="11" y2="16"/><line x1="5" y1="28" x2="11" y2="28"/>
            <line x1="48" y1="2" x2="48" y2="41"/>
            <path d="M48 2C46 2 45 4 45 6C45 8 46 9 48 10C50 9 51 8 51 6C51 4 50 2 48 2Z"/>
            <line x1="45" y1="16" x2="51" y2="16"/><line x1="45" y1="28" x2="51" y2="28"/>
            <rect x="11" y="30" width="7" height="11"/><rect x="38" y="30" width="7" height="11"/>
            <line x1="2" y1="41" x2="54" y2="41"/>
          </symbol>

          {/* ── Colosseum 52×30 ── */}
          <symbol id="s-colosseum" viewBox="0 0 52 30" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 28L4 18Q4 6 26 6Q48 6 48 18L48 28"/>
            <line x1="2" y1="28" x2="50" y2="28"/>
            <line x1="4" y1="22" x2="48" y2="22"/><line x1="6" y1="15" x2="46" y2="15"/>
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

          {/* ── Sydney Opera 50×28 ── */}
          <symbol id="s-sydney" viewBox="0 0 50 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="26" x2="48" y2="26"/>
            <path d="M20 26C16 20 12 13 18 5C23 13 25 20 25 26"/>
            <path d="M25 26C27 20 31 13 36 5C41 13 43 21 39 26"/>
            <path d="M39 26C40 22 41 18 42 14C44 18 44 22 43 26"/>
            <path d="M13 26C12 22 11 18 11 14C9 18 9 22 10 26"/>
          </symbol>

          {/* ── Leaning Tower of Pisa 20×44 ── */}
          <symbol id="s-pisa" viewBox="0 0 20 44" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="10" cy="41" rx="8" ry="2.5"/>
            <path d="M3 41L5 7"/><path d="M17 41L15 7"/>
            <ellipse cx="10" cy="7" rx="6" ry="2"/>
            <line x1="4" y1="14" x2="16" y2="14"/><line x1="4" y1="21" x2="16" y2="21"/>
            <line x1="4" y1="28" x2="16" y2="28"/><line x1="4" y1="35" x2="16" y2="35"/>
            <path d="M6 7L5 2L15 2L14 7"/><line x1="5" y1="4" x2="15" y2="4"/>
          </symbol>

          {/* ── Burj Khalifa 12×56 ── */}
          <symbol id="s-burj" viewBox="0 0 12 56" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="1" x2="6" y2="8"/>
            <path d="M5 8L4 18L8 18L7 8Z"/>
            <path d="M4 18L3 30L9 30L8 18Z"/>
            <path d="M3 30L2 42L10 42L9 30Z"/>
            <path d="M2 42L1 55L11 55L10 42Z"/>
            <line x1="3" y1="25" x2="9" y2="25"/>
            <line x1="3" y1="36" x2="9" y2="36"/>
            <line x1="2" y1="48" x2="10" y2="48"/>
            <line x1="1" y1="55" x2="11" y2="55"/>
          </symbol>

          {/* ── Arc de Triomphe 44×36 ── */}
          <symbol id="s-arc" viewBox="0 0 44 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 34L4 14Q4 4 22 4Q40 4 40 14L40 34"/>
            <path d="M14 34L14 20Q14 14 22 14Q30 14 30 20L30 34"/>
            <line x1="2" y1="34" x2="42" y2="34"/>
            <line x1="6" y1="14" x2="38" y2="14"/>
            <line x1="8" y1="22" x2="36" y2="22"/>
          </symbol>

          {/* ── Japanese Pagoda 34×52 ── */}
          <symbol id="s-pagoda" viewBox="0 0 34 52" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="17" y1="2" x2="17" y2="8"/>
            <path d="M11 12L17 5L23 12Z"/><line x1="9" y1="13" x2="25" y2="13"/>
            <rect x="13" y="13" width="8" height="5"/>
            <path d="M7 24L17 17L27 24Z"/><line x1="5" y1="25" x2="29" y2="25"/>
            <rect x="11" y="25" width="12" height="5"/>
            <path d="M3 36L17 29L31 36Z"/><line x1="1" y1="37" x2="33" y2="37"/>
            <rect x="9" y="37" width="16" height="8"/>
            <line x1="5" y1="45" x2="29" y2="45"/>
            <rect x="7" y="45" width="20" height="6"/>
            <line x1="0" y1="51" x2="34" y2="51"/>
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

          {/* ── Moai 22×40 ── */}
          <symbol id="s-moai" viewBox="0 0 22 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="10" height="5" rx="1"/>
            <path d="M5 7Q5 3 11 3Q17 3 17 7L17 18Q17 24 15 26L7 26Q5 24 5 18Z"/>
            <line x1="7" y1="11" x2="10" y2="11"/><line x1="12" y1="11" x2="15" y2="11"/>
            <path d="M10 14Q11 13 12 14Q11 17 10 14"/>
            <line x1="8" y1="19" x2="14" y2="19"/>
            <path d="M5 26L4 40L18 40L17 26Z"/>
            <line x1="2" y1="40" x2="20" y2="40"/>
          </symbol>

          {/* ── Windmill 32×40 ── */}
          <symbol id="s-windmill" viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 39L10 18L22 18L19 39Z"/>
            <line x1="8" y1="39" x2="24" y2="39"/>
            <circle cx="16" cy="18" r="2.5"/>
            <path d="M16 16L14 5L16 15L18 5Z"/>
            <path d="M18 19L28 14L18 18L28 22Z"/>
            <path d="M16 20L18 31L16 21L14 31Z"/>
            <path d="M14 19L4 22L14 20L4 14Z"/>
          </symbol>

          {/* ── Suspension Bridge 50×24 ── */}
          <symbol id="s-bridge" viewBox="0 0 50 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="0" y1="18" x2="50" y2="18"/>
            <line x1="11" y1="3" x2="11" y2="22"/><line x1="8" y1="10" x2="14" y2="10"/>
            <line x1="39" y1="3" x2="39" y2="22"/><line x1="36" y1="10" x2="42" y2="10"/>
            <path d="M11 4Q25 20 39 4"/>
            <path d="M0 18Q11 14 11 4"/><path d="M50 18Q39 14 39 4"/>
            <line x1="18" y1="13" x2="18" y2="18"/>
            <line x1="25" y1="10" x2="25" y2="18"/>
            <line x1="32" y1="13" x2="32" y2="18"/>
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

          {/* ── Airplane 42×22 ── */}
          <symbol id="s-plane" viewBox="0 0 42 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11C4 11 20 8 33 9.5C37 10 40 10.5 41 11C40 11.5 37 12 33 12.5C20 14 4 11 4 11Z"/>
            <path d="M15 11L8 3L27 9.5Z"/><path d="M15 11L8 19L27 12.5Z"/>
            <path d="M6 11L4 7L10 10"/><path d="M6 11L4 15L10 12"/>
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

          {/* ── Sailboat 38×36 ── */}
          <symbol id="s-boat" viewBox="0 0 38 36" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="3" x2="19" y2="24"/>
            <path d="M19 5L5 22L33 22Z"/><path d="M19 8L33 20L19 24"/>
            <path d="M5 24Q19 30 33 24L31 27Q19 34 7 27Z"/>
            <path d="M2 29Q19 35 36 29" strokeWidth="0.6"/>
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

          {/* ── Helicopter 40×22 ── */}
          <symbol id="s-helicopter" viewBox="0 0 40 22" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="5" x2="35" y2="5"/>
            <circle cx="19" cy="5" r="2"/>
            <path d="M8 8Q6 8 6 12L6 16Q8 18 14 18L26 18Q32 18 32 14L32 8Z"/>
            <path d="M28 11L38 8L38 14L30 13"/>
            <line x1="36" y1="7" x2="36" y2="15"/>
            <line x1="8" y1="18" x2="8" y2="22"/><line x1="24" y1="18" x2="24" y2="22"/>
            <line x1="4" y1="22" x2="30" y2="22"/>
          </symbol>

          {/* ── Cable Car 28×26 ── */}
          <symbol id="s-cable" viewBox="0 0 28 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="0" y1="5" x2="28" y2="5"/>
            <line x1="14" y1="5" x2="14" y2="9"/>
            <rect x="5" y="9" width="18" height="12" rx="2"/>
            <rect x="8" y="12" width="4" height="4" rx="0.5"/>
            <rect x="16" y="12" width="4" height="4" rx="0.5"/>
            <line x1="3" y1="21" x2="25" y2="21"/>
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

          {/* ── Mountain 48×28 ── */}
          <symbol id="s-mountain" viewBox="0 0 48 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 26L18 3L34 26Z"/>
            <path d="M12 13L18 3L24 13C21 11 15 11 12 13Z"/>
            <path d="M28 26L37 11L46 26"/>
            <path d="M32 17L37 11L42 17C40 16 34 16 32 17Z"/>
            <line x1="0" y1="26" x2="48" y2="26"/>
          </symbol>

          {/* ── Palm Tree 22×42 ── */}
          <symbol id="s-palm" viewBox="0 0 22 42" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 42C11 33 10 25 11 17C12 11 13 7 12 3"/>
            <path d="M12 3C8 1 3 3 1 0C5 2 9 5 11 9"/>
            <path d="M12 3C12 0 14 0 14 0C13 3 13 7 12 9"/>
            <path d="M12 3C16 1 20 3 21 0C18 2 14 5 12 9"/>
            <path d="M12 3C7 2 3 4 1 2C5 4 10 6 12 9"/>
          </symbol>

          {/* ── Cactus 22×40 ── */}
          <symbol id="s-cactus" viewBox="0 0 22 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="11" y1="38" x2="11" y2="16"/>
            <path d="M8 16C8 10 14 10 14 16"/>
            <path d="M11 24L5 24L5 17"/><path d="M3 17C3 13 7 13 7 17"/>
            <path d="M11 30L17 30L17 23"/><path d="M15 23C15 19 19 19 19 23"/>
            <path d="M7 38Q11 36 15 38"/>
          </symbol>

          {/* ── Wave 38×18 ── */}
          <symbol id="s-wave" viewBox="0 0 38 18" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 10C4 4 8 4 11 10C14 16 18 16 21 10C24 4 28 4 31 10C33 14 35 13 37 10"/>
            <path d="M1 15C4 11 7 11 10 15C13 18 16 18 19 15" strokeWidth="0.6"/>
          </symbol>

          {/* ── Volcano 38×34 ── */}
          <symbol id="s-volcano" viewBox="0 0 38 34" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 32L13 14L16 14L19 8L22 14L25 14L36 32Z"/>
            <path d="M16 12Q14 6 17 3Q19 1 21 5Q23 1 26 4Q24 8 25 14"/>
            <line x1="0" y1="32" x2="38" y2="32"/>
            <line x1="10" y1="28" x2="28" y2="28"/>
          </symbol>

          {/* ── Paper Lantern 18×32 ── */}
          <symbol id="s-lantern" viewBox="0 0 18 32" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="2" x2="11" y2="2"/>
            <line x1="9" y1="2" x2="9" y2="5"/>
            <path d="M9 5C4 5 2 10 2 16C2 22 4 27 9 27C14 27 16 22 16 16C16 10 14 5 9 5Z"/>
            <path d="M9 5C7 10 7 22 9 27"/><path d="M9 5C11 10 11 22 9 27"/>
            <line x1="2.5" y1="13" x2="15.5" y2="13"/>
            <line x1="2.5" y1="19" x2="15.5" y2="19"/>
            <line x1="9" y1="27" x2="9" y2="31"/>
            <line x1="7" y1="29" x2="11" y2="29"/>
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

          {/* ── Globe 30×34 ── */}
          <symbol id="s-globe" viewBox="0 0 30 34" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15" cy="14" r="13"/><ellipse cx="15" cy="14" rx="6" ry="13"/>
            <path d="M2 9Q15 5 28 9" strokeWidth="0.6"/>
            <line x1="2" y1="14" x2="28" y2="14" strokeWidth="0.7"/>
            <path d="M2 19Q15 23 28 19" strokeWidth="0.6"/>
            <line x1="15" y1="27" x2="15" y2="31"/>
            <line x1="9" y1="31" x2="21" y2="31"/>
          </symbol>

          {/* ── Camera 38×24 ── */}
          <symbol id="s-camera" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="34" height="17" rx="3"/>
            <path d="M13 6L11 1L27 1L25 6"/>
            <circle cx="19" cy="14.5" r="6.5"/><circle cx="19" cy="14.5" r="3.5"/>
            <circle cx="29" cy="9" r="2.5"/>
            <rect x="4" y="9" width="5" height="4" rx="1" strokeWidth="0.6"/>
          </symbol>

          {/* ── Map Pin 18×26 ── */}
          <symbol id="s-pin" viewBox="0 0 18 26" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 1C5 1 1 5 1 9C1 16 9 25 9 25C9 25 17 16 17 9C17 5 13 1 9 1Z"/>
            <circle cx="9" cy="9" r="3.5"/>
          </symbol>

          {/* ── Suitcase 28×28 ── */}
          <symbol id="s-suitcase" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 8Q10 3 14 3Q18 3 18 8"/>
            <rect x="2" y="8" width="24" height="16" rx="3"/>
            <line x1="2" y1="14" x2="26" y2="14"/>
            <rect x="11" y="11" width="6" height="6" rx="1"/>
            <circle cx="8" cy="26" r="2"/><circle cx="20" cy="26" r="2"/>
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

          {/* ── Tent 36×28 ── */}
          <symbol id="s-tent" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 26L18 3L34 26Z"/>
            <path d="M14 26L18 10L22 26"/>
            <line x1="0" y1="26" x2="36" y2="26"/>
            <line x1="5" y1="26" x2="2" y2="30"/>
            <line x1="31" y1="26" x2="34" y2="30"/>
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

          {/* ── Sparkle 14×14 ── */}
          <symbol id="s-spark" viewBox="0 0 14 14">
            <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7Z" fill="currentColor" opacity="0.65"/>
          </symbol>

          {/* ════════════════ TINY FILLER ICONS ════════════════ */}

          {/* ── 5-point star 12×12 ── */}
          <symbol id="s-star5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1L7.2 4.4L11 4.4L8.1 6.6L9.2 10L6 7.8L2.8 10L3.9 6.6L1 4.4L4.8 4.4Z"/>
          </symbol>

          {/* ── Double ring 12×12 ── */}
          <symbol id="s-ring" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="5"/>
            <circle cx="6" cy="6" r="2.5"/>
          </symbol>

          {/* ── Diamond 10×14 ── */}
          <symbol id="s-diamond" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 1L9 5L5 13L1 5Z"/>
            <line x1="1" y1="5" x2="9" y2="5"/>
            <line x1="3" y1="5" x2="5" y2="13"/>
            <line x1="7" y1="5" x2="5" y2="13"/>
          </symbol>

          {/* ── Heart 12×11 ── */}
          <symbol id="s-heart" viewBox="0 0 12 11" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 10Q1 6.5 1 3.5Q1 1 3.5 1Q5 1 6 2.5Q7 1 8.5 1Q11 1 11 3.5Q11 6.5 6 10Z"/>
          </symbol>

          {/* ── Crescent moon 12×12 ── */}
          <symbol id="s-moon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2Q12 5 12 6Q12 10 8 11Q5 12 2 10Q5 10 7 8Q9 6 8 2Q8.5 1.5 9 2Z"/>
          </symbol>

          {/* ── Mini sun 14×14 ── */}
          <symbol id="s-sun" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="3"/>
            <line x1="7" y1="1" x2="7" y2="3"/>
            <line x1="7" y1="11" x2="7" y2="13"/>
            <line x1="1" y1="7" x2="3" y2="7"/>
            <line x1="11" y1="7" x2="13" y2="7"/>
            <line x1="3" y1="3" x2="4.4" y2="4.4"/>
            <line x1="11" y1="3" x2="9.6" y2="4.4"/>
            <line x1="3" y1="11" x2="4.4" y2="9.6"/>
            <line x1="11" y1="11" x2="9.6" y2="9.6"/>
          </symbol>

          {/* ── Leaf 10×14 ── */}
          <symbol id="s-leaf" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13Q0 9 1 5Q2 1 5 1Q8 1 9 5Q10 9 5 13Z"/>
            <line x1="5" y1="13" x2="5" y2="2"/>
            <line x1="5" y1="9" x2="2.5" y2="7"/>
            <line x1="5" y1="7" x2="7.5" y2="5"/>
          </symbol>

          {/* ── Water drop 10×14 ── */}
          <symbol id="s-drop" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 1Q9 6 9 9Q9 13 5 13Q1 13 1 9Q1 6 5 1Z"/>
          </symbol>

          {/* ── Triangle 10×12 ── */}
          <symbol id="s-tri" viewBox="0 0 10 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 1L9 11L1 11Z"/>
            <line x1="3.5" y1="7.5" x2="6.5" y2="7.5"/>
          </symbol>

          {/* ── Three dots 14×6 ── */}
          <symbol id="s-dot3" viewBox="0 0 14 6">
            <circle cx="2" cy="3" r="1.5" fill="currentColor" opacity="0.7"/>
            <circle cx="7" cy="3" r="1.5" fill="currentColor" opacity="0.7"/>
            <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity="0.7"/>
          </symbol>

          {/* ── 8-point asterisk 12×12 ── */}
          <symbol id="s-cross2" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11"/>
            <line x1="1" y1="6" x2="11" y2="6"/>
            <line x1="2.5" y1="2.5" x2="9.5" y2="9.5"/>
            <line x1="9.5" y1="2.5" x2="2.5" y2="9.5"/>
          </symbol>

          {/* ── Flower petal 12×12 ── */}
          <symbol id="s-petal" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1Q9 3 9 6Q9 9 6 11Q3 9 3 6Q3 3 6 1Z"/>
            <path d="M1 6Q3 3 6 3Q9 3 11 6Q9 9 6 9Q3 9 1 6Z"/>
            <circle cx="6" cy="6" r="1.5"/>
          </symbol>

        </defs>

        {/* filler layer — tiny decorative icons fill every gap */}
        {fillItems.map(({ icon, x, y, w, h, cx, cy, rot }, i) => (
          <g key={`f${i}`} transform={`rotate(${rot.toFixed(1)},${cx.toFixed(1)},${cy.toFixed(1)})`}>
            <use href={`#${icon}`} x={x.toFixed(1)} y={y.toFixed(1)} width={w.toFixed(1)} height={h.toFixed(1)} />
          </g>
        ))}

        {/* main layer — travel landmarks and transport icons */}
        {mainItems.map(({ icon, x, y, w, h, cx, cy, rot }, i) => (
          <g key={`m${i}`} transform={`rotate(${rot.toFixed(1)},${cx.toFixed(1)},${cy.toFixed(1)})`}>
            <use href={`#${icon}`} x={x.toFixed(1)} y={y.toFixed(1)} width={w.toFixed(1)} height={h.toFixed(1)} />
          </g>
        ))}

      </svg>
    </div>
  )
}
