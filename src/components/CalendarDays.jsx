import React from 'react';

const CalendarDays = () => {
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	return (
		<div className="calendar-days">
			{days.map((day) => (
				<div key={day} className="day-name">
					{day}
				</div>
			))}
		</div>
	);
};

export default CalendarDays;
