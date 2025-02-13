import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "open-menu": {
				"0%": { transform: "scaleY(0)" },
				"80%": { transform: "scaleY(1.2)" },
				"100%": { transform: "scaleY(1)" },
			},
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
