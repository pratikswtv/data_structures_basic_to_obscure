import PageHeader from '../components/PageHeader'
import DiagramPlaceholder from '../components/DiagramPlaceholder'

type TopicPageProps = {
  topic: string
}

export default function TopicPage({ topic }: TopicPageProps) {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topic"
        title={topic}
        description="Replace this placeholder content with your lecture notes, diagrams, and examples."
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Overview</h2>
        <p className="max-w-3xl leading-relaxed text-muted">
          Add a short explanation here. Keep paragraphs brief so they are easy to
          read on a projector during your presentation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Diagram</h2>
        <DiagramPlaceholder label={`${topic} diagram`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Key Points</h2>
        <ul className="space-y-3 text-muted">
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>First key point for {topic.toLowerCase()}.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>Second key point — time or space complexity.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>Third key point — when to use this structure.</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
