import calendarIconGray from '../assets/calendar-gray.svg';

function Footer() {
	const footerLinks = [
		{ text: 'Settings', link: '#' },
		{ text: 'Contact', link: '#' },
		{ text: 'Calendar', link: '#' },
		{ text: 'Status', link: '#' },
	];

	return (
		<footer className="footer">
			<section className="footer-links">
				{footerLinks.map((item, index) => (
					<a key={index} href={item.link}>
						{item.text}
					</a>
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
