import { Icon } from './Icons.jsx';

const constellationPoints = [[240, 43], [338, 91], [384, 184], [324, 271], [224, 310], [131, 258], [88, 170], [143, 82]];

function Fortress() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="132" />
    <circle className="environment-orbit environment-orbit--inner" cx="240" cy="180" r="96" />
    <path className="environment-line" d="M240 62 333 112v105l-93 54-93-54V112Z" />
    <path className="environment-line environment-line--soft" d="M240 88 309 126v77l-69 39-69-39v-77Z" />
    <path className="environment-rune" d="M240 107v24m0 98v24m-73-73h24m98 0h24m-125-52 17 17m70 70 17 17m0-104-17 17m-70 70-17 17" />
    {[[240, 62], [333, 112], [333, 217], [240, 271], [147, 217], [147, 112]].map(([x, y], index) => <circle key={index} className="environment-node" cx={x} cy={y} r={index % 2 ? 4 : 5} />)}
  </>;
}

function Network() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="138" />
    <g className="environment-lines">
      <path d="M240 180 240 56M240 180 348 105M240 180 365 224M240 180 240 305M240 180 113 243M240 180 126 103" />
      <path d="M113 243 240 305 365 224 348 105 240 56 126 103Z" />
      <path className="environment-line--soft" d="M126 103 348 105M113 243 365 224" />
    </g>
    {[[240, 56], [348, 105], [365, 224], [240, 305], [113, 243], [126, 103]].map(([x, y], index) => <g key={index}><circle className="environment-node-halo" cx={x} cy={y} r="11" /><circle className="environment-node" cx={x} cy={y} r="4" /></g>)}
    <rect className="environment-hub" x="206" y="146" width="68" height="68" rx="21" />
    <path className="environment-hub-mark" d="M224 180h32m-16-16v32" />
  </>;
}

function Machine() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="137" />
    <path className="environment-line environment-line--soft" d="M135 104h210M135 256h210" />
    <g className="machine-layer machine-layer--top"><rect x="148" y="91" width="184" height="57" rx="12" /><path d="M171 110h31m-31 12h66m-66 12h44" /><circle cx="306" cy="120" r="8" /></g>
    <path className="environment-line" d="M240 149v24m0 33v21" />
    <g className="machine-layer machine-layer--middle"><rect x="128" y="171" width="224" height="49" rx="12" /><path d="M151 189h42m13 0h43m13 0h68m-179 13h78m13 0h44" /></g>
    <path className="environment-line" d="M240 220v24" />
    <g className="machine-layer machine-layer--bottom"><rect x="160" y="244" width="160" height="42" rx="12" /><circle cx="185" cy="265" r="5" /><path d="M202 265h37m13 0h43" /></g>
    <circle className="environment-node" cx="240" cy="159" r="4" />
  </>;
}

function Neural() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="135" />
    <ellipse className="environment-orbit environment-orbit--inner" cx="240" cy="180" rx="94" ry="136" transform="rotate(48 240 180)" />
    <g className="environment-lines">
      <path d="M240 180 158 85m82 95 123-35m-123 35 89 103m-89-103-129 91m129-91 18-126m-18 126-15 127m15-127 111 89m-111-89-98-44m98 44 107-106" />
      <path className="environment-line--soft" d="m158 85 164 4 49 56-27 103-69 103-103-16-91-68-16-105Z" />
    </g>
    {[[240, 54], [158, 85], [322, 89], [371, 145], [351, 248], [275, 351], [172, 335], [81, 267], [65, 162], [363, 269]].map(([x, y], index) => <circle key={index} className={index % 3 === 0 ? 'environment-node environment-node--large' : 'environment-node'} cx={x} cy={y} r={index % 3 === 0 ? 5 : 3} />)}
    <circle className="neural-core" cx="240" cy="180" r="19" />
  </>;
}

function City() {
  const buildings = [
    { x: 113, y: 145, w: 49, h: 113 }, { x: 172, y: 108, w: 62, h: 150 },
    { x: 244, y: 127, w: 54, h: 131 }, { x: 307, y: 85, w: 61, h: 173 }
  ];
  return <>
    <circle className="environment-orbit" cx="240" cy="179" r="140" />
    <path className="environment-line environment-line--soft" d="M78 264h326M112 286h254" />
    {buildings.map((building, index) => <g className={`city-building city-building--${index + 1}`} key={index}>
      <path d={`M${building.x} ${building.y + building.h}V${building.y + 19}l${building.w / 2} -19 ${building.w / 2} 19v${building.h - 19}Z`} />
      {Array.from({ length: 3 }, (_, row) => Array.from({ length: 2 }, (_, column) => <rect key={`${row}-${column}`} x={building.x + 11 + column * 20} y={building.y + 33 + row * 23} width="5" height="7" rx="2" />))}
    </g>)}
    <path className="environment-rune" d="M93 264h294m-251 22h206" />
    <circle className="environment-node" cx="240" cy="66" r="4" />
  </>;
}

