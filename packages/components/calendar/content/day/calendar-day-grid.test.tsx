import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import { CalendarProvider } from "../../calendar-provider"
import CalendarCellButton from "../calendar-cell-button"
import CalendarDayGrid from "./calendar-day-grid"

const cellClickFn = vi.fn()

describe("<CalendarDayGrind />", () => {
	it("Renders 24 cells according to 24hrs", () => {
		render(
			<CalendarDayGrid>
				<div data-testid="test-daygrind-child">Test</div>
			</CalendarDayGrid>,
			{ wrapper: CalendarProvider }
		)

		expect(screen.getAllByTestId("test-daygrind-child")).toHaveLength(24)
	})

	it("Renders 24 cells with interactive buttons", async () => {
		render(
			<CalendarDayGrid>
				<CalendarCellButton onClick={cellClickFn} />
			</CalendarDayGrid>,
			{ wrapper: CalendarProvider }
		)

		const buttons = screen.getAllByRole("button")
		expect(buttons).toHaveLength(24)

		await Promise.all(buttons.map((b) => userEvent.click(b)))
		expect(cellClickFn).toHaveBeenCalledTimes(24)
	})
})
