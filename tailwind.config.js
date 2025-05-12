/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#9630FB",
				secondary: "#F3F3F3",
				dark: "#191A23",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
			boxShadow: {
				custom: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
			},
		},
	},
	plugins: [],
};
