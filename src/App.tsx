import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ObscureTopicPage from './pages/ObscureTopicPage'
import SkipListPage from './pages/SkipListPage'
import TriePage from './pages/TriePage'
import { obscureTopics } from './data/obscureTopics'

function App() {
  const otherSlugs = Object.keys(obscureTopics).filter(
    (slug) => slug !== 'skip-list' && slug !== 'trie',
  )

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="skip-list" element={<SkipListPage />} />
        <Route path="trie" element={<TriePage />} />
        {otherSlugs.map((slug) => (
          <Route key={slug} path={slug} element={<ObscureTopicPage />} />
        ))}
      </Route>
    </Routes>
  )
}

export default App