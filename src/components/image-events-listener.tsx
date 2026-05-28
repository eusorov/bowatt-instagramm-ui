import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useImageEvents } from '@/hooks/use-image-events'

export function ImageEventsListener() {
  const queryClient = useQueryClient()

  const handleImageCreated = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['images'] })
    void queryClient.invalidateQueries({ queryKey: ['tags'] })
  }, [queryClient])

  useImageEvents({ onImageCreated: handleImageCreated })

  return null
}
