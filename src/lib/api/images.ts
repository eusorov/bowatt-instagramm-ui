import { apiJson } from '@/lib/api/client'
import type {
  FetchImagesParams,
  ImagePage,
  ImageResponse,
  UploadImageParams,
} from '@/lib/api/image-types'

export async function fetchImages({
  page,
  size = 20,
  tags,
}: FetchImagesParams): Promise<ImagePage> {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('size', String(size))
  tags?.forEach((tag) => params.append('tags', tag))

  return apiJson<ImagePage>(`/api/images?${params.toString()}`)
}

export async function uploadImage({
  file,
  title,
  tags,
}: UploadImageParams): Promise<ImageResponse> {
  const formData = new FormData()
  formData.append('file', file)
  if (title) {
    formData.append('title', title)
  }
  tags?.forEach((tag) => formData.append('tags', tag))

  return apiJson<ImageResponse>('/api/uploads', {
    method: 'POST',
    body: formData,
  })
}
