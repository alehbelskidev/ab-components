import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type CalendarProps = HTMLAttributes<HTMLDivElement> & {
	asChild?: boolean
}

const CalendarRoot = forwardRef<HTMLDivElement, CalendarProps>(
	({ asChild = false, className, ...props }, ref) => {
		const Comp = asChild ? Slot : "div"

		return (
			<Comp
				data-slot="calendar-root"
				ref={ref}
				className={cn("w-full flex-1 flex flex-col gap-4", className)}
				{...props}
			/>
		)
	}
)

CalendarRoot.displayName = "CalendarRoot"

export default CalendarRoot
