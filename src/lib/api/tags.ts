import { apiJson } from '@/lib/api/client'

export interface TagResponse {
  id: number
  name: string
}

export async function fetchTags(): Promise<TagResponse[]> {
  return apiJson<TagResponse[]>('/api/tags')
}
