import React, { useEffect, useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';
import YearlyView from './YearlyView';
import Button from './Button';

const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDays, setSelectedDays] = useState({});

	// Load selected days from localStorage when the component mounts
	useEffect(() => {
		const savedDays = localStorage.getItem('selectedDays');
		if (savedDays) {
			setSelectedDays(JSON.parse(savedDays));
		}
	}, []);

	// Save selected days to localStorage whenever selectedDays changes
	useEffect(() => {
		localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
	}, [selectedDays]);

	const toggleDay = (day) => {
		const key = `${currentYear}-${currentMonth}`;
		const monthSelections = selectedDays[key] || [];

		if (monthSelections.includes(day)) {
			setSelectedDays({
				...selectedDays,
				[key]: monthSelections.filter((d) => d !== day),
			});
		} else {
			setSelectedDays({
				...selectedDays,
				[key]: [...monthSelections, day],
			});
		}
	};

	// Function to clear all selected days
	const clearSelectedDays = () => {
		setSelectedDays({});
		localStorage.removeItem('selectedDays');
	};

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

			<YearlyView selectedDays={selectedDays} />
			<Button
				text="Clear all selected days"
				className="button"
				onClick={clearSelectedDays}
				type="danger"
			/>
		</div>
	);
};

export default Calendar;
