import { Slot } from "@radix-ui/react-slot"
import { ChevronRight } from "lucide-react"
import { forwardRef, type HTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCalendar } from "../use-calendar"

type CalendarHeaderNavNextButtonProps = HTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
}

const CalendarHeaderNavNextButton = forwardRef<
	HTMLButtonElement,
	CalendarHeaderNavNextButtonProps
>(({ asChild = false, className, ...props }, ref) => {
	const { viewDate, view, onViewDateChange } = useCalendar()
	const Comp = asChild ? Slot : Button

	const handleClick = () => {
		// Navigate based on current view
		if (view === "month") {
			onViewDateChange(viewDate.add(1, "month"))
		} else if (view === "week") {
			onViewDateChange(viewDate.add(1, "week"))
		} else {
			onViewDateChange(viewDate.add(1, "day"))
		}
	}

	return (
		<Comp
			ref={ref}
			className={cn("flex items-center justify-center", className)}
			onClick={handleClick}
			{...props}
		>
			{props.children ?? <ChevronRight className="size-4" />}
		</Comp>
	)
})

CalendarHeaderNavNextButton.displayName = "CalendarHeaderNavNextButton"
export default CalendarHeaderNavNextButton
