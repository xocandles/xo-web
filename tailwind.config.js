/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      colors: {
        'custom-lightYellow': "#F8F2CA",
        'custom-black': "#282C2E",
        'custom-offWhite': "#E2E2E2",
        'custom-darkBlack': "#444444",
        'custom-gray': "#767676"
      },
      // fontSize: {
      //   normal: '1.2vh',
      //   footerNormal: '1.111vh'
      // }
    },
  },
  plugins: [],
};
