import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const Login = ({ login }) => {
	const INITIAL_STATE = {
		username: "",
		password: "",
	};
	const [loginFormData, setLoginFormData] = useState(INITIAL_STATE);
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [formError, setFormError] = useState(false);

	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormError(false);
		setLoginFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		try {
			const { username, password } = loginFormData;
			if (
				username.length === 0 ||
				password.length === 0 ||
				(username.length === 0 && password.length === 0)
			) {
				e.preventDefault();
				setFormError(true);
			} else {
				e.preventDefault();
				await login(username.trim(), password);
				setLoginFormData(INITIAL_STATE);
				history.push("/");
			}
		} catch (error) {
			setAlert(true);
			setOpen(true);
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
						<Typography variant="h2">Welcome Back!</Typography>
						<Box
							sx={{
								"& > :not(style)": { m: 2, width: "20rem" },
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
							noValidate
						>
							<TextField
								autoComplete="username"
								error={
									formError &&
									loginFormData.username.length === 0
								}
								helperText={
									formError &&
									loginFormData.username.length === 0
										? "Field cannot be blank!"
										: null
								}
								label={"Username"}
								margin="normal"
								name="username"
								value={loginFormData.username}
								onChange={handleChange}
							/>
							<TextField
								autoComplete="current-password"
								error={
									formError &&
									loginFormData.password.length === 0
								}
								helperText={
									formError &&
									loginFormData.password.length === 0
										? "Field cannot be blank!"
										: null
								}
								label="Password"
								name="password"
								type="password"
								variant="outlined"
								value={loginFormData.password}
								onChange={handleChange}
							/>
							<Button
								variant="contained"
								sx={{ mt: 1 }}
								type="submit"
							>
								Login
							</Button>
						</Box>
					</form>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Login;
