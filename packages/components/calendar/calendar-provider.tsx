import dayjs, { Dayjs } from "dayjs"
import {
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react"
import {
	CalendarContext,
	DEFAULT_LOCALE,
	DEFAULT_TIMZEONE,
} from "./calendar-ctx"

type CalendarProviderProps = PropsWithChildren<{
	timezone?: string
	today?: Dayjs
}>

export const CalendarProvider = ({
	children,
	timezone = DEFAULT_TIMZEONE,
	today = dayjs().tz(DEFAULT_TIMZEONE),
}: CalendarProviderProps) => {
	const [view, setView] = useState<"month" | "week" | "day">("month")
	const [todayDate, setTodayDate] = useState<Dayjs>(today)
	const [viewDate, setViewDate] = useState<Dayjs>(today)
	const [locale, setLocale] = useState<string>(DEFAULT_LOCALE)

	useEffect(() => {
		dayjs.locale(locale)
	}, [locale])

	const handleLocaleChange = useCallback((newLocale: string) => {
		setLocale(newLocale)
	}, [])

	const handleTodayChange = useCallback((newToday: Dayjs) => {
		setTodayDate(newToday)
	}, [])

	const handleViewChange = useCallback((newView: "month" | "week" | "day") => {
		setView(newView)
	}, [])

	const handleViewDateChange = useCallback((newDate: Dayjs) => {
		setViewDate(newDate)
	}, [])

	const value = useMemo(
		() => ({
			locale,
			timezone,
			today: todayDate,
			viewDate,
			view,
			onViewChange: handleViewChange,
			onTodayChange: handleTodayChange,
			onLocaleChange: handleLocaleChange,
			onViewDateChange: handleViewDateChange,
		}),
		[
			locale,
			timezone,
			todayDate,
			viewDate,
			view,
			handleTodayChange,
			handleViewChange,
			handleLocaleChange,
			handleViewDateChange,
		]
	)

	return (
		<CalendarContext.Provider value={value}>
			{children}
		</CalendarContext.Provider>
	)
}
