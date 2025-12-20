import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import dayjs from "dayjs"
import { CalendarProvider } from "../../calendar-provider"
import CalendarCellButton from "../calendar-cell-button"
import CalendarTimeCol from "../calendar-time-col"
import CalendarTimeColHeader from "../calendar-time-col-header"
import CalendarDayGrid from "./calendar-day-grid"
import CalendarDayHeader from "./calendar-day-header"
import CalendarDayView from "./calendar-day-view"

describe("<CalendarDayView", () => {
	it("Renders component with children: header, timecol > timecol header, daygrid, daygrid > cell button", () => {
		const { container } = render(
			<CalendarDayView>
				<CalendarDayHeader format="dddd | MMMM D" />
				<CalendarTimeCol format="h A">
					<CalendarTimeColHeader>GMT-6</CalendarTimeColHeader>
				</CalendarTimeCol>
				<CalendarDayGrid>
					<CalendarCellButton onClick={(date) => console.log(date)} />
				</CalendarDayGrid>
			</CalendarDayView>,
			{ wrapper: CalendarProvider }
		)

		const today = dayjs().format("dddd | MMMM D")

		expect(screen.getByText(today)).toBeInTheDocument()
		expect(
			container.querySelector('[data-calendar-view="day"]')
		).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-timecol-start="col-1"]')
		).toHaveLength(24)
		expect(screen.getByText("GMT-6")).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-daygrid-col="daygrid-col-2"]')
		).toHaveLength(24)
		expect(
			container.querySelectorAll('[data-slot="calendar-cell-button"]')
		).toHaveLength(24)
	})

	it("Renders component with children: timecol > timecol header, daygrid, daygrid > cell button", () => {
		const { container } = render(
			<CalendarDayView>
				<CalendarTimeCol format="h A">
					<CalendarTimeColHeader>GMT-6</CalendarTimeColHeader>
				</CalendarTimeCol>
				<CalendarDayGrid>
					<CalendarCellButton onClick={(date) => console.log(date)} />
				</CalendarDayGrid>
			</CalendarDayView>,
			{ wrapper: CalendarProvider }
		)

		expect(
			container.querySelector('[data-id="calendar-day-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelector('[data-calendar-view="day"]')
		).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-timecol-start="col-1"]')
		).toHaveLength(24)
		expect(screen.getByText("GMT-6")).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-daygrid-col="daygrid-col-2"]')
		).toHaveLength(24)
		expect(
			container.querySelectorAll('[data-slot="calendar-cell-button"]')
		).toHaveLength(24)
	})

	it("Renders component with children: timecol, daygrid, daygrid > cell button", () => {
		const { container } = render(
			<CalendarDayView>
				<CalendarTimeCol format="h A" />
				<CalendarDayGrid>
					<CalendarCellButton onClick={(date) => console.log(date)} />
				</CalendarDayGrid>
			</CalendarDayView>,
			{ wrapper: CalendarProvider }
		)

		expect(
			container.querySelector('[data-id="calendar-day-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelector('[data-calendar-view="day"]')
		).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-timecol-start="col-1"]')
		).toHaveLength(24)
		expect(
			container.querySelector('[data-slot="calendar-time-col-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-daygrid-col="daygrid-col-2"]')
		).toHaveLength(24)
		expect(
			container.querySelectorAll('[data-slot="calendar-cell-button"]')
		).toHaveLength(24)
	})

	it("Renders component with children: daygrid, daygrid > cell button", () => {
		const { container } = render(
			<CalendarDayView>
				<CalendarDayGrid>
					<CalendarCellButton onClick={(date) => console.log(date)} />
				</CalendarDayGrid>
			</CalendarDayView>,
			{ wrapper: CalendarProvider }
		)

		expect(
			container.querySelector('[data-id="calendar-day-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelector('[data-calendar-view="day"]')
		).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-timecol-start="col-1"]')
		).toHaveLength(0)
		expect(
			container.querySelector('[data-slot="calendar-time-col-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-daygrid-col="daygrid-col-0"]')
		).toHaveLength(24)
		expect(
			container.querySelectorAll('[data-slot="calendar-cell-button"]')
		).toHaveLength(24)
	})

	it("Renders component with children: daygrid", () => {
		const { container } = render(
			<CalendarDayView>
				<CalendarDayGrid />
			</CalendarDayView>,
			{ wrapper: CalendarProvider }
		)

		expect(
			container.querySelector('[data-id="calendar-day-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelector('[data-calendar-view="day"]')
		).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-timecol-start="col-1"]')
		).toHaveLength(0)
		expect(
			container.querySelector('[data-slot="calendar-time-col-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-daygrid-col="daygrid-col-0"]')
		).toHaveLength(24)
		expect(
			container.querySelectorAll('[data-slot="calendar-cell-button"]')
		).toHaveLength(0)
	})

	it("Renders component without children", () => {
		const { container } = render(<CalendarDayView />, {
			wrapper: CalendarProvider,
		})

		expect(
			container.querySelector('[data-id="calendar-day-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelector('[data-calendar-view="day"]')
		).toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-timecol-start="col-1"]')
		).toHaveLength(0)
		expect(
			container.querySelector('[data-slot="calendar-time-col-header"]')
		).not.toBeInTheDocument()
		expect(
			container.querySelectorAll('[data-calendar-daygrid-col="daygrid-col-0"]')
		).toHaveLength(0)
		expect(
			container.querySelectorAll('[data-slot="calendar-cell-button"]')
		).toHaveLength(0)
	})
})
