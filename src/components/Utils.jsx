// Utils.jsx

import { HiMiniDocumentCurrencyBangladeshi } from 'react-icons/hi2';

// Function to check if a color is light or dark
export const isLightColor = (hex) => {
	if (!hex) return false; // Fallback
	hex = hex.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.5;
};

export const getDaysInMonth = (year, month) => {
	const firstDay = new Date(year, month, 0).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	let days = [];

	for (let i = 0; i < firstDay; i++) days.push(null);
	for (let i = 1; i <= daysInMonth; i++) days.push(i);
	while (days.length % 7 !== 0) days.push(null);

	return days;
};

// Utils.jsx

export const toggleDay = (
	currentYear,
	currentMonth,
	selectedDays,
	day,
	selectedTraining
) => {
	const monthKey = `${currentYear}-${currentMonth}`;

	// Set the selected training type (1 or 2, default to 1 if not provided)
	let selectedTrainingUse = selectedTraining || 1;

	// Get the month's data or initialize it if it doesn't exist
	const monthSelections = selectedDays[monthKey] || {};

	// Get the training days for the selected training type, or an empty array if none
	const trainingDays = monthSelections[selectedTrainingUse] || [];

	// Ensure that the day only belongs to one training type at a time
	// Remove the day from the other training type (if it exists in that list)
	const otherTrainingType = selectedTrainingUse === 1 ? 2 : 1;
	const otherTrainingDays = monthSelections[otherTrainingType] || [];

	// Remove the day from the other training type (if it's there)
	if (otherTrainingDays.includes(day)) {
		monthSelections[otherTrainingType] = otherTrainingDays.filter(
			(d) => d !== day
		);
	}

	// Now, toggle the day for the selected training type
	if (trainingDays.includes(day)) {
		// If the day is already selected, remove it from the current training type
		monthSelections[selectedTrainingUse] = trainingDays.filter(
			(d) => d !== day
		);
	} else {
		// If the day isn't selected, add it to the current training type
		monthSelections[selectedTrainingUse] = [...trainingDays, day];
	}

	// Return the updated selectedDays with the new state
	return {
		...selectedDays,
		[monthKey]: monthSelections,
	};
};

export const clearSelectedDaysForMonth = (
	currentYear,
	currentMonth,
	selectedDays
) => {
	const key = `${currentYear}-${currentMonth}`;
	const updatedSelectedDays = { ...selectedDays };
	delete updatedSelectedDays[key];
	return updatedSelectedDays;
};

export const clearSelectedDays = () => {
	return {};
};

export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
	const savedData = localStorage.getItem(key);
	return savedData ? JSON.parse(savedData) : null;
};

export const toggleTheme = (isDarkMode, isPinkMode) => {
	let themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
	if (isPinkMode) themeClass += ' pink-mode';
	document.body.className = themeClass;
};

export const getCurrentMonthName = (currentMonth) => {
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

	return months[currentMonth];
};

export let defaultTrainingTypes = [
	{
		id: 1,
		type: 'Cardio',
		color: '#D6F00F',
	},
	{
		id: 2,
		type: 'Gym',
		color: '#F0200E',
	},
];

export default defaultTrainingTypes;

export const getTrainingClass = (
	currentYear,
	currentMonth,
	selectedDays,
	day
) => {
	if (!day) {
		return ''; // Return an empty string if the day is invalid
	}

	const monthKey = `${currentYear}-${currentMonth}`; // Format: "2025-2"
	const trainingTypes = Object.keys(selectedDays[monthKey] || {}).filter(
		(type) => selectedDays[monthKey][type]?.includes(day) // Check if the day is selected for each training type
	);

	return trainingTypes.map((type) => `training-${type}`).join(' '); // Map the training types to classes
};

// export const isLightColor = (color) => {
// 	// Vi använder en enkel metod för att avgöra om en färg är ljus eller mörk
// 	// Om färgen är en hex-kod (t.ex. #ffffff eller rgb())
// 	// Du kan även lägga till stöd för andra färgformat här

// 	// Om det är en hex-kod, omvandla till RGB
// 	let r, g, b;
// 	if (color.startsWith('#')) {
// 		// Om hex-färgen är i kort format #RGB
// 		if (color.length === 4) {
// 			r = parseInt(color[1] + color[1], 16);
// 			g = parseInt(color[2] + color[2], 16);
// 			b = parseInt(color[3] + color[3], 16);
// 		} else {
// 			r = parseInt(color[1] + color[2], 16);
// 			g = parseInt(color[3] + color[4], 16);
// 			b = parseInt(color[5] + color[6], 16);
// 		}
// 	} else if (color.startsWith('rgb')) {
// 		// Om det är en RGB-färg
// 		const rgbValues = color
// 			.match(/^rgb\((\d+), (\d+), (\d+)\)$/)
// 			.slice(1)
// 			.map((val) => parseInt(val));
// 		[r, g, b] = rgbValues;
// 	}

// 	// Beräkna luminansen för att avgöra om färgen är ljus eller mörk
// 	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

// 	// Om luminansen är större än 128 så är färgen ljus
// 	return luminance > 0.5;
// };

export const getTextColorForBackground = (bgColor) => {
	const isLight = isLightColor(bgColor);
	// Om bakgrundsfärgen är ljus, sätt texten till mörk, annars sätt texten till vit
	return isLight ? 'var(--dark-text)' : 'var(--white-text)';
};
