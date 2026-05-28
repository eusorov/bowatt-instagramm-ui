import { Outlet } from '@tanstack/react-router'

import { AppHeader } from '@/components/layout/app-header'

export function RootLayout() {
  return (
    <div className="min-h-svh bg-background">
      <AppHeader />
      <main className="mx-auto max-w-[470px] px-4 py-6 lg:max-w-7xl">
        <Outlet />
      </main>
    </div>
  )
}
