import React from 'react';

const YearlyGrid = ({
	selectedDays,
	setHoveredDay,
	setTooltipPosition,
	getOrdinalSuffix,
}) => {
	const generateYearWeeks = () => {
		const yearWeeks = [];

		// Loop through each month
		for (let month = 0; month < 12; month++) {
			const daysInMonth = new Date(2025, month + 1, 0).getDate();

			// Loop through each day in the month
			for (let day = 1; day <= daysInMonth; day++) {
				const date = new Date(2025, month, day);

				// Calculate the week number using the ISO week system
				const weekNumber = Math.ceil(
					(date - new Date(2025, 0, 1)) / (7 * 24 * 60 * 60 * 1000)
				);

				if (!yearWeeks[weekNumber]) {
					yearWeeks[weekNumber] = [];
				}

				// Add the current day to the corresponding week
				yearWeeks[weekNumber].push({ month, day });
			}
		}

		return yearWeeks;
	};

	return (
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
	);
};

export default YearlyGrid;
