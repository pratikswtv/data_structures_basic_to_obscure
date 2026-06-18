import revisionStamp from '../assets/images/revision-stamp.png'

const checkpointSteps = ['Start', 'Basics', 'You are here', 'The abyss']

export default function Part4Revision() {
  return (
    <section className="grim-theme part4-section relative flex h-dvh min-h-dvh snap-start snap-always items-center overflow-hidden px-6 py-10 sm:px-10">
      <div className="part4-vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="part4-fog pointer-events-none absolute inset-x-0 bottom-0 h-2/5" aria-hidden />
      <div
        className="part4-scanline pointer-events-none absolute inset-x-0 top-0"
        aria-hidden
      />
      <div className="part4-frame pointer-events-none absolute inset-4 rounded-sm sm:inset-6" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-8 text-left">
          <div className="inline-flex items-center gap-3 border border-[#5a5550] px-5 py-2">
            <span className="part4-blink h-2 w-2 rounded-full bg-[#c4c0ba]" />
            <span className="text-xl text-[#d8d4ce] sm:text-2xl">
              Part 05 — Warning!
            </span>
          </div>

          <div className="space-y-6">
            <p className="text-2xl leading-relaxed text-[#c8c4be] sm:text-3xl">
              we are going to move to the
            </p>

            <h2 className="part4-abyss text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl">
              not so fun side
            </h2>

            <p className="text-2xl leading-relaxed text-[#c8c4be] sm:text-3xl">
              of data structures&hellip; buckle up!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg text-[#a8a4a0] sm:text-xl">
              {checkpointSteps.map((step) => (
                <span
                  key={step}
                  className={
                    step === 'You are here'
                      ? 'text-[#ece8e2]'
                      : step === 'The abyss'
                        ? 'part4-abyss-label'
                        : undefined
                  }
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="part4-progress-track relative h-2 overflow-hidden bg-[#1a1816]">
              <div className="part4-progress absolute inset-y-0 left-0 w-[62%] bg-[#6b6660]" />
              <div className="part4-progress-glow pointer-events-none absolute inset-y-0 left-0 w-[62%]" aria-hidden />
            </div>
            <p className="part4-standby text-xl text-[#a8a4a0] italic">
              Loading shared context&hellip; please stand by
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-6 lg:py-0">
          <div className="part4-stamp-glow pointer-events-none absolute h-56 w-56 rounded-full sm:h-72 sm:w-72" aria-hidden />

          <img
            src={revisionStamp}
            alt="Revision stamp"
            className="part4-stamp relative z-10 w-52 sm:w-60 md:w-72"
          />
        </div>
      </div>
    </section>
  )
}
