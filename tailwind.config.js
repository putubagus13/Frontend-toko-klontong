/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        primary: "#f97316",
        secondary: "#fbbf24",
        accent: "#9ca3af",
        neutral: "#f3f4f6",
        "base-100": "#e1f4f5",
        error: "#e11d48",
        }
      }
    ]
  },
  plugins: [
    require("daisyui")
  ],
}

