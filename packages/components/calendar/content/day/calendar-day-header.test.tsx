import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import dayjs from "dayjs"
import { vi } from "vitest"
import { CalendarProvider } from "../../calendar-provider"
import CalendarDayHeader from "./calendar-day-header"

const cellHeaderClickFn = vi.fn()

describe("<CalendarDayHeader", () => {
	it('Renders with default format "dddd"', () => {
		render(<CalendarDayHeader />, { wrapper: CalendarProvider })

		expect(screen.getByRole("button").textContent).toBe(dayjs().format("dddd"))
	})
	it('Renders with provided format "dddd MM"', () => {
		render(<CalendarDayHeader format="dddd MM" />, {
			wrapper: CalendarProvider,
		})

		expect(screen.getByRole("button").textContent).toBe(
			dayjs().format("dddd MM")
		)
	})
	it("When className passed it presented in the classList", () => {
		render(<CalendarDayHeader className="custom-class" />, {
			wrapper: CalendarProvider,
		})

		expect(Array.from(screen.getByRole("button").classList)).includes(
			"custom-class"
		)
	})
	it("When colStart passed it reflected in the classList", () => {
		render(<CalendarDayHeader colStart={9} />, {
			wrapper: CalendarProvider,
		})

		expect(Array.from(screen.getByRole("button").classList)).includes(
			"[grid-column:10]"
		)
	})
	it("When onHeaderCellClick() passed it is clickable", async () => {
		render(<CalendarDayHeader onHeaderCellClick={cellHeaderClickFn} />, {
			wrapper: CalendarProvider,
		})

		await userEvent.click(screen.getByRole("button"))

		expect(cellHeaderClickFn).toHaveBeenCalledOnce()
	})
})
