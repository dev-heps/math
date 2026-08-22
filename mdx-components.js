import MathCanvas from '@/components/MathCanvas'
import CategoryGrid, { EnjoyingMathGrid } from '@/components/CategoryGrid'
import { Def, Thm, Lemma, Cor, Proof, Example, Exercise, Intuition, YoutubeEmbed } from '@/components/MathNote'
import KdsCurriculum from '@/components/KdsCurriculum'
import { Comment } from '@/components/Comment'
import Link from 'next/link'

export function useMDXComponents(components) {
  return {
    MathCanvas,
    CategoryGrid,
    EnjoyingMathGrid,
    // Math note callout boxes
    Def,
    Thm,
    Lemma,
    Cor,
    Proof,
    Example,
    Exercise,
    Intuition,
    YoutubeEmbed,
    // KDS curriculum
    KdsCurriculum,
    // Comment annotations
    Comment,
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} {...props}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    ...components,
  }
}
