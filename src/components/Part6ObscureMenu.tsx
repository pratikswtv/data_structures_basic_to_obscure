import { useNavigate } from 'react-router-dom'
import { obscureMenuOptions } from '../data/obscureTopics'

const TOPIC_STYLES = [
  { color: '#FF5757', glow: 'rgba(255, 87, 87, 0.9)' },
  { color: '#FFC93C', glow: 'rgba(255, 201, 60, 0.9)' },
  { color: '#6BCB77', glow: 'rgba(107, 203, 119, 0.9)' },
  { color: '#4D96FF', glow: 'rgba(77, 150, 255, 0.95)' },
  { color: '#C77DFF', glow: 'rgba(199, 125, 255, 0.9)' },
] as const

const TOPIC_META: Record<string, { badge: string; detail: string; tags: string[] }> = {
  '/skip-list': {
    badge: 'Search',
    detail: 'Sorted list + random towers for fast jumps.',
    tags: ['O(log n)', 'Express lanes'],
  },
  '/trie': {
    badge: 'Strings',
    detail: 'Characters become paths, then radix compresses them.',
    tags: ['Prefixes', 'Compression'],
  },
  '/bloom-filters': {
    badge: 'Maybe',
    detail: 'Tiny membership checks with false positives.',
    tags: ['Probabilistic', 'Counters'],
  },
  '/hashing': {
    badge: 'Collisions',
    detail: 'Chaining, probing, and cuckoo-style evictions.',
    tags: ['Buckets', 'O(1) lookup'],
  },
  '/b-plus-tree': {
    badge: 'Indexes',
    detail: 'Wide balanced trees that keep disk reads shallow.',
    tags: ['DB indexes', 'Range scans'],
  },
}

export default function Part6ObscureMenu() {
  const navigate = useNavigate()

  return (
    <section
      id="part-8"
      className="comic-theme part7-topics relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-x-hidden px-6 py-8 sm:px-10"
    >
      <div className="part8-bg-orb part8-bg-orb--left" aria-hidden />
      <div className="part8-bg-orb part8-bg-orb--right" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-xl font-bold text-[#C77DFF] sm:text-2xl">
            Part 8 — Topics
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Obscure Variations
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Pick a topic and dive straight in. Each card opens a focused mini-lecture with diagrams,
            tradeoffs, and the weird implementation details.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {obscureMenuOptions.map((option, index) => {
            const style = TOPIC_STYLES[index % TOPIC_STYLES.length]
            const meta = TOPIC_META[option.path]
            return (
              <button
                key={option.path}
                type="button"
                onClick={() => navigate(option.path)}
                className="topic-card group relative min-h-[10.5rem] p-0 text-left"
                style={
                  {
                    '--topic-color': style.color,
                    '--topic-glow': style.glow,
                  } as React.CSSProperties
                }
              >
                <span className="topic-card-burst" aria-hidden />
                <span className="topic-card-burst topic-card-burst--late" aria-hidden />
                <span className="topic-card-neon" aria-hidden />
                <span className="topic-card-scan" aria-hidden />
                <span className="topic-card-ripple" aria-hidden />
                <span className="topic-card-ripple topic-card-ripple--late" aria-hidden />

                <span className="topic-card-corner topic-card-corner--tl" aria-hidden />
                <span className="topic-card-corner topic-card-corner--tr" aria-hidden />
                <span className="topic-card-corner topic-card-corner--bl" aria-hidden />
                <span className="topic-card-corner topic-card-corner--br" aria-hidden />

                <span
                  className="topic-card-inner"
                  style={{ backgroundColor: style.color }}
                >
                  <span className="topic-card-content space-y-3">
                    <span className="inline-flex w-fit rounded-full border-2 border-black/20 bg-white/35 px-2.5 py-1 text-xs font-black tracking-wide text-black/70 uppercase">
                      {meta.badge}
                    </span>
                    <h3 className="text-2xl font-bold leading-tight text-black sm:text-3xl">
                      {option.title}
                    </h3>
                    <p className="text-base font-bold text-black/75 sm:text-lg">
                      {option.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed font-medium text-black/65 sm:text-base">
                      {meta.detail}
                    </p>
                    <span className="flex flex-wrap gap-2 pt-1">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-black/15 px-2.5 py-1 text-xs font-black text-black/70 sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="topic-card-arrow text-4xl font-black text-black/30">
                    →
                  </span>
                </span>
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => navigate('/farewell')}
            className="topic-card group relative min-h-[10.5rem] p-0 text-left"
            aria-label="Open farewell slide"
            style={
              {
                '--topic-color': '#FFFFFF',
                '--topic-glow': 'rgba(255, 255, 255, 0.45)',
              } as React.CSSProperties
            }
          >
            <span className="topic-card-burst" aria-hidden />
            <span className="topic-card-burst topic-card-burst--late" aria-hidden />
            <span className="topic-card-neon" aria-hidden />
            <span className="topic-card-scan" aria-hidden />
            <span className="topic-card-ripple" aria-hidden />
            <span className="topic-card-ripple topic-card-ripple--late" aria-hidden />

            <span className="topic-card-corner topic-card-corner--tl" aria-hidden />
            <span className="topic-card-corner topic-card-corner--tr" aria-hidden />
            <span className="topic-card-corner topic-card-corner--bl" aria-hidden />
            <span className="topic-card-corner topic-card-corner--br" aria-hidden />

            <span
              className="topic-card-inner"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </section>
  )
}
