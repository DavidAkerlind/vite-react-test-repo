import React from 'react';
import ThemeToggle from './ThemeToggle';
import Button from './Button.jsx';

const Settings = ({
	isDarkMode,
	toggleDarkMode,
	isPinkMode,
	togglePinkMode,
	clearSelectedDays,
	clearSelectedDaysForMonth,
	currentMonth,
}) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let buttonText = `Clear selected days in ${months[currentMonth]}`;

	return (
		<section className="settings">
			<h2>Settings</h2>
			<p className="transparent">Adjust your preferences below:</p>

			<ThemeToggle
				text="Dark Mode"
				isMode={isDarkMode}
				toggleMode={toggleDarkMode}
			/>

			<ThemeToggle text="Emilia Mode" toggleMode={togglePinkMode} />

			<Button
				onClick={clearSelectedDaysForMonth}
				text={buttonText}
				type="danger"
			/>

			<Button
				onClick={clearSelectedDays}
				text="Clear all selected days"
				type="danger"
			/>
		</section>
	);
};

export default Settings;
