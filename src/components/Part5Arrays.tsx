import { useState } from 'react'
import ArrayInsertShiftModal from './ArrayInsertShiftModal'

const arrayValues = [2, 5, 1, 9, 3]

const arrayPoints = [
  {
    title: 'Contiguous memory',
    body: 'Elements sit side by side in RAM. Index i maps directly to base address + i × element size — O(1) random access.',
  },
  {
    title: 'Fixed vs dynamic',
    body: 'Static arrays have a set size; dynamic arrays (like ArrayList) resize by allocating a bigger block and copying when full.',
  },
  {
    title: 'Trade-offs',
    body: 'Fast reads, but insert/delete in the middle costs O(n) because elements must shift. The baseline every other structure compares against.',
  },
]

const cellColors = ['#FF5757', '#FFC93C', '#6BCB77', '#4D96FF', '#C77DFF']

export default function Part5Arrays() {
  const [showInsertModal, setShowInsertModal] = useState(false)

  return (
    <section className="comic-theme relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-hidden bg-black px-6 py-10 sm:px-10">
      <ArrayInsertShiftModal open={showInsertModal} onClose={() => setShowInsertModal(false)} />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <header className="space-y-4">
            <p className="text-xl font-bold text-[#6BCB77] sm:text-2xl">
              Part 6 — Basics
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Arrays
            </h2>
            <p className="text-xl leading-relaxed text-gray-300 sm:text-2xl">
              because obviously we have to start with arrays.
              The simplest structure - and the foundation everything else builds on or
              tries to beat.
            </p>
          </header>

          <ul className="space-y-4">
            {arrayPoints.map((point, index) => (
              <li
                key={point.title}
                className="flex gap-4 rounded-2xl border-2 border-white/20 bg-white/5 px-5 py-4"
              >
                <span
                  className="shrink-0 text-2xl font-bold"
                  style={{ color: cellColors[index % cellColors.length] }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {point.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-300 sm:text-xl">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="w-full space-y-5">
            <p className="text-lg text-gray-400 sm:text-xl">
              index → 0 &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4
            </p>
            <div className="flex justify-center gap-2 sm:gap-3">
              {arrayValues.map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-black text-2xl font-bold text-black shadow-[0_4px_0_rgba(0,0,0,0.5)] sm:h-20 sm:w-20 sm:text-3xl"
                    style={{ backgroundColor: cellColors[index] }}
                  >
                    {value}
                  </div>
                  <span className="text-base text-gray-400">{index}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-gray-400 sm:text-xl">
              arr[2] → 1 &nbsp;·&nbsp; O(1) direct access
            </p>

            <button
              type="button"
              onClick={() => setShowInsertModal(true)}
              className="array-insert-trigger mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-2xl border-2 border-[#FFC93C] bg-[#FFC93C]/15 px-5 py-3.5 text-lg font-bold text-[#FFC93C] shadow-[0_4px_0_rgba(0,0,0,0.35)] transition hover:bg-[#FFC93C]/25 active:translate-y-0.5 active:shadow-none sm:text-xl"
            >
              <span aria-hidden>▶</span>
              the bad part
            </button>
          </div>

          <div className="w-full rounded-2xl border-2 border-[#4D96FF] bg-[#4D96FF]/10 px-5 py-5 text-lg leading-relaxed text-gray-200 sm:text-xl">
            <span className="font-bold text-[#FFC93C]">int</span>[] arr = {'{'}2, 5, 1, 9,
            3{'}'};
            <br />
            <span className="font-bold text-white">arr[2]</span> =={' '}
            <span className="font-bold text-[#6BCB77]">1</span>;
          </div>
        </div>
      </div>
    </section>
  )
}
