import React, { useEffect, useState } from 'react';
import { isLightColor, getDaysInMonth, getTrainingClass } from './Utils';

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

	// const currentSelectedDays =
	// 	selectedDays[`${currentYear}-${currentMonth}`] || [];

	const currentSelectedDays = Object.values(
		selectedDays[`${currentYear}-${currentMonth}`] || {}
	).flat(); // Plattar ut alla arrays med dagar till en enda lista

	return (
		<div className="calendar-grid">
			{getDaysInMonth(currentYear, currentMonth).map((day, index) => (
				<div
					key={index}
					className={`day ${day ? 'filled' : ''} ${
						day && currentSelectedDays.includes(day)
							? 'selected'
							: ''
					} ${
						day
							? getTrainingClass(
									currentYear,
									currentMonth,
									selectedDays,
									day
							  )
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
