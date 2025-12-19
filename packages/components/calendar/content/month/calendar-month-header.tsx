import dayjs, { Dayjs } from "dayjs"
import { type HTMLAttributes, useMemo } from "react"
import { cn } from "@/lib/utils"

type CalendarMonthHeaderProps = HTMLAttributes<HTMLDivElement> & {
	format?: string
	onHeaderCellClick?: (date: Dayjs) => void
}

const CalendarMonthHeader = ({
	format = "dddd",
	className = "",
	onHeaderCellClick,
}: CalendarMonthHeaderProps) => {
	const headers = useMemo(() => {
		return new Array(7).fill(0).map((_, index) => {
			const date = dayjs().startOf("week").add(index, "day")

			return {
				title: date.format(format),
				key: date.format("YYYY-MM-DD"),
				gridClass: `col-start-${index + 1}`,
				date,
			}
		})
	}, [format])

	return (
		<>
			{headers.map(({ title, key, gridClass, date }) => (
				<button
					type="button"
					key={key}
					className={cn(
						"text-center font-semibold cursor-pointer",
						className,
						gridClass
					)}
					onClick={() => onHeaderCellClick?.(date)}
				>
					{title}
				</button>
			))}
		</>
	)
}

CalendarMonthHeader.displayName = "CalendarMonthHeader"

export default CalendarMonthHeader
