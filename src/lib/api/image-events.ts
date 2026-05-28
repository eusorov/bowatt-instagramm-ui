export const IMAGES_TOPIC = '/topic/images'

export const IMAGE_CREATED = 'IMAGE_CREATED'

export interface ImageCreatedEvent {
  type: typeof IMAGE_CREATED
}

export function isImageCreatedEvent(value: unknown): value is ImageCreatedEvent {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as ImageCreatedEvent).type === IMAGE_CREATED
  )
}
