import { Dayjs } from "dayjs"
import { type HTMLAttributes, useMemo } from "react"
import { cn } from "../../lib/utils"
import { useCalendar } from "../../use-calendar"

type CalendarWeekHeaderProps = HTMLAttributes<HTMLDivElement> & {
	format?: string
	onHeaderCellClick?: (date: Dayjs) => void
	colStart?: number
}

const CalendarWeekHeader = ({
	format = "dddd",
	className = "",
	onHeaderCellClick,
	colStart = 1,
}: CalendarWeekHeaderProps) => {
	const { viewDate, today } = useCalendar()

	const headers = useMemo(() => {
		const startOfWeek = viewDate.startOf("week")

		return new Array(7).fill(0).map((_, index) => {
			const date = startOfWeek.add(index, "day")
			const isToday = date.isSame(today, "day")

			const col = index + colStart
			return {
				title: date.format(format),
				key: date.format("YYYY-MM-DD"),
				gridClass: `[grid-column:${col}] [grid-row:1]`,
				col,
				date,
				isToday,
			}
		})
	}, [format, colStart, viewDate, today])

	return (
		<>
			{headers.map(({ title, key, gridClass, col, date, isToday }) => (
				<button
					type="button"
					key={key}
					className={cn(
						"text-center font-semibold cursor-pointer",
						isToday && "underline",
						className,
						gridClass
					)}
					style={{
						gridColumn: col,
						gridRow: 1,
					}}
					onClick={() => onHeaderCellClick?.(date)}
				>
					{title}
				</button>
			))}
		</>
	)
}

CalendarWeekHeader.displayName = "CalendarWeekHeader"

export default CalendarWeekHeader
