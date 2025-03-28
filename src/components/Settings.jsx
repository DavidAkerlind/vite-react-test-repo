import React from 'react';

const Settings = ({
	isDarkMode,
	toggleDarkMode,
	isPinkMode,
	togglePinkMode,
}) => {
	return (
		<div>
			<h1>Settings</h1>
			<p>Adjust your preferences below:</p>

			<button className="button" onClick={toggleDarkMode}>
				Toggle Dark Mode {isDarkMode ? '🌙' : '☀️'}
			</button>

			<button className="button pink-button" onClick={togglePinkMode}>
				Toggle Emilia Mode {isPinkMode ? '💖' : '❌'}
			</button>
		</div>
	);
};

export default Settings;
