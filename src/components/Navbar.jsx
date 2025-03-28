import NavItem from './NavItem';

function NavBar({ totalSelectedDays }) {
	const navItems = [
		{
			text: 'Calendar',
			link: './index.html',
		},
		{
			text: 'Settings',
			link: './index.html',
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
