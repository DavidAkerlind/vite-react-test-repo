import NavItem from './NavItem';

function NavBar({ totalSelectedDays }) {
	const navItems = [
		{
			text: 'Home',
			link: '/',
		},
		{
			text: 'Calendar',
			link: '/Calendar',
		},
		{
			text: 'Year',
			link: '/yearly-view',
		},
		{
			text: 'Settings',
			link: '/Settings',
		},
	];

	return (
		<ul className="nav">
			{navItems.map((item, index) => {
				return (
					<NavItem
						totalSelectedDays={totalSelectedDays}
						key={index}
						text={item.text}
						link={item.link}
					/>
				);
			})}
		</ul>
	);
}

export default NavBar;
