import React from 'react';
// import './ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, toggleMode }) => {
	return (
		<div className="theme-toggle-section">
			Dark Mode
			<label className="theme-toggle">
				<input
					type="checkbox"
					checked={isDarkMode}
					onChange={toggleMode}
				/>
				<span className="slider"></span>
			</label>
		</div>
	);
};

export default ThemeToggle;
