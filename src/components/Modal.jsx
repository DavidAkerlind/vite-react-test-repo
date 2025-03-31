import React, { useEffect, useState } from 'react';
import {
	getDaysInMonth,
	getTrainingClass,
	getTextColorForBackground,
} from './Utils';
const Modal = ({ isOpen, onClose, onSelectTraining, trainingTypes }) => {
	if (!isOpen) return null;

	const [training1TextColor, setTraining1TextColor] = useState('');
	const [training2TextColor, setTraining2TextColor] = useState('');
	useEffect(() => {
		const training1Color = getComputedStyle(document.documentElement)
			.getPropertyValue('--training-1-bg')
			.trim();

		const training2Color = getComputedStyle(document.documentElement)
			.getPropertyValue('--training-2-bg')
			.trim();

		// Använd den återanvändbara funktionen för att sätta textfärger
		setTraining1TextColor(getTextColorForBackground(training1Color));
		setTraining2TextColor(getTextColorForBackground(training2Color));
	}, []);
	// Close modal on Escape key press
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	// Close modal when clicking outside
	const handleOverlayClick = (event) => {
		if (event.target.classList.contains('modal-overlay')) {
			onClose();
		}
	};

	return (
		<div
			className="modal-overlay"
			onClick={handleOverlayClick}
			aria-hidden={!isOpen}
			role="dialog">
			<div className="modal-content">
				<h2>Choose training type</h2>
				<div className="modal-buttons">
					{trainingTypes.map((training) => (
						<button
							key={training.id}
							style={{
								color: `${
									training.color === 'training-1'
										? training1TextColor
										: training2TextColor
								}`,
								backgroundColor: `${training.color}`,
							}}
							className="training-button"
							type={training.type}
							onClick={() => onSelectTraining(training.id)}>
							{training.type}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Modal;
