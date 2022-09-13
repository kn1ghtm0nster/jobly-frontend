import { useState, useContext, useEffect } from "react";
import UserContext from "../helpers/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import "../styles/Profile.css";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const Profile = ({ getUserInfo, updateUser }) => {
	const currUser = useContext(UserContext);
	const history = useHistory();

	const INITIAL_STATE = {
		firstName: "",
		lastName: "",
		email: "",
	};
	const [editForm, setEditForm] = useState(INITIAL_STATE);
	const [formError, setFormError] = useState(false);
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState("");

	useEffect(() => {
		const backendQuery = async () => {
			const data = await getUserInfo(currUser?.username, currUser?.token);
			console.log(data);
			setEditForm({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
			});
		};
		backendQuery();
	}, [getUserInfo, currUser?.username, currUser?.token]);

	if (!currUser.username) {
		return <Redirect to="/login" />;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormError(false);
		setEditForm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { firstName, lastName, email } = editForm;
		try {
			if (firstName.length === 0) {
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
				const updated = await updateUser(
					{ firstName, lastName, email },
					currUser.username,
					currUser.token
				);

				setEditForm({
					firstName: updated.firstName,
					lastName: updated.lastName,
					email: updated.email,
				});

				history.push("/profile");
				// window.location.reload();
				setAlert(true);
				setOpen(true);
				setAlertContent("Updates have been saved!");
			}
		} catch (error) {
			console.log(error);
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
										severity="success"
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
						<Typography variant="h3">
							Username: {currUser.username}
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
								label={"First Name"}
								name="firstName"
								variant="outlined"
								margin="normal"
								error={
									formError && editForm.firstName.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								min={6}
								max={50}
								value={editForm.firstName}
								onChange={handleChange}
							/>
							<TextField
								label={"Last Name"}
								name="lastName"
								variant="outlined"
								margin="normal"
								error={
									formError && editForm.lastName.length === 0
								}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								min={6}
								max={50}
								value={editForm.lastName}
								onChange={handleChange}
							/>
							<TextField
								label={"Email"}
								name="email"
								variant="outlined"
								margin="normal"
								error={formError && editForm.email.length === 0}
								helperText={
									formError ? "Field cannot be blank!" : null
								}
								min={6}
								max={50}
								value={editForm.email}
								onChange={handleChange}
							/>
							<Button
								variant="contained"
								sx={{ mt: 1 }}
								type="submit"
								color="success"
							>
								Save Changes
							</Button>
							<Button
								variant="outlined"
								sx={{ mt: 1 }}
								color="error"
								href="/"
							>
								Cancel
							</Button>
						</Box>
					</form>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Profile;
