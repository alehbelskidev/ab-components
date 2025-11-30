import {
	Children,
	cloneElement,
	type HTMLAttributes,
	isValidElement,
	type ReactNode,
	useMemo,
} from "react"
import { cn } from "../../lib/utils"

type CalendarWeekViewProps = HTMLAttributes<HTMLDivElement> & {
	cellClass?: string
}

const CalendarWeekView = ({
	className,
	children,
	...props
}: CalendarWeekViewProps) => {
	const { updatedChildren, colsCountAdd } = useMemo(() => {
		const childrenArray = Children.toArray(children)

		const timeColsIndexes = childrenArray
			.map((child: ReactNode, index) => {
				if (!isValidElement(child) || typeof child.type === "string")
					return null
				const displayName =
					(child.type as { displayName?: string }).displayName ??
					(child.type as { name?: string }).name ??
					""
				return displayName === "CalendarTimeCol" ? index : null
			})
			.filter((index): index is number => index !== null)

		let timeColColStart = timeColsIndexes.length ? 1 : 0

		const updatedChildren = childrenArray.map((child: ReactNode) => {
			if (!isValidElement(child) || typeof child.type === "string") return child

			const displayName =
				(child.type as { displayName?: string }).displayName ??
				(child.type as { name?: string }).name ??
				""

			if (displayName === "CalendarTimeCol") {
				const newChild = cloneElement(child, {
					...(child.props as HTMLAttributes<HTMLDivElement>),
					colStart: timeColColStart,
				} as {
					colStart: number
					props: HTMLAttributes<HTMLDivElement>
				})
				timeColColStart++
				return newChild
			}

			return cloneElement(child, {
				...(child.props as HTMLAttributes<HTMLDivElement>),
				colStart: timeColColStart,
			} as { colStart: number; props: HTMLAttributes<HTMLDivElement> })
		})
		return { updatedChildren, colsCountAdd: timeColColStart - 1 }
	}, [children])

	const gridTemplateColumns = useMemo(() => {
		if (colsCountAdd === 0) {
			return "repeat(7, 1fr)"
		}
		if (colsCountAdd === 1) {
			return "max-content repeat(7, 1fr)"
		}
		return `repeat(${colsCountAdd}, max-content) repeat(7, 1fr)`
	}, [colsCountAdd])

	return (
		<div
			data-calendar-view="week"
			className={cn("w-full h-full grid flex-1", className)}
			style={{
				gridTemplateColumns,
				gridTemplateRows: "max-content repeat(24, 1fr)",
			}}
			{...props}
		>
			{updatedChildren}
		</div>
	)
}

CalendarWeekView.displayName = "CalendarWeekView"

export default CalendarWeekView
