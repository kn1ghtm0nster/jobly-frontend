import { Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../helpers/UserContext";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import "../styles/Jobs.css";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const Jobs = ({ jobs, apply }) => {
	const currUser = useContext(UserContext);

	if (!currUser.username) return <Redirect to="/signup" />;

	const allJobs = jobs.map((job) => (
		<ThemeProvider theme={darkTheme} key={job.id}>
			<Card
				sx={{ width: 400, mb: 2, boxShadow: "0px 7px 17px black" }}
				variant="outlined"
			>
				<CardContent>
					<Typography variant="p" component="div" sx={{ mb: 1.5 }}>
						<b>Job Title:</b> {job.title}
					</Typography>
					<Typography variant="body2" sx={{ mb: 1.5 }}>
						<b>Company:</b>{" "}
						<Link
							className="company-link"
							to={`/companies/${job.companyHandle}`}
						>
							{job.companyName}
						</Link>
					</Typography>
					<Typography variant="body2" sx={{ mb: 1.5 }}>
						<b>Salary:</b> $
						{job.salary ? job.salary.toLocaleString("en-US") : 0}
					</Typography>
					<Typography variant="body2" sx={{ mb: 1.5 }}>
						<b>Equity:</b> {job.equity ? job.equity : 0}
					</Typography>
					<CardActions>
						{currUser?.applications?.includes(job.id) ? (
							<Alert
								sx={{ mx: "auto" }}
								variant="outlined"
								severity="info"
							>
								You have applied to this position!
							</Alert>
						) : (
							<Box>
								<Link to={`/jobs/${job.id}`}>
									<Button className="detail-btn">
										Job Details
									</Button>
								</Link>
								<Button
									sx={{ mx: 1 }}
									className="application-btn"
									onClick={() =>
										apply(
											currUser.username,
											job.id,
											currUser.token
										)
									}
								>
									Apply!
								</Button>
							</Box>
						)}
					</CardActions>
				</CardContent>
			</Card>
		</ThemeProvider>
	));
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
						<Typography variant="h3">Available Jobs</Typography>
						<ul>{allJobs}</ul>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Jobs;
