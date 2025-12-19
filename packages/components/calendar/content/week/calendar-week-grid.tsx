import { type Dayjs } from "dayjs"
import {
	Children,
	cloneElement,
	type HTMLAttributes,
	isValidElement,
	useMemo,
} from "react"
import { cn } from "@/lib/utils"
import { useCalendar } from "../../use-calendar"

type CalendarWeekGridProps = HTMLAttributes<HTMLDivElement> & {
	colStart?: number
	onCellClick?: (date: Dayjs) => void
}

const CalendarWeekGrid = ({
	colStart = 1,
	children,
}: CalendarWeekGridProps) => {
	const { viewDate } = useCalendar()

	const cells = useMemo(() => {
		// 24 rows (hours) × 7 columns (days) = 168 cells
		// Grid cells start at row 2 (after header) and column colStart (after time columns)
		const startOfWeek = viewDate.startOf("week")

		return new Array(24 * 7).fill(0).map((_, index) => {
			// Row-first iteration: each row has 7 cells (one per day)
			const hour = Math.floor(index / 7) // 0-23 (24 hours)
			const dayIndex = index % 7 // 0-6 (day of week)

			// Row starts at 2 (after header row 1), columns start at colStart
			const row = hour + 2 // 2-25 (24 hours, starting after header)
			const col = dayIndex + colStart // colStart to colStart+6 (7 days)

			return {
				key: `${hour}-${dayIndex}`,
				gridClass: `[grid-column:${col}] [grid-row:${row}]`,
				borderClass: hour < 23 ? "border-b" : "",
				col,
				row,
				hour, // 0-23
				dayIndex, // 0-6 (day of week)
				date: startOfWeek.hour(hour).add(dayIndex, "day"),
			}
		})
	}, [colStart, viewDate])

	return (
		<>
			{cells.map(({ key, gridClass, col, row, borderClass, date }) => (
				<div
					key={key}
					className={cn("border-gray-200", gridClass, borderClass)}
					style={{
						gridColumn: col,
						gridRow: row,
					}}
				>
					{Children.map(children, (child) => {
						if (!isValidElement(child)) {
							return child
						}
						return cloneElement(child, {
							...(child.props as HTMLAttributes<HTMLButtonElement>),
							date,
						} as HTMLAttributes<HTMLButtonElement> & { date: Dayjs })
					})}
				</div>
			))}
		</>
	)
}

export default CalendarWeekGrid
