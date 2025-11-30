import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes, useMemo } from "react"
import { cn } from "../lib/utils"
import { useCalendar } from "../use-calendar"

type CalendarDateTitleProps = HTMLAttributes<HTMLHeadingElement> & {
	format?: string
	asChild?: boolean
}

const CalendarDateTitle = forwardRef<
	HTMLHeadingElement,
	CalendarDateTitleProps
>(({ format, asChild = false, className, ...props }, ref) => {
	const { viewDate, view } = useCalendar()
	const Comp = asChild ? Slot : "h2"

	const displayDate = useMemo(() => {
		console.log(format)
		if (format != null) return viewDate.format(format)

		if (view === "month") {
			return viewDate.format("MMMM YYYY")
		} else if (view === "week") {
			return `${viewDate.format("MMMM D, YYYY")} - ${viewDate.add(1, "week").format("MMMM D, YYYY")}`
		} else {
			return viewDate.format("MMMM D, YYYY")
		}
	}, [view, format, viewDate])

	return (
		<Comp ref={ref} className={cn("text-2xl font-bold", className)} {...props}>
			{props.children ?? displayDate}
		</Comp>
	)
})

CalendarDateTitle.displayName = "CalendarDateTitle"

export default CalendarDateTitle
