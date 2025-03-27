import React, { useState } from 'react';
import MonthHeader from './MonthHeader';
import YearlyGrid from './YearlyGrid';

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

	return (
		<div className="yearly-view-container">
			<MonthHeader />
			<YearlyGrid
				selectedDays={selectedDays}
				setHoveredDay={setHoveredDay}
				setTooltipPosition={setTooltipPosition}
				getOrdinalSuffix={getOrdinalSuffix}
			/>
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
