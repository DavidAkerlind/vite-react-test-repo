import React, { useState } from 'react';
import YearlyView from './YearlyView';

const CalendarGrid = ({ currentMonth, currentYear }) => {
	const [selectedDays, setSelectedDays] = useState([]);

	const getDaysInMonth = (year, month) => {
		const firstDay = new Date(year, month, 1).getDay(); // Första veckodagen
		const daysInMonth = new Date(year, month + 1, 0).getDate(); // Antal dagar i månaden

		let days = [];
		for (let i = 0; i < firstDay; i++) {
			days.push(null); // Lägg till tomma rutor innan första dagen
		}
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}
		return days;
	};

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

	const currentSelectedDays =
		selectedDays[`${currentYear}-${currentMonth}`] || [];

	return (
		<div className="calendar-grid">
			{getDaysInMonth(currentYear, currentMonth).map((day, index) => (
				<div
					key={index}
					className={`day ${
						day && currentSelectedDays.includes(day)
							? 'selected'
							: ''
					} ${day ? 'filled' : ''}`}
					onClick={() => day && toggleDay(day)}>
					{day}
				</div>
			))}
		</div>
	);
};

export default CalendarGrid;
