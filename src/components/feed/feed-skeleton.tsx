export function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <article
          key={index}
          className="overflow-hidden rounded-lg border border-border bg-background"
        >
          <div className="aspect-square animate-pulse bg-muted" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
