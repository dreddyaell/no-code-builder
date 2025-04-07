import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".transition-transform": {
          transition: "transform 0.6s",
        },
      });
    },
  ],
};

export default config;
