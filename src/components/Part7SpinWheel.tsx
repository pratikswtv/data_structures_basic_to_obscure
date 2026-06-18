import { useState } from 'react'
import { obscureMenuOptions } from '../data/obscureTopics'
import SpinWheel from './SpinWheel'

const CHECKLIST_LABELS: Record<string, string> = {
  '/b-plus-tree': 'B+ Tree',
  '/skip-list': 'Skip List',
  '/hashing': 'Hash',
  '/bloom-filters': 'Bloom',
  '/trie': 'Trie',
}

export default function Part7SpinWheel() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(obscureMenuOptions.map((o) => [o.path, true])),
  )

  const toggle = (path: string) =>
    setChecked((prev) => ({ ...prev, [path]: !prev[path] }))

  const activeTopics = obscureMenuOptions.filter((o) => checked[o.path])

  return (
    <section className="comic-theme relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-hidden bg-black px-6 py-8 sm:px-10">
      <div className="relative z-10 mx-auto w-full max-w-5xl space-y-6">
        <header className="space-y-3 text-center">
          <p className="text-xl font-bold text-[#C77DFF] sm:text-2xl">
            Part 9 — Spin the wheel!
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Pick your fate
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Check the topics to include, then press{' '}
            <span className="font-bold text-[#FFC93C]">SPIN!</span>
          </p>
        </header>

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
          {/* Checklist */}
          <div className="w-full max-w-xs shrink-0">
            <p className="mb-3 text-center text-sm font-bold tracking-widest text-gray-400 uppercase lg:text-left">
              Include in wheel
            </p>
            <ul className="space-y-2">
              {obscureMenuOptions.map((option) => {
                const label = CHECKLIST_LABELS[option.path] ?? option.title
                const isChecked = checked[option.path]
                return (
                  <li key={option.path}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-white/20 px-4 py-3 transition hover:border-white/50">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-white text-sm font-black transition"
                        style={{
                          backgroundColor: isChecked ? '#FFC93C' : 'transparent',
                          borderColor: isChecked ? '#FFC93C' : 'rgba(255,255,255,0.4)',
                          color: '#000',
                        }}
                      >
                        {isChecked && '✓'}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={() => toggle(option.path)}
                      />
                      <span className="font-bold text-white">{label}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <p className="mt-3 text-center text-xs text-gray-500 lg:text-left">
              {activeTopics.length} of {obscureMenuOptions.length} selected
            </p>
          </div>

          {/* Wheel */}
          <div className="flex-1">
            <SpinWheel topics={activeTopics} />
          </div>
        </div>
      </div>
    </section>
  )
}
