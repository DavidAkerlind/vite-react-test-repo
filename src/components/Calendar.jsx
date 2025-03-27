import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';
import YearlyView from './YearlyView';

const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDays, setSelectedDays] = useState({});
	return (
		<div className="calendar">
			<CalendarHeader
				currentMonth={currentMonth}
				currentYear={currentYear}
				setCurrentMonth={setCurrentMonth}
			/>
			<CalendarDays />
			<CalendarGrid
				currentMonth={currentMonth}
				currentYear={currentYear}
				selectedDays={selectedDays}
				setSelectedDays={setSelectedDays}
			/>
			<YearlyView selectedDays={selectedDays} />
		</div>
	);
};

export default Calendar;
