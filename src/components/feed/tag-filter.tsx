import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@radix-ui/themes'
import { Filter, X } from 'lucide-react'
import { inputClassName } from '@/components/ui/form-styles'
import { parseTagsInput, serializeTags } from '@/lib/utils'

interface TagFilterProps {
  activeTags: string[]
  onApply: (tags: string[]) => void
  onClear: () => void
}

interface TagFilterFormValues {
  tags: string
}

export function TagFilter({ activeTags, onApply, onClear }: TagFilterProps) {
  const { register, handleSubmit, reset, watch } = useForm<TagFilterFormValues>({
    defaultValues: {
      tags: serializeTags(activeTags),
    },
  })

  const tagsValue = watch('tags')

  useEffect(() => {
    reset({ tags: serializeTags(activeTags) })
  }, [activeTags, reset])

  return (
    <form
      className="space-y-3 rounded-lg border border-border bg-muted/30 p-4"
      onSubmit={handleSubmit(({ tags }) => onApply(parseTagsInput(tags)))}
    >
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Filter by tags</span>
        <input
          type="text"
          placeholder="beach, summer"
          className={inputClassName}
          {...register('tags')}
        />
      </label>
      <div className="flex gap-2">
        <Button type="submit" size="2">
          <Filter size={16} />
          Apply
        </Button>
        <Button
          type="button"
          variant="outline"
          size="2"
          onClick={() => {
            reset({ tags: '' })
            onClear()
          }}
          disabled={activeTags.length === 0 && tagsValue.length === 0}
        >
          <X size={16} />
          Clear
        </Button>
      </div>
    </form>
  )
}
