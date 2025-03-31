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

	const handleColorChange = (id, newColor) => {
		const updatedTrainingTypes = trainingTypes.map((type) =>
			type.id === id ? { ...type, color: newColor } : type
		);
		setTrainingTypes(updatedTrainingTypes);
	};

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
			{/* Color pickers for training types */}
			{trainingTypes.map((type) => (
				<ColorPicker
					key={type.id}
					cssVarName={`--training-${type.id}-bg`}
					label={`${type.type} Color`}
					defaultColor={type.color}
					type={type.type}
					onColorChange={(newColor) =>
						handleColorChange(type.id, newColor)
					} // Uppdaterar färgen för träningskategori
				/>
			))}
		</section>
	);
};

export default Settings;
