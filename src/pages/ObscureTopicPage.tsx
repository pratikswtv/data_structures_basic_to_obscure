import { Link, Navigate, useLocation } from 'react-router-dom'
import DiagramPlaceholder from '../components/DiagramPlaceholder'
import { getTopicBySlug } from '../data/obscureTopics'

export default function ObscureTopicPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const topic = getTopicBySlug(slug)

  if (!topic) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="comic-theme space-y-10 pb-8">
      <header className="space-y-4 border-b-2 border-white/20 pb-8">
        <p className="text-xl font-bold text-[#FFC93C]">{topic.eyebrow}</p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{topic.title}</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
          {topic.description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#4D96FF] sm:text-3xl">Overview</h2>
        <p className="max-w-3xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
          {topic.overview}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#C77DFF] sm:text-3xl">Diagram</h2>
        <DiagramPlaceholder label={`${topic.title} diagram`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#6BCB77] sm:text-3xl">Key Points</h2>
        <ul className="space-y-4">
          {topic.keyPoints.map((point) => (
            <li key={point} className="flex gap-3 text-xl text-gray-300 sm:text-2xl">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5757]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {(topic.prev || topic.next) && (
        <nav className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-white/20 pt-8">
          {topic.prev ? (
            <Link
              to={topic.prev.path}
              className="text-xl font-bold text-gray-400 transition hover:text-[#FFC93C]"
            >
              ← {topic.prev.label}
            </Link>
          ) : (
            <span />
          )}
          {topic.next ? (
            <Link
              to={topic.next.path}
              className="text-xl font-bold text-gray-400 transition hover:text-[#FFC93C]"
            >
              {topic.next.label} →
            </Link>
          ) : (
            <Link
              to="/"
              className="text-xl font-bold text-gray-400 transition hover:text-[#FFC93C]"
            >
              Back to lecture →
            </Link>
          )}
        </nav>
      )}

      {!topic.prev && !topic.next && (
        <div className="border-t-2 border-white/20 pt-8">
          <Link
            to="/"
            className="text-xl font-bold text-gray-400 transition hover:text-[#FFC93C]"
          >
            ← Back to lecture
          </Link>
        </div>
      )}
    </div>
  )
}
