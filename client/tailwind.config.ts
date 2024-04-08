import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './src/{app,error}.vue',
    './src/{components,layouts,pages}/**/*.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#171717',
          dark: '#000000',
          light: '#262626'
        },
        secondary: {
          DEFAULT: '#ededed',
          dark: '#a0a0a0',
          light: '#000000'
        }
      }
    }
  }
}
