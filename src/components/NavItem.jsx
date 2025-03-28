import { Link, useLocation } from 'react-router-dom';

function NavItem({ text, link, totalSelectedDays }) {
	const location = useLocation(); // Get the current URL path
	const isActive = location.pathname === link; // Check if this link is active
	const isCalendar = link === '/calendar'; // Check if it's the Calendar link

	// Show the span only for Calendar if there are selected days
	const showSpan = isCalendar && totalSelectedDays > 0;

	// Dynamic class handling
	const className = `nav__item ${isActive ? 'active' : ''}`.trim();

	return (
		<Link to={link} className={className}>
			{text}
			{showSpan && (
				<span className="nav__item-amount">{totalSelectedDays}</span>
			)}
		</Link>
	);
}

export default NavItem;
