import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import BPlusTreePage from './pages/BPlusTreePage'
import FarewellPage from './pages/FarewellPage'
import HomePage from './pages/HomePage'
import BloomFilterPage from './pages/BloomFilterPage'
import HashingPage from './pages/HashingPage'
import ObscureTopicPage from './pages/ObscureTopicPage'
import SkipListPage from './pages/SkipListPage'
import TriePage from './pages/TriePage'
import { obscureTopics } from './data/obscureTopics'

function App() {
  const otherSlugs = Object.keys(obscureTopics).filter(
    (slug) =>
      slug !== 'skip-list' &&
      slug !== 'trie' &&
      slug !== 'bloom-filters' &&
      slug !== 'hashing' &&
      slug !== 'b-plus-tree',
  )

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="skip-list" element={<SkipListPage />} />
        <Route path="trie" element={<TriePage />} />
        <Route path="bloom-filters" element={<BloomFilterPage />} />
        <Route path="hashing" element={<HashingPage />} />
        <Route path="b-plus-tree" element={<BPlusTreePage />} />
        <Route path="farewell" element={<FarewellPage />} />
        {otherSlugs.map((slug) => (
          <Route key={slug} path={slug} element={<ObscureTopicPage />} />
        ))}
      </Route>
    </Routes>
  )
}

export default App