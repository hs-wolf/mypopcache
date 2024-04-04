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
          DEFAULT: '#000000',
          1: '#0d0d0d',
          2: '#191919'
        }
      }
    }
  }
}
