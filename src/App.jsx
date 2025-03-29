import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import YearlyView from './components/YearlyView';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Settings from './components/Settings';
import {
	toggleDay,
	clearSelectedDaysForMonth,
	clearSelectedDays,
	setLocalStorage,
	getLocalStorage,
	toggleTheme,
} from './components/Utils'; // Import the utils functions
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
		toggleTheme(isDarkMode, isPinkMode); // Set theme on load

		setLocalStorage('darkMode', isDarkMode);
		setLocalStorage('pinkMode', isPinkMode);
	}, [isDarkMode, isPinkMode]);

	useEffect(() => {
		const savedDays = getLocalStorage('selectedDays');
		if (savedDays) {
			setSelectedDays(savedDays);
		}
	}, []);

	useEffect(() => {
		setLocalStorage('selectedDays', selectedDays);
	}, [selectedDays]);

	const toggleDayHandler = (day) => {
		const updatedSelectedDays = toggleDay(
			currentYear,
			currentMonth,
			selectedDays,
			day
		);
		setSelectedDays(updatedSelectedDays);
	};

	const clearSelectedDaysForMonthHandler = () => {
		const updatedSelectedDays = clearSelectedDaysForMonth(
			currentYear,
			currentMonth,
			selectedDays
		);
		setSelectedDays(updatedSelectedDays);
		setLocalStorage('selectedDays', updatedSelectedDays);
	};

	const clearSelectedDaysHandler = () => {
		const updatedSelectedDays = clearSelectedDays();
		setSelectedDays(updatedSelectedDays);
		localStorage.removeItem('selectedDays');
	};

	const totalSelectedDays = Object.values(selectedDays).reduce(
		(acc, days) => acc + days.length,
		0
	);

	const toggleDarkModeHandler = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const togglePinkModeHandler = () => {
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
								toggleDay={toggleDayHandler}
								clearSelectedDaysForMonth={
									clearSelectedDaysForMonthHandler
								}
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
								toggleDarkMode={toggleDarkModeHandler}
								isPinkMode={isPinkMode}
								togglePinkMode={togglePinkModeHandler}
								clearSelectedDays={clearSelectedDaysHandler}
								clearSelectedDaysForMonth={
									clearSelectedDaysForMonthHandler
								}
								currentMonth={currentMonth}
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
