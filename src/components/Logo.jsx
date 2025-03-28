import calendarIconBlack from '../assets/calendar-black.svg';
import calendarIconWhite from '../assets/calendar-white.svg';
import calendarIconPink from '../assets/calendar-pink.svg';

function Logo({ isDarkMode, isPinkMode }) {
	let logoSrc = calendarIconBlack; // Standard logotyp (light mode)

	if (isPinkMode) {
		logoSrc = calendarIconPink;
	} else if (isDarkMode) {
		logoSrc = calendarIconWhite;
	} else {
		logoSrc = calendarIconBlack;
	}
	return (
		<a href="./index.html">
			<img src={logoSrc} />
		</a>
	);
}

export default Logo;
