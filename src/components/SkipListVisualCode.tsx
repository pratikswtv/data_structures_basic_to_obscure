import type { ReactNode } from 'react'

/** Compact lane diagram — sits beside next[] in the code */
function NextArrayHint() {
  const lanes = [
    { level: 2, color: '#FFC93C' },
    { level: 1, color: '#6BCB77' },
    { level: 0, color: '#4D96FF' },
  ]

  return (
    <div className="skip-next-hint my-3 flex items-center gap-4 font-mono text-xs sm:text-sm">
      <div className="space-y-1">
        {lanes.map(({ level, color }) => (
          <div key={level} className="flex items-center gap-2 text-gray-400">
            <span style={{ color }}>next[{level}]</span>
            <svg viewBox="0 0 40 10" className="h-2.5 w-10" aria-hidden>
              <line x1="0" y1="5" x2="30" y2="5" stroke={color} strokeWidth="2" />
              <polygon points="30,2 38,5 30,8" fill={color} />
            </svg>
            <span className="text-gray-500">L{level}</span>
          </div>
        ))}
      </div>
      <p className="max-w-[11rem] text-[11px] leading-snug text-gray-500 sm:text-xs">
        one pointer per level — higher index = express lane
      </p>
    </div>
  )
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="skip-code-block rounded-2xl border-2 border-white/15 bg-black/60 px-4 py-4 font-mono text-sm leading-relaxed text-gray-200 sm:px-6 sm:py-5 sm:text-base">
      {children}
    </div>
  )
}

export default function SkipListVisualCode() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-mono text-lg font-bold text-[#4D96FF] sm:text-xl">class SkipNode</h3>
        <CodeBlock>
          <span className="text-[#FFC93C]">class</span> <span className="text-white">SkipNode</span>{' '}
          {'{'}
          <br />
          <br />
          &nbsp;&nbsp;Key key;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <br />
          &nbsp;&nbsp;SkipNode[] next;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-gray-500">// next[i] → next node at level i</span>
          <br />
          <NextArrayHint />
          <br />
          &nbsp;&nbsp;SkipNode(Key key, <span className="text-[#4D96FF]">int</span> level){' '}
          {'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.key = key;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.next = <span className="text-[#6BCB77]">new</span> SkipNode[level];
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// all slots start as null</span>
          <br />
          &nbsp;&nbsp;{'}'}
          <br />
          {'}'}
        </CodeBlock>
      </div>

      <div>
        <h3 className="mb-3 font-mono text-lg font-bold text-[#C77DFF] sm:text-xl">class SkipList</h3>
        <CodeBlock>
          <span className="text-[#FFC93C]">class</span> <span className="text-white">SkipList</span>{' '}
          {'{'}
          <br />
          <br />
          &nbsp;&nbsp;<span className="text-[#4D96FF]">int</span> max_level;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-gray-500">// max tower height allowed</span>
          <br />
          &nbsp;&nbsp;<span className="text-[#4D96FF]">int</span> current_level;
          <span className="text-gray-500">// highest level in use right now</span>
          <br />
          &nbsp;&nbsp;<span className="text-[#4D96FF]">float</span> probability;
          <span className="text-gray-500">// coin-flip to go up a level (0.5)</span>
          <br />
          &nbsp;&nbsp;SkipNode header;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-gray-500">// dummy start node, no real data</span>
          <br />
          <br />
          &nbsp;&nbsp;SkipList(<span className="text-[#4D96FF]">int</span> max_level, <span className="text-[#4D96FF]">float</span> probability = 0.5f){' '}
          {'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.max_level = max_level;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.probability = probability;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.current_level = 0;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// header spans all levels — search starts here</span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.header = <span className="text-[#6BCB77]">new</span> SkipNode(
          <span className="text-[#FF5757]">null</span>, max_level);
          <br />
          &nbsp;&nbsp;{'}'}
          <br />
          {'}'}
        </CodeBlock>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          <span className="font-mono text-[#6BCB77]">header</span> = the{' '}
          <span className="font-mono">-∞</span> sentinel at the top of your diagram — every search
          begins there.
        </p>
      </div>

      <div>
        <h3 className="mb-3 font-mono text-lg font-bold text-[#6BCB77] sm:text-xl">Time complexity</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              op: 'Search',
              complexity: 'O(log n)',
              color: '#4D96FF',
              detail: 'Walk express lanes, then drop down level by level.',
            },
            {
              op: 'Insert',
              complexity: 'O(log n)',
              color: '#FFC93C',
              detail: 'Find position, then splice the new tower at each level.',
            },
            {
              op: 'Delete',
              complexity: 'O(log n)',
              color: '#FF5757',
              detail: 'Find the node, then unlink it at every level it appears.',
            },
          ].map(({ op, complexity, color, detail }) => (
            <div
              key={op}
              className="rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-4 sm:px-5 sm:py-5"
            >
              <p className="text-sm font-bold tracking-wide text-gray-300 uppercase">{op}</p>
              <p className="mt-2 font-mono text-2xl font-bold sm:text-3xl" style={{ color }}>
                {complexity}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          Average case with <span className="font-mono">n</span> keys and fair randomization (
          <span className="font-mono">p = 0.5</span>). Worst case{' '}
          <span className="font-mono text-gray-300">O(n)</span> if every tower collapses to one lane.
        </p>
      </div>
    </div>
  )
}
