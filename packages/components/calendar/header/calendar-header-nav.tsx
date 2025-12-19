import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { ButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"

type CalendarHeaderNavProps = HTMLAttributes<HTMLFieldSetElement> & {
	asChild?: boolean
}

const CalendarHeaderNav = forwardRef<
	HTMLFieldSetElement,
	CalendarHeaderNavProps
>(({ asChild = false, className, ...props }, ref) => {
	const Comp = asChild ? Slot : ButtonGroup
	return (
		<Comp
			ref={ref}
			className={cn("flex items-center justify-between", className)}
			{...props}
		/>
	)
})

CalendarHeaderNav.displayName = "CalendarHeaderNav"

export default CalendarHeaderNav
