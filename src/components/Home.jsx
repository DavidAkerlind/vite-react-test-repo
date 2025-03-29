import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<section className="home-section">
			<h2>Welcome to the Calendar App</h2>

			<Link to="/calendar">
				<button>Go to Calendar</button>
			</Link>
			<Link to="/yearly-view">
				<button>Yearly View</button>
			</Link>
			<Link to="/settings">
				<button>Settings</button>
			</Link>
		</section>
	);
};

export default Home;
