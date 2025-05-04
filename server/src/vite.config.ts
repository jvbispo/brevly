import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  root: "web",
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
		alias: {
		  "@/*": path.resolve(__dirname, "src/*"),
		}
	}
})
