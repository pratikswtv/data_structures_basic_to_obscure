import { useNavigate } from 'react-router-dom'
import { obscureMenuOptions } from '../data/obscureTopics'

const TOPIC_STYLES = [
  { color: '#FF5757', glow: 'rgba(255, 87, 87, 0.9)' },
  { color: '#FFC93C', glow: 'rgba(255, 201, 60, 0.9)' },
  { color: '#6BCB77', glow: 'rgba(107, 203, 119, 0.9)' },
  { color: '#4D96FF', glow: 'rgba(77, 150, 255, 0.95)' },
  { color: '#C77DFF', glow: 'rgba(199, 125, 255, 0.9)' },
] as const

export default function Part6ObscureMenu() {
  const navigate = useNavigate()

  return (
    <section className="comic-theme part7-topics relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-x-hidden px-6 py-8 sm:px-10">
      <div className="relative z-10 mx-auto w-full max-w-4xl space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-xl font-bold text-[#C77DFF] sm:text-2xl">
            Part 8 — Topics
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Obscure Variations
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Pick a topic and dive straight in.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-5">
          {obscureMenuOptions.map((option, index) => {
            const style = TOPIC_STYLES[index % TOPIC_STYLES.length]
            return (
              <button
                key={option.path}
                type="button"
                onClick={() => navigate(option.path)}
                className="topic-card group relative min-h-[7.5rem] p-0 text-left"
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
                  <span className="topic-card-content space-y-2">
                    <h3 className="text-lg font-bold leading-tight text-black sm:text-xl">
                      {option.title}
                    </h3>
                    <p className="text-sm font-medium text-black/70 sm:text-base">
                      {option.subtitle}
                    </p>
                  </span>
                  <span className="topic-card-arrow text-2xl font-black text-black/30">
                    →
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
