import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const linkFaviconVariants = tv({
  base: 'inline-flex size-4 shrink-0 items-center justify-center',
  variants: {
    variant: {
      default: 'text-foreground',
      overlay: 'text-on-image drop-shadow',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type LinkFaviconVariantProps = VariantProps<typeof linkFaviconVariants>
