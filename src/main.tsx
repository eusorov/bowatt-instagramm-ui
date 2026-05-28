import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { Theme } from '@radix-ui/themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ImageEventsListener } from '@/components/image-events-listener'
import { queryClient } from '@/lib/query-client'
import { router } from '@/router'

import '@radix-ui/themes/styles.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="purple" grayColor="slate" radius="medium">
        <ImageEventsListener />
        <RouterProvider router={router} />
      </Theme>
    </QueryClientProvider>
  </StrictMode>
)
