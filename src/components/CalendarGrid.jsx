import React, { useEffect, useState } from 'react';

const CalendarGrid = ({
	currentMonth,
	currentYear,
	selectedDays,
	toggleDay,
}) => {
	const [useDarkText, setUseDarkText] = useState(false);

	// Kontrollera om en färg är ljus
	const isLightColor = (hex) => {
		if (!hex) return false; // Fallback
		hex = hex.replace('#', '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5;
	};

	// Uppdatera textfärgen vid ändring av `--components-active-bg`
	useEffect(() => {
		const accentColor = getComputedStyle(document.documentElement)
			.getPropertyValue('--components-active-bg')
			.trim();

		setUseDarkText(isLightColor(accentColor));
	}, []);

	const getDaysInMonth = (year, month) => {
		const firstDay = new Date(year, month, 0).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		let days = [];

		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let i = 1; i <= daysInMonth; i++) days.push(i);
		while (days.length % 7 !== 0) days.push(null);

		return days;
	};

	const currentSelectedDays =
		selectedDays[`${currentYear}-${currentMonth}`] || [];

	return (
		<div className="calendar-grid">
			{getDaysInMonth(currentYear, currentMonth).map((day, index) => (
				<div
					key={index}
					className={`day ${day ? 'filled' : ''} ${
						day && currentSelectedDays.includes(day)
							? 'selected'
							: ''
					}`}
					style={{
						color:
							day && currentSelectedDays.includes(day)
								? useDarkText
									? 'var(--dark-text)'
									: 'var(--white-text)'
								: '',
					}}
					onClick={() => day && toggleDay(day)}>
					{day}
				</div>
			))}
		</div>
	);
};

export default CalendarGrid;
