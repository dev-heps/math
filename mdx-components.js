import MathCanvas from '@/components/MathCanvas'
import CategoryGrid from '@/components/CategoryGrid'
import Link from 'next/link'

export function useMDXComponents(components) {
  return {
    MathCanvas,
    CategoryGrid,
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} {...props}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    ...components,
  }
}
