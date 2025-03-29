import calendarIconGray from '../assets/calendar-gray.svg';
import { Link } from 'react-router-dom';

function Footer() {
	const footerLinks = [
		{ text: 'Settings', link: '/settings' },
		{ text: 'Contact', link: '#' },
		{ text: 'Calendar', link: '/calendar' },
		{ text: 'Status', link: '#' },
		{ text: 'Yearly', link: '/yearly-view' },
	];

	return (
		<footer className="footer">
			<section className="footer-links">
				{footerLinks.map((item, index) => (
					<Link key={index} to={item.link} className="footer-link">
						{item.text}
					</Link>
				))}
			</section>
			<section className="footer-logo">
				<img
					type="image/svg+xml"
					src={calendarIconGray}
					alt="Calendar logo"
				/>
				<span>© 2025 Checkbox Calendar, Inc.</span>
			</section>
		</footer>
	);
}

export default Footer;
