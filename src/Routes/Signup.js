import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import UserContext from "../helpers/UserContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/Signup.css";

const Signup = ({
	registerUser,
	setNewUser,
	setAuthenticated,
	authenticated,
}) => {
	const currUser = useContext(UserContext);
	const INITIAL_STATE = {
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	};
	const [signupForm, setSignupForm] = useState(INITIAL_STATE);
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState(null);
	const [formError, setFormError] = useState(false);

	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormError(false);
		setSignupForm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { username, password, firstName, lastName, email } = signupForm;
		try {
			if (username.length === 0) {
				e.preventDefault();
				setFormError(true);
			} else if (password.length === 0) {
				e.preventDefault();
				setFormError(true);
			} else if (firstName.length === 0) {
				e.preventDefault();
				setFormError(true);
			} else if (lastName.length === 0) {
				e.preventDefault();
				setFormError(true);
			} else if (email.length === 0) {
				e.preventDefault();
				setFormError(true);
			} else {
				e.preventDefault();
				await registerUser(
					username,
					password,
					firstName,
					lastName,
					email
				);
				setSignupForm(INITIAL_STATE);
				setNewUser(true);
				setAuthenticated(true);
				history.push("/");
			}
		} catch (error) {
			setAlert(true);
			setOpen(true);
			if (
				error.message.includes(
					`instance.email does not conform to the "email" format`
				) ||
				error.message.includes(
					"instance.email does not meet minimum length of 6"
				)
			) {
				error.message = "Invalid email format";
			} else if (
				error.message.includes(
					`instance.password does not meet minimum length of 5`
				)
			) {
				error.message = "Password must be at least 5 characters long";
			}
			setAlertContent(error.message);
		}
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} minHeight={"45rem"}>
				<Grid
					xs
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<form onSubmit={handleSubmit}>
						{alert ? (
							<Box sx={{ width: "100%" }}>
								<Collapse in={open}>
									<Alert
										severity="error"
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() => {
													setOpen(false);
													setAlert(false);
													setAlertContent("");
												}}
											>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										{alertContent}
									</Alert>
								</Collapse>
							</Box>
						) : (
							""
						)}
						{authenticated && !currUser.username ? (
							""
						) : (
							<Box sx={{ width: "100%" }}>
								<Collapse in={open}>
									<Alert
										severity="info"
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() => {
													setOpen(false);
													setAlert(false);
												}}
											>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
										sx={{ mb: 2 }}
									>
										You must have a profile to see our
										website.
									</Alert>
								</Collapse>
							</Box>
						)}
						<Typography variant="h3">
							Create New Account!
						</Typography>
						<Box
							sx={{
								"& > :not(style)": { width: "20rem" },
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<TextField
								autoComplete="username"
								error={
									formError &&
									signupForm.username.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								label={"Username"}
								name="username"
								variant="outlined"
								margin="normal"
								value={signupForm.username}
								onChange={handleChange}
							/>
							<TextField
								autoComplete="new-password"
								error={
									formError &&
									signupForm.password.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								label="Password"
								name="password"
								type="password"
								variant="outlined"
								value={signupForm.password}
								min={5}
								onChange={handleChange}
							/>
							<TextField
								label={"First Name"}
								error={
									formError &&
									signupForm.firstName.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								name="firstName"
								variant="outlined"
								margin="normal"
								min={6}
								max={50}
								value={signupForm.firstName}
								onChange={handleChange}
							/>
							<TextField
								label={"Last Name"}
								error={
									formError &&
									signupForm.lastName.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								name="lastName"
								variant="outlined"
								margin="normal"
								min={6}
								max={50}
								value={signupForm.lastName}
								onChange={handleChange}
							/>
							<TextField
								label={"Email"}
								error={
									formError && signupForm.email.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								name="email"
								variant="outlined"
								margin="normal"
								min={6}
								max={50}
								value={signupForm.email}
								onChange={handleChange}
							/>
							<Button
								variant="contained"
								sx={{ mt: 1 }}
								type="submit"
							>
								Signup!
							</Button>
							<Typography
								component="p"
								sx={{ my: 2, textAlign: "center" }}
							>
								Already have an account? log in{" "}
								<Link
									className="login-link"
									style={{ textDecoration: "none" }}
									to="/login"
								>
									Here!
								</Link>
							</Typography>
						</Box>
					</form>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Signup;
