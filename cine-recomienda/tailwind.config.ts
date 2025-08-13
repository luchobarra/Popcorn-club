// tailwind.config.ts
import type { Config } from 'tailwindcss'
// import { colors } from './lib/colors'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // colors: {
      //   primary: colors.primary,
      //   secondary: colors.secondary,
      //   accent: colors.accent,
      //   text: colors.text,
      // },
    },
  },
  plugins: [],
}

export default config