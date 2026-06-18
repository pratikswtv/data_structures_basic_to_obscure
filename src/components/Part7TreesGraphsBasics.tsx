import { useEffect, useMemo, useState } from 'react'
import GraphMatrixModal from './GraphMatrixModal'

type Lens = 'bfs' | 'dfs'

const TREE_NODES = [
  { id: 'A', x: 110, y: 40 },
  { id: 'B', x: 55, y: 110 },
  { id: 'C', x: 165, y: 110 },
  { id: 'D', x: 30, y: 180 },
  { id: 'E', x: 80, y: 180 },
  { id: 'F', x: 140, y: 180 },
  { id: 'G', x: 190, y: 180 },
] as const

const TREE_EDGES: Array<[string, string]> = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['B', 'E'],
  ['C', 'F'],
  ['C', 'G'],
]

const TREE_ORDERS: Record<Lens, string[]> = {
  bfs: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  dfs: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
}

const GRAPH_NODES = [
  { id: '1', x: 90, y: 70 },
  { id: '2', x: 160, y: 60 },
  { id: '3', x: 210, y: 120 },
  { id: '4', x: 140, y: 145 },
  { id: '5', x: 60, y: 130 },
  { id: '6', x: 115, y: 190 },
] as const

const GRAPH_EDGES: Array<[string, string]> = [
  ['1', '2'],
  ['2', '3'],
  ['1', '5'],
  ['5', '4'],
  ['2', '4'],
  ['4', '6'],
  ['5', '6'],
  ['3', '4'],
]

// Starting at node "1" with a precomputed friendly order.
const GRAPH_ORDERS: Record<Lens, string[]> = {
  bfs: ['1', '2', '5', '3', '4', '6'],
  dfs: ['1', '2', '3', '4', '5', '6'],
}

type GraphNode = { id: string; x: number; y: number }

function getNode(nodes: readonly GraphNode[], id: string) {
  return nodes.find((n) => n.id === id)
}

