export type ObscureTopic = {
  slug: string
  title: string
  eyebrow: string
  description: string
  overview: string
  keyPoints: string[]
  next?: { label: string; path: string }
  prev?: { label: string; path: string }
}

export type ObscureMenuOption = {
  title: string
  subtitle: string
  path: string
}

export const obscureMenuOptions: ObscureMenuOption[] = [
  {
    title: 'Skip List',
    subtitle: 'Express lanes over a linked list',
    path: '/skip-list',
  },
  {
    title: 'Trie & Radix Tree',
    subtitle: 'Prefix trees and compressed paths',
    path: '/trie',
  },
  {
    title: 'Bloom Filter',
    subtitle: 'Probabilistic membership tests',
    path: '/bloom-filters',
  },
  {
    title: 'Hashing',
    subtitle: 'Chaining, probing, and cuckoo hashing',
    path: '/hashing',
  },
  {
    title: 'B-tree & B+-tree',
    subtitle: 'Wide trees for database indexes',
    path: '/b-plus-tree',
  },
]

export const obscureTopics: Record<string, ObscureTopic> = {
  'skip-list': {
    slug: 'skip-list',
    title: 'Skip List',
    eyebrow: 'Obscure Variation',
    description: 'A sorted linked list with express lanes.',
    overview: '',
    keyPoints: [],
  },
  trie: {
    slug: 'trie',
    title: 'Trie',
    eyebrow: 'Prefix Tree',
    description: 'Store strings character by character along shared prefixes.',
    overview: '',
    keyPoints: [],
    next: { label: 'Rope', path: '/rope' },
  },
  rope: {
    slug: 'rope',
    title: 'Rope',
    eyebrow: 'String Variant',
    description: 'A balanced tree built for heavy text editing.',
    overview:
      'A rope stores a long string as a binary tree of fragments. Concatenation and substring operations splice tree nodes instead of copying megabytes of characters — the trick behind efficient text editors and document buffers.',
    keyPoints: [
      'Concatenation can be O(1) by creating a new parent node over two ropes.',
      'Edits in the middle split nodes rather than shifting entire arrays.',
      'Bridging idea between tries (prefix structure) and practical string storage.',
    ],
    prev: { label: 'Trie', path: '/trie' },
    next: { label: 'Radix Tree', path: '/radix-tree' },
  },
  'radix-tree': {
    slug: 'radix-tree',
    title: 'Radix Tree',
    eyebrow: 'Compressed Trie',
    description: 'A trie that merges single-child chains into one edge label.',
    overview:
      'A radix tree (compressed trie) collapses nodes with only one child. Instead of spelling "c" → "a" → "t" as three nodes, one edge might hold "cat". Same prefix semantics, far fewer pointers — used in Linux page tables and IP routing.',
    keyPoints: [
      'Space-efficient compared to a naive trie with one node per character.',
      'Still supports prefix search and longest-prefix match.',
      'Patricia trie is a closely related name you will see in the wild.',
    ],
    prev: { label: 'Rope', path: '/rope' },
  },
  'bloom-filters': {
    slug: 'bloom-filters',
    title: 'Bloom Filter',
    eyebrow: 'Probabilistic Set',
    description: 'Tiny structure that answers "maybe yes" or "definitely no".',
    overview: '',
    keyPoints: [],
    next: { label: 'Cuckoo Filter', path: '/cuckoo-filter' },
  },
  'cuckoo-filter': {
    slug: 'cuckoo-filter',
    title: 'Cuckoo Filter',
    eyebrow: 'Bloom Successor',
    description: 'Like a Bloom filter, but supports deletion and often better cache behavior.',
    overview:
      'Cuckoo filters store fingerprints in a cuckoo hash table. Membership tests fingerprint collisions instead of many bit positions. You can delete entries and sometimes get better false-positive rates per byte than Bloom filters.',
    keyPoints: [
      'Supports delete — a practical upgrade over classic Bloom filters.',
      'Fingerprints are compact; lookup touches only two buckets (cuckoo hashing idea).',
      'Pair with HyperLogLog when you need both membership sketches and cardinality estimates.',
    ],
    prev: { label: 'Bloom Filters', path: '/bloom-filters' },
    next: { label: 'HyperLogLog', path: '/hyperloglog' },
  },
  hyperloglog: {
    slug: 'hyperloglog',
    title: 'HyperLogLog',
    eyebrow: 'Cardinality Sketch',
    description: 'Estimate how many unique items you have — in tiny memory.',
    overview:
      'HyperLogLog (HLL) estimates the number of distinct elements in a stream using a small register array and hash leading zeros. Error is roughly 1–2% with only kilobytes of RAM — Redis, BigQuery, and analytics pipelines use it constantly.',
    keyPoints: [
      'O(1) memory relative to stream size — magic for "how many unique visitors?"',
      'Mergeable across shards — each machine sketches locally, combine later.',
      'Often taught alongside Bloom/cuckoo filters as probabilistic data-structure cousins.',
    ],
    prev: { label: 'Cuckoo Filter', path: '/cuckoo-filter' },
  },
  hashing: {
    slug: 'hashing',
    title: 'Hashing',
    eyebrow: 'Foundation',
    description: 'Map keys to array slots — until two keys want the same slot.',
    overview: '',
    keyPoints: [],
    next: { label: 'Cuckoo Hashing', path: '/cuckoo-hashing' },
  },
  'cuckoo-hashing': {
    slug: 'cuckoo-hashing',
    title: 'Cuckoo Hashing',
    eyebrow: 'Hash Variant',
    description: 'Each key has two homes — kick the occupant out like a cuckoo bird.',
    overview:
      'Cuckoo hashing places each key in one of two possible buckets. If both are full, evict an existing key to its alternate location — a chain of kicks. Lookups check at most two spots, giving worst-case O(1) lookup time.',
    keyPoints: [
      'Worst-case lookup is constant — only two buckets to check.',
      'Insertion can fail if kick chains cycle; rehash with new hash functions fixes it.',
      'Powers cuckoo filters and high-performance hash map designs in research systems.',
    ],
    prev: { label: 'Hashing', path: '/hashing' },
  },
  'b-plus-tree': {
    slug: 'b-plus-tree',
    title: 'B-tree and B+-tree',
    eyebrow: 'Tree Variant',
    description: 'Wide, shallow trees designed for disk — and database indexes.',
    overview: '',
    keyPoints: [],
  },
}

export function getTopicBySlug(slug: string): ObscureTopic | undefined {
  return obscureTopics[slug]
}
