import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const srcDir = path.join(root, "packages/components/src/calendar")
const destDir = path.join(root, "packages/registry/files/calendar")

fs.mkdirSync(destDir, { recursive: true })

fs.readdirSync(srcDir).forEach((file) => {
	const src = path.join(srcDir, file)
	const dest = path.join(destDir, file)
	fs.copyFileSync(src, dest)
	console.log(`Synced: ${file}`)
})

console.log("📦 Registry updated! Run again after changes.")
