import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';

const Calendar = ({
	currentMonth,
	currentYear,
	setCurrentMonth,
	setCurrentYear,
	selectedDays,
	toggleDay,
}) => {
	return (
		<div className="calendar">
			<CalendarHeader
				currentMonth={currentMonth}
				currentYear={currentYear}
				setCurrentMonth={setCurrentMonth}
				setCurrentYear={setCurrentYear}
			/>
			<CalendarDays />
			<CalendarGrid
				currentMonth={currentMonth}
				currentYear={currentYear}
				selectedDays={selectedDays}
				toggleDay={toggleDay}
			/>
		</div>
	);
};

export default Calendar;
