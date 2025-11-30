import { useContext } from "react"
import { CalendarContext } from "./calendar-ctx"

export const useCalendar = () => {
	const context = useContext(CalendarContext)
	if (!context) {
		throw new Error("useCalendar must be used within a CalendarProvider")
	}
	return context
}
