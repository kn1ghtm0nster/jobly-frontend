import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "../styles/Home.css";

const Home = ({ newUser }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));

	if (currUser?.username) {
		return (
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2} minHeight={"45rem"}>
					<Grid
						xs
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								sx={{ fontWeight: 700, my: 3 }}
								variant="h2"
							>
								{newUser
									? `Welcome to the platform, ${currUser.username}!`
									: `Welcome Back to Jobly, ${currUser.username}!`}
							</Typography>
							<Typography variant="h5">
								Ready to continue practicing your application
								skills?
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		);
	} else {
		return (
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2} minHeight={"45rem"}>
					<Grid
						xs
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h3"
								sx={{ fontWeight: 700, my: 3 }}
							>
								Welcome to Jobly!
							</Typography>
							<Typography variant="h5">
								Practice your job application skills here!
							</Typography>

							<Box>
								<Link to="/signup" className="signup-btn">
									<Button variant="contained">Signup</Button>
								</Link>

								<Link to="/login" className="login-btn">
									<Button variant="contained" sx={{ m: 2 }}>
										Login
									</Button>
								</Link>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		);
	}
};

export default Home;
