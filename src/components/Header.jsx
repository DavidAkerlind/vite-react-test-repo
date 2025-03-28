import Logo from './Logo';
import NavBar from './NavBar';

function Header({ isDarkMode, isPinkMode }) {
	return (
		<header>
			<Logo isDarkMode={isDarkMode} isPinkMode={isPinkMode} />

			<NavBar />
		</header>
	);
}

export default Header;
