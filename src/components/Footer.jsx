import calendarIcon from '../assets/calendar-black.svg';

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-links">
				<a href="#">Terms</a>
				<a href="#">Privacy</a>
				<a href="#">Security</a>
				<a href="#">Status</a>
				<a href="#">Docs</a>
				<a href="#">Contact</a>
				<a href="#">Manage cookies</a>
				<a href="#">Do not share my personal information</a>
			</div>
			<div className="footer-logo">
				<img
					type="image/svg+xml"
					src={calendarIcon}
					alt="Calendar logo"
				/>
				<span>© 2025 GitHub, Inc.</span>
			</div>
		</footer>
	);
}

export default Footer;
