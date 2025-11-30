import {
	CalendarAddEventButton,
	CalendarCellButton,
	CalendarContent,
	CalendarDateTitle,
	CalendarDayGrid,
	CalendarDayHeader,
	CalendarDayView,
	CalendarFooter,
	CalendarHeader,
	CalendarHeaderNav,
	CalendarHeaderNavNextButton,
	CalendarHeaderNavPrevButton,
	CalendarMonthGrid,
	CalendarMonthHeader,
	CalendarMonthView,
	CalendarProvider,
	CalendarRoot,
	CalendarTimeCol,
	CalendarTimeColHeader,
	CalendarTodayButton,
	CalendarViewSwitcher,
	CalendarViewSwitcherButton,
	CalendarWeekGrid,
	CalendarWeekHeader,
	CalendarWeekView,
} from "ab-components/calendar"

export function App() {
	return (
		<div className="min-h-screen w-full p-4 flex flex-col">
			<CalendarProvider>
				<CalendarRoot>
					<CalendarHeader>
						<CalendarDateTitle />
						<CalendarHeaderNav>
							<CalendarHeaderNavPrevButton />
							<CalendarHeaderNavNextButton />
						</CalendarHeaderNav>
						<CalendarViewSwitcher>
							<CalendarViewSwitcherButton view="month">
								Month
							</CalendarViewSwitcherButton>
							<CalendarViewSwitcherButton view="week">
								Week
							</CalendarViewSwitcherButton>
							<CalendarViewSwitcherButton view="day">
								Day
							</CalendarViewSwitcherButton>
						</CalendarViewSwitcher>
						<CalendarTodayButton>Today</CalendarTodayButton>
						<CalendarAddEventButton>Add Event</CalendarAddEventButton>
					</CalendarHeader>
					<CalendarContent>
						<CalendarMonthView>
							<CalendarMonthHeader
								onHeaderCellClick={(date) => console.log(date)}
							/>
							<CalendarMonthGrid>
								<CalendarCellButton onClick={(date) => console.log(date)} />
							</CalendarMonthGrid>
						</CalendarMonthView>
						<CalendarWeekView>
							<CalendarTimeCol format="h A" hourStart={5}>
								<CalendarTimeColHeader>GMT-6</CalendarTimeColHeader>
							</CalendarTimeCol>
							<CalendarTimeCol format="H">
								<CalendarTimeColHeader>GMT+1</CalendarTimeColHeader>
							</CalendarTimeCol>
							<CalendarWeekHeader
								onHeaderCellClick={(date) => console.log(date)}
								format="dddd, MMMM D"
							/>
							<CalendarWeekGrid>
								<CalendarCellButton onClick={(date) => console.log(date)} />
							</CalendarWeekGrid>
						</CalendarWeekView>
						<CalendarDayView>
							<CalendarDayHeader format="dddd | MMMM D" />
							<CalendarTimeCol format="h A">
								<CalendarTimeColHeader>GMT-6</CalendarTimeColHeader>
							</CalendarTimeCol>
							<CalendarDayGrid>
								<CalendarCellButton onClick={(date) => console.log(date)} />
							</CalendarDayGrid>
						</CalendarDayView>
					</CalendarContent>
					<CalendarFooter>Footer</CalendarFooter>
				</CalendarRoot>
			</CalendarProvider>
		</div>
	)
}
