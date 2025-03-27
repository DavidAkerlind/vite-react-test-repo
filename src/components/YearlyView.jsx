import React, { useState } from 'react';

const YearlyView = ({ selectedDays }) => {
	const [hoveredDay, setHoveredDay] = useState(null);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	// Funktion för att bestämma rätt ordningstal (st, nd, rd, th)
	const getOrdinalSuffix = (day) => {
		if (day >= 11 && day <= 13) return 'th';
		const lastDigit = day % 10;
		if (lastDigit === 1) return 'st';
		if (lastDigit === 2) return 'nd';
		if (lastDigit === 3) return 'rd';
		return 'th';
	};

	// Lista med månadsförkortningar
	const monthAbbreviations = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	// Funktion för att generera årets veckor
	const generateYearWeeks = () => {
		const yearWeeks = Array.from({ length: 53 }, () => []); // Max 53 veckor

		for (let month = 0; month < 12; month++) {
			const daysInMonth = new Date(2025, month + 1, 0).getDate();

			for (let day = 1; day <= daysInMonth; day++) {
				const date = new Date(2025, month, day);
				const weekNumber = Math.floor(
					(date - new Date(2025, 0, 1)) / (7 * 24 * 60 * 60 * 1000)
				); // Beräkna veckonummer

				if (!yearWeeks[weekNumber]) {
					yearWeeks[weekNumber] = [];
				}
				yearWeeks[weekNumber].push({ month, day });
			}
		}
		return yearWeeks;
	};

	return (
		<div className="yearly-view-container">
			{/* Månadsförkortningar */}
			<div className="month-header">
				{monthAbbreviations.map((month, index) => (
					<div key={index} className="month-label">
						{month}
					</div>
				))}
			</div>

			<div className="yearly-view">
				{generateYearWeeks().map((week, weekIndex) => (
					<div key={weekIndex} className="week-column">
						{week.map(({ month, day }, dayIndex) => {
							const isSelected =
								selectedDays[`${2025}-${month}`]?.includes(day);

							return (
								<div
									key={dayIndex}
									className={`yearly-day ${
										isSelected ? 'selected' : ''
									}`}
									onMouseEnter={(e) => {
										const monthName = new Date(
											2025,
											month,
											day
										).toLocaleString('en-US', {
											month: 'long',
										});
										setHoveredDay(
											`${monthName} ${day}${getOrdinalSuffix(
												day
											)}`
										);
										setTooltipPosition({
											x: e.clientX,
											y: e.clientY,
										});
									}}
									onMouseLeave={() => setHoveredDay(null)}
								/>
							);
						})}
					</div>
				))}
			</div>

			{/* Tooltip som bara visas om hoveredDay inte är null */}
			{hoveredDay && (
				<div
					className="tooltip"
					style={{
						top: tooltipPosition.y + 10 + 'px',
						left: tooltipPosition.x + 10 + 'px',
					}}>
					{hoveredDay}
				</div>
			)}
		</div>
	);
};

export default YearlyView;
