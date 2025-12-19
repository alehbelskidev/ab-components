import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type CalendarTimeColHeaderProps = HTMLAttributes<HTMLDivElement> & {
	asChild?: boolean
	divider?: boolean
}

const CalendarTimeColHeader = forwardRef<
	HTMLDivElement,
	CalendarTimeColHeaderProps
>(({ asChild = false, className, divider = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "div"

	return (
		<Comp
			data-slot="calendar-time-col-header"
			ref={ref}
			className={cn(
				"px-1 font-semibold flex items-center justify-center",
				divider && "border-l border-gray-200",
				className
			)}
			{...props}
		/>
	)
})

CalendarTimeColHeader.displayName = "CalendarTimeColHeader"

export default CalendarTimeColHeader
