import React from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const CalendarHeader = ({ currentMonth, currentYear, setCurrentMonth }) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return (
		<div className="calendar-header">
			<button
				onClick={() =>
					setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
				}>
				<FaCaretLeft />
			</button>
			<h2>
				{months[currentMonth]} {currentYear}
			</h2>
			<button
				onClick={() =>
					setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
				}>
				<FaCaretRight />
			</button>
		</div>
	);
};

export default CalendarHeader;
