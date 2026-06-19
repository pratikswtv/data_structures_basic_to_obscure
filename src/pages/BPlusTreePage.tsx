import { Link } from 'react-router-dom'
import bPlusTreeDiagram from '../assets/images/b-plus-tree-diagram.png'
import bTreeDiagram from '../assets/images/b-tree-diagram.png'

const comparisonPoints = [
  {
    title: 'Where records live',
    color: '#4D96FF',
    body: 'B-tree can store actual data in internal nodes and leaves. B+-tree keeps actual records in leaf nodes only.',
  },
  {
    title: 'Range queries',
    color: '#6BCB77',
    body: 'B+-tree leaves are linked, so scanning 100 to 200 is just leaf-to-leaf traversal.',
  },
  {
    title: 'Database indexes',
    color: '#FFC93C',
    body: 'B+-trees are common in databases because internal nodes stay small and leaves support fast range scans.',
  },
]

export default function BPlusTreePage() {
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
          B-tree and B+-tree
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          Wide, balanced search trees built to keep disk/database lookups shallow.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#4D96FF] sm:text-2xl">B-tree</h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          A B-tree is a multi-way search tree. Each node can hold many sorted keys, so one node
          branches to many children. That keeps the tree short, which is exactly what you want when
          reading from disk.
        </p>

        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={bTreeDiagram}
            alt="B-tree diagram showing internal nodes with multiple keys and child ranges"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        <div className="rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            Search works like binary search inside each node, then follows the correct child pointer.
            Insertion/deletion may split or merge nodes to keep the tree balanced.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#6BCB77] sm:text-2xl">B+-tree</h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          A B+-tree is optimized for indexes. Internal nodes act like signboards, while all actual
          records live in the leaf level. The leaves are linked, so range queries become fast scans.
        </p>

        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white p-3 sm:p-5">
          <img
            src={bPlusTreeDiagram}
            alt="B plus tree diagram with internal routing keys and linked leaf nodes containing row ids"
            className="mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {comparisonPoints.map(({ title, color, body }) => (
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
    </div>
  )
}
