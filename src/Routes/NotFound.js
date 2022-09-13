import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div>
			<h1>
				OH NO! Looks like we couldn't find what you're looking for!
				Please check your spelling and try again.
			</h1>

			<h3>
				You can also go back home with <Link to="/">this link!</Link>
			</h3>
		</div>
	);
};

export default NotFound;
