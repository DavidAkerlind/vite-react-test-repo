import React from 'react';

const ThemeToggle = ({ isDarkMode, toggleMode }) => {
	return (
		<button className="mode-toggle, button" onClick={toggleMode}>
			Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
		</button>
	);
};

export default ThemeToggle;
