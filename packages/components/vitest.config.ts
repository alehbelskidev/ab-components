/// <reference types="vitest" />
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
})
