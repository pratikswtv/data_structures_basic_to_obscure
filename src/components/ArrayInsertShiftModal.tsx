import { useCallback, useEffect, useState } from 'react'

const CELL_W = 72
const CELL_GAP = 10
const INITIAL = [2, 5, 1, 9, 3]
const INSERT_VALUE = 7
const INSERT_AT = 2

const cellColors = ['#FF5757', '#FFC93C', '#6BCB77', '#4D96FF', '#C77DFF', '#FF9F43']

type CellState = {
  id: number
  value: number
  slot: number
  status: 'idle' | 'shifting' | 'new' | 'target'
}

type Step = {
  caption: string
  detail: string
  cells: CellState[]
  highlightSlot?: number
}

function buildSteps(): Step[] {
  const base: CellState[] = INITIAL.map((value, slot) => ({
    id: slot,
    value,
    slot,
    status: 'idle',
  }))

  const steps: Step[] = [
    {
      caption: 'Starting array',
      detail: 'Five elements stored contiguously in memory.',
      cells: base.map((c) => ({ ...c })),
    },
    {
      caption: `Insert ${INSERT_VALUE} at index ${INSERT_AT}`,
      detail: 'We need an open slot — but index 2 is already taken by 1.',
      cells: base.map((c) => ({ ...c })),
      highlightSlot: INSERT_AT,
    },
  ]

  let cells = base.map((c) => ({ ...c }))

  for (let from = INITIAL.length - 1; from >= INSERT_AT; from--) {
    const value = INITIAL[from]
    const to = from + 1
    cells = cells.map((c) => {
      if (c.slot === from && c.value === value) {
        return { ...c, slot: to, status: 'shifting' as const }
      }
      return { ...c, status: 'idle' as const }
    })
    steps.push({
      caption: `Shift ${value} right → index ${to}`,
      detail: `Element at index ${from} moves to index ${to} to make room.`,
      cells: cells.map((c) => ({ ...c })),
      highlightSlot: to,
    })
  }

  const withNew: CellState[] = [
    ...cells,
    { id: INITIAL.length, value: INSERT_VALUE, slot: INSERT_AT, status: 'new' },
  ].sort((a, b) => a.slot - b.slot)

  steps.push({
    caption: `Place ${INSERT_VALUE} at index ${INSERT_AT}`,
    detail: 'The new element finally sits in the gap we created.',
    cells: withNew.map((c) => ({ ...c, status: c.status === 'new' ? 'new' : 'idle' })),
    highlightSlot: INSERT_AT,
  })

  steps.push({
    caption: 'Done — O(n) insert',
    detail: `Shifted ${INITIAL.length - INSERT_AT} element(s) to insert one value.`,
    cells: withNew.map((c) => ({ ...c, status: 'idle' as const })),
  })

  return steps
}

const STEPS = buildSteps()
const STEP_MS = 1400

type Props = {
  open: boolean
  onClose: () => void
}

export default function ArrayInsertShiftModal({ open, onClose }: Props) {
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
    const timer = window.setTimeout(() => {
      setStepIndex((i) => i + 1)
    }, STEP_MS)
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

  if (!open) return null

  const step = STEPS[stepIndex]
  const slotOffset = (slot: number) => slot * (CELL_W + CELL_GAP)

  return (
    <div
      className="array-insert-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="array-insert-title"
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
          <p className="text-base font-bold text-[#4D96FF] sm:text-lg">Middle insert</p>
          <h3 id="array-insert-title" className="text-2xl font-bold text-white sm:text-3xl">
            {step.caption}
          </h3>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">{step.detail}</p>
        </header>

        <div className="array-insert-stage relative mb-4 overflow-x-auto rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-8 sm:px-6">
          <div
            className="relative mx-auto"
            style={{
              width: (INITIAL.length + 1) * (CELL_W + CELL_GAP) - CELL_GAP,
              height: 110,
            }}
          >
            {step.highlightSlot !== undefined && (
              <div
                className="array-insert-slot-highlight pointer-events-none absolute top-6 rounded-xl border-2 border-dashed border-[#FFC93C]"
                style={{
                  left: slotOffset(step.highlightSlot),
                  width: CELL_W,
                  height: CELL_W,
                }}
                aria-hidden
              />
            )}

            {step.cells.map((cell) => (
              <div
                key={cell.id}
                className={`array-insert-cell absolute top-6 flex flex-col items-center gap-2 ${
                  cell.status === 'shifting'
                    ? 'array-insert-cell--shifting'
                    : cell.status === 'new'
                      ? 'array-insert-cell--new'
                      : ''
                }`}
                style={{
                  left: slotOffset(cell.slot),
                  width: CELL_W,
                  transition: 'left 0.65s cubic-bezier(0.34, 1.2, 0.64, 1)',
                }}
              >
                <div
                  className={`array-insert-cell-box flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-xl border-2 border-black text-2xl font-bold text-black shadow-[0_4px_0_rgba(0,0,0,0.5)] ${
                    cell.status === 'shifting' ? 'array-insert-cell-box--shifting' : ''
                  } ${cell.status === 'new' ? 'array-insert-cell-box--new' : ''}`}
                  style={{ backgroundColor: cellColors[cell.slot % cellColors.length] }}
                >
                  {cell.value}
                </div>
                <span className="text-sm font-medium text-gray-400">{cell.slot}</span>
              </div>
            ))}

            <div className="array-insert-shift-arrow pointer-events-none absolute top-[2.6rem] left-0 right-0" aria-hidden>
              {step.cells.some((c) => c.status === 'shifting') && (
                <span className="array-insert-arrow-label absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-bold text-[#FFC93C]">
                  shift →
                </span>
              )}
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
            memory addresses grow left → right
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === stepIndex ? 'w-6 bg-[#4D96FF]' : i < stepIndex ? 'w-2 bg-[#4D96FF]/50' : 'w-2 bg-white/20'
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
