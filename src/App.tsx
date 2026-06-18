import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ObscureTopicPage from './pages/ObscureTopicPage'
import SkipListPage from './pages/SkipListPage'
import { obscureTopics } from './data/obscureTopics'

function App() {
  const otherSlugs = Object.keys(obscureTopics).filter((slug) => slug !== 'skip-list')

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="skip-list" element={<SkipListPage />} />
        {otherSlugs.map((slug) => (
          <Route key={slug} path={slug} element={<ObscureTopicPage />} />
        ))}
      </Route>
    </Routes>
  )
}

export default App