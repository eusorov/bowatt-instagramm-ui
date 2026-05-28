export interface ImageResponse {
  id: number
  originalFilename: string
  contentType: string
  sizeBytes: number
  title: string
  tags: string[]
  url: string
  createdAt: string
}

export interface ImagePage {
  content: ImageResponse[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface FetchImagesParams {
  page: number
  size?: number
  tags?: string[]
}

export interface UploadImageParams {
  file: File
  title?: string
  tags?: string[]
}
