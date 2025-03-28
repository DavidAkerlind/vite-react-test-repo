import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import YearlyView from './components/YearlyView';
import Button from './components/Button';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'; // Create a Home component
import Settings from './components/Settings';
import './index.css';

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDays, setSelectedDays] = useState({});
	const [isDarkMode, setIsDarkMode] = useState(
		localStorage.getItem('darkMode') === 'true'
	);
	const [isPinkMode, setIsPinkMode] = useState(
		localStorage.getItem('pinkMode') === 'true'
	);

	useEffect(() => {
		let themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
		if (isPinkMode) themeClass += ' pink-mode';
		document.body.className = themeClass;

		localStorage.setItem('darkMode', isDarkMode);
		localStorage.setItem('pinkMode', isPinkMode);
	}, [isDarkMode, isPinkMode]);

	useEffect(() => {
		const savedDays = localStorage.getItem('selectedDays');
		if (savedDays) {
			setSelectedDays(JSON.parse(savedDays));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
	}, [selectedDays]);

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

	const clearSelectedDaysForMonth = () => {
		const key = `${currentYear}-${currentMonth}`;
		const updatedSelectedDays = { ...selectedDays };
		delete updatedSelectedDays[key];
		setSelectedDays(updatedSelectedDays);
		localStorage.setItem(
			'selectedDays',
			JSON.stringify(updatedSelectedDays)
		);
	};

	const clearSelectedDays = () => {
		setSelectedDays({});
		localStorage.removeItem('selectedDays');
	};

	const totalSelectedDays = Object.values(selectedDays).reduce(
		(acc, days) => acc + days.length,
		0
	);

	const toggleDarkMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const togglePinkMode = () => {
		setIsPinkMode((prevMode) => !prevMode);
	};

	return (
		<Router>
			<div className="app">
				<Header
					isDarkMode={isDarkMode}
					isPinkMode={isPinkMode}
					totalSelectedDays={totalSelectedDays}
				/>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/calendar"
						element={
							<Calendar
								currentMonth={currentMonth}
								currentYear={currentYear}
								setCurrentMonth={setCurrentMonth}
								setCurrentYear={setCurrentYear}
								selectedDays={selectedDays}
								toggleDay={toggleDay}
							/>
						}
					/>
					<Route
						path="/yearly-view"
						element={
							<YearlyView
								setCurrentMonth={setCurrentMonth}
								selectedDays={selectedDays}
							/>
						}
					/>
					<Route
						path="/settings"
						element={
							<Settings
								isDarkMode={isDarkMode}
								toggleDarkMode={toggleDarkMode}
								isPinkMode={isPinkMode}
								togglePinkMode={togglePinkMode}
							/>
						}
					/>
				</Routes>

				<Footer />
			</div>
		</Router>
	);
};

export default App;
