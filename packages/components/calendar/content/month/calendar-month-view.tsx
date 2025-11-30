import { type HTMLAttributes } from "react"
import { cn } from "../../lib/utils"

type CalendarMonthViewProps = HTMLAttributes<HTMLDivElement> & {
	cellClass?: string
}

const CalendarMonthView = ({
	className,
	children,
	...props
}: CalendarMonthViewProps) => {
	return (
		<div
			data-calendar-view="month"
			className={cn(
				"w-full flex-1 grid grid-cols-7 grid-rows-[auto_repeat(6,1fr)]",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

CalendarMonthView.displayName = "CalendarMonthView"

export default CalendarMonthView
