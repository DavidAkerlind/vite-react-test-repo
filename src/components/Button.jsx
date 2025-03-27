import React from 'react';

function Button({ text, type, onClick }) {
	const buttonClass = type === 'danger' ? 'danger' : ''; // Add 'danger' class if type is 'danger'

	return (
		<button onClick={onClick} className={buttonClass}>
			{text}
		</button>
	);
}

export default Button;
