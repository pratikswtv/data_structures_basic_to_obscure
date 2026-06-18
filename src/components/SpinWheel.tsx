import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ObscureMenuOption } from '../data/obscureTopics'

const WHEEL_COLORS = ['#FF5757', '#FFC93C', '#6BCB77', '#4D96FF', '#C77DFF']
const SPIN_DURATION_MS = 4500

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function describeSlice(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`
}

function shortLabel(title: string) {
  if (title.includes('Trie')) return 'Trie'
  if (title.includes('Bloom')) return 'Bloom'
  if (title.includes('Hashing')) return 'Hash'
  if (title.includes('B+')) return 'B+ Tree'
  return title
}

type Props = {
  topics: ObscureMenuOption[]
}

export default function SpinWheel({ topics }: Props) {
  const navigate = useNavigate()
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const segmentAngle = topics.length > 0 ? 360 / topics.length : 360

  const spin = useCallback(() => {
    if (spinning || topics.length === 0) return

    const randomIndex = Math.floor(Math.random() * topics.length)
    const extraSpins = 5 + Math.floor(Math.random() * 4)
    const centerOfSegment = randomIndex * segmentAngle + segmentAngle / 2
    const landingAngle = (360 - centerOfSegment) % 360
    const currentAngle = ((rotation % 360) + 360) % 360
    let delta = landingAngle - currentAngle
    if (delta < 0) delta += 360

    const nextRotation = rotation + extraSpins * 360 + delta

    setSpinning(true)
    setSelectedIndex(null)
    setRotation(nextRotation)

    window.setTimeout(() => {
      setSpinning(false)
      setSelectedIndex(randomIndex)
    }, SPIN_DURATION_MS)
  }, [rotation, spinning, topics, segmentAngle])

  const selected = selectedIndex !== null ? topics[selectedIndex] : null

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <p className="text-xl text-gray-400">Select at least one topic to spin!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2">
          <div className="h-0 w-0 border-x-[18px] border-t-[28px] border-x-transparent border-t-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
        </div>

        <div className="rounded-full border-[5px] border-white p-1.5 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
          <svg
            viewBox="0 0 220 220"
            className="h-72 w-72 transition-transform ease-out sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem] lg:h-[26rem] lg:w-[26rem]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? `${SPIN_DURATION_MS}ms` : '0ms',
            }}
          >
            {topics.map((option, index) => {
              const start = index * segmentAngle
              const end = (index + 1) * segmentAngle
              const mid = start + segmentAngle / 2
              const labelPos = polarToCartesian(110, 110, 72, mid)

              return (
                <g key={option.path}>
                  <path
                    d={describeSlice(110, 110, 100, start, end)}
                    fill={WHEEL_COLORS[index % WHEEL_COLORS.length]}
                    stroke="#000"
                    strokeWidth="2"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    fill="#000"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="Comic Sans MS, Comic Neue, cursive"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${mid + 90}, ${labelPos.x}, ${labelPos.y})`}
                  >
                    {shortLabel(option.title)}
                  </text>
                </g>
              )
            })}
            <circle cx="110" cy="110" r="18" fill="#000" stroke="#fff" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className="rounded-full border-4 border-white bg-[#FF5757] px-10 py-3 text-2xl font-bold text-white shadow-[0_6px_0_#cc3333] transition hover:scale-105 active:translate-y-1 active:shadow-none disabled:opacity-60 disabled:hover:scale-100 sm:text-3xl"
      >
        {spinning ? 'Spinning…' : 'SPIN!'}
      </button>

      {selected && !spinning && (
        <div className="space-y-4 text-center">
          <p className="text-2xl text-white sm:text-3xl">
            You landed on:{' '}
            <span className="font-bold text-[#FFC93C]">{selected.title}</span>
          </p>
          <button
            type="button"
            onClick={() => navigate(selected.path)}
            className="rounded-full border-4 border-white bg-[#6BCB77] px-8 py-2 text-xl font-bold text-black shadow-[0_5px_0_#3d9e55] transition hover:scale-105 active:translate-y-1 active:shadow-none sm:text-2xl"
          >
            Let&apos;s go! →
          </button>
        </div>
      )}
    </div>
  )
}
