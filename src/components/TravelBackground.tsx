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
        style={{ color: '#00C896', opacity: 0.18 }}
      >
        <defs>
          {/* Eiffel Tower */}
          <symbol id="tb-eiffel" viewBox="0 0 50 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 2L22 14L28 14Z"/>
            <path d="M19 14L31 14L33 32L17 32Z"/>
            <path d="M14 32L36 32L40 55L10 55Z"/>
            <path d="M8 72C8 62 18 58 25 56C32 58 42 62 42 72"/>
            <line x1="5" y1="72" x2="45" y2="72"/>
            <line x1="18" y1="38" x2="32" y2="38"/>
            <line x1="13" y1="60" x2="37" y2="60"/>
          </symbol>

          {/* Big Ben */}
          <symbol id="tb-bigben" viewBox="0 0 40 82" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8L12 0L28 0L24 8Z"/>
            <rect x="10" y="8" width="20" height="20"/>
            <circle cx="20" cy="18" r="7"/>
            <line x1="20" y1="11" x2="20" y2="18"/>
            <line x1="20" y1="18" x2="26" y2="15"/>
            <rect x="8" y="28" width="24" height="48"/>
            <line x1="8" y1="54" x2="32" y2="54"/>
            <line x1="2" y1="54" x2="8" y2="54"/>
            <line x1="32" y1="54" x2="38" y2="54"/>
            <line x1="2" y1="74" x2="8" y2="74"/>
            <line x1="32" y1="74" x2="38" y2="74"/>
            <rect x="4" y="76" width="32" height="4"/>
          </symbol>

          {/* Hot air balloon */}
          <symbol id="tb-balloon" viewBox="0 0 50 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 5C12 5 5 14 5 24C5 36 15 48 25 50C35 48 45 36 45 24C45 14 38 5 25 5Z"/>
            <line x1="25" y1="5" x2="25" y2="50"/>
            <path d="M5 24Q25 15 45 24"/>
            <path d="M5 38Q25 29 45 38"/>
            <path d="M15 49L12 59L38 59L35 49"/>
            <rect x="14" y="59" width="22" height="9" rx="2"/>
          </symbol>

          {/* Compass */}
          <symbol id="tb-compass" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="25" cy="25" r="22"/>
            <polygon points="25,8 28,25 25,32 22,25" fill="currentColor" opacity="0.4"/>
            <polygon points="25,42 22,25 25,18 28,25"/>
            <line x1="25" y1="3" x2="25" y2="8"/>
            <line x1="25" y1="42" x2="25" y2="47"/>
            <line x1="3" y1="25" x2="8" y2="25"/>
            <line x1="42" y1="25" x2="47" y2="25"/>
            <circle cx="25" cy="25" r="3"/>
          </symbol>

          {/* Mountain */}
          <symbol id="tb-mountain" viewBox="0 0 80 55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 53L32 5L60 53Z"/>
            <path d="M42 53L60 22L78 53"/>
            <path d="M24 22L32 5L40 22Z"/>
          </symbol>

          {/* Palm tree */}
          <symbol id="tb-palm" viewBox="0 0 50 70" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 68C24 55 23 46 24 32"/>
            <path d="M24 32C18 28 10 22 8 14C16 18 21 26 24 32"/>
            <path d="M24 32C20 22 20 13 24 8C26 18 26 26 24 32"/>
            <path d="M24 32C30 22 38 16 44 12C38 20 30 27 24 32"/>
            <path d="M24 32C16 28 8 28 4 24C12 24 20 28 24 32"/>
          </symbol>

          {/* Airplane */}
          <symbol id="tb-plane" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 20L55 8L48 20L55 32Z"/>
            <path d="M18 20L12 32L22 30L26 20"/>
            <path d="M38 13L35 8L42 6"/>
          </symbol>

          {/* Suitcase */}
          <symbol id="tb-suitcase" viewBox="0 0 50 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="14" width="42" height="30" rx="4"/>
            <path d="M18 14V8C18 6 20 4 25 4C30 4 32 6 32 8V14"/>
            <line x1="25" y1="14" x2="25" y2="44"/>
            <line x1="4" y1="26" x2="46" y2="26"/>
            <line x1="12" y1="44" x2="12" y2="48"/>
            <line x1="38" y1="44" x2="38" y2="48"/>
          </symbol>

          {/* Map pin */}
          <symbol id="tb-pin" viewBox="0 0 30 46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2C8 2 2 8 2 15C2 24 15 44 15 44C15 44 28 24 28 15C28 8 22 2 15 2Z"/>
            <circle cx="15" cy="15" r="5"/>
          </symbol>

          {/* Camera */}
          <symbol id="tb-camera" viewBox="0 0 55 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="10" width="51" height="30" rx="4"/>
            <path d="M19 10L15 2L40 2L36 10"/>
            <circle cx="27" cy="25" r="10"/>
            <circle cx="27" cy="25" r="5"/>
            <circle cx="45" cy="16" r="3"/>
          </symbol>

          {/* Globe */}
          <symbol id="tb-globe" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="25" cy="25" r="22"/>
            <ellipse cx="25" cy="25" rx="10" ry="22"/>
            <line x1="3" y1="25" x2="47" y2="25"/>
            <path d="M5 14Q25 18 45 14"/>
            <path d="M5 36Q25 32 45 36"/>
          </symbol>

          {/* Anchor */}
          <symbol id="tb-anchor" viewBox="0 0 40 55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="20" cy="8" r="6"/>
            <line x1="20" y1="14" x2="20" y2="50"/>
            <line x1="8" y1="22" x2="32" y2="22"/>
            <path d="M20 50C10 50 6 44 6 38"/>
            <path d="M20 50C30 50 34 44 34 38"/>
          </symbol>

          {/* Passport */}
          <symbol id="tb-passport" viewBox="0 0 36 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="2" width="30" height="44" rx="4"/>
            <line x1="8" y1="8" x2="28" y2="8"/>
            <circle cx="18" cy="24" r="8"/>
            <ellipse cx="18" cy="24" rx="4" ry="8"/>
            <line x1="10" y1="24" x2="26" y2="24"/>
            <line x1="8" y1="38" x2="28" y2="38"/>
          </symbol>

          {/* Wave */}
          <symbol id="tb-wave" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M0 10C8 2 16 18 24 10C32 2 40 18 48 10C52 6 56 8 60 10"/>
          </symbol>

          {/* Sparkle */}
          <symbol id="tb-spark" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <line x1="10" y1="1" x2="10" y2="19"/>
            <line x1="1" y1="10" x2="19" y2="10"/>
            <line x1="3" y1="3" x2="17" y2="17"/>
            <line x1="17" y1="3" x2="3" y2="17"/>
          </symbol>

          {/* Lighthouse */}
          <symbol id="tb-lighthouse" viewBox="0 0 36 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 0H24V10H12Z"/>
            <path d="M10 10H26L28 60H8Z"/>
            <line x1="8" y1="28" x2="28" y2="28"/>
            <line x1="8" y1="44" x2="28" y2="44"/>
            <path d="M6 60H30V70H6Z"/>
            <path d="M4 8L8 6M32 8L28 6"/>
          </symbol>

          {/* Sailboat */}
          <symbol id="tb-boat" viewBox="0 0 60 55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 5L30 40"/>
            <path d="M30 8L10 38L50 38Z"/>
            <path d="M8 40Q30 48 52 40"/>
            <path d="M4 48Q30 56 56 48"/>
          </symbol>

          {/* Binoculars */}
          <symbol id="tb-binoculars" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="25" r="12"/>
            <circle cx="36" cy="25" r="12"/>
            <circle cx="14" cy="25" r="6"/>
            <circle cx="36" cy="25" r="6"/>
            <path d="M14 13L14 8Q14 5 20 5H30Q36 5 36 8L36 13"/>
            <line x1="22" y1="25" x2="28" y2="25"/>
          </symbol>
        </defs>

        {/* ─── CLUSTER 1 — Top left: Eiffel Tower + airplane ─── */}
        <use href="#tb-eiffel" x="62" y="32" width="48" height="77"/>
        <use href="#tb-plane" x="126" y="48" width="46" height="30" transform="rotate(-18 149 63)"/>
        <use href="#tb-pin" x="52" y="118" width="24" height="37"/>
        <use href="#tb-spark" x="120" y="22" width="16" height="16"/>
        <use href="#tb-spark" x="172" y="80" width="11" height="11"/>

        {/* ─── CLUSTER 2 — Top right: Big Ben + balloon ─── */}
        <use href="#tb-bigben" x="1092" y="18" width="36" height="74"/>
        <use href="#tb-balloon" x="1030" y="22" width="44" height="62"/>
        <use href="#tb-wave" x="1025" y="96" width="58" height="19"/>
        <use href="#tb-spark" x="1082" y="10" width="15" height="15"/>
        <use href="#tb-spark" x="1145" y="86" width="10" height="10"/>

        {/* ─── CLUSTER 3 — Upper center: Globe + compass + pin ─── */}
        <use href="#tb-globe" x="572" y="22" width="54" height="54"/>
        <use href="#tb-compass" x="644" y="30" width="50" height="50"/>
        <use href="#tb-pin" x="542" y="32" width="26" height="40"/>
        <use href="#tb-spark" x="620" y="12" width="13" height="13"/>
        <use href="#tb-spark" x="532" y="84" width="10" height="10"/>

        {/* ─── CLUSTER 4 — Left middle: Mountain + palm + wave ─── */}
        <use href="#tb-mountain" x="38" y="258" width="78" height="54"/>
        <use href="#tb-palm" x="132" y="250" width="46" height="64"/>
        <use href="#tb-wave" x="42" y="328" width="62" height="19"/>
        <use href="#tb-spark" x="30" y="248" width="14" height="14"/>
        <use href="#tb-spark" x="178" y="322" width="10" height="10"/>

        {/* ─── CLUSTER 5 — Right middle: Lighthouse + palm ─── */}
        <use href="#tb-lighthouse" x="1162" y="255" width="38" height="74"/>
        <use href="#tb-palm" x="1218" y="268" width="44" height="62"/>
        <use href="#tb-wave" x="1155" y="340" width="56" height="18"/>
        <use href="#tb-spark" x="1150" y="248" width="13" height="13"/>
        <use href="#tb-spark" x="1258" y="338" width="10" height="10"/>

        {/* ─── CLUSTER 6 — Center: Airplane + compass + pin ─── */}
        <use href="#tb-plane" x="548" y="368" width="60" height="40" transform="rotate(20 578 388)"/>
        <use href="#tb-compass" x="638" y="352" width="54" height="54"/>
        <use href="#tb-pin" x="510" y="360" width="24" height="37"/>
        <use href="#tb-spark" x="598" y="348" width="12" height="12"/>
        <use href="#tb-spark" x="692" y="408" width="10" height="10"/>

        {/* ─── CLUSTER 7 — Bottom left: Suitcase + camera + passport ─── */}
        <use href="#tb-suitcase" x="72" y="568" width="54" height="52"/>
        <use href="#tb-camera" x="152" y="558" width="54" height="42"/>
        <use href="#tb-passport" x="66" y="632" width="36" height="48"/>
        <use href="#tb-wave" x="66" y="692" width="50" height="16"/>
        <use href="#tb-spark" x="52" y="560" width="13" height="13"/>
        <use href="#tb-spark" x="205" y="614" width="10" height="10"/>

        {/* ─── CLUSTER 8 — Bottom center: Anchor + sailboat + waves ─── */}
        <use href="#tb-anchor" x="578" y="658" width="44" height="60"/>
        <use href="#tb-boat" x="638" y="650" width="56" height="52"/>
        <use href="#tb-wave" x="528" y="728" width="65" height="20"/>
        <use href="#tb-wave" x="602" y="748" width="52" height="16"/>
        <use href="#tb-spark" x="570" y="652" width="12" height="12"/>
        <use href="#tb-spark" x="698" y="706" width="10" height="10"/>

        {/* ─── CLUSTER 9 — Bottom right: Balloon + binoculars + pin ─── */}
        <use href="#tb-balloon" x="1092" y="585" width="50" height="70"/>
        <use href="#tb-binoculars" x="1162" y="618" width="52" height="42"/>
        <use href="#tb-pin" x="1172" y="672" width="26" height="40"/>
        <use href="#tb-wave" x="1082" y="688" width="60" height="18"/>
        <use href="#tb-spark" x="1152" y="580" width="13" height="13"/>
        <use href="#tb-spark" x="1225" y="670" width="10" height="10"/>

        {/* ─── CLUSTER 10 — Center-left fill ─── */}
        <use href="#tb-passport" x="340" y="340" width="34" height="46"/>
        <use href="#tb-plane" x="400" y="308" width="44" height="29" transform="rotate(-12 422 322)"/>
        <use href="#tb-spark" x="388" y="298" width="13" height="13"/>

        {/* ─── CLUSTER 11 — Center-right fill ─── */}
        <use href="#tb-eiffel" x="940" y="320" width="44" height="70"/>
        <use href="#tb-balloon" x="1002" y="310" width="38" height="54"/>
        <use href="#tb-spark" x="934" y="314" width="12" height="12"/>

        {/* ─── CLUSTER 12 — Mid-center: boat + wave ─── */}
        <use href="#tb-boat" x="320" y="480" width="56" height="52"/>
        <use href="#tb-wave" x="312" y="542" width="62" height="18"/>
        <use href="#tb-anchor" x="390" y="478" width="38" height="52"/>
        <use href="#tb-spark" x="306" y="472" width="12" height="12"/>

        {/* ─── CLUSTER 13 — Upper-mid-right fill ─── */}
        <use href="#tb-binoculars" x="840" y="160" width="52" height="42"/>
        <use href="#tb-mountain" x="910" y="148" width="66" height="46"/>
        <use href="#tb-spark" x="836" y="152" width="11" height="11"/>

        {/* ─── CLUSTER 14 — Lower-mid-left fill ─── */}
        <use href="#tb-globe" x="232" y="570" width="46" height="46"/>
        <use href="#tb-compass" x="290" y="565" width="48" height="48"/>
        <use href="#tb-spark" x="226" y="562" width="12" height="12"/>

        {/* ─── SCATTERED secondary elements ─── */}

        {/* Small Eiffel top-center-left */}
        <use href="#tb-eiffel" x="322" y="70" width="32" height="52" opacity="0.7"/>
        <use href="#tb-plane" x="384" y="46" width="38" height="25" transform="rotate(10 403 58)" opacity="0.65"/>
        <use href="#tb-spark" x="362" y="126" width="10" height="10" opacity="0.5"/>

        {/* Small Big Ben top-right area */}
        <use href="#tb-bigben" x="862" y="38" width="30" height="62" opacity="0.65"/>
        <use href="#tb-compass" x="818" y="58" width="40" height="40" opacity="0.6"/>
        <use href="#tb-spark" x="915" y="34" width="11" height="11" opacity="0.45"/>

        {/* Mid-left: passport + suitcase cluster */}
        <use href="#tb-passport" x="285" y="410" width="32" height="44" opacity="0.65"/>
        <use href="#tb-suitcase" x="246" y="462" width="44" height="40" opacity="0.6"/>
        <use href="#tb-spark" x="300" y="406" width="10" height="10" opacity="0.45"/>

        {/* Mid-right: Mountain + palm small */}
        <use href="#tb-mountain" x="1010" y="365" width="66" height="46" opacity="0.65"/>
        <use href="#tb-palm" x="1090" y="355" width="38" height="54" opacity="0.6"/>
        <use href="#tb-spark" x="1004" y="360" width="12" height="12" opacity="0.45"/>

        {/* Scattered pins */}
        <use href="#tb-pin" x="420" y="226" width="22" height="34" opacity="0.55"/>
        <use href="#tb-pin" x="778" y="300" width="20" height="31" opacity="0.5"/>

        {/* Scattered planes */}
        <use href="#tb-plane" x="216" y="170" width="36" height="24" transform="rotate(-25 234 182)" opacity="0.55"/>
        <use href="#tb-plane" x="948" y="242" width="40" height="26" transform="rotate(15 968 255)" opacity="0.55"/>

        {/* Scattered balloons */}
        <use href="#tb-balloon" x="442" y="465" width="36" height="50" opacity="0.55"/>
        <use href="#tb-balloon" x="1260" y="440" width="34" height="48" opacity="0.55"/>

        {/* Scattered globes */}
        <use href="#tb-globe" x="184" y="635" width="42" height="42" opacity="0.55"/>
        <use href="#tb-globe" x="980" y="488" width="44" height="44" opacity="0.55"/>

        {/* Scattered mountains */}
        <use href="#tb-mountain" x="700" y="120" width="58" height="40" opacity="0.55"/>

        {/* Scattered Eiffel */}
        <use href="#tb-eiffel" x="818" y="438" width="38" height="62" opacity="0.55"/>

        {/* Scattered camera */}
        <use href="#tb-camera" x="358" y="710" width="48" height="36" opacity="0.6"/>

        {/* Scattered anchor */}
        <use href="#tb-anchor" x="900" y="665" width="36" height="50" opacity="0.6"/>

        {/* Scattered binoculars */}
        <use href="#tb-binoculars" x="458" y="282" width="48" height="38" opacity="0.55"/>

        {/* Scattered lighthouse */}
        <use href="#tb-lighthouse" x="1258" y="148" width="34" height="66" opacity="0.6"/>

        {/* Scattered sailboat */}
        <use href="#tb-boat" x="198" y="808" width="54" height="50" opacity="0.5"/>
        <use href="#tb-boat" x="748" y="780" width="50" height="46" opacity="0.5"/>

        {/* Scattered waves */}
        <use href="#tb-wave" x="348" y="820" width="50" height="16" opacity="0.45"/>
        <use href="#tb-wave" x="800" y="800" width="58" height="17" opacity="0.45"/>
        <use href="#tb-wave" x="1300" y="740" width="55" height="16" opacity="0.45"/>

        {/* Sparkles scattered across canvas */}
        <use href="#tb-spark" x="450" y="152" width="14" height="14" opacity="0.45"/>
        <use href="#tb-spark" x="750" y="192" width="12" height="12" opacity="0.4"/>
        <use href="#tb-spark" x="950" y="140" width="11" height="11" opacity="0.38"/>
        <use href="#tb-spark" x="348" y="590" width="12" height="12" opacity="0.42"/>
        <use href="#tb-spark" x="800" y="540" width="14" height="14" opacity="0.45"/>
        <use href="#tb-spark" x="450" y="715" width="11" height="11" opacity="0.38"/>
        <use href="#tb-spark" x="700" y="470" width="11" height="11" opacity="0.4"/>
        <use href="#tb-spark" x="1295" y="448" width="13" height="13" opacity="0.42"/>
        <use href="#tb-spark" x="132" y="462" width="10" height="10" opacity="0.38"/>
        <use href="#tb-spark" x="500" y="542" width="10" height="10" opacity="0.35"/>
        <use href="#tb-spark" x="870" y="320" width="12" height="12" opacity="0.38"/>
        <use href="#tb-spark" x="1180" y="480" width="11" height="11" opacity="0.38"/>
      </svg>
    </div>
  )
}
