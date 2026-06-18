import lectureHero from '../assets/images/lecture-hero.png'
import dataStructuresDiagram from '../assets/images/data-structures-diagram.png'
import coolEmoji from '../assets/images/cool-emoji.png'
import Part3Motivation from '../components/Part3Motivation'
import Part4Revision from '../components/Part4Revision'
import PartBuildBaseInterlude from '../components/PartBuildBaseInterlude'
import Part5Arrays from '../components/Part5Arrays'
import Part6LinkedListBasics from '../components/Part6LinkedListBasics'
import Part7TreesGraphsBasics from '../components/Part7TreesGraphsBasics'
import Part6ObscureMenu from '../components/Part6ObscureMenu'
import Part7SpinWheel from '../components/Part7SpinWheel'

const whyPoints = [
  {
    title: 'They organize raw data',
    body: 'Data structures are specialized formats for storing and arranging information — so programs can find, read, and update it without chaos.',
  },
  {
    title: 'They make code faster',
    body: 'The right structure can turn a slow brute-force approach into an efficient one. Arrays, hash maps, and trees exist because speed matters.',
  },
  {
    title: 'They mirror the real world',
    body: 'Queues model waiting lines, trees model hierarchies, graphs model networks — structures match how data actually relates in life.',
  },
]

export default function HomePage() {
  return (
    <div className="h-dvh snap-y snap-mandatory overflow-y-auto scroll-smooth">
      <section className="relative flex h-dvh min-h-dvh snap-start snap-always flex-col items-center justify-center px-8 text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-soft)_0%,_transparent_70%)] opacity-60"
          aria-hidden
        />

        <div className="relative z-10 max-w-5xl space-y-8">
          <h1 className="font-display text-4xl leading-[1.15] tracking-wide text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Data structures and their obscure variations
          </h1>
          <p className="mx-auto max-w-2xl font-future text-xl leading-relaxed text-muted italic sm:text-2xl">
            Let&apos;s take a tour of data structures and get comfortable with them!
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted">
          <span className="font-future text-sm tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      <section className="relative flex h-dvh min-h-dvh snap-start snap-always items-center justify-center bg-black p-4">
        <img
          src={lectureHero}
          alt="Data structures lecture visual"
          className="h-full w-full object-contain"
        />
      </section>

      <Part3Motivation />

      {/* Part 4 */}
      <section className="part4-why-section relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-hidden px-8 py-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--color-accent-soft)_0%,_transparent_55%)] opacity-15"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="space-y-8">
            <header className="space-y-3">
              <p className="font-future text-base tracking-[0.25em] text-accent uppercase sm:text-lg">
                Part 4
              </p>
              <h2 className="font-display text-3xl tracking-wide text-white uppercase sm:text-4xl md:text-5xl">
                What are data structures — and why do we need them?
              </h2>
            </header>

            <ul className="space-y-5">
              {whyPoints.map((point, index) => (
                <li
                  key={point.title}
                  className="flex gap-4 rounded-2xl border border-border/30 bg-black/70 px-5 py-4 backdrop-blur-sm"
                >
                  <span className="font-display shrink-0 text-2xl text-accent sm:text-3xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-future text-lg font-medium text-white sm:text-xl">
                      {point.title}
                    </h3>
                    <p className="font-future text-base leading-relaxed text-muted sm:text-lg">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center lg:items-end">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <img
                src={dataStructuresDiagram}
                alt="Diagram of queues, linked lists, stacks, trees, and graphs"
                className="w-full"
              />
              <img
                src={coolEmoji}
                alt=""
                aria-hidden
                className="mt-6 w-[90%]"
              />
            </div>
          </div>
        </div>
      </section>

      <PartBuildBaseInterlude />
      <Part5Arrays />
      <Part6LinkedListBasics />
      <Part7TreesGraphsBasics />
      <Part4Revision />
      <Part6ObscureMenu />
      <Part7SpinWheel />
    </div>
  )
}
