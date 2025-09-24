/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './widgets/**/*.{js,ts,jsx,tsx}', 
    './shared/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	screens: {
  		xs: '0px',
		s: '320px',
  		xm: '480px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		colors: {
  			background: 'var(--background)',
			foreground: 'var(--foreground)',

			// TODO: Добавити ще кольори що зазвичай використовується
  		},
  		fontFamily: {
				
		},
  		keyframes: {
  			
  		},
  		animation: {
  		},
  	}
  },
}