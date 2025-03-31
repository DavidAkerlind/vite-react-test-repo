import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSelectTraining, trainingTypes }) => {
	if (!isOpen) return null;

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
				<h2>Välj träningsform</h2>
				<div className="modal-buttons">
					{trainingTypes.map((training) => (
						<button
							key={training.id}
							className="training-button"
							style={{ backgroundColor: training.color }}
							onClick={() => onSelectTraining(training.id)}>
							{training.type}
						</button>
					))}
				</div>
				<button className="close-button" onClick={onClose}>
					Avbryt
				</button>
			</div>
		</div>
	);
};

export default Modal;
