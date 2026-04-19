import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        brand: {
            50: '#e6f7ff',
            100: '#b3e0ff',
            200: '#80c9ff',
            300: '#4db3ff',
            400: '#1a9cff',
            500: '#0080e6',
            600: '#0066b3',
            700: '#004d80',
            800: '#00334d',
            900: '#001a1a',
        },
        secondary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
        },
    },
    fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
    },
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
    },
    breakpoints: {
        base: '0em',
        sm: '30em',   // 480px
        md: '48em',   // 768px
        lg: '62em',   // 992px
        xl: '80em',   // 1280px
        '2xl': '96em', // 1536px
    },
    styles: {
        global: {
            body: {
                bg: 'gray.50',
                color: 'gray.800',
                lineHeight: 'base',
            },
            '*': {
                boxSizing: 'border-box',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'semibold',
                borderRadius: 'md',
            },
            variants: {
                solid: {
                    bg: 'brand.500',
                    color: 'white',
                    _hover: {
                        bg: 'brand.600',
                    },
                },
                outline: {
                    borderColor: 'brand.500',
                    color: 'brand.500',
                    _hover: {
                        bg: 'brand.50',
                    },
                },
            },
            defaultProps: {
                variant: 'solid',
            },
        },
        Card: {
            baseStyle: {
                container: {
                    bg: 'white',
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    p: 6,
                },
            },
        },
        Input: {
            baseStyle: {
                field: {
                    borderRadius: 'md',
                    borderColor: 'gray.300',
                    _focus: {
                        borderColor: 'brand.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                    },
                },
            },
        },
    },
})

export default theme