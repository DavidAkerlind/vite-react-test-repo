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
	defaultTrainingTypes,
} from './components/Utils'; // Import the utils functions
import './index.css';

const App = () => {
	const systemTheme = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;

	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDays, setSelectedDays] = useState({});
	const [isDarkMode, setIsDarkMode] = useState(
		localStorage.getItem('darkMode') === 'true' ? true : systemTheme
	);
	const [isPinkMode, setIsPinkMode] = useState(
		localStorage.getItem('pinkMode') === 'true'
	);
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedTraining, setSelectedTraining] = useState(null);

	const handelSelectTraining = (trainingId) => {
		setSelectedTraining(trainingId);
		setModalOpen(false);
	};
	const [trainingTypes, setTrainingTypes] = useState([
		{ id: 1, type: 'Cardio', color: 'var(--training-1-bg)' },
		{ id: 2, type: 'Gym', color: 'var(--training-2-bg)' },
	]);

	const handelSetTrainingTypes = (id, newColor) => {
		const updatedTrainingTypes = trainingTypes.map((type) =>
			type.id === id ? { ...type, color: newColor } : type
		);
		setTrainingTypes(updatedTrainingTypes);
	};

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
			day,
			selectedTraining
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
								isModalOpen={isModalOpen}
								setModalOpen={setModalOpen}
								onSelectedTraining={handelSelectTraining}
								trainingTypes={trainingTypes}
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
								trainingTypes={trainingTypes}
								setTrainingTypes={handelSetTrainingTypes}
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
