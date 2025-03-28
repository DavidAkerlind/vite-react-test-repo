import React from 'react';

function NavItem({ text, link, totalSelectedDays }) {
	const isCalendar = text === 'Calendar';

	// Determine if the span should be displayed
	const showSpan = isCalendar && totalSelectedDays > 0;

	// Dynamic class handling
	const className = `nav__item ${isCalendar ? 'active' : ''}`.trim();

	return (
		<a href={link} className={className}>
			{text}
			{showSpan && (
				<span className="nav__item-amount">{totalSelectedDays}</span>
			)}
		</a>
	);
}

export default NavItem;
