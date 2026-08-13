import antfu from '@antfu/eslint-config'

export default antfu(
  {
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
    vue: {
      overrides: {
        'vue/max-attributes-per-line': ['error', {
          multiline: 1,
          singleline: 3,
        }],
        'vue/max-len': ['error', {
          code: 100,
          ignoreHTMLTextContents: true,
          ignoreUrls: true,
          tabWidth: 2,
          template: 100,
        }],
      },
    },
  },
)
