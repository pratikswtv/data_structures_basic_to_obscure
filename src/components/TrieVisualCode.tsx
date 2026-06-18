import type { ReactNode } from 'react'

/** Compact children[26] diagram — maps index → letter */
function ChildrenArrayHint() {
  const slots = [
    { idx: 0, letter: 'a', active: false },
    { idx: 2, letter: 'c', active: true },
    { idx: 19, letter: 't', active: true },
    { idx: 25, letter: 'z', active: false },
  ]

  return (
    <div className="trie-children-hint my-3 flex flex-wrap items-start gap-4 font-mono text-xs sm:text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        {slots.map(({ idx, letter, active }) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-500 sm:text-xs">[{idx}]</span>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 text-sm font-bold sm:h-9 sm:w-9 ${
                active
                  ? 'border-[#4D96FF] bg-[#4D96FF]/20 text-[#4D96FF]'
                  : 'border-white/15 bg-white/5 text-gray-500'
              }`}
            >
              {active ? letter : '/'}
            </div>
            <span className="text-[10px] text-gray-600 sm:text-xs">{letter}</span>
          </div>
        ))}
        <span className="self-center px-1 text-gray-500">…</span>
      </div>
      <p className="max-w-[13rem] text-[11px] leading-snug text-gray-500 sm:text-xs">
        <span className="text-[#4D96FF]">children[i]</span> → child for letter{' '}
        <span className="text-gray-400">'a' + i</span>. Empty slots stay{' '}
        <span className="text-[#FF5757]">nullptr</span>.
      </p>
    </div>
  )
}

/** Matches diagram: green = prefix, red = complete word */
function EndOfWordHint() {
  return (
    <div className="trie-eow-hint my-3 flex flex-wrap items-center gap-4 font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-8 w-2 rounded-sm bg-[#6BCB77]"
            aria-hidden
          />
          <span className="text-gray-400">
            is_end_of_word = <span className="text-[#6BCB77]">false</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-8 w-2 rounded-sm bg-[#FF5757]"
            aria-hidden
          />
          <span className="text-gray-400">
            is_end_of_word = <span className="text-[#FF5757]">true</span>
          </span>
        </div>
      </div>
      <p className="text-[11px] leading-snug text-gray-500 sm:text-xs">
        red flag in the diagram = this node completes a stored word
      </p>
    </div>
  )
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="trie-code-block rounded-2xl border-2 border-white/15 bg-black/60 px-4 py-4 font-mono text-sm leading-relaxed text-gray-200 sm:px-6 sm:py-5 sm:text-base">
      {children}
    </div>
  )
}

export default function TrieVisualCode() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-mono text-lg font-bold text-[#4D96FF] sm:text-xl">struct TrieNode</h3>
        <CodeBlock>
          <span className="text-[#FFC93C]">struct</span> <span className="text-white">TrieNode</span>{' '}
          {'{'}
          <br />
          <br />
          &nbsp;&nbsp;<span className="text-gray-500">// Array of 26 pointers — letters 'a' through 'z'</span>
          <br />
          &nbsp;&nbsp;TrieNode* children[26];
          <br />
          <ChildrenArrayHint />
          <br />
          &nbsp;&nbsp;<span className="text-gray-500">// Flag: does this node complete a distinct word?</span>
          <br />
          &nbsp;&nbsp;<span className="text-[#4D96FF]">bool</span> is_end_of_word;
          <br />
          <EndOfWordHint />
          <br />
          &nbsp;&nbsp;<span className="text-gray-500">// Constructor</span>
          <br />
          &nbsp;&nbsp;TrieNode() {'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>-&gt;is_end_of_word ={' '}
          <span className="text-[#6BCB77]">false</span>;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Initialize all child pointers to null</span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FFC93C]">for</span> (<span className="text-[#4D96FF]">int</span> i = 0; i &lt; 26; i++) {'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#6BCB77]">this</span>-&gt;children[i] ={' '}
          <span className="text-[#FF5757]">nullptr</span>;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
          <br />
          &nbsp;&nbsp;{'}'}
          <br />
          {'}'}
        </CodeBlock>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          Each edge in the diagram is one non-null slot in{' '}
          <span className="font-mono text-[#4D96FF]">children[]</span> — follow characters
          left to right to spell a word.
        </p>
      </div>
    </div>
  )
}
