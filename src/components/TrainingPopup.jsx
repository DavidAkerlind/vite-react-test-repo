import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const TrainingPopup = ({
	trainingTypes,
	onClose,
	onSelectTraining,
	onClearTraining,
}) => {
	const [selectedTraining, setSelectedTraining] = useState('');
	const popupRef = useRef(null);

	// Handle selecting a training type
	const handleSelect = (trainingType) => {
		setSelectedTraining(trainingType);
		onSelectTraining(trainingType); // Return the selected training type to parent
		onClose(); // Close the popup after selecting
	};

	// Handle clearing the training selection
	const handleClear = () => {
		setSelectedTraining('');
		onClearTraining(); // Notify the parent that the day is cleared
		onClose(); // Close the popup after clearing
	};

	// Close the popup if the user clicks outside of it
	const handleOverlayClick = (e) => {
		if (popupRef.current && !popupRef.current.contains(e.target)) {
			onClose(); // Close the popup when clicking outside
		}
	};

	useEffect(() => {
		// Attach the click event to the overlay
		const overlay = document.querySelector('.popup-overlay');
		if (overlay) {
			overlay.addEventListener('click', handleOverlayClick);
		}

		// Clean up the event listener when the component unmounts
		return () => {
			if (overlay) {
				overlay.removeEventListener('click', handleOverlayClick);
			}
		};
	}, []);

	return (
		<div className="popup-overlay">
			<div className="popup" ref={popupRef}>
				<h2>Select Training Type</h2>
				<div className="training-options">
					{trainingTypes.map((type) => (
						<Button
							text={type.name}
							key={type.name}
							style={{ backgroundColor: type.color }}
							onClick={() => handleSelect(type.name)}
						/>
					))}
				</div>
				{/* Button to clear the training */}
				<Button
					text="Clear Training"
					type="danger"
					onClick={handleClear}
					className="clear-btn"
				/>

				<Button
					text="Close"
					type="danger"
					onClick={onClose}
					className="close-btn"
				/>
			</div>
		</div>
	);
};

export default TrainingPopup;
