import React, { useState, useEffect } from 'react';
import Button from './Button';
import { FaChevronRight } from 'react-icons/fa';

const ColorPicker = ({ cssVarName, label, defaultColor }) => {
	// Ladda sparad färg eller använd standardfärg
	const [color, setColor] = useState(
		localStorage.getItem(cssVarName) || defaultColor
	);

	// Uppdatera CSS-variabeln och spara i localStorage
	useEffect(() => {
		document.documentElement.style.setProperty(cssVarName, color);
		localStorage.setItem(cssVarName, color);
	}, [color, cssVarName]);

	// Återställ färgen till standard
	const resetToDefault = () => {
		setColor(defaultColor);
	};

	return (
		<div className="color-picker">
			<label className="color-picker__label" htmlFor={cssVarName}>
				{label}
				<FaChevronRight className="color-picker__icon" />
			</label>
			<div className="color-picker__input-container">
				<input
					type="color"
					id={cssVarName}
					value={color}
					onChange={(e) => setColor(e.target.value)}
					className="color-picker__input"
				/>
			</div>
			<Button
				text="Reset color"
				className="color-picker__reset"
				type="danger"
				onClick={resetToDefault}
			/>
		</div>
	);
};

export default ColorPicker;
