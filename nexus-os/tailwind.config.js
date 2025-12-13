/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa", // Paper White
        surface: "#ffffff",
        primary: "#f59e0b",    // Amber-500 (Gold)
        secondary: "#3b82f6",  // Blue-500 (Lab)
        action: "#ef4444",     // Red-500 (Gym)
        text: "#0f172a",       // Slate-900
        muted: "#94a3b8",      // Slate-400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      margin: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
}