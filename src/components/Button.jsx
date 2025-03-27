import React from 'react';

function Button({ text, type, onClick }) {
	// Add 'danger' class if type is 'danger'

	return (
		<button onClick={onClick} className={type}>
			{text}
		</button>
	);
}

export default Button;
