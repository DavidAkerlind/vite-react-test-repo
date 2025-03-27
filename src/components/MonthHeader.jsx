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

const MonthHeader = () => {
	return (
		<div className="month-header">
			{monthAbbreviations.map((month, index) => (
				<div key={index} className="month-label">
					{month}
				</div>
			))}
		</div>
	);
};

export default MonthHeader;
