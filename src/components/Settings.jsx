import React from 'react';
import ThemeToggle from './ThemeToggle';
import Button from './Button.jsx';
import ColorPicker from './ColorPicker.jsx';

const Settings = ({
	isDarkMode,
	toggleDarkMode,
	isPinkMode,
	togglePinkMode,
	clearSelectedDays,
	clearSelectedDaysForMonth,
	currentMonth,
	trainingTypes,
	setTrainingTypes,
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

			<ThemeToggle
				text="Emilia Mode"
				isMode={isPinkMode}
				toggleMode={togglePinkMode}
			/>

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
			<ColorPicker
				cssVarName="--components-active-bg"
				label="Active Component Color"
				defaultColor="#2ea043"
			/>
			<ColorPicker
				cssVarName="--training-1-bg"
				label="training 1 Color"
				defaultColor="#2ea043"
			/>
			<ColorPicker
				cssVarName="--training-2-bg"
				label="training 2 Color"
				defaultColor="#2ea043"
			/>
		</section>
	);
};

export default Settings;
