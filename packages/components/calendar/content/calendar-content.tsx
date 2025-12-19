import { Slot } from "@radix-ui/react-slot"
import {
	forwardRef,
	type HTMLAttributes,
	isValidElement,
	type ReactNode,
	useMemo,
} from "react"
import { cn } from "@/lib/utils"

import { useCalendar } from "../use-calendar"

type CalendarContentProps = HTMLAttributes<HTMLDivElement> & {
	asChild?: boolean
}

const VIEWS_MAP = {
	CalendarMonthView: "month",
	CalendarWeekView: "week",
	CalendarDayView: "day",
}
const VIEW_COMPONENTS = Object.keys(VIEWS_MAP)

const CalendarContent = forwardRef<HTMLDivElement, CalendarContentProps>(
	({ asChild = false, className, ...props }, ref) => {
		const { view } = useCalendar()
		const Comp = asChild ? Slot : "div"

		const recomposedChildren = useMemo(() => {
			if (!Array.isArray(props.children)) return props.children

			const recomposedChildren = props.children.filter((child: ReactNode) => {
				if (!isValidElement(child) || typeof child.type === "string")
					return true
				const displayName =
					(child.type as { displayName?: string }).displayName ??
					(child.type as { name?: string }).name ??
					""
				const isViewComponent = VIEW_COMPONENTS.includes(displayName)
				const isActiveView =
					VIEWS_MAP[displayName as keyof typeof VIEWS_MAP] === view
				return isViewComponent && isActiveView
			})

			return recomposedChildren
		}, [props.children, view])

		return (
			<Comp
				data-slot="calendar-content"
				ref={ref}
				className={cn("w-full flex-1 flex flex-col", className)}
				{...props}
				// biome-ignore lint/correctness/noChildrenProp: required for this use case
				children={recomposedChildren}
			/>
		)
	}
)

CalendarContent.displayName = "CalendarContent"

export default CalendarContent
