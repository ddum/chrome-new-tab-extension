import antfu from '@antfu/eslint-config'

export default antfu({
  imports: {
    overrides: {
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 1,
        },
      ],
    },
  },
})
