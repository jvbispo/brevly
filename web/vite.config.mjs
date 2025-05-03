import tsconfigPath from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [tsconfigPath()],
	resolve: {
		alias: {
		  "@web/*": path.resolve(__dirname, "web/src/*"),
		}
	}
})
