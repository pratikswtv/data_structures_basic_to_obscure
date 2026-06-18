export default function PartBuildBaseInterlude() {
  return (
    <section className="part-build-construct relative flex h-dvh min-h-dvh snap-start snap-always items-center justify-center overflow-hidden px-6 py-10 sm:px-10">
      <div className="part-build-construct-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="part-build-construct-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="construct-cloud construct-cloud--1 pointer-events-none" aria-hidden />
      <div className="construct-cloud construct-cloud--2 pointer-events-none" aria-hidden />

      <div className="part-build-construct-scene relative z-10">
        <div className="construct-ground" />

        <div className="construct-base construct-base--outer">
          <div className="construct-base-shine" aria-hidden />
        </div>
        <div className="construct-base construct-base--inner" />
        <div className="construct-rebar construct-rebar--1" />
        <div className="construct-rebar construct-rebar--2" />
        <div className="construct-rebar construct-rebar--3" />
        <div className="construct-rebar construct-rebar--4" />
        <div className="construct-rebar construct-rebar--5" />

        <div className="construct-building">
          <div className="construct-core" />
          <div className="construct-floor construct-floor--1">
            <span className="construct-window" />
            <span className="construct-window" />
            <span className="construct-window" />
          </div>
          <div className="construct-floor construct-floor--2">
            <span className="construct-window" />
            <span className="construct-window" />
            <span className="construct-window" />
          </div>
          <div className="construct-floor construct-floor--3">
            <span className="construct-window" />
            <span className="construct-window" />
            <span className="construct-window" />
          </div>
          <div className="construct-floor construct-floor--4">
            <span className="construct-window" />
            <span className="construct-window" />
            <span className="construct-window" />
          </div>
          <div className="construct-floor construct-floor--5">
            <span className="construct-window" />
            <span className="construct-window" />
            <span className="construct-window" />
          </div>
          <div className="construct-roof" />
        </div>

        <div className="construct-crane">
          <div className="construct-crane-mast" />
          <div className="construct-crane-jib" />
          <div className="construct-crane-counter" />
          <div className="construct-crane-rig">
            <div className="construct-crane-trolley" />
            <div className="construct-crane-cable" />
            <div className="construct-crane-hook" />
            <div className="construct-crane-load" />
          </div>
        </div>

        <div className="construct-dust construct-dust--1" aria-hidden />
        <div className="construct-dust construct-dust--2" aria-hidden />
        <div className="construct-dust construct-dust--3" aria-hidden />
        <div className="construct-spark construct-spark--1" aria-hidden />
        <div className="construct-spark construct-spark--2" aria-hidden />
        <div className="construct-spark construct-spark--3" aria-hidden />
      </div>

      <div className="construct-caption absolute bottom-16 left-1/2 z-10 sm:bottom-20 md:bottom-24">
        <div className="construct-caption-bricks" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="construct-caption-text">
          lets start by building a{' '}
          <span className="construct-caption-highlight">strong base</span>
        </p>
      </div>
    </section>
  )
}
