type DiagramPlaceholderProps = {
  label: string
}

export default function DiagramPlaceholder({ label }: DiagramPlaceholderProps) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-border bg-surface-elevated/50">
      <p className="text-sm text-muted">{label} goes here</p>
    </div>
  )
}
