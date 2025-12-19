import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { ButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"

type CalendarViewSwitcherProps = HTMLAttributes<HTMLFieldSetElement> & {
	asChild?: boolean
}

const CalendarViewSwitcher = forwardRef<
	HTMLFieldSetElement,
	CalendarViewSwitcherProps
>(({ asChild = false, className, ...props }, ref) => {
	const Comp = asChild ? Slot : ButtonGroup

	return <Comp ref={ref} className={cn(className)} {...props} />
})

CalendarViewSwitcher.displayName = "CalendarViewSwitcher"

export default CalendarViewSwitcher
