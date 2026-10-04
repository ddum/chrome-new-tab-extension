import { tv } from 'tailwind-variants'

export const tabsTriggerVariants = tv({
  base: 'border-b-2 px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none',
  variants: {
    selected: {
      true: 'border-foreground text-foreground',
      false: [
        'border-transparent text-foreground-muted hover:text-foreground',
        'focus-visible:border-foreground-muted focus-visible:text-foreground',
      ],
    },
  },
})
