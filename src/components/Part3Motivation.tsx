const motivations = [
  {
    tag: 'How',
    title: 'How things work',
    body: 'We look at how data is stored in memory and what happens when you use each structure.',
    accent: '#5b9fd4',
  },
  {
    tag: 'Why',
    title: 'Why we use them',
    body: 'We cover when to use each structure and what trade-offs come with that choice.',
    accent: '#C77DFF',
  },
]

const foundationTopics = [
  { label: 'Arrays', hint: 'fixed-size list' },
  { label: 'Lists', hint: 'linked nodes' },
  { label: 'Graphs & Trees', hint: 'connected data' },
]

const obscureTopics = [
  { label: 'Skip Lists', hint: 'sorted list with shortcuts' },
  { label: 'B+ Trees', hint: 'database indexes' },
  { label: 'Bloom Filters', hint: 'set membership' },
  { label: 'Tries & more', hint: 'string lookup' },
]

const timelineStops = [
  {
    phase: '01',
    title: 'Introduction',
    time: '5–10 min',
    note: 'Set the stage & align on goals',
    accent: '#5b9fd4',
    driver: false,
  },
  {
    phase: '02',
    title: 'Covering the basics',
    time: '~10 min',
    note: 'Arrays, lists, graphs & trees',
    accent: '#6BCB77',
    driver: false,
  },
  {
    phase: '03',
    title: 'Less talked about structures',
    time: 'You decide',
    note: 'The fun part — pick topics & how deep we go',
    accent: '#C77DFF',
    driver: true,
  },
]

