import React from 'react';
// import './ThemeToggle.css';

const ThemeToggle = ({ text, isDarkMode, toggleMode }) => {
	return (
		<div className="theme-toggle-section">
			{text}
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
