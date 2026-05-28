import { Client } from '@stomp/stompjs'
import { useEffect } from 'react'

import {
  IMAGES_TOPIC,
  isImageCreatedEvent,
} from '@/lib/api/image-events'
import { getWebSocketUrl } from '@/lib/ws/get-websocket-url'

interface UseImageEventsOptions {
  onImageCreated: () => void
}

export function useImageEvents({
  onImageCreated,
}: UseImageEventsOptions) {
  useEffect(() => {
    const client = new Client({
      brokerURL: getWebSocketUrl(),
      reconnectDelay: 5_000,
      heartbeatIncoming: 10_000,
      heartbeatOutgoing: 10_000,
      onConnect: () => {
        client.subscribe(IMAGES_TOPIC, (message) => {
          try {
            const event = JSON.parse(message.body) as unknown
            if (isImageCreatedEvent(event)) {
              onImageCreated()
            }
          } catch {
            // ignore malformed websocket payloads
          }
        })
      },
    })

    client.activate()

    return () => {
      void client.deactivate()
    }
  }, [onImageCreated])
}