export default function Part3Motivation() {
  return (
    <section className="part3-section relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-8 sm:py-6">
      <div className="part3-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="part3-glow pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full" aria-hidden />
      <div className="part3-glow pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full" aria-hidden />
      <div className="part3-float-particle pointer-events-none absolute top-[18%] left-[8%] h-3 w-3 rounded-full bg-[#5b9fd4]/40" aria-hidden />
      <div className="part3-float-particle pointer-events-none absolute top-[42%] right-[6%] h-2 w-2 rounded-full bg-[#6BCB77]/50" style={{ animationDelay: '1.2s' }} aria-hidden />
      <div className="part3-float-particle pointer-events-none absolute bottom-[22%] left-[22%] h-2.5 w-2.5 rounded-full bg-[#C77DFF]/45" style={{ animationDelay: '2.4s' }} aria-hidden />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[min(96vw,88rem)] flex-col justify-center gap-5 lg:gap-6">
        <header className="part3-header space-y-2 text-center lg:text-left">
          <p className="text-base font-medium text-accent sm:text-lg">Part 3 — Orientation</p>
          <h2 className="text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Overview
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0 lg:text-xl">
            We start with common data structures, then move on to less common ones.
          </p>
        </header>

        <div className="part3-timeline rounded-2xl border border-border/30 bg-black/75 px-5 py-6 backdrop-blur-md sm:px-8 sm:py-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-accent sm:text-base">Rough timeline</p>
              <h3 className="text-xl text-white sm:text-2xl lg:text-3xl">How we&apos;ll spend our time</h3>
            </div>
            <p className="part3-driver-pill text-sm font-semibold text-[#FFC93C] sm:text-base">
              🎮 You&apos;re in the driver&apos;s seat
            </p>
          </div>

          <div className="part3-timeline-track relative grid gap-5 md:grid-cols-3 md:gap-4">
            <div className="part3-timeline-rail pointer-events-none hidden md:block" aria-hidden>
              <span className="part3-timeline-traveler" aria-hidden />
            </div>

            {timelineStops.map((stop, index) => (
              <div
                key={stop.phase}
                className={`part3-timeline-stop part3-timeline-stop--${index + 1} relative rounded-xl border px-5 py-4 transition-transform duration-300 hover:-translate-y-1 ${
                  stop.driver
                    ? 'border-[#C77DFF]/40 bg-[#C77DFF]/[0.08]'
                    : 'border-border/30 bg-black/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="part3-timeline-dot flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black sm:h-11 sm:w-11 sm:text-base"
                    style={{ backgroundColor: stop.accent, animationDelay: `${index * 0.4}s` }}
                  >
                    {stop.phase}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold sm:text-sm"
                    style={{
                      backgroundColor: `${stop.accent}22`,
                      color: stop.accent,
                      border: `1px solid ${stop.accent}55`,
                    }}
                  >
                    {stop.time}
                  </span>
                </div>
                <h4 className="mt-3 text-base font-semibold text-white sm:text-lg lg:text-xl">
                  {stop.title}
                  {stop.driver && (
                    <span className="part3-star ml-1.5 inline-block text-[#FFC93C]">★</span>
                  )}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                  {stop.note}
                </p>
                {stop.driver && (
                  <p className="part3-driver-tag mt-2.5 text-sm font-bold text-[#C77DFF] sm:text-base">
                    Choose what we learn &amp; how long we stay
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid flex-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="part3-content-col space-y-4">
            <p className="text-sm font-medium text-accent sm:text-base">Content</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {motivations.map((item, index) => (
                <article
                  key={item.title}
                  className="part3-spec relative overflow-hidden rounded-2xl border border-border/40 bg-black/70 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6"
                  style={{ animationDelay: `${0.35 + index * 0.12}s` }}
                >
                  <div
                    className="absolute top-0 left-0 h-1.5 w-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  <p className="text-sm font-semibold sm:text-base" style={{ color: item.accent }}>
                    {item.tag}
                  </p>
                  <h3 className="mt-2 text-xl text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-2.5 text-base leading-relaxed text-muted sm:text-lg">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="part3-roadmap flex flex-col rounded-2xl border border-border/30 bg-black/80 px-5 py-5 backdrop-blur-md sm:px-7 sm:py-6">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-accent sm:text-base">Outline</p>
                <h3 className="text-xl text-white sm:text-2xl lg:text-3xl">Two parts</h3>
              </div>
              <p className="text-sm text-muted sm:text-base">basics first, then obscure topics</p>
            </div>

            <div className="relative grid flex-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-5">
              <div className="part3-phase space-y-3">
                <div className="flex items-center gap-3">
                  <span className="part3-phase-badge text-base text-accent">01</span>
                  <h4 className="text-lg font-medium text-white sm:text-xl">Basics</h4>
                </div>
                <ul className="space-y-2">
                  {foundationTopics.map((topic, index) => (
                    <li
                      key={topic.label}
                      className="part3-topic-item flex items-center justify-between gap-3 rounded-xl border border-border/30 bg-black/60 px-4 py-3 transition-colors duration-300 hover:border-[#5b9fd4]/40 hover:bg-[#5b9fd4]/[0.06]"
                      style={{ animationDelay: `${0.55 + index * 0.1}s` }}
                    >
                      <span className="text-base font-medium text-white sm:text-lg">{topic.label}</span>
                      <span className="text-sm text-muted sm:text-base">{topic.hint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="part3-connector relative flex items-center justify-center lg:flex-col lg:px-2">
                <svg
                  viewBox="0 0 120 40"
                  className="hidden h-10 w-28 text-accent lg:block"
                  aria-hidden
                >
                  <line
                    x1="4"
                    y1="20"
                    x2="116"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="part3-dash"
                  />
                  <polygon points="116,14 124,20 116,26" fill="currentColor" className="part3-arrow-head" />
                </svg>
                <svg
                  viewBox="0 0 40 120"
                  className="h-24 w-10 text-accent lg:hidden"
                  aria-hidden
                >
                  <line
                    x1="20"
                    y1="4"
                    x2="20"
                    y2="116"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="part3-dash"
                  />
                  <polygon points="14,116 20,124 26,116" fill="currentColor" className="part3-arrow-head" />
                </svg>
                <span className="part3-depth absolute rounded-full border border-accent/40 bg-accent-soft/40 px-3 py-1 text-xs text-accent sm:text-sm lg:top-1/2 lg:-translate-y-1/2">
                  then
                </span>
              </div>

              <div className="part3-phase space-y-3">
                <div className="flex items-center gap-3">
                  <span className="part3-phase-badge text-base text-[#C77DFF]">02</span>
                  <h4 className="text-lg font-medium text-white sm:text-xl">Obscure topics</h4>
                </div>
                <ul className="space-y-2">
                  {obscureTopics.map((topic, index) => (
                    <li
                      key={topic.label}
                      className="part3-topic-item part3-topic-item--obscure flex items-center justify-between gap-3 rounded-xl border border-[#C77DFF]/15 bg-[#C77DFF]/[0.03] px-4 py-3 transition-colors duration-300 hover:border-[#C77DFF]/35 hover:bg-[#C77DFF]/[0.08]"
                      style={{ animationDelay: `${0.75 + index * 0.1}s` }}
                    >
                      <span className="text-base font-medium text-white sm:text-lg">{topic.label}</span>
                      <span className="text-sm text-muted sm:text-base">{topic.hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="part3-footer-note mt-5 text-center text-sm text-muted sm:text-base lg:text-left">
              Obscure topics build on the basics — and you steer how far we go.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
