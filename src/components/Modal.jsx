import React from 'react';

const Modal = ({ isOpen, onClose, onSelectTraining, trainingTypes }) => {
	if (!isOpen) return null; // Om modalen inte är öppen, visa ingenting

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Välj träningsform</h2>
				{trainingTypes.map((training) => (
					<button
						key={training.id}
						style={{ backgroundColor: training.color }}
						onClick={() => onSelectTraining(training.id)}>
						{training.type}
					</button>
				))}
				<button onClick={onClose}>Avbryt</button>
			</div>
		</div>
	);
};

export default Modal;
