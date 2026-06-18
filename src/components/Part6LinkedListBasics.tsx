import { useEffect, useState } from 'react'
import LinkedListInsertModal from './LinkedListInsertModal'

const NODE_VALUES = [1, 4, 9]

function NextArrow({ lit }: { lit: boolean }) {
  const color = lit ? '#FFC93C' : 'rgba(255,255,255,0.35)'
  return (
    <div className="flex shrink-0 flex-col items-center self-center px-0.5 sm:px-1">
      <svg
        viewBox="0 0 52 20"
        className="h-5 w-12 sm:h-6 sm:w-14"
        aria-hidden
      >
        <line x1="2" y1="10" x2="38" y2="10" stroke={color} strokeWidth="2.5" />
        <polygon points="38,5 50,10 38,15" fill={color} />
      </svg>
      <span
        className="mt-0.5 text-[9px] font-bold tracking-wide uppercase sm:text-[10px]"
        style={{ color: lit ? '#FFC93C' : 'rgba(255,255,255,0.3)' }}
      >
        next
      </span>
    </div>
  )
}

function ListNode({
  value,
  label,
  active,
}: {
  value: number
  label: string
  active: boolean
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl border-2 shadow-[3px_3px_0_#000] transition-all duration-300 sm:h-16 sm:w-16"
        style={{
          backgroundColor: active ? '#4D96FF' : 'rgba(255,255,255,0.08)',
          borderColor: active ? '#FFC93C' : 'rgba(255,255,255,0.25)',
          transform: active ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <span
          className="text-xl font-black sm:text-2xl"
          style={{ color: active ? '#000' : '#fff' }}
        >
          {value}
        </span>
      </div>
      <span
        className="text-[10px] font-bold uppercase tracking-wide sm:text-xs"
        style={{ color: active ? '#FFC93C' : 'rgba(255,255,255,0.35)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Part6LinkedListBasics() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showInsertModal, setShowInsertModal] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((p) => (p + 1) % NODE_VALUES.length)
    }, 1100)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="comic-theme relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-hidden bg-black px-4 py-6 sm:px-8 sm:py-8">
      <LinkedListInsertModal open={showInsertModal} onClose={() => setShowInsertModal(false)} />
      <div
        className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_30%,rgba(77,150,255,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_60%,rgba(255,87,87,0.08)_0%,transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Left — content */}
        <div className="space-y-4 sm:space-y-5">
          <header className="space-y-2 sm:space-y-3">
            <p className="text-lg font-bold text-[#4D96FF] sm:text-xl">
              Part 6 — Linked Lists
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              The &ldquo;next&rdquo; pointer mindset
            </h2>
            <p className="text-base leading-snug text-gray-300 sm:text-lg">
              Arrays jump by index. Linked lists jump by pointers — same problem,
              different navigation rules.
            </p>
          </header>

          <ul className="space-y-2 text-sm text-gray-200 sm:text-base">
            <li className="flex gap-2">
              <span className="shrink-0 text-[#FFC93C]">→</span>
              Traversal walks node to node via <code className="text-[#4D96FF]">next</code>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-[#6BCB77]">+</span>
              Insert/delete can be O(1) once you hold the right pointer
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-[#FF5757]">!</span>
              Search is still O(n) — no index, no shortcut
            </li>
          </ul>

          <div className="rounded-2xl border-2 border-[#4D96FF] bg-[#4D96FF]/10 px-4 py-3.5 font-mono text-sm leading-relaxed text-gray-200 sm:px-5 sm:py-4 sm:text-base">
            <span className="font-bold text-[#FFC93C]">class</span>{' '}
            <span className="font-bold text-white">ListNode</span> {'{'}
            <br />
            &nbsp;&nbsp;<span className="font-bold text-[#FFC93C]">int</span> data;
            <br />
            &nbsp;&nbsp;ListNode next;
            <br />
            <br />
            &nbsp;&nbsp;ListNode(<span className="font-bold text-[#FFC93C]">int</span> data) {'{'}
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

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { title: 'Search', color: '#4D96FF', body: 'Walk until match or null' },
              { title: 'Insert', color: '#6BCB77', body: 'Rewire next pointers' },
              { title: 'Delete', color: '#FF5757', body: 'Bypass the target' },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2.5 sm:px-3 sm:py-3"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                    aria-hidden
                  />
                  <p className="text-xs font-bold text-white sm:text-sm">{c.title}</p>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-gray-300 sm:text-xs">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — diagram */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="rounded-2xl border-2 border-white/15 bg-white/[0.03] px-3 py-4 sm:px-5 sm:py-5">
            {/* Linked list row */}
            <div className="flex flex-nowrap items-start justify-center overflow-x-auto pb-1">
              {/* head pointer */}
              <div className="flex shrink-0 flex-col items-center self-center">
                <span className="text-xs font-bold text-[#FFC93C] sm:text-sm">head</span>
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden
                >
                  <polygon points="4,4 16,10 4,16" fill="#FFC93C" />
                </svg>
              </div>

              {NODE_VALUES.map((value, idx) => {
                const isActive = idx === activeIndex
                const arrowLit = idx < activeIndex || (isActive && idx < NODE_VALUES.length - 1)
                return (
                  <div key={value} className="flex shrink-0 items-start">
                    <ListNode
                      value={value}
                      label={isActive ? 'cursor' : 'node'}
                      active={isActive}
                    />
                    {idx < NODE_VALUES.length - 1 ? (
                      <NextArrow lit={arrowLit} />
                    ) : (
                      <div className="flex shrink-0 flex-col items-center self-center px-1 sm:px-2">
                        <svg
                          viewBox="0 0 52 20"
                          className="h-5 w-12 sm:h-6 sm:w-14"
                          aria-hidden
                        >
                          <line
                            x1="2"
                            y1="10"
                            x2="38"
                            y2="10"
                            stroke="rgba(255,255,255,0.35)"
                            strokeWidth="2.5"
                          />
                          <polygon
                            points="38,5 50,10 38,15"
                            fill="rgba(255,255,255,0.35)"
                          />
                        </svg>
                        <span className="mt-0.5 text-[9px] font-bold text-white/30 sm:text-[10px]">
                          null
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Memory picture */}
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                Memory picture
              </p>
              <p className="mt-1.5 overflow-x-auto font-mono text-xs text-gray-200 sm:text-sm">
                <span className="text-[#4D96FF]">[1]</span>
                <span className="text-gray-500">.next →</span>
                <span className="text-[#4D96FF]"> [4]</span>
                <span className="text-gray-500">.next →</span>
                <span className="text-[#4D96FF]"> [9]</span>
                <span className="text-gray-500">.next →</span>
                <span className="text-[#FF5757]"> null</span>
              </p>
            </div>
          </div>

          <p className="text-center text-xs leading-snug text-gray-400 sm:text-sm">
            &ldquo;Under the hood&rdquo;: change where you point, change the whole journey.
          </p>

          <button
            type="button"
            onClick={() => setShowInsertModal(true)}
            className="ll-insert-trigger mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-2xl border-2 border-[#6BCB77] bg-[#6BCB77]/15 px-5 py-3.5 text-base font-bold text-[#6BCB77] shadow-[0_4px_0_rgba(0,0,0,0.35)] transition hover:bg-[#6BCB77]/25 active:translate-y-0.5 active:shadow-none sm:text-lg"
          >
            <span aria-hidden>▶</span>
            See middle insert — no shifting
          </button>
        </div>
      </div>
    </section>
  )
}
