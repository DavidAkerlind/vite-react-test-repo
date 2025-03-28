import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<h1>Welcome to the Calendar App</h1>
			<p>Select an option below:</p>
			<Link to="/calendar">
				<button className="button">Go to Calendar</button>
			</Link>
			<Link to="/yearly-view">
				<button className="button">Yearly View</button>
			</Link>
		</div>
	);
};

export default Home;
