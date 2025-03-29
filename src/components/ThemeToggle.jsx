import React from 'react';
// import './ThemeToggle.css';

const ThemeToggle = ({ text, isMode, toggleMode }) => {
	return (
		<form className="theme-toggle-section">
			{text}
			<label className="theme-toggle">
				<input type="checkbox" checked={isMode} onChange={toggleMode} />
				<span className="slider"></span>
			</label>
		</form>
	);
};

export default ThemeToggle;
