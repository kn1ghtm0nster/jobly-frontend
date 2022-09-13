import { Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Jobs from "./Routes/Jobs";
import Companies from "./Routes/Companies";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import NotFound from "./Routes/NotFound";
import Company from "./components/Company";
import Profile from "./components/Profile";
import Job from "./components/Job";

// Main routes component for React frontend routing using react-router-dom 5.2.1 props object is being deconstructed to pass state variables or state setter functions to each individual component that is being rendered on frontend.
const Routes = ({
	jobs,
	companies,
	registerUser,
	setNewUser,
	newUser,
	login,
	getUserInfo,
	updateUser,
	apply,
	query,
	authenticated,
	setAuthenticated,
}) => {
	return (
		<div>
			<Switch>
				{/* home route which will render either a message for a new user that is registered or the normal login message */}
				<Route exact path={"/"}>
					<Home newUser={newUser} />
				</Route>
				{/* jobs route that shows all jobs from backend query and application button for logged in users. */}
				<Route exact path={"/jobs"}>
					<Jobs
						jobs={jobs}
						apply={apply}
						authenticated={authenticated}
					/>
				</Route>
				{/* single job route that application button if user has not already applied to position. */}
				<Route exact path={"/jobs/:id"}>
					<Job apply={apply} />
				</Route>
				{/* companies route that shows all companies from backend query and query function to use with search bar at top of companies list. */}
				<Route exact path={"/companies"}>
					<Companies
						companies={companies}
						query={query}
						setAuthenticated={authenticated}
						authenticated={authenticated}
					/>
				</Route>
				{/* single company handle that shows company information along with list of available jobs. Each single job will also have apply button for user to apply if not already done so.*/}
				<Route exact path={"/companies/:handle"}>
					<Company apply={apply} />
				</Route>
				{/* login route that renders Login form and uses the login prop function from App to send authentication request to backend server. */}
				<Route exact path={"/login"}>
					<Login login={login} />
				</Route>
				{/* signup route that renders Signup form and uses data from form to create a new user with the registerUser prop function passed down from App. Component also uses setNewUser prop function to set state of newUser on App component which will cause home route to render custom message for new user. */}
				<Route exact path={"/signup"}>
					<Signup
						registerUser={registerUser}
						setNewUser={setNewUser}
						setAuthenticated={setAuthenticated}
						authenticated={authenticated}
					/>
				</Route>
				{/* renders profile route which is an edit form for the logged in user. getUserInfo prop function is passed down to make backend db query and populate form with response. updateUser prop function will take data from submitted form and send to backend db for update. */}
				<Route exact path={"/profile"}>
					<Profile
						getUserInfo={getUserInfo}
						updateUser={updateUser}
					/>
				</Route>
				{/* route for logging user out. ONLY VISIBLE FOR LOGGED IN USERS */}
				<Route exact path="/logout" />
				{/* General pretend 404 route for catching resources that are not on frontend request. */}
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
};

export default Routes;
