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
          light: '#ffffff'
        },
        action: {
          dark: '#0C642B',
          light: '#208940'
        },
        warning: {
          dark: '#C09207',
          light: '#987407'
        },
        danger: {
          dark: '#B21010',
          light: '#C74646'
        },
        accent: {
          dark: '#3D34EF',
          light: '#675FF7'
        }
      }
    }
  }
}
