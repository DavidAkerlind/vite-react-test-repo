import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import YearlyView from './components/YearlyView';
import Button from './components/Button';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import './index.css';

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDays, setSelectedDays] = useState({});
	const [isDarkMode, setIsDarkMode] = useState(
		localStorage.getItem('darkMode') === 'true'
	);
	// Separate state for Pink Mode
	const [isPinkMode, setIsPinkMode] = useState(
		localStorage.getItem('pinkMode') === 'true'
	);

	useEffect(() => {
		// Determine class based on both Dark and Pink Mode
		let themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
		if (isPinkMode) themeClass += ' pink-mode';
		document.body.className = themeClass;

		// Save settings in localStorage
		localStorage.setItem('darkMode', isDarkMode);
		localStorage.setItem('pinkMode', isPinkMode);
	}, [isDarkMode, isPinkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const togglePinkMode = () => {
		setIsPinkMode((prevMode) => !prevMode);
	};
	// Load selected days from localStorage when the component mounts
	useEffect(() => {
		const savedDays = localStorage.getItem('selectedDays');
		if (savedDays) {
			setSelectedDays(JSON.parse(savedDays));
		}
	}, []);

	// Save selected days to localStorage whenever selectedDays changes
	useEffect(() => {
		localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
	}, [selectedDays]);

	// Toggle day selection
	const toggleDay = (day) => {
		const key = `${currentYear}-${currentMonth}`;
		const monthSelections = selectedDays[key] || [];

		if (monthSelections.includes(day)) {
			setSelectedDays({
				...selectedDays,
				[key]: monthSelections.filter((d) => d !== day),
			});
		} else {
			setSelectedDays({
				...selectedDays,
				[key]: [...monthSelections, day],
			});
		}
	};

	// Function to clear all selected days for the current month
	const clearSelectedDaysForMonth = () => {
		const key = `${currentYear}-${currentMonth}`;
		const updatedSelectedDays = { ...selectedDays };
		delete updatedSelectedDays[key]; // Ta bort de valda dagarna för denna månad
		setSelectedDays(updatedSelectedDays);
		localStorage.setItem(
			'selectedDays',
			JSON.stringify(updatedSelectedDays)
		); // Uppdatera localStorage
	};

	// Function to clear all selected days
	const clearSelectedDays = () => {
		setSelectedDays({});
		localStorage.removeItem('selectedDays');
	};

	return (
		<div className="app">
			<Calendar
				currentMonth={currentMonth}
				currentYear={currentYear}
				setCurrentMonth={setCurrentMonth}
				setCurrentYear={setCurrentYear}
				selectedDays={selectedDays}
				toggleDay={toggleDay}
			/>
			<YearlyView
				setCurrentMonth={setCurrentMonth}
				selectedDays={selectedDays}
			/>
			<Button
				text="Clear all selected days"
				className="button"
				onClick={clearSelectedDays}
				type="danger"
			/>
			<Button
				text="Clear selected days for this month"
				className="button"
				onClick={clearSelectedDaysForMonth}
				type="danger"
			/>
			<Button
				text="Toggle Dark Mode"
				className="button"
				onClick={toggleDarkMode}
			/>
			<Button
				text="Toggle Emilia Mode"
				className="button pink-button"
				onClick={togglePinkMode}
			/>

			<Footer />
		</div>
	);
};

export default App;
