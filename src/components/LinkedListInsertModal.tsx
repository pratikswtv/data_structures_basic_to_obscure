import { useCallback, useEffect, useMemo, useState } from 'react'

const NODES = [1, 4, 7, 9] as const
const INSERT_VALUE = 7
const INSERT_AFTER = 4

type EdgeVariant = 'normal' | 'highlight' | 'breaking' | 'new' | 'hidden'

type PointerDef = {
  from: number
  to: number | null
  variant: EdgeVariant
  /** Long arc that skips intermediate nodes (e.g. 4 → 9 over 7) */
  arc?: boolean
}

type Step = {
  caption: string
  detail: string
  pointers: PointerDef[]
  /** Node 7 slot: absent → flies in → stays for pointer steps */
  node7State: 'absent' | 'flying' | 'present'
  activeNode?: number
  disconnected?: number[]
}

function buildSteps(): Step[] {
  const basePointers: PointerDef[] = [
    { from: 1, to: 4, variant: 'normal' },
    { from: 4, to: 9, variant: 'normal', arc: true },
    { from: 9, to: null, variant: 'normal' },
  ]

  return [
    {
      caption: 'Starting linked list',
      detail: 'head → 1 → 4 → 9 → null. Three nodes, wired by pointers.',
      node7State: 'absent',
      pointers: basePointers.map((p) => ({ ...p })),
    },
    {
      caption: `Allocate new node ${INSERT_VALUE}`,
      detail: 'A fresh node flies into memory between 4 and 9 — not linked yet.',
      node7State: 'flying',
      pointers: basePointers.map((p) => ({ ...p })),
    },
    {
      caption: 'Node 7 in place',
      detail: 'Four nodes, fixed in memory. From here on, only the pointers change.',
      node7State: 'present',
      pointers: basePointers.map((p) => ({ ...p })),
      disconnected: [INSERT_VALUE],
    },
    {
      caption: `Insert ${INSERT_VALUE} after node ${INSERT_AFTER}`,
      detail: `We hold a pointer to node ${INSERT_AFTER}. The old link 4 → 9 is what we'll replace.`,
      node7State: 'present',
      pointers: [
        { from: 1, to: 4, variant: 'normal' },
        { from: 4, to: 9, variant: 'highlight', arc: true },
        { from: 9, to: null, variant: 'normal' },
      ],
      activeNode: INSERT_AFTER,
      disconnected: [INSERT_VALUE],
    },
    {
      caption: 'Pointer update #1: new.next = 9',
      detail: 'Point node 7 at what comes next. Node 7 still has no incoming link.',
      node7State: 'present',
      pointers: [
        { from: 1, to: 4, variant: 'normal' },
        { from: 4, to: 9, variant: 'normal', arc: true },
        { from: INSERT_VALUE, to: 9, variant: 'new' },
        { from: 9, to: null, variant: 'normal' },
      ],
      activeNode: INSERT_VALUE,
      disconnected: [INSERT_VALUE],
    },
    {
      caption: 'Pointer update #2: node 4.next = 7',
      detail: 'Rewire node 4. The old 4 → 9 link is dropped — nothing moved, only pointers changed.',
      node7State: 'present',
      pointers: [
        { from: 1, to: 4, variant: 'normal' },
        { from: 4, to: 9, variant: 'breaking', arc: true },
        { from: 4, to: INSERT_VALUE, variant: 'new' },
        { from: INSERT_VALUE, to: 9, variant: 'new' },
        { from: 9, to: null, variant: 'normal' },
      ],
      activeNode: INSERT_AFTER,
    },
    {
      caption: 'Pointers settled',
      detail: 'The chain reads 1 → 4 → 7 → 9 → null. Every node stayed put.',
      node7State: 'present',
      pointers: [
        { from: 1, to: 4, variant: 'normal' },
        { from: 4, to: INSERT_VALUE, variant: 'new' },
        { from: INSERT_VALUE, to: 9, variant: 'new' },
        { from: 9, to: null, variant: 'normal' },
      ],
    },
    {
      caption: 'Done — O(1) insert',
      detail: 'Two pointer writes. Zero nodes shifted. (Finding node 4 is still O(n) without a pointer.)',
      node7State: 'present',
      pointers: [
        { from: 1, to: 4, variant: 'normal' },
        { from: 4, to: INSERT_VALUE, variant: 'normal' },
        { from: INSERT_VALUE, to: 9, variant: 'normal' },
        { from: 9, to: null, variant: 'normal' },
      ],
    },
  ]
}

const STEPS = buildSteps()
const STEP_MS = 1600

const NODE_SIZE = 64
const SLOT_GAP = 52
const HEAD_W = 44

