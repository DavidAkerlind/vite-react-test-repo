// Utils.jsx

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
	const key = `${currentYear}-${currentMonth}`;
	const monthSelections = selectedDays[key] || [];

	if (monthSelections.includes(day)) {
		return {
			...selectedDays,
			[key]: monthSelections.filter((d) => d !== day),
		};
	} else {
		return {
			...selectedDays,
			[key]: [...monthSelections, day],
		};
	}
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
