import { Slot } from "@radix-ui/react-slot"
import dayjs from "dayjs"
import { forwardRef, type HTMLAttributes, useCallback } from "react"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import { useCalendar } from "../use-calendar"

type CalendarTodayButtonProps = HTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
}

const CalendarTodayButton = forwardRef<
	HTMLButtonElement,
	CalendarTodayButtonProps
>(({ asChild = false, className, ...props }, ref) => {
	const { today, viewDate, onTodayChange, onViewDateChange } = useCalendar()
	const Comp = asChild ? Slot : Button

	const handleClick = useCallback(() => {
		if (today.isSame(viewDate, "day")) return

		onTodayChange(dayjs())
		onViewDateChange(dayjs())
	}, [onTodayChange, onViewDateChange, today, viewDate])

	return (
		<Comp
			ref={ref}
			className={cn(className)}
			onClick={handleClick}
			{...props}
		/>
	)
})

CalendarTodayButton.displayName = "CalendarTodayButton"

export default CalendarTodayButton
