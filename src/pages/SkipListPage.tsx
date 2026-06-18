import { Link } from 'react-router-dom'
import skipListDiagram from '../assets/images/skip-list-diagram.png'
import SkipListVisualCode from '../components/SkipListVisualCode'

export default function SkipListPage() {
  return (
    <div className="space-y-10 pb-8">
      <header className="space-y-3 border-b-2 border-white/20 pb-8">
        <Link
          to="/"
          className="inline-block text-sm font-bold text-gray-400 transition hover:text-[#FFC93C] sm:text-base"
        >
          ← Back to lecture
        </Link>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">Skip List</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          A sorted linked list with express lanes — search drops down level by level.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#4D96FF] sm:text-2xl">How it looks</h2>
        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white/[0.03] p-3 sm:p-5">
          <img
            src={skipListDiagram}
            alt="Skip list diagram showing levels L0, L1, and L2 with nodes from negative infinity to infinity, express lanes, and a search path to node 55"
            className="mx-auto w-full max-w-4xl object-contain"
          />
          <p className="mt-4 text-center text-sm text-gray-400 sm:text-base">
            Bottom lane (L0) has every value. Higher lanes skip ahead. Red dashed path = search for{' '}
            <span className="font-bold text-[#FF5757]">55</span>.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#C77DFF] sm:text-2xl">The code</h2>
        <SkipListVisualCode />
      </section>
    </div>
  )
}
