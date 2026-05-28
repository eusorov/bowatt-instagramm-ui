import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

const linkClassName =
  'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[470px] items-center justify-between px-4 lg:max-w-7xl">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          bowatt
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className={linkClassName}
            activeProps={{ className: cn(linkClassName, 'text-foreground') }}
          >
            Feed
          </Link>
          <Link
            to="/upload"
            className={linkClassName}
            activeProps={{ className: cn(linkClassName, 'text-foreground') }}
          >
            Upload
          </Link>
        </nav>
      </div>
    </header>
  )
}
