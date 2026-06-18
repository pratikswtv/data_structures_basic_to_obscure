import { useEffect } from 'react'

const GRAPH_NODE_IDS = ['1', '2', '3', '4', '5', '6'] as const

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

const GRAPH_NODES = [
  { id: '1', x: 90, y: 70 },
  { id: '2', x: 160, y: 60 },
  { id: '3', x: 210, y: 120 },
  { id: '4', x: 140, y: 145 },
  { id: '5', x: 60, y: 130 },
  { id: '6', x: 115, y: 190 },
] as const

function buildAdjacencyMatrix(nodeIds: readonly string[], edges: Array<[string, string]>) {
  const n = nodeIds.length
  const index = new Map(nodeIds.map((id, i) => [id, i]))
  const matrix = Array.from({ length: n }, () => Array<number>(n).fill(0))

  for (const [u, v] of edges) {
    const i = index.get(u)
    const j = index.get(v)
    if (i === undefined || j === undefined) continue
    matrix[i][j] = 1
    matrix[j][i] = 1
  }

  return matrix
}

const ADJ_MATRIX = buildAdjacencyMatrix(GRAPH_NODE_IDS, GRAPH_EDGES)

type Props = {
  open: boolean
  onClose: () => void
}

export default function GraphMatrixModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="array-insert-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="graph-matrix-title"
      onClick={onClose}
    >
      <div
        className="array-insert-panel relative w-full max-w-2xl rounded-3xl border-2 border-white/20 bg-black px-5 py-6 shadow-2xl sm:px-8 sm:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/25 text-xl text-white transition hover:bg-white/10"
          aria-label="Close"
        >
          ×
        </button>

        <header className="mb-5 space-y-2 pr-10">
          <p className="text-base font-bold text-[#4D96FF] sm:text-lg">Adjacency matrix</p>
          <h3 id="graph-matrix-title" className="text-2xl font-bold text-white sm:text-3xl">
            Matrix view of this graph
          </h3>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            Row <span className="font-bold text-white">i</span>, column{' '}
            <span className="font-bold text-white">j</span> = 1 if nodes{' '}
            <span className="font-bold text-white">i</span> and{' '}
            <span className="font-bold text-white">j</span> share an edge.
          </p>
        </header>

        <div className="graph-matrix-stage rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
            <div className="overflow-x-auto">
              <table className="graph-matrix-table border-collapse font-mono text-base sm:text-lg">
                <thead>
                  <tr>
                    <th className="graph-matrix-corner p-2" aria-hidden />
                    {GRAPH_NODE_IDS.map((id) => (
                      <th
                        key={`col-${id}`}
                        className="graph-matrix-header p-2 text-center font-bold text-[#4D96FF]"
                      >
                        {id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GRAPH_NODE_IDS.map((rowId, row) => (
                    <tr key={`row-${rowId}`}>
                      <th className="graph-matrix-header p-2 text-center font-bold text-[#4D96FF]">
                        {rowId}
                      </th>
                      {GRAPH_NODE_IDS.map((colId, col) => {
                        const value = ADJ_MATRIX[row][col]
                        return (
                          <td
                            key={`${rowId}-${colId}`}
                            className={`graph-matrix-cell p-2 text-center font-bold ${
                              value === 1 ? 'graph-matrix-cell--edge' : 'graph-matrix-cell--empty'
                            }`}
                          >
                            {value}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="shrink-0">
              <p className="mb-2 text-center text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-sm">
                Same graph
              </p>
              <svg viewBox="0 0 260 220" className="h-44 w-52 sm:h-48 sm:w-56" aria-hidden>
                {GRAPH_EDGES.map(([from, to]) => {
                  const a = GRAPH_NODES.find((n) => n.id === from)
                  const b = GRAPH_NODES.find((n) => n.id === to)
                  if (!a || !b) return null
                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="rgba(77,150,255,0.55)"
                      strokeWidth={2.5}
                    />
                  )
                })}
                {GRAPH_NODES.map((n) => (
                  <g key={n.id}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={14}
                      fill="#4D96FF"
                      stroke="#000"
                      strokeWidth={2}
                    />
                    <text
                      x={n.x}
                      y={n.y + 5}
                      textAnchor="middle"
                      fontSize={13}
                      fill="#000"
                      fontWeight={800}
                      fontFamily="Comic Sans MS, Comic Neue, cursive"
                    >
                      {n.id}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-400 sm:text-base">
            Undirected graph — matrix is symmetric across the diagonal
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border-2 border-white/25 px-5 py-2.5 text-base font-bold text-white transition hover:bg-white/10 sm:text-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
