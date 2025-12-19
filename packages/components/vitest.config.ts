/// <reference types="vitest" />
import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		root: "./",
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
		css: false,
		include: ["calendar/**/*.test.{ts,tsx}"],
		coverage: {
			reporter: ["text", "json", "html"],
		},
	},
	resolve: {
		alias: {
			// This maps the "@" alias to the playground's src directory
			// so Vite can find your utils, buttons, etc.
			"@": path.resolve(__dirname, "../../playground/src"),
		},
	},
})
