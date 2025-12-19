import { Slot } from "@radix-ui/react-slot"
import { ChevronLeft } from "lucide-react"
import { forwardRef, type HTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCalendar } from "../use-calendar"

type CalendarHeaderNavPrevButtonProps = HTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
}

const CalendarHeaderNavPrevButton = forwardRef<
	HTMLButtonElement,
	CalendarHeaderNavPrevButtonProps
>(({ asChild = false, className, ...props }, ref) => {
	const { viewDate, view, onViewDateChange } = useCalendar()
	const Comp = asChild ? Slot : Button

	const handleClick = () => {
		// Navigate based on current view
		if (view === "month") {
			onViewDateChange(viewDate.subtract(1, "month"))
		} else if (view === "week") {
			onViewDateChange(viewDate.subtract(1, "week"))
		} else {
			onViewDateChange(viewDate.subtract(1, "day"))
		}
	}
	return (
		<Comp
			ref={ref}
			className={cn("flex items-center justify-center", className)}
			onClick={handleClick}
			{...props}
		>
			{props.children ?? <ChevronLeft className="size-4" />}
		</Comp>
	)
})

CalendarHeaderNavPrevButton.displayName = "CalendarHeaderNavPrevButton"
export default CalendarHeaderNavPrevButton
