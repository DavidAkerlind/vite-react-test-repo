import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';
import YearlyView from './YearlyView';
import Button from './Button';
import { getCurrentMonthName } from './Utils';
import Modal from './Modal';

const Calendar = ({
	currentMonth,
	currentYear,
	setCurrentMonth,
	setCurrentYear,
	selectedDays,
	toggleDay,
	clearSelectedDaysForMonth,
	isModalOpen,
	setModalOpen,
	onSelectedTraining,
	trainingTypes,
}) => {
	return (
		<div className="calendar">
			<CalendarHeader
				currentMonth={currentMonth}
				currentYear={currentYear}
				setCurrentMonth={setCurrentMonth}
				setCurrentYear={setCurrentYear}
			/>
			<CalendarDays />
			<CalendarGrid
				currentMonth={currentMonth}
				currentYear={currentYear}
				selectedDays={selectedDays}
				toggleDay={toggleDay}
			/>
			<YearlyView
				setCurrentMonth={setCurrentMonth}
				selectedDays={selectedDays}
			/>
			<Button
				type="danger"
				text={`Clear selected days in ${getCurrentMonthName(
					currentMonth
				)}`}
				onClick={clearSelectedDaysForMonth}
			/>
			<Modal
				isOpen={true}
				onClose={() => setModalOpen(false)}
				onSelectTraining={onSelectedTraining}
				trainingTypes={trainingTypes}
			/>
		</div>
	);
};

export default Calendar;
