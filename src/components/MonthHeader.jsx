import React from 'react';
import Button from './Button';

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
				<Button
					text={month}
					onClick={() => setCurrentMonth(index)}
					key={index}
					className="month-label"></Button>
			))}
		</div>
	);
};

export default MonthHeader;
