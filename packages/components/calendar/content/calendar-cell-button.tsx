import { Slot } from "@radix-ui/react-slot"
import dayjs, { Dayjs } from "dayjs"
import { Plus } from "lucide-react"
import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "../lib/utils"

type CalendarCellButtonProps = HTMLAttributes<HTMLButtonElement> & {
	date?: Dayjs
	asChild?: boolean
	onClick?: (date: Dayjs) => void
}
const CalendarCellButton = forwardRef<
	HTMLButtonElement,
	CalendarCellButtonProps
>(({ date, asChild = false, className, onClick, ...props }, ref) => {
	const Comp = asChild ? Slot : "button"
	const dateFallback = date ?? dayjs()

	return (
		<Comp
			ref={ref}
			type="button"
			className={cn(
				"flex-1 py-2 w-full hover:bg-gray-50 group flex items-center justify-center transition-colors h-full",
				className
			)}
			onClick={() => onClick?.(dateFallback)}
			aria-label={dateFallback.format("YYYY-MM-DD")}
			{...props}
		>
			<Plus className="size-4 text-transparent group-hover:text-gray-300 transition-colors" />
		</Comp>
	)
})

CalendarCellButton.displayName = "CalendarCellButton"

export default CalendarCellButton
