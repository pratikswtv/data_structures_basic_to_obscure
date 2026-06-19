import { Link } from 'react-router-dom'
import farewellWalkingAway from '../assets/images/farewell-walking-away.png'

export default function FarewellPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="max-w-3xl space-y-8 rounded-3xl border-2 border-white/15 bg-white/5 px-6 py-12 shadow-2xl sm:px-10 sm:py-16">
        <p className="text-xl font-bold text-[#FFC93C] sm:text-2xl">wTVision</p>
        <h1 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl">
          Thank you
        </h1>
        <p className="text-3xl font-bold text-[#C77DFF] sm:text-4xl">
          Bye bye
        </p>
        <img
          src={farewellWalkingAway}
          alt="Green character walking away with a bag"
          className="mx-auto max-h-[28rem] w-full max-w-sm rounded-3xl object-contain"
        />
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          Since it&apos;s my last working day here at wTVision, this is the final slide.
          Grateful for the people, the work, and everything learned along the way.
        </p>
        <Link
          to="/#part-8"
          className="inline-block rounded-full border-2 border-[#FFC93C] px-5 py-2.5 text-base font-bold text-[#FFC93C] transition hover:bg-[#FFC93C] hover:text-black sm:text-lg"
        >
          Back to topics
        </Link>
      </div>
    </div>
  )
}
