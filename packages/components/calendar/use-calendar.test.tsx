import { act, renderHook } from "@testing-library/react"
import dayjs from "dayjs"
import { DEFAULT_LOCALE, DEFAULT_TIMZEONE } from "./calendar-ctx"
import { CalendarProvider } from "./calendar-provider"
import { useCalendar } from "./use-calendar"

describe("useCalendar hook:", () => {
	it("Throws error when rendering without context", () => {
		expect(() => {
			renderHook(() => useCalendar())
		}).toThrow(Error("useCalendar() must be used within a CalendarProvider"))
	})

	it("Returns default context fields", () => {
		const { result } = renderHook(() => useCalendar(), {
			wrapper: CalendarProvider,
		})
		// Applying format to exclude seconds
		const format = "YYYY-MM-DD_hh:mm"
		const today = dayjs().tz(DEFAULT_TIMZEONE).format(format)

		expect(result.current.locale).toBe(DEFAULT_LOCALE)
		expect(result.current.onLocaleChange).toBeInstanceOf(Function)
		expect(result.current.onTodayChange).toBeInstanceOf(Function)
		expect(result.current.onViewDateChange).toBeInstanceOf(Function)
		expect(result.current.timezone).toBe(DEFAULT_TIMZEONE)
		expect(result.current.view).toBe("month")

		expect(result.current.today.format(format)).toBe(today)
		expect(result.current.viewDate.format(format)).toBe(today)
	})

	describe("Context updates:", () => {
		it("onLocaleChange() updates locale", () => {
			const { result } = renderHook(() => useCalendar(), {
				wrapper: CalendarProvider,
			})

			act(() => {
				result.current.onLocaleChange("pl")
			})
			expect(result.current.locale).toBe("pl")
		})

		it("onViewChange() updates view", () => {
			const { result } = renderHook(() => useCalendar(), {
				wrapper: CalendarProvider,
			})

			act(() => {
				result.current.onViewChange("week")
			})
			expect(result.current.view).toBe("week")

			act(() => {
				result.current.onViewChange("day")
			})
			expect(result.current.view).toBe("day")

			act(() => {
				result.current.onViewChange("month")
			})
			expect(result.current.view).toBe("month")
		})

		it("onDateChange() updates today date", () => {
			const { result } = renderHook(() => useCalendar(), {
				wrapper: CalendarProvider,
			})

			const initialToday = result.current.today
			const newToday = dayjs()

			act(() => {
				result.current.onTodayChange(newToday)
			})
			expect(result.current.today).toBe(newToday)

			act(() => {
				result.current.onTodayChange(initialToday)
			})
			expect(result.current.today).toBe(initialToday)
		})

		it("onViewDateChange() updates view date", () => {
			const { result } = renderHook(() => useCalendar(), {
				wrapper: CalendarProvider,
			})

			const initialViewDate = result.current.viewDate
			const newViewDate = dayjs()

			act(() => {
				result.current.onViewDateChange(newViewDate)
			})
			expect(result.current.viewDate).toBe(newViewDate)

			act(() => {
				result.current.onViewDateChange(initialViewDate)
			})
			expect(result.current.viewDate).toBe(initialViewDate)
		})
	})
})
