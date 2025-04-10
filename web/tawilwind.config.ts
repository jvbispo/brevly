import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#DBEAFE",
          300: "#93C5FD",
          500: "#3B82F6",
          700: "#1D4ED8",
          900: "#1E3A8A",
        },
        bluebase: "#2C46B1"
      },
    },
  },
  plugins: [],
};

export default config;