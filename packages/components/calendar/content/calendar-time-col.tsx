import dayjs from "dayjs"
import { type HTMLAttributes, type ReactNode, useMemo } from "react"
import { cn } from "@/lib/utils"

type CalendarTimeColProps = HTMLAttributes<HTMLDivElement> & {
	colStart?: number
	hourStart?: number
	format?: string
	children?: ReactNode
}

const CalendarTimeCol = ({
	colStart = 1,
	hourStart = 0,
	format = "HH",
	className,
	children,
}: CalendarTimeColProps) => {
	const cols = useMemo(() => {
		return new Array(24).fill(0).map((_, index) => {
			const hour = index + hourStart
			const row = index + 2
			const title = dayjs().hour(hour).format(format)
			return {
				title,
				key: `${hour}`,
				row,
				col: colStart,
				borderClass: index < 23 ? "border-b" : "",
			}
		})
	}, [colStart, hourStart, format])

	return (
		<>
			{children}
			{cols.map(({ title, key, row, col, borderClass }) => (
				<div
					key={key}
					className={cn(
						"border-r border-gray-200 px-1 text-right",
						borderClass,
						className
					)}
					style={{
						gridColumn: col,
						gridRow: row,
					}}
					data-calendar-timecol-start={`col-${col}`}
					data-calendar-timecol-slot={`row-${row}`}
				>
					{title}
				</div>
			))}
		</>
	)
}

CalendarTimeCol.displayName = "CalendarTimeCol"
export default CalendarTimeCol
