import MathCanvas from '@/components/MathCanvas'

export function useMDXComponents(components) {
  return {
    MathCanvas,
    ...components,
  }
}
