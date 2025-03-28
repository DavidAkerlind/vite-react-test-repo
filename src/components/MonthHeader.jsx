import React from 'react';

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

const MonthHeader = ({ setCurrentMonth }) => {
	return (
		<div className="month-header">
			{monthAbbreviations.map((month, index) => (
				<div
					onClick={() => setCurrentMonth(index)}
					key={index}
					className="month-label">
					{month}
				</div>
			))}
		</div>
	);
};

export default MonthHeader;
