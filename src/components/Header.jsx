import Logo from './Logo';
import NavBar from './NavBar';

function Header({ isDarkMode, isPinkMode, totalSelectedDays }) {
	return (
		<header>
			<Logo isDarkMode={isDarkMode} isPinkMode={isPinkMode} />

			<NavBar totalSelectedDays={totalSelectedDays} />
		</header>
	);
}

export default Header;
