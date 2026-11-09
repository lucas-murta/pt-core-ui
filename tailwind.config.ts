import { ptTailwindPlugins, ptTailwindTheme } from './src/tokens/tailwind-theme';

// Sem `satisfies Config` de propósito: `ptTailwindTheme` é `as const`, então
// `fontFamily` vira `readonly string[]` e não é atribuível a `string[]`.
export default {
  content: ['./src/**/*.{vue,ts,tsx}', './.storybook/**/*.{vue,ts,tsx}'],
  theme: {
    extend: ptTailwindTheme
  },
  plugins: ptTailwindPlugins
};
