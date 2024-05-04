import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        fontFamily: {
            sans: ['Overpass'],
            display: ['"Bricolage Grotesque"'],
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            gridTemplateColumns: {
                'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
                'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    'auto-fill': (value: string) => ({
                        gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
                    }),
                    'auto-fit': (value: string) => ({
                        gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
                    }),
                },
                {
                    values: theme('width', {}),
                },
            )
        }),
    ],
} satisfies Config

export default config
