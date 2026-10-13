// Architecture of the AI-assisted UI personalization extension (SEP project),
// redrawn in English from the original building-block diagram.
const Box = ({ x, y, w, h, label, sub, tone = 'plain' }) => (
  <g className={`dg-box ${tone}`}>
    <rect x={x} y={y} width={w} height={h} rx='8' />
    <text x={x + w / 2} y={y + h / 2 + (sub ? -3 : 4)} textAnchor='middle'>
      {label}
    </text>
    {sub && (
      <text
        className='dg-sub'
        x={x + w / 2}
        y={y + h / 2 + 12}
        textAnchor='middle'
      >
        {sub}
      </text>
    )}
  </g>
);

const MODULES = [
  { label: 'ai', y: 98, tone: 'accent' },
  { label: 'drag-and-drop', y: 163 },
  { label: 'template', y: 228 },
  { label: 'version-control', y: 293 },
];

const SepDiagram = () => (
  <svg
    className='dg'
    viewBox='0 0 780 400'
    role='img'
    aria-label='Architecture diagram'
  >
    <defs>
      <marker
        id='dg-arrow'
        viewBox='0 0 10 10'
        refX='9'
        refY='5'
        markerWidth='7'
        markerHeight='7'
        orient='auto-start-reverse'
      >
        <path d='M0 0 10 5 0 10z' />
      </marker>
    </defs>

    <rect
      className='dg-frame'
      x='170'
      y='14'
      width='470'
      height='372'
      rx='14'
    />
    <text className='dg-title' x='188' y='38'>
      Cody Engine
    </text>

    <rect
      className='dg-group'
      x='190'
      y='56'
      width='200'
      height='308'
      rx='10'
    />
    <text className='dg-sub' x='204' y='76'>
      110-Devs extension
    </text>

    {MODULES.map((m) => (
      <Box
        key={m.label}
        x={210}
        y={m.y}
        w={160}
        h={46}
        label={m.label}
        tone={m.tone}
      />
    ))}

    <Box x={450} y={98} w={170} h={50} label='Frontend' sub='React' />
    <Box
      x={450}
      y={293}
      w={170}
      h={50}
      label='Existing subsystems'
      tone='muted'
    />

    {/* module -> frontend bus */}
    <g className='dg-line'>
      {MODULES.map((m) => (
        <path key={m.label} d={`M370 ${m.y + 23}H420`} />
      ))}
      <path d='M420 121V316' />
      <path d='M420 123H448' markerEnd='url(#dg-arrow)' />
      <path
        d='M535 148V291'
        markerStart='url(#dg-arrow)'
        markerEnd='url(#dg-arrow)'
      />
    </g>

    {/* ollama */}
    <Box x={14} y={98} w={130} h={46} label='Ollama server' sub='local LLM' />
    <g className='dg-line'>
      <path d='M144 110H208' markerEnd='url(#dg-arrow)' />
      <path d='M208 132H144' markerEnd='url(#dg-arrow)' />
    </g>
    <text className='dg-sub' x='176' y='102' textAnchor='middle'>
      prompt
    </text>
    <text className='dg-sub' x='176' y='150' textAnchor='middle'>
      response
    </text>

    {/* user */}
    <g className='dg-line'>
      <circle cx='712' cy='96' r='11' />
      <path d='M712 107V140M690 118H734M712 140 698 164M712 140 726 164' />
      <path d='M684 123H622' strokeDasharray='4 4' markerEnd='url(#dg-arrow)' />
    </g>
    <text className='dg-sub' x='712' y='182' textAnchor='middle'>
      User
    </text>

    {/* proophboard */}
    <Box x={672} y={293} w={98} h={50} label='prooph board' tone='muted' />
    <path className='dg-line' d='M620 318H670' markerEnd='url(#dg-arrow)' />
  </svg>
);

export default SepDiagram;
