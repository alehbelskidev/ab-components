import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./style.css"
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localeData)

const root = document.querySelector("#app")

if (!root) throw "#app is not defined"

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>
)
