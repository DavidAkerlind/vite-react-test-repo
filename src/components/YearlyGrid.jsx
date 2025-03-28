import React from 'react';

const YearlyGrid = ({
	selectedDays,
	setHoveredDay,
	setTooltipPosition,
	getOrdinalSuffix,
}) => {
	const getWeekStartDate = (date) => {
		// Första dagen på veckan ska vara måndag (0 = måndag)
		const dayOfWeek = date.getDay();
		const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // För att få måndag som vecka start
		date.setDate(date.getDate() + diff); // Justera till måndag
		return date;
	};

	const generateYearWeeks = () => {
		const yearWeeks = [];
		let currentDay = new Date(2025, 0, 1); // Startar från 1 januari 2025

		// Hitta måndagen för varje vecka och skapa veckorna
		while (currentDay.getFullYear() === 2025) {
			const weekStartDate = getWeekStartDate(new Date(currentDay));
			const week = [];

			// Fyll veckodagar för denna vecka
			for (let i = 0; i < 7; i++) {
				if (weekStartDate.getFullYear() === 2025) {
					week.push(new Date(weekStartDate)); // Lägg till dagen i veckan
				}
				weekStartDate.setDate(weekStartDate.getDate() + 1); // Gå vidare till nästa dag
			}

			yearWeeks.push(week);
			currentDay.setDate(currentDay.getDate() + 7); // Gå vidare till nästa vecka
		}

		return yearWeeks;
	};

	return (
		<div className="yearly-view">
			{generateYearWeeks().map((week, weekIndex) => (
				<div key={weekIndex} className="week-column">
					{week.map((date, dayIndex) => {
						const isSelected = selectedDays[
							`${date.getFullYear()}-${date.getMonth()}`
						]?.includes(date.getDate());

						return (
							<div
								key={dayIndex}
								className={`yearly-day ${
									isSelected ? 'selected' : ''
								}`}
								onMouseEnter={(e) => {
									const monthName = date.toLocaleString(
										'en-US',
										{
											month: 'long',
										}
									);
									setHoveredDay(
										`${monthName} ${date.getDate()}${getOrdinalSuffix(
											date.getDate()
										)}`
									);

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
