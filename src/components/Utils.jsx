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

export const toggleDay = (currentYear, currentMonth, selectedDays, day) => {
	const monthKey = `${currentYear}-${currentMonth}`;

	// Fråga användaren om träningsform
	const selectedTraining = prompt('Välj träningsform (1 = Cardio, 2 = Gym)');
	if (!selectedTraining || !['1', '2'].includes(selectedTraining))
		return selectedDays;

	// Hämta månadens data (eller skapa en tom struktur)
	const monthSelections = selectedDays[monthKey] || {};

	// Hämta träningsformen (eller skapa en tom lista)
	const trainingDays = monthSelections[selectedTraining] || [];

	// Kontrollera om dagen redan är vald och toggla den
	if (trainingDays.includes(day)) {
		// Ta bort dagen om den redan är vald
		monthSelections[selectedTraining] = trainingDays.filter(
			(d) => d !== day
		);
	} else {
		// Lägg till dagen om den inte finns
		monthSelections[selectedTraining] = [...trainingDays, day];
	}

	return {
		...selectedDays,
		[monthKey]: monthSelections, // Uppdatera månaden med den nya datan
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

export function getStaticTrainingTypes() {
	let trainingTypes = [
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
	return trainingTypes;
}

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
