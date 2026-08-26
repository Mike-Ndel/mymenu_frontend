/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // MyMenu admin dashboard theme — fixed, never customizable
        // (the Branding settings page only affects the customer-facing menu)
        primary: {
          DEFAULT: '#FFC107', // MyMenu Yellow
          hover: '#F5B400',
        },
        ink: {
          DEFAULT: '#111827', // MyMenu Black (sidebar, headings)
          light: '#1F2937',
        },
        surface: {
          DEFAULT: '#FFFFFF', // content background
          muted: '#F9FAFB', // light gray page background
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '0.875rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(17, 24, 39, 0.05), 0 1px 3px 0 rgba(17, 24, 39, 0.06)',
      },
    },
  },
  plugins: [],
};
