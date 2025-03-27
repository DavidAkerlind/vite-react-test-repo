import React from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import Button from './Button'; // Import the Button component

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
			{/* Left Button for changing month */}
			<Button
				text={<FaCaretLeft style={{ fontSize: '2rem' }} />}
				onClick={() =>
					setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
				}
				type="icon" // You can change the type to 'danger' or any other type you prefer
			/>

			{/* Display current month and year */}
			<h2>
				{months[currentMonth]} {currentYear}
			</h2>

			{/* Right Button for changing month */}
			<Button
				text={<FaCaretRight style={{ fontSize: '2rem' }} />}
				onClick={() =>
					setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
				}
				type="icon" // You can change the type to 'danger' or any other type you prefer
			/>
		</div>
	);
};

export default CalendarHeader;
