import { Link } from 'react-router-dom'
import chainingDiagram from '../assets/images/hashing-chaining-diagram.png'
import cuckooHashingDiagram from '../assets/images/cuckoo-hashing-diagram.png'
import javaTreeifyDiagram from '../assets/images/hashing-java-treeify-diagram.png'
import openAddressingDiagram from '../assets/images/hashing-open-addressing-diagram.png'

const openAddressingNotes = [
  {
    title: 'Linear probing',
    color: '#4D96FF',
    body: 'If the target bucket is full, check the next slot, then the next, until you find space: h(k, i) = (h(k) + i) mod m.',
  },
  {
    title: 'Quadratic probing',
    color: '#FFC93C',
    body: 'Instead of walking one-by-one, jump by growing squares: h(k, i) = (h(k) + i²) mod m. This reduces long clusters.',
  },
]

const cuckooHashingNotes = [
  {
    title: 'Strict lookup bound',
    color: '#6BCB77',
    body: 'A key has two possible homes. Lookup checks table 1 and table 2, then stops — worst-case O(1).',
  },
  {
    title: 'Insert may kick',
    color: '#FFC93C',
    body: 'If both homes are occupied, insertion evicts one key and moves it to its alternate home.',
  },
  {
    title: 'Cycles can happen',
    color: '#FF5757',
    body: 'A chain of evictions can loop forever. Real implementations cap the kicks, then rehash or resize.',
  },
]

const cuckooCycleNotes = [
  {
    title: 'Cap the kicks',
    color: '#FF5757',
    body: 'During insert, count how many evictions happen. If it passes a limit, assume the kick path is cycling.',
  },
  {
    title: 'Track visited positions',
    color: '#FFC93C',
    body: 'A stricter detector remembers table/index pairs touched during this insert. Seeing the same position again means a loop.',
  },
  {
    title: 'Rehash or resize',
    color: '#6BCB77',
    body: 'When a cycle is detected, rebuild with new hash functions or a larger table so the keys get new possible homes.',
  },
]

export default function HashingPage() {
  return (
    <div className="space-y-10 pb-8">
      <header className="space-y-3 border-b-2 border-white/20 pb-8">
        <Link
          to="/#part-8"
          className="inline-block text-sm font-bold text-gray-400 transition hover:text-[#FFC93C] sm:text-base"
        >
          ← Back to topics
        </Link>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">Hashing</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          Turn a key into an array index. The real story begins when two keys land in the same
          bucket.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#6BCB77] sm:text-2xl">Chaining</h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          In chaining, each bucket stores a small linked list. If multiple keys hash to the same
          index, they all sit in that bucket&apos;s chain.
        </p>

        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={chainingDiagram}
            alt="Hash table chaining diagram with buckets 0 through 6 and collisions stored as linked nodes"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: 'Collision friendly',
              color: '#6BCB77',
              body: 'Bucket 1 can hold both 15 and 8 because the bucket points to a chain.',
            },
            {
              title: 'Simple deletes',
              color: '#4D96FF',
              body: 'Delete is like linked-list delete inside the bucket. No probing cleanup rules.',
            },
            {
              title: 'Cost depends on chain length',
              color: '#FF5757',
              body: 'Average is O(1), but a crowded bucket can degrade toward O(n).',
            },
          ].map(({ title, color, body }) => (
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

        <div className="space-y-4 rounded-2xl border-2 border-white/15 bg-white/[0.03] p-4 sm:p-5">
          <h3 className="text-lg font-bold text-[#FFC93C] sm:text-xl">
            Java HashMap optimization — chain to red-black tree
          </h3>
          <div className="overflow-hidden rounded-xl bg-white p-3 sm:p-5">
            <img
              src={javaTreeifyDiagram}
              alt="Java HashMap bucket chains converting into tree nodes after a long collision chain"
              className="mx-auto w-full max-w-4xl object-contain"
            />
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Java&apos;s <span className="font-mono text-[#FFC93C]">HashMap</span> starts with
            chaining, but if one bucket&apos;s chain grows too long, lookup inside that bucket
            becomes slow. Once a bucket reaches length{' '}
            <span className="font-mono text-[#FF5757]">8</span>, Java can convert that chain into a
            red-black tree.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Before length 8',
                color: '#4D96FF',
                body: 'Bucket entries are stored as a linked list. Searching that bucket is O(k), where k is chain length.',
              },
              {
                title: 'At length 8',
                color: '#FFC93C',
                body: 'Java treeifies the bucket, but only when the table is large enough. Otherwise it prefers resizing first.',
              },
              {
                title: 'After treeify',
                color: '#6BCB77',
                body: 'The bucket becomes a red-black tree, so lookup within that bucket improves from O(k) to O(log k).',
              },
            ].map(({ title, color, body }) => (
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
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#FFC93C] sm:text-2xl">Open addressing</h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          In open addressing, every key lives directly inside the array. If a bucket is occupied,
          we probe for another slot using a repeatable rule.
        </p>

        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={openAddressingDiagram}
            alt="Linear probing example showing a hash table and insertion by probing to the next available slot"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {openAddressingNotes.map(({ title, color, body }) => (
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
          Open addressing saves pointer memory, but it needs empty slots to breathe. As load factor
          rises, probing gets slower, so resizing is important.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#C77DFF] sm:text-2xl">Cuckoo hashing</h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          Cuckoo hashing gives each key two possible buckets, usually one in each table. If a new
          key finds both homes full, it kicks one key out, like a cuckoo bird taking another
          bird&apos;s nest.
        </p>

        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={cuckooHashingDiagram}
            alt="Cuckoo hashing diagram showing two hash tables and keys moving between alternate positions"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {cuckooHashingNotes.map(({ title, color, body }) => (
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
          Tradeoff: lookup is excellent because it checks only a constant number of locations, but
          insertion is less predictable. High load, bad hash functions, or eviction cycles can force
          a resize/rehash, so cuckoo hashing buys fast reads with more complicated writes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#FF5757] sm:text-2xl">
          Detecting and preventing cycles
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          A cycle means insertion keeps kicking the same small set of keys around without finding an
          empty slot. Cuckoo hashing handles this by treating long kick chains as a signal to rebuild.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {cuckooCycleNotes.map(({ title, color, body }) => (
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
          Practical rule: keep the load factor below the danger zone, use good independent hash
          functions, cap insertion attempts, and rehash when the cap is hit.
        </p>
      </section>
    </div>
  )
}
