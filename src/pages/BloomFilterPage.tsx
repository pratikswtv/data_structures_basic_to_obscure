import { Link } from 'react-router-dom'
import bloomFilterDiagram from '../assets/images/bloom-filter-diagram.png'
import countingBloomFilterDiagram from '../assets/images/counting-bloom-filter-diagram.png'

const bloomFilterIssues = [
  {
    title: 'False positives',
    color: '#FF5757',
    body: 'It can say “maybe present” even when the item was never inserted. It never gives false negatives.',
  },
  {
    title: 'No direct delete',
    color: '#FFC93C',
    body: 'Clearing one bit might accidentally remove evidence for many other items. Standard Bloom filters only support insert and lookup.',
  },
  {
    title: 'Gets saturated',
    color: '#4D96FF',
    body: 'As more items are inserted, more bits become 1, so the false-positive rate keeps rising.',
  },
  {
    title: 'Needs tuning',
    color: '#C77DFF',
    body: 'Bit-array size and number of hash functions must match expected data size. Bad tuning wastes memory or gives too many false positives.',
  },
]

const countingBloomSteps = [
  {
    title: 'Insert',
    color: '#6BCB77',
    body: 'Hash the item to several positions and increment each counter instead of setting a bit to 1.',
  },
  {
    title: 'Lookup',
    color: '#4D96FF',
    body: 'Check the same positions. If every counter is above 0, the item is maybe present. If any counter is 0, it is definitely absent.',
  },
  {
    title: 'Delete',
    color: '#FFC93C',
    body: 'Hash the item again and decrement those counters. Shared counters still stay positive for other items.',
  },
]

const homeworkTopics = [
  'Blocked Bloom filter',
  'Invertible Bloom filter',
  'Dynamic Bloom filter',
]

export default function BloomFilterPage() {
  return (
    <div className="space-y-10 pb-8">
      <header className="space-y-3 border-b-2 border-white/20 pb-8">
        <Link
          to="/#part-8"
          className="inline-block text-sm font-bold text-gray-400 transition hover:text-[#FFC93C] sm:text-base"
        >
          ← Back to topics
        </Link>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Bloom Filter
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          A probabilistic membership test — fast, tiny, and sometimes says “maybe”.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#4D96FF] sm:text-2xl">How it looks</h2>
        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={bloomFilterDiagram}
            alt="Bloom filter diagram showing input text hashed through multiple hash functions into positions in a bit array"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#FF5757] sm:text-2xl">
          Issues with Bloom filters
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {bloomFilterIssues.map(({ title, color, body }) => (
            <div
              key={title}
              className="rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                <p className="text-base font-bold text-white sm:text-lg">{title}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#FFC93C] sm:text-2xl">
          Fix — Counting Bloom filter
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          A counting Bloom filter replaces each bit with a small counter. That one change makes
          deletion possible.
        </p>

        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={countingBloomFilterDiagram}
            alt="Counting Bloom filter diagram showing multiple items incrementing counters and a query checking counter positions"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {countingBloomSteps.map(({ title, color, body }) => (
            <div
              key={title}
              className="rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                <p className="text-base font-bold text-white sm:text-lg">{title}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">{body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
          Tradeoff: counters need more memory than single bits, and deleting an item that was never
          inserted can corrupt the counts. So deletion should only happen for items you know were
          inserted.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#C77DFF] sm:text-2xl">Homework</h2>
        <div className="rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-4 sm:px-6 sm:py-5">
          <ul className="space-y-3">
            {homeworkTopics.map((topic) => (
              <li key={topic} className="flex gap-3 text-base text-gray-300 sm:text-lg">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C77DFF]" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
