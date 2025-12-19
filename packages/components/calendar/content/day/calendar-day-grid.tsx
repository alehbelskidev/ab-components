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

type CalendarDayGridProps = HTMLAttributes<HTMLDivElement> & {
	colStart?: number
	onCellClick?: (date: Dayjs) => void
}

const CalendarDayGrid = ({ colStart = 1, children }: CalendarDayGridProps) => {
	const { viewDate } = useCalendar()

	const cells = useMemo(() => {
		const startOfDay = viewDate.startOf("day")

		return new Array(24).fill(0).map((_, index) => {
			const row = index + 2
			const col = colStart

			return {
				key: `${index}`,
				gridClass: `[grid-column:${col}] [grid-row:${row}]`,
				borderClass: index < 23 ? "border-b" : "",
				col,
				row,
				index,
				date: startOfDay.add(index, "hour"),
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
					data-slot="calendar-day-grid"
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

export default CalendarDayGrid
