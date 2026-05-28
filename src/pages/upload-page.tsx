import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@radix-ui/themes'
import { Upload, X } from 'lucide-react'
import { fieldErrorClassName, inputClassName } from '@/components/ui/form-styles'
import { ApiError } from '@/lib/api/client'
import { uploadImage } from '@/lib/api/images'
import { parseTagsInput } from '@/lib/utils'
import { cn } from '@/lib/utils'

const MAX_TAGS = 10

interface UploadFormValues {
  file: FileList | null
  title: string
  tags: string
}

export function UploadPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormValues>({
    defaultValues: {
      file: null,
      title: '',
      tags: '',
    },
  })

  const uploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['images'] })
      await navigate({ to: '/' })
    },
  })

  const apiError =
    uploadMutation.error instanceof ApiError
      ? uploadMutation.error.message
      : uploadMutation.error instanceof Error
        ? uploadMutation.error.message
        : null

  function onSubmit({ file, title, tags }: UploadFormValues) {
    const selectedFile = file?.[0]
    if (!selectedFile) return

    const parsedTags = parseTagsInput(tags)

    uploadMutation.mutate({
      file: selectedFile,
      title: title.trim() || undefined,
      tags: parsedTags.length > 0 ? parsedTags : undefined,
    })
  }

  return (
    <div className="mx-auto max-w-[470px] space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Upload image</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Share a photo.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {apiError && (
          <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
            {apiError}
          </div>
        )}

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Image</span>
          <input
            type="file"
            accept="image/*"
            aria-invalid={errors.file ? true : undefined}
            className={cn(
              'block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground',
              errors.file && 'rounded-md border border-red-500 p-1',
            )}
            {...register('file', {
              required: 'Please choose an image file.',
              validate: (value) =>
                (value && value.length > 0) || 'Please choose an image file.',
            })}
          />
          {errors.file && (
            <p className={fieldErrorClassName}>{errors.file.message}</p>
          )}
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Title (optional)</span>
          <input
            type="text"
            placeholder="Sunset at the beach"
            className={inputClassName}
            {...register('title')}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Tags (optional)</span>
          <input
            type="text"
            placeholder="beach, summer"
            aria-invalid={errors.tags ? true : undefined}
            className={cn(
              inputClassName,
              errors.tags && 'border-red-500',
            )}
            {...register('tags', {
              validate: (value) => {
                const tagCount = parseTagsInput(value).length
                return (
                  tagCount <= MAX_TAGS ||
                  `You can add at most ${MAX_TAGS} tags.`
                )
              },
            })}
          />
          {errors.tags ? (
            <p className={fieldErrorClassName}>{errors.tags.message}</p>
          ) : (
            <span className="text-xs text-muted-foreground">
              Comma-separated tags (max {MAX_TAGS})
            </span>
          )}
        </label>

        <div className="flex gap-2 pt-2">
          <Button type="submit" loading={uploadMutation.isPending}>
            <Upload size={16} />
            Upload
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              <X size={16} />
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