const edgeColor: Record<Exclude<EdgeVariant, 'hidden'>, string> = {
  normal: 'rgba(255,255,255,0.45)',
  highlight: '#FFC93C',
  breaking: '#FF5757',
  new: '#6BCB77',
}

function nodeIndex(value: number) {
  return NODES.indexOf(value as (typeof NODES)[number])
}

function nodeCenterX(value: number) {
  const idx = nodeIndex(value)
  return HEAD_W + idx * (NODE_SIZE + SLOT_GAP) + NODE_SIZE / 2
}

const NULL_X = HEAD_W + NODES.length * (NODE_SIZE + SLOT_GAP) - SLOT_GAP / 2

type PointerPathProps = {
  from: number
  to: number | null
  variant: EdgeVariant
  arc?: boolean
}

function PointerPath({ from, to, variant, arc }: PointerPathProps) {
  if (variant === 'hidden') return null

  const x1 = nodeCenterX(from)
  const x2 = to === null ? NULL_X : nodeCenterX(to)
  const y = NODE_SIZE / 2 + 8
  const color = edgeColor[variant]
  const dashed = variant === 'breaking' || variant === 'new'

  let d: string
  if (arc && to !== null) {
    const midX = (x1 + x2) / 2
    const lift = -28
    d = `M ${x1} ${y} Q ${midX} ${y + lift} ${x2} ${y}`
  } else {
    d = `M ${x1} ${y} L ${x2} ${y}`
  }

  const labelX = arc ? (x1 + x2) / 2 : (x1 + x2) / 2
  const labelY = arc ? y - 34 : y - 14

  return (
    <g
      className={`ll-ptr-path ${
        variant === 'breaking'
          ? 'll-ptr-path--breaking'
          : variant === 'new'
            ? 'll-ptr-path--new'
            : variant === 'highlight'
              ? 'll-ptr-path--highlight'
              : ''
      }`}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={variant === 'highlight' ? 3 : 2.5}
        strokeDasharray={dashed ? '7 5' : undefined}
        markerEnd={`url(#ll-arrow-${variant === 'breaking' ? 'breaking' : variant === 'new' ? 'new' : variant === 'highlight' ? 'highlight' : 'normal'})`}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        fill={color}
        className="text-[9px] font-bold uppercase sm:text-[10px]"
      >
        {to === null ? 'null' : 'next'}
      </text>
    </g>
  )
}

