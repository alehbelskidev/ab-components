import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCalendar } from "../use-calendar"

type CalendarViewSwitcherButtonProps = HTMLAttributes<HTMLButtonElement> & {
	view: "month" | "week" | "day"
	asChild?: boolean
}

const CalendarViewSwitcherButton = forwardRef<
	HTMLButtonElement,
	CalendarViewSwitcherButtonProps
>(({ view, asChild = false, className, ...props }, ref) => {
	const { view: selectedView, onViewChange } = useCalendar()
	const Comp = asChild ? Slot : Button

	return (
		<Comp
			ref={ref}
			className={cn(className)}
			onClick={() => onViewChange(view)}
			{...(asChild
				? {
						variant: selectedView === view ? "default" : "outline",
					}
				: {})}
			{...props}
		/>
	)
})

CalendarViewSwitcherButton.displayName = "CalendarViewSwitcherButton"

export default CalendarViewSwitcherButton
