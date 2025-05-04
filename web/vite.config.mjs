import tsconfigPath from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"
import path from 'node:path';

export default defineConfig({
	plugins: [tsconfigPath()],
	resolve: {
		alias: {
		  "@/*": path.resolve(__dirname, "src/*"),
		}
	}
})
