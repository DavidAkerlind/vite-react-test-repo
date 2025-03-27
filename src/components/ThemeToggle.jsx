import React from 'react';

const ThemeToggle = ({ isDarkMode, toggleMode }) => {
	return (
		<button className="mode-toggle, button" onClick={toggleMode}>
			Toggle {isDarkMode ? 'light' : 'dark'} mode
		</button>
	);
};

export default ThemeToggle;
