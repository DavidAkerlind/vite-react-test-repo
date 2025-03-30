import React from 'react';
import { getTrainingClass } from './Utils';

const YearlyGrid = ({
	selectedDays,
	setHoveredDay,
	setTooltipPosition,
	getOrdinalSuffix,
}) => {
	const getWeekStartDate = (date) => {
		const dayOfWeek = date.getDay();
		const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
		date.setDate(date.getDate() + diff);
		return date;
	};

	const generateYearWeeks = () => {
		const yearWeeks = [];
		let currentDay = new Date(2025, 0, 1);

		while (currentDay.getFullYear() === 2025) {
			const weekStartDate = getWeekStartDate(new Date(currentDay));
			const week = [];

			for (let i = 0; i < 7; i++) {
				if (weekStartDate.getFullYear() === 2025) {
					week.push(new Date(weekStartDate));
				}
				weekStartDate.setDate(weekStartDate.getDate() + 1);
			}

			yearWeeks.push(week);
			currentDay.setDate(currentDay.getDate() + 7);
		}

		return yearWeeks;
	};

	const getTrainingClassForDay = (date) => {
		const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
		return getTrainingClass(
			date.getFullYear(), // currentYear
			date.getMonth(), // currentMonth
			selectedDays, // selectedDays object
			date.getDate() // current day
		);
	};

	return (
		<div className="yearly-view">
			{generateYearWeeks().map((week, weekIndex) => (
				<div key={weekIndex} className="week-column">
					{week.map((date, dayIndex) => {
						const trainingClass = getTrainingClassForDay(date);
						const isSelected = trainingClass !== '';

						return (
							<div
								key={dayIndex}
								className={`yearly-day ${
									isSelected ? 'selected' : ''
								} ${trainingClass}`}
								onMouseEnter={(e) => {
									const monthName = date.toLocaleString(
										'en-US',
										{
											month: 'long',
										}
									);
									setHoveredDay(`
										${monthName} ${date.getDate()}${getOrdinalSuffix(date.getDate())}`);

									// Tooltip position correction
									const tooltipWidth = 110;
									const tooltipHeight = 40;
									const screenWidth = window.innerWidth;
									const screenHeight = window.innerHeight;

									let xPos = e.clientX - 55;
									if (xPos + tooltipWidth > screenWidth) {
										xPos = screenWidth - tooltipWidth - 10;
									}
									if (xPos < 10) {
										xPos = 10;
									}

									let yPos = e.clientY - 50;
									if (yPos + tooltipHeight > screenHeight) {
										yPos =
											screenHeight - tooltipHeight - 10;
									}
									if (yPos < 10) {
										yPos = 10;
									}

									setTooltipPosition({ x: xPos, y: yPos });
								}}
								onMouseLeave={() => setHoveredDay(null)}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default YearlyGrid;
