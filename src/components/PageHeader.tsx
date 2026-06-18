type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="space-y-3 border-b border-border pb-8">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {description}
      </p>
    </header>
  )
}
