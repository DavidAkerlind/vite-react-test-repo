import React, { useEffect, useState } from 'react';
import { isLightColor, getDaysInMonth, getTrainingClass } from './Utils';

const CalendarGrid = ({
	currentMonth,
	currentYear,
	selectedDays,
	toggleDay,
}) => {
	const [training1TextColor, setTraining1TextColor] = useState('');
	const [training2TextColor, setTraining2TextColor] = useState('');

	// Uppdatera textfärgen vid ändring av `--training-1-bg` och `--training-2-bg`
	useEffect(() => {
		const training1Color = getComputedStyle(document.documentElement)
			.getPropertyValue('--training-1-bg')
			.trim();

		const training2Color = getComputedStyle(document.documentElement)
			.getPropertyValue('--training-2-bg')
			.trim();

		// Check if each color is light or dark
		const isTraining1Light = isLightColor(training1Color);
		const isTraining2Light = isLightColor(training2Color);

		// Set text color for each training based on background color lightness
		setTraining1TextColor(
			isTraining1Light ? 'var(--dark-text)' : 'var(--white-text)'
		);
		setTraining2TextColor(
			isTraining2Light ? 'var(--dark-text)' : 'var(--white-text)'
		);
	}, []);

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
								? // Apply text color based on the selected training
								  getTrainingClass(
										currentYear,
										currentMonth,
										selectedDays,
										day
								  ) === 'training-1'
									? training1TextColor
									: training2TextColor
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
