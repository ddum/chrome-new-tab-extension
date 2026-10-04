import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center border font-medium transition-colors',
    'outline-none focus-visible:ring-1 focus-visible:ring-offset-0',
  ],
  variants: {
    variant: {
      primary: [
        'border-transparent bg-foreground text-surface',
        'hover:bg-foreground/85 focus-visible:ring-foreground focus-visible:ring-offset-1',
      ],
      outline: 'border-border text-foreground hover:bg-surface-muted focus-visible:ring-foreground',
      overlay: [
        'border-transparent text-on-image/75 hover:text-on-image',
        'focus-visible:ring-on-image focus-visible:ring-offset-transparent',
      ],
      ghost: 'border-none text-foreground-muted hover:bg-surface-muted focus-visible:ring-foreground',
    },
    size: {
      sm: 'gap-1 rounded p-1 text-xs',
      md: 'gap-1.5 rounded-lg px-3 py-2 text-sm',
      lg: 'gap-2 rounded-lg px-4 py-2.5 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
