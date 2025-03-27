import React from 'react';

const CalendarGrid = ({
	currentMonth,
	currentYear,
	selectedDays,
	toggleDay,
}) => {
	const getDaysInMonth = (year, month) => {
		const firstDay = new Date(year, month, 0).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		let days = [];
		for (let i = 0; i < firstDay; i++) {
			days.push(null);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}

		while (days.length % 7 !== 0) {
			days.push(null);
		}

		return days;
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
