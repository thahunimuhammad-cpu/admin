const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        light: '#F3F4F6',
        dark: '#1F2937',
        'section-bg': '#FDB5CE',
      },
      spacing: {
        '128': '32rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1F2937',
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'inline-flex', 'items-center', 'justify-center', 'px-4', 'py-2', 'rounded-lg', 'font-medium', 'transition-all', 'duration-200', 'cursor-pointer',
    'bg-blue-600', 'text-white', 'hover:bg-blue-700', 'active:scale-95',
    'bg-gray-200', 'text-gray-900', 'hover:bg-gray-300',
    'bg-red-600', 'hover:bg-red-700',
    'bg-green-600', 'hover:bg-green-700',
    'px-8', 'py-3', 'text-lg', 'px-3', 'py-1', 'text-sm', 'opacity-50', 'cursor-not-allowed',
    'bg-white', 'shadow-md', 'p-6', 'hover:shadow-lg',
    'w-full', 'border', 'border-gray-300', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-transparent',
    'inline-block', 'rounded-full', 'bg-blue-100', 'text-blue-800', 'bg-green-100', 'text-green-800'
  ],
};

module.exports = config;

