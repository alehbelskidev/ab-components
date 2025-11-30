import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "./style.css"

const root = document.querySelector("#app")

if (!root) throw "#app is not defined"

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>
)
