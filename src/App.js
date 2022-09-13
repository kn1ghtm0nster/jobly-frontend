import Routes from "./Routes";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./helpers/UserContext";
import LoadingCircle from "./components/LoadingCircle";
import Container from "@mui/material/Container";

const App = () => {
	// setting state for loading data on page load or whenever the state is upated.
	const [loading, setLoading] = useState(true);

	// state for all companies and jobs from backend
	const [jobs, setJobs] = useState([]);
	const [companies, setCompanies] = useState([]);

	// state for currently logged in user
	const [currUserToken, setCurrUserToken] = useState({});

	// newUser state => ONLY USED IN SIGNUP ROUTE.
	const [newUser, setNewUser] = useState(false);

	// using state to check for authentication on frontend which will redirect to signup form with info message for new users.
	const [authenticated, setAuthenticated] = useState(false);

	// using history hook to route users accordingly based on authentication.
	const history = useHistory();

	// using useEffect hook to set the localStorage object whenever the currUserToken state is updated (user is logged in or out)
	useEffect(() => {
		if (currUserToken.username) {
			localStorage.setItem(
				"user",
				JSON.stringify({
					username: currUserToken.username,
					token: currUserToken.token.token,
					applications: currUserToken.token.applications || [],
				})
			);
			setLoading(false);
		}
		console.log("localStorage", localStorage);
	}, [currUserToken]);

	// register function that will be passed down to Signup component to take form data and send information to backend api.
	const register = async (username, password, firstName, lastName, email) => {
		try {
			let newUser = await JoblyApi.registerNewUser({
				username,
				password,
				firstName,
				lastName,
				email,
			});
			setCurrUserToken({ username, token: newUser });
			setLoading(true);
		} catch (err) {
			throw new Error(err);
		}
	};

	// login prop function that will passed down to the Login component to take form data and send information to backend api for authenticating a user and getting their token along with their applications from backend.
	const userLogin = async (username, password) => {
		try {
			let loggedInUser = await JoblyApi.authenticateUser({
				username,
				password,
			});
			console.log("loggedInUser", loggedInUser);
			setLoading(true);
			setCurrUserToken({
				username,
				token: loggedInUser,
				applications: loggedInUser.applications || [],
			});
		} catch (err) {
			throw new Error(err[0]);
		}
	};

	// logout prop function that will be passed down to the Routes component. function resets state for currUserToken object and localStorage along with sending users to frontend and reloading page ensuring that changes are applied.
	const userLogout = () => {
		setCurrUserToken({});
		localStorage.clear();
		history.push("/");
		window.location.reload();
	};

	// prop function that will be used in Profile component to populate the user's edit form with the current values.
	const getUserInfo = async (username, token) => {
		try {
			setLoading(false);
			const backendInfo = await JoblyApi.getUser(username, token);
			let currStorage = JSON.parse(localStorage.getItem("user"));
			currStorage["applications"] = backendInfo.applications;
			localStorage.setItem("user", JSON.stringify(currStorage));
			return backendInfo;
		} catch (error) {
			console.log(error);
		}
	};

	// second prop function that will be used in Profile component to update a user on the backend. If there are any issues, a new error is raised and will be displayed as an alert on the frontend.
	const updateUser = async (userObj, username, token) => {
		try {
			setLoading(false);
			const updateBackend = await JoblyApi.updateUser(
				username,
				userObj,
				token
			);
			return updateBackend;
		} catch (err) {
			throw new Error(err);
		}
	};

	// prop function that will be used in the Job, Copmanies, and Jobs components to add a new job id to a user's application array. localStorage is also update to capture the changes to the applications array and reloads the page that the button was clicekd so changes are applied and seen on the frontend (button removed for appliying again).
	const userJobApplication = async (username, jobId, token) => {
		try {
			const jobData = await JoblyApi.applyToJob(username, jobId, token);
			console.log("Application", jobData);
			let currStorage = JSON.parse(localStorage.getItem("user"));
			let currApplications = currStorage["applications"];
			currApplications.push(jobData.applied);
			console.log(currApplications);
			currStorage["applications"] = currApplications;
			localStorage.setItem("user", JSON.stringify(currStorage));
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect hook is reponsible for getting all companies and jobs from backend whenever the page first loads AND ONLY THEN.
	useEffect(() => {
		let ignore = false;
		const getJobs = async () => {
			const allJobs = await JoblyApi.getAllJobs();
			setJobs(allJobs);
		};

		const getCompanies = async () => {
			const allCompanies = await JoblyApi.getAllCompanies();
			setCompanies(allCompanies);
			if (!ignore) {
				setLoading(false);
			}
		};

		getJobs();
		getCompanies();

		return () => {
			ignore = true;
		};
	}, []);

	// prop function that is passed to the Companies component to be used with search option form at the top of the page and show the received responses from the backend server instead of all companies.
	const jobSearchQuery = async (query) => {
		try {
			const queryResponse = await JoblyApi.searchCompanies(query);
			return queryResponse;
		} catch (error) {
			console.log(error);
		}
	};

	// conditional to display a loading circle if the loading state is set to true. Only runs during first page render and then disappears once data is receievd since state changes in useEffect hook for all companies and jobs.
	if (loading) {
		return <LoadingCircle />;
	}

	// render all application components along with the NavBar component which is visible for all routes and uses the logout method to log a user out of the application.
	// main section also uses UserContext.Provider component to use the localStorage object and reference if a user is logged in or.
	// Routes component will take all previously defined methods and pass them to the respective components for making backend calls or upating state on the parent element.
	return (
		<div className="App">
			<NavBar logout={userLogout} />
			<Container maxWidth={false}>
				<main>
					<UserContext.Provider
						value={JSON.parse(localStorage.getItem("user")) || {}}
					>
						<Routes
							companies={companies}
							jobs={jobs}
							registerUser={register}
							setNewUser={setNewUser}
							newUser={newUser}
							login={userLogin}
							getUserInfo={getUserInfo}
							updateUser={updateUser}
							apply={userJobApplication}
							query={jobSearchQuery}
							authenticated={authenticated}
							setAuthenticated={setAuthenticated}
						/>
					</UserContext.Provider>
				</main>
			</Container>
		</div>
	);
};

export default App;
