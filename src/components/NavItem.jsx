import React from 'react';

function NavItem({ text, link }) {
	return (
		<a href={link} className="nav__item">
			{text}
		</a>
	);
}

export default NavItem;
