import { useQuery } from '@tanstack/react-query'
import { Button } from '@radix-ui/themes'

import { fetchTags } from '@/lib/api/tags'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  activeTags: string[]
  onChange: (tags: string[]) => void
}

export function TagFilter({ activeTags, onChange }: TagFilterProps) {
  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  })

  function toggleTag(tagName: string) {
    if (activeTags.includes(tagName)) {
      onChange(activeTags.filter((tag) => tag !== tagName))
      return
    }

    onChange([...activeTags, tagName])
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
      <span className="text-sm font-medium">Filter by tags</span>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="1"
          variant={activeTags.length === 0 ? 'solid' : 'outline'}
          onClick={() => onChange([])}
        >
          All
        </Button>

        {isLoading && (
          <span className="self-center text-sm text-muted-foreground">
            Loading tags...
          </span>
        )}

        {isError && (
          <span className="self-center text-sm text-muted-foreground">
            Failed to load tags
          </span>
        )}

        {!isLoading &&
          !isError &&
          tags.map((tag) => {
            const isSelected = activeTags.includes(tag.name)

            return (
              <button
                key={tag.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleTag(tag.name)}
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80',
                )}
              >
                #{tag.name}
              </button>
            )
          })}
      </div>
    </div>
  )
}
