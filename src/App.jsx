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

	useEffect(() => {
		document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
		localStorage.setItem('darkMode', isDarkMode);
	}, [isDarkMode]);

	const toggleMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
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
			<ThemeToggle isDarkMode={isDarkMode} toggleMode={toggleMode} />
			<Footer />
		</div>
	);
};

export default App;
