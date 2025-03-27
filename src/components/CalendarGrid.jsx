import React, { useState, useEffect } from 'react';
import YearlyView from './YearlyView';
import Button from './Button';

const CalendarGrid = ({ currentMonth, currentYear }) => {
	const [selectedDays, setSelectedDays] = useState({});

	// Ladda från localStorage vid start
	useEffect(() => {
		const savedDays = localStorage.getItem('selectedDays');
		if (savedDays) {
			setSelectedDays(JSON.parse(savedDays));
		}
	}, []);

	// Spara till localStorage varje gång selectedDays ändras
	useEffect(() => {
		localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
	}, [selectedDays]);

	const getDaysInMonth = (year, month) => {
		const firstDay = new Date(year, month, 0).getDay(); // First day of the month
		const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total number of days in the month

		let days = [];

		for (let i = 0; i < firstDay; i++) {
			days.push(null); // Add empty days before the first day of the month
		}

		// Add the actual days of the month
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}

		// Ensure that we have a full week for the last partial week, if any.
		while (days.length % 7 !== 0) {
			days.push(null); // Fill the remaining slots to complete the last week
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

	// Funktion för att rensa alla valda dagar
	const clearSelectedDays = () => {
		setSelectedDays({});
		localStorage.removeItem('selectedDays');
	};

	const currentSelectedDays =
		selectedDays[`${currentYear}-${currentMonth}`] || [];

	return (
		<div className="calendar-container">
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

export default CalendarGrid;