function Library() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="137" />
    <circle className="environment-orbit environment-orbit--inner" cx="240" cy="180" r="101" />
    <path className="book-cover" d="M112 129c49-11 91 2 128 32 37-30 79-43 128-32v116c-49-8-91 3-128 35-37-32-79-43-128-35Z" />
    <path className="environment-line" d="M240 161v119m-103-116c34-4 62 3 87 20m-87 8c33-3 61 6 87 23m-87 7c31-1 59 9 87 27m159-85c-34-4-62 3-87 20m87 8c-33-3-61 6-87 23m87 7c-31-1-59 9-87 27" />
    <path className="environment-rune" d="M240 92v24m0 129v27m-87-92h-25m224 0h-25" />
    <circle className="environment-node" cx="240" cy="92" r="4" />
    <circle className="environment-node" cx="153" cy="180" r="4" />
    <circle className="environment-node" cx="327" cy="180" r="4" />
  </>;
}

function Constellation() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="142" />
    <path className="environment-line environment-line--soft" d="M85 249 140 196l41 30 49-109 52 71 56-44 35 84-67 58-74-41-73 32Z" />
    <g className="data-stems"><path d="M111 260v-37m39 37v-72m39 72v-49m39 49V96m39 164v-84m39 84v-44m39 44v-77" /></g>
    <polyline className="data-trace" points="85,249 140,196 181,226 230,117 282,188 338,144 373,228 306,286 232,245 159,277 85,249" />
    {constellationPoints.map(([x, y], index) => <circle key={index} className={index % 3 === 0 ? 'environment-node environment-node--large' : 'environment-node'} cx={x} cy={y} r={index % 3 === 0 ? 5 : 3} />)}
  </>;
}

function Portal() {
  return <>
    <circle className="environment-orbit" cx="240" cy="180" r="139" />
    <ellipse className="environment-orbit environment-orbit--inner" cx="240" cy="180" rx="108" ry="71" transform="rotate(-23 240 180)" />
    <path className="environment-line environment-line--soft" d="M88 180h86m132 0h86M240 35v71m0 148v71" />
    <rect className="portal-frame" x="161" y="111" width="158" height="137" rx="21" />
    <path className="portal-topline" d="M161 145h158" />
    <circle className="portal-dot" cx="181" cy="128" r="3" />
    <circle className="portal-dot" cx="194" cy="128" r="3" />
    <circle className="portal-dot" cx="207" cy="128" r="3" />
    <path className="portal-door" d="M207 218v-36c0-19 15-34 33-34s33 15 33 34v36" />
    <path className="environment-rune" d="M225 218v-35c0-8 7-15 15-15s15 7 15 15v35" />
    <circle className="environment-node" cx="240" cy="72" r="4" />
  </>;
}

const scenes = {
  fortress: Fortress,
  network: Network,
  machine: Machine,
  neural: Neural,
  city: City,
  library: Library,
  constellation: Constellation,
  portal: Portal
};

export default function WorldEnvironment({ world }) {
  const environment = scenes[world.environment] ? world.environment : 'fortress';
  const Scene = scenes[environment];
  return (
    <div className={`world-environment world-environment--${environment}`} aria-hidden="true">
      <svg className="world-environment-art" viewBox="0 0 480 360" focusable="false">
        <defs>
          <radialGradient id="world-environment-glow">
            <stop offset="0%" stopColor="currentColor" stopOpacity=".16" />
            <stop offset="65%" stopColor="currentColor" stopOpacity=".035" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle className="environment-wash" cx="240" cy="180" r="168" fill="url(#world-environment-glow)" />
        <Scene />
      </svg>
      <span className="world-environment-core"><Icon name={world.icon} size={27} strokeWidth={1.45} /></span>
      <span className="world-environment-caption">WORLD {world.number} / FIELD STUDY</span>
    </div>
  );
}
