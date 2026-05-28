import { useInfiniteQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { RefreshCw, Upload } from 'lucide-react'

import { FeedSkeleton } from '@/components/feed/feed-skeleton'
import { ImageItem } from '@/components/feed/image-item'
import { InfiniteScrollSentinel } from '@/components/feed/infinite-scroll-sentinel'
import { TagFilter } from '@/components/feed/tag-filter'
import { fetchImages } from '@/lib/api/images'

export function FeedPage() {
  const [activeTags, setActiveTags] = useState<string[]>([])

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['images', activeTags],
    queryFn: ({ pageParam }) =>
      fetchImages({ page: pageParam, size: 2, tags: activeTags }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })

  const images = data?.pages.flatMap((page) => page.content) ?? []

  return (
    <div className="space-y-6">
      <TagFilter
        activeTags={activeTags}
        onApply={setActiveTags}
        onClear={() => setActiveTags([])}
      />

      {isLoading && <FeedSkeleton />}

      {isError && (
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Failed to load images'}
          </p>
          <Button className="mt-3" size="1" onClick={() => refetch()}>
            <RefreshCw size={14} />
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && images.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="font-medium">
            {activeTags.length > 0
              ? 'No images match these tags'
              : 'No images yet'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeTags.length > 0
              ? 'Try different tags or clear the filter.'
              : 'Upload your first image to get started.'}
          </p>
          {activeTags.length === 0 && (
            <Button asChild className="mt-4" size="1">
              <Link to="/upload">
                <Upload size={14} />
                Upload image
              </Link>
            </Button>
          )}
        </div>
      )}

      {!isLoading && !isError && images.length > 0 && (
        <div className="space-y-6">
          {images.map((image) => (
            <ImageItem key={image.id} image={image} />
          ))}
        </div>
      )}

      {isFetchingNextPage && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Loading more...
        </p>
      )}

      {!isLoading && !isError && (
        <InfiniteScrollSentinel
          disabled={!hasNextPage || isFetchingNextPage}
          onVisible={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage()
            }
          }}
        />
      )}
    </div>
  )
}
