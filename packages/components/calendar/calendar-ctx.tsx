import dayjs, { type Dayjs } from "dayjs"
import localeData from "dayjs/plugin/localeData"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { createContext } from "react"

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localeData)

const intlResolvedOptions = Intl.DateTimeFormat().resolvedOptions()
export const DEFAULT_TIMZEONE = intlResolvedOptions.timeZone
export const DEFAULT_LOCALE = intlResolvedOptions.locale.split("-")[0]

type CalendarContextType = {
	locale: string
	timezone: string
	today: Dayjs
	viewDate: Dayjs
	view: "month" | "week" | "day"
	onViewChange: (view: "month" | "week" | "day") => void
	onViewDateChange: (viewDate: Dayjs) => void
	onTodayChange: (today: Dayjs) => void
	onLocaleChange: (locale: string) => void
}

export const CalendarContext = createContext<CalendarContextType | undefined>(
	undefined
)
