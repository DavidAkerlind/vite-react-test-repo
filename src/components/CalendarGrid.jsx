import React, { useEffect, useState } from 'react';
import {
	getDaysInMonth,
	getTrainingClass,
	getTextColorForBackground,
} from './Utils';

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

		// Använd den återanvändbara funktionen för att sätta textfärger
		setTraining1TextColor(getTextColorForBackground(training1Color));
		setTraining2TextColor(getTextColorForBackground(training2Color));
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
