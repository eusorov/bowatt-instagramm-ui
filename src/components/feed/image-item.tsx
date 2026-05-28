import { useState } from 'react'

import type { ImageResponse } from '@/lib/api/image-types'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

interface ImageItemProps {
  image: ImageResponse
}

export function ImageItem({ image }: ImageItemProps) {
  const [hasError, setHasError] = useState(false)

  const createdAt = dayjs(image.createdAt)

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="relative aspect-square bg-muted">
        {hasError ? (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            Failed to load image
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.title}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-semibold leading-tight">{image.title}</h2>
          <time
            className="shrink-0 text-xs text-muted-foreground"
            dateTime={image.createdAt}
          >
            {createdAt.format('MMM D, YYYY')}
          </time>
        </div>
        {image.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {image.tags.map((tag) => (
              <li
                key={tag}
                className={cn(
                  'rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground',
                )}
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