export default function Part7TreesGraphsBasics() {
  const [lens, setLens] = useState<Lens>('bfs')
  const [step, setStep] = useState(0)
  const [showMatrixModal, setShowMatrixModal] = useState(false)

  const treeOrder = useMemo(() => TREE_ORDERS[lens], [lens])
  const graphOrder = useMemo(() => GRAPH_ORDERS[lens], [lens])

  useEffect(() => {
    setStep(0)
  }, [lens])

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((p) => (p + 1) % treeOrder.length)
    }, 950)
    return () => window.clearInterval(id)
  }, [treeOrder.length])

  const activeTree = treeOrder.slice(0, step + 1)
  const activeGraph = graphOrder.slice(0, Math.min(step + 1, graphOrder.length))

  return (
    <section className="comic-theme relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-hidden bg-black px-6 py-10 sm:px-10">
      <GraphMatrixModal open={showMatrixModal} onClose={() => setShowMatrixModal(false)} />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_70%_20%,rgba(199,125,255,0.18)_0%,transparent_45%),radial-gradient(circle_at_20%_50%,rgba(77,150,255,0.14)_0%,transparent_45%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="space-y-4 text-center">
          <p className="text-xl font-bold text-[#C77DFF] sm:text-2xl">Part 7 — Trees & Graphs</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            When structure becomes a strategy
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
            A tree is a graph with rules. A traversal is you choosing a lens: “level first” (BFS) or “depth first” (DFS).
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Lens selector */}
          <div className="space-y-5">
            <div className="rounded-2xl border-2 border-white/15 bg-white/5 p-5">
              <p className="text-sm font-bold tracking-widest text-gray-300 uppercase">Traversal lens</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setLens('bfs')}
                  className={[
                    'rounded-full border-2 px-4 py-2 text-sm font-bold transition',
                    lens === 'bfs'
                      ? 'border-[#FFC93C] bg-[#FFC93C] text-black'
                      : 'border-white/20 bg-black/40 text-gray-200 hover:border-white/35',
                  ].join(' ')}
                >
                  BFS (level)
                </button>
                <button
                  type="button"
                  onClick={() => setLens('dfs')}
                  className={[
                    'rounded-full border-2 px-4 py-2 text-sm font-bold transition',
                    lens === 'dfs'
                      ? 'border-[#4D96FF] bg-[#4D96FF] text-black'
                      : 'border-white/20 bg-black/40 text-gray-200 hover:border-white/35',
                  ].join(' ')}
                >
                  DFS (depth)
                </button>
              </div>

              <div className="mt-4 space-y-2 text-gray-200">
                <p>
                  <span className="font-bold text-white">
                    {lens === 'bfs' ? 'BFS' : 'DFS'}:
                  </span>{' '}
                  Explore in the order your “next step” rule dictates.
                </p>
                <p className="text-sm text-gray-300">
                  You’re not just visiting nodes—you’re buying a guarantee (nearest level vs deep path).
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Trees',
                  color: '#FFC93C',
                  body: 'Hierarchy: parent routes you to children. Great for search trees and indexes.',
                },
                {
                  title: 'Graphs',
                  color: '#4D96FF',
                  body: 'Networks: multiple paths, cycles, and routing decisions.',
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border-2 border-white/15 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: c.color }}
                      aria-hidden
                    />
                    <p className="text-sm font-bold text-white">{c.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-200">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border-2 border-[#FFC93C] bg-[#FFC93C]/10 px-4 py-3.5 font-mono text-sm leading-relaxed text-gray-200 sm:px-5 sm:py-4 sm:text-base">
                <p className="mb-2 text-[10px] font-bold tracking-widest text-[#FFC93C] uppercase sm:text-xs">
                  Tree node
                </p>
                <span className="font-bold text-[#FFC93C]">class</span>{' '}
                <span className="font-bold text-white">Node</span> {'{'}
                <br />
                &nbsp;&nbsp;<span className="font-bold text-[#FFC93C]">int</span> data;
                <br />
                &nbsp;&nbsp;Node left;
                <br />
                &nbsp;&nbsp;Node right;
                <br />
                <br />
                &nbsp;&nbsp;Node(<span className="font-bold text-[#FFC93C]">int</span> data) {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.data = data;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.left ={' '}
                <span className="text-[#FF5757]">null</span>;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.right ={' '}
                <span className="text-[#FF5757]">null</span>;
                <br />
                &nbsp;&nbsp;{'}'}
                <br />
                {'}'}
              </div>

              <button
                type="button"
                onClick={() => setShowMatrixModal(true)}
                className="graph-snippet-trigger group w-full rounded-2xl border-2 border-[#4D96FF] bg-[#4D96FF]/10 px-4 py-3.5 text-left font-mono text-sm leading-relaxed text-gray-200 transition hover:bg-[#4D96FF]/20 hover:shadow-[0_0_20px_rgba(77,150,255,0.2)] sm:px-5 sm:py-4 sm:text-base"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold tracking-widest text-[#4D96FF] uppercase sm:text-xs">
                    Graph (adjacency list)
                  </p>
                  <span className="rounded-full border border-[#4D96FF]/40 bg-[#4D96FF]/15 px-2 py-0.5 text-[10px] font-bold text-[#4D96FF] opacity-0 transition group-hover:opacity-100 sm:text-xs">
                    see matrix →
                  </span>
                </div>
                <span className="font-bold text-[#FFC93C]">class</span>{' '}
                <span className="font-bold text-white">Graph</span> {'{'}
                <br />
                &nbsp;&nbsp;List&lt;List&lt;<span className="font-bold text-[#FFC93C]">Integer</span>&gt;&gt; adj;
                <br />
                <br />
                &nbsp;&nbsp;Graph(<span className="font-bold text-[#FFC93C]">int</span> V) {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;adj = <span className="text-[#6BCB77]">new</span> ArrayList&lt;&gt;();
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="font-bold text-[#FFC93C]">for</span> (<span className="font-bold text-[#FFC93C]">int</span> i = 0; i &lt; V; i++)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;adj.add(<span className="text-[#6BCB77]">new</span> ArrayList&lt;&gt;());
                <br />
                &nbsp;&nbsp;{'}'}
                <br />
                <br />
                &nbsp;&nbsp;<span className="font-bold text-[#FFC93C]">void</span> addEdge(<span className="font-bold text-[#FFC93C]">int</span> u, <span className="font-bold text-[#FFC93C]">int</span> v) {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;adj.get(u).add(v);
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;adj.get(v).add(u);
                <br />
                &nbsp;&nbsp;{'}'}
                <br />
                {'}'}
              </button>
            </div>
          </div>

          {/* Visuals */}
          <div className="space-y-5">
            <div className="rounded-2xl border-2 border-white/15 bg-black/40 p-5 backdrop-blur-sm">
              <p className="text-sm font-bold text-white">Tree traversal (highlighted order)</p>
              <svg viewBox="0 0 220 220" className="mt-4 w-full">
                {TREE_EDGES.map(([from, to]) => {
                  const a = getNode(TREE_NODES, from)
                  const b = getNode(TREE_NODES, to)
                  if (!a || !b) return null
                  const isActive = activeTree.includes(from) && activeTree.includes(to)
                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={isActive ? '#FFC93C' : 'rgba(255,255,255,0.12)'}
                      strokeWidth={isActive ? 3 : 2}
                    />
                  )
                })}

                {TREE_NODES.map((n) => {
                  const isActive = activeTree.includes(n.id)
                  return (
                    <g key={n.id}>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isActive ? 16 : 14}
                        fill={isActive ? '#FFC93C' : 'rgba(255,255,255,0.06)'}
                        stroke={isActive ? '#000' : 'rgba(255,255,255,0.18)'}
                        strokeWidth={isActive ? 2 : 1}
                      />
                      <text
                        x={n.x}
                        y={n.y + 5}
                        textAnchor="middle"
                        fontSize={isActive ? 14 : 13}
                        fill={isActive ? '#000' : 'rgba(255,255,255,0.75)'}
                        fontWeight={800}
                        fontFamily="Comic Sans MS, Comic Neue, cursive"
                      >
                        {n.id}
                      </text>
                    </g>
                  )
                })}
              </svg>

              <p className="mt-2 text-xs text-gray-400">
                Step {Math.min(step, treeOrder.length - 1)} / {treeOrder.length - 1}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-white/15 bg-black/40 p-5 backdrop-blur-sm">
              <p className="text-sm font-bold text-white">Graph traversal (same lens)</p>
              <svg viewBox="0 0 260 220" className="mt-4 w-full">
                {GRAPH_EDGES.map(([from, to]) => {
                  const a = getNode(GRAPH_NODES, from)
                  const b = getNode(GRAPH_NODES, to)
                  if (!a || !b) return null
                  const isActive = activeGraph.includes(from) && activeGraph.includes(to)
                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={isActive ? '#4D96FF' : 'rgba(255,255,255,0.10)'}
                      strokeWidth={isActive ? 3 : 2}
                    />
                  )
                })}

                {GRAPH_NODES.map((n) => {
                  const isActive = activeGraph.includes(n.id)
                  return (
                    <g key={n.id}>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isActive ? 15 : 13}
                        fill={isActive ? '#4D96FF' : 'rgba(255,255,255,0.06)'}
                        stroke={isActive ? '#000' : 'rgba(255,255,255,0.18)'}
                        strokeWidth={isActive ? 2 : 1}
                      />
                      <text
                        x={n.x}
                        y={n.y + 5}
                        textAnchor="middle"
                        fontSize={isActive ? 14 : 13}
                        fill={isActive ? '#000' : 'rgba(255,255,255,0.75)'}
                        fontWeight={800}
                        fontFamily="Comic Sans MS, Comic Neue, cursive"
                      >
                        {n.id}
                      </text>
                    </g>
                  )
                })}
              </svg>

              <p className="mt-2 text-xs text-gray-400">
                Step {Math.min(step, graphOrder.length - 1)} / {graphOrder.length - 1}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border-2 border-white/15 bg-white/5 px-5 py-4">
          <p className="text-sm font-bold text-white">How this sets up the rest of the lecture</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-200">
            When we go “under the hood” later, every obscure structure is basically: a new navigation rule for the same
            fundamental problem.
          </p>
        </div>
      </div>
    </section>
  )
}

