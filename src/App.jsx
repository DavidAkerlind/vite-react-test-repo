import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import YearlyView from './components/YearlyView';
import Button from './components/Button';

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDays, setSelectedDays] = useState({});

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
			<YearlyView selectedDays={selectedDays} />
			<Button
				text="Clear all selected days"
				className="button"
				onClick={clearSelectedDays}
				type="danger"
			/>
		</div>
	);
};

export default App;
