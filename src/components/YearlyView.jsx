import React from 'react';

const YearlyView = ({ selectedDays }) => {
	// Funktion för att generera årets alla dagar
	const generateYearDays = () => {
		const yearDays = [];
		for (let month = 0; month < 12; month++) {
			const daysInMonth = new Date(2025, month + 1, 0).getDate();
			for (let day = 1; day <= daysInMonth; day++) {
				yearDays.push({ month, day });
			}
		}
		return yearDays;
	};

	return (
		<div className="yearly-view">
			{generateYearDays().map(({ month, day }, index) => {
				const isSelected =
					selectedDays[`${2025}-${month}`]?.includes(day);
				return (
					<div
						key={index}
						className={`yearly-day ${isSelected ? 'selected' : ''}`}
					/>
				);
			})}
		</div>
	);
};

export default YearlyView;
