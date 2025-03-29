import React, { useEffect, useState } from 'react';
import { isLightColor, getDaysInMonth } from './Utils';

const CalendarGrid = ({
	currentMonth,
	currentYear,
	selectedDays,
	toggleDay,
}) => {
	const [useDarkText, setUseDarkText] = useState(false);

	// Uppdatera textfärgen vid ändring av `--components-active-bg`
	useEffect(() => {
		const accentColor = getComputedStyle(document.documentElement)
			.getPropertyValue('--components-active-bg')
			.trim();

		setUseDarkText(isLightColor(accentColor));
	}, []);

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