function ListNodeBox({
  value,
  disconnected,
  active,
  flying,
}: {
  value: number
  disconnected?: boolean
  active?: boolean
  flying?: boolean
}) {
  return (
    <div
      className={`flex shrink-0 flex-col items-center gap-1 transition-opacity duration-500 ${
        disconnected ? 'll-insert-node--disconnected' : ''
      } ${active ? 'll-insert-node--active' : ''} ${flying ? 'll-insert-node--fly-in' : ''}`}
      style={{ width: NODE_SIZE }}
    >
      <div
        className={`flex items-center justify-center rounded-xl border-2 shadow-[3px_3px_0_#000] transition-all duration-400 ${
          active ? 'll-insert-node--highlight' : ''
        }`}
        style={{
          width: NODE_SIZE,
          height: NODE_SIZE,
          backgroundColor: flying
            ? '#6BCB77'
            : disconnected
              ? 'rgba(107, 203, 119, 0.12)'
              : active
                ? '#4D96FF'
                : 'rgba(255,255,255,0.1)',
          borderColor: flying
            ? '#6BCB77'
            : disconnected
              ? 'rgba(107, 203, 119, 0.35)'
              : active
                ? '#FFC93C'
                : 'rgba(255,255,255,0.3)',
          borderStyle: disconnected && !flying ? 'dashed' : 'solid',
        }}
      >
        <span
          className="text-xl font-black sm:text-2xl"
          style={{
            color: flying || active ? '#000' : disconnected ? 'rgba(255,255,255,0.45)' : '#fff',
          }}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

function PointerDiagram({ step }: { step: Step }) {
  const stageW = HEAD_W + NODES.length * (NODE_SIZE + SLOT_GAP) + 36

  const visiblePointers = step.pointers.filter((p) => p.variant !== 'hidden')

  const renderNodeSlot = (value: number) => {
    if (value === INSERT_VALUE) {
      if (step.node7State === 'absent') {
        return (
          <div
            className="ll-insert-slot-empty flex shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-white/10"
            style={{ width: NODE_SIZE, height: NODE_SIZE, marginRight: SLOT_GAP }}
            aria-hidden
          />
        )
      }

      return (
        <div
          className="relative flex shrink-0 items-start"
          style={{ width: NODE_SIZE, marginRight: SLOT_GAP }}
        >
          <ListNodeBox
            value={INSERT_VALUE}
            disconnected={step.disconnected?.includes(INSERT_VALUE)}
            active={step.activeNode === INSERT_VALUE}
            flying={step.node7State === 'flying'}
          />
        </div>
      )
    }

    return (
      <div
        className="flex shrink-0 items-start"
        style={{ marginRight: SLOT_GAP }}
      >
        <ListNodeBox
          value={value}
          active={step.activeNode === value}
        />
      </div>
    )
  }

  return (
    <div className="relative mx-auto overflow-x-auto" style={{ width: stageW, minHeight: NODE_SIZE + 56 }}>
      <svg
        className="pointer-events-none absolute top-0 left-0"
        width={stageW}
        height={NODE_SIZE + 56}
        aria-hidden
      >
        <defs>
          {(['normal', 'highlight', 'breaking', 'new'] as const).map((v) => (
            <marker
              key={v}
              id={`ll-arrow-${v}`}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <polygon points="0,0 8,4 0,8" fill={edgeColor[v]} />
            </marker>
          ))}
        </defs>
        {visiblePointers.map((p) => (
          <PointerPath
            key={`${p.from}-${p.to}-${p.variant}-${p.arc ? 'arc' : 'line'}`}
            from={p.from}
            to={p.to}
            variant={p.variant}
            arc={p.arc}
          />
        ))}
      </svg>

      <div className="relative flex items-start" style={{ paddingTop: 8 }}>
        <div className="flex shrink-0 flex-col items-center self-center" style={{ width: HEAD_W }}>
          <span className="text-xs font-bold text-[#FFC93C] sm:text-sm">head</span>
          <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5" aria-hidden>
            <polygon points="4,4 16,10 4,16" fill="#FFC93C" />
          </svg>
        </div>

        {NODES.map((value) => (
          <div key={value}>{renderNodeSlot(value)}</div>
        ))}

        <div
          className="flex shrink-0 flex-col items-center justify-center self-center text-xs font-bold text-white/30 sm:text-sm"
          style={{ width: 28 }}
        >
          ∅
        </div>
      </div>
    </div>
  )
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function LinkedListInsertModal({ open, onClose }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const reset = useCallback(() => {
    setStepIndex(0)
    setPlaying(true)
  }, [])

  useEffect(() => {
    if (!open) return
    reset()
  }, [open, reset])

  useEffect(() => {
    if (!open || !playing) return
    if (stepIndex >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setStepIndex((i) => i + 1), STEP_MS)
    return () => window.clearTimeout(timer)
  }, [open, playing, stepIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const step = useMemo(() => STEPS[stepIndex], [stepIndex])

  if (!open) return null

  return (
    <div
      className="array-insert-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ll-insert-title"
      onClick={onClose}
    >
      <div
        className="array-insert-panel relative w-full max-w-3xl rounded-3xl border-2 border-white/20 bg-black px-5 py-6 shadow-2xl sm:px-8 sm:py-8"
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

        <header className="mb-6 space-y-2 pr-10">
          <p className="text-base font-bold text-[#6BCB77] sm:text-lg">Middle insert</p>
          <h3 id="ll-insert-title" className="text-2xl font-bold text-white sm:text-3xl">
            {step.caption}
          </h3>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">{step.detail}</p>
          <div className="mt-3 rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-300 sm:text-sm">
            <span className="text-[#FFC93C]">class</span>{' '}
            <span className="text-white">ListNode</span> {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-[#FFC93C]">int</span> data;
            <br />
            &nbsp;&nbsp;ListNode next;
            <br />
            <br />
            &nbsp;&nbsp;ListNode(<span className="text-[#FFC93C]">int</span> data) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.data = data;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>.next ={' '}
            <span className="text-[#FF5757]">null</span>;
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            {'}'}
          </div>
        </header>

        <div className="ll-insert-stage relative mb-4 overflow-x-auto rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-8 sm:px-6">
          <PointerDiagram step={step} />

          {stepIndex >= 6 && (
            <p className="ll-insert-no-shift mt-6 text-center text-sm font-bold text-[#6BCB77] sm:text-base">
              ✓ Nodes never moved — only pointers were rewired
            </p>
          )}

          <p className="mt-4 text-center text-sm text-gray-500 sm:text-base">
            watch the arrows, not the boxes
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === stepIndex
                    ? 'w-6 bg-[#6BCB77]'
                    : i < stepIndex
                      ? 'w-2 bg-[#6BCB77]/50'
                      : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border-2 border-[#6BCB77] bg-[#6BCB77]/15 px-4 py-2 text-base font-bold text-[#6BCB77] transition hover:bg-[#6BCB77]/25 sm:px-5 sm:py-2.5 sm:text-lg"
            >
              Replay
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-white/25 px-4 py-2 text-base font-bold text-white transition hover:bg-white/10 sm:px-5 sm:py-2.5 sm:text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
