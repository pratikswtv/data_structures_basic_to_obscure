import { Link } from 'react-router-dom'
import trieDiagram from '../assets/images/trie-diagram.png'
import radixTreeDiagram from '../assets/images/radix-tree-diagram.png'
import TrieVisualCode from '../components/TrieVisualCode'

const radixTreeBenefits = [
  {
    color: '#FFC93C',
    title: 'Fewer nodes',
    body: 'Single-child chains collapse into one edge — "ter" lives in one node instead of three.',
  },
  {
    color: '#4D96FF',
    title: 'Less wasted memory',
    body: 'A naive trie allocates 26 pointers per node even when only one letter is used. Radix trees skip that overhead.',
  },
  {
    color: '#6BCB77',
    title: 'Same prefix power',
    body: 'Lookups still walk character by character — shared prefixes like P → e stay merged, just with fewer hops.',
  },
  {
    color: '#C77DFF',
    title: 'Built for the real world',
    body: 'Linux page tables, IP routing, and autocomplete backends often use radix / Patricia variants for exactly this reason.',
  },
]

export default function TriePage() {
  return (
    <div className="space-y-10 pb-8">
      <header className="space-y-3 border-b-2 border-white/20 pb-8">
        <Link
          to="/"
          className="inline-block text-sm font-bold text-gray-400 transition hover:text-[#FFC93C] sm:text-base"
        >
          ← Back to lecture
        </Link>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">Trie</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          A prefix tree — store strings character by character along shared paths.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#4D96FF] sm:text-2xl">How it looks</h2>
        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white/[0.03] p-3 sm:p-5">
          <img
            src={trieDiagram}
            alt="Trie diagram for words cane, car, and tear showing root node, character slots in children arrays, and green or red end-of-word flags"
            className="mx-auto w-full max-w-4xl object-contain"
          />
          <p className="mt-4 text-center text-sm text-gray-400 sm:text-base">
            Words <span className="font-bold text-[#FFC93C]">cane</span>,{' '}
            <span className="font-bold text-[#4D96FF]">car</span>, and{' '}
            <span className="font-bold text-[#6BCB77]">tear</span> share prefixes where
            possible. <span className="text-[#FF5757]">Red</span> = end of word,{' '}
            <span className="text-[#6BCB77]">green</span> = prefix only.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#C77DFF] sm:text-2xl">The code</h2>
        <TrieVisualCode />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#FFC93C] sm:text-2xl">Optimization — Radix tree</h2>
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          A radix tree (compressed trie) merges nodes that have only one child. Same prefix semantics,
          far fewer nodes to traverse.
        </p>
        <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-white/[0.03] p-3 sm:p-5">
          <div className="mx-auto max-w-4xl rounded-xl bg-white p-4 sm:p-6">
            <img
              src={radixTreeDiagram}
              alt="Radix tree storing Peter, Peck, Peppers, Piper, Picked, and Pickled with compressed multi-character nodes"
              className="mx-auto w-full object-contain"
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-400 sm:text-base">
            Six words from a shared <span className="font-bold text-white">P</span> root — notice{' '}
            <span className="font-bold text-[#FFC93C]">ter</span>,{' '}
            <span className="font-bold text-[#4D96FF]">ppers</span>, and{' '}
            <span className="font-bold text-[#6BCB77]">ck</span> stored as whole chunks, not one
            letter per node.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {radixTreeBenefits.map(({ color, title, body }) => (
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
