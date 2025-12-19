import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CalendarAddEventButtonProps = HTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
}

const CalendarAddEventButton = forwardRef<
	HTMLButtonElement,
	CalendarAddEventButtonProps
>(({ asChild = false, className, ...props }, ref) => {
	const Comp = asChild ? Slot : Button
	return <Comp ref={ref} className={cn(className)} {...props} />
})

CalendarAddEventButton.displayName = "CalendarAddEventButton"
export default CalendarAddEventButton
