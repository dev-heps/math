'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MathHeaderNav({ portfolioUrl }) {
  const pathname = usePathname() || '/'

  const navItems = [
    { label: 'Math Archive', href: '/', key: 'home' },
  ]

  const isActive = (itemHref) => {
    // Normalise trailing slashes and basePath
    const cleanPath = pathname.replace(/^\/math-archive/, '') || '/'
    const normalizedPath = cleanPath.endsWith('/') && cleanPath !== '/' ? cleanPath.slice(0, -1) : cleanPath
    const normalizedHref = itemHref.endsWith('/') && itemHref !== '/' ? itemHref.slice(0, -1) : itemHref

    if (normalizedHref === '/') {
      return normalizedPath === '/' || normalizedPath === ''
    }
    return normalizedPath.startsWith(normalizedHref)
  }

  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm" aria-label="Math Archive navigation">
      <a 
        href={portfolioUrl} 
        className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 group"
      >
        <span className="text-zinc-300 group-hover:-translate-x-0.5 transition-transform">←</span>
        <span>Portfolio</span>
      </a>

      <div className="h-4 w-px bg-zinc-200" aria-hidden="true" />

      {navItems.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`transition-all ${
              active
                ? 'text-zinc-900 font-medium'
                : 'text-zinc-500 hover:text-zinc-900 font-medium'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
