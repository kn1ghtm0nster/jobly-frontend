import { Link, Redirect, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import JoblyApi from "../api";
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
import "../styles/Job.css";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const Job = ({ apply }) => {
	const currUser = useContext(UserContext);

	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [job, setJob] = useState({});

	useEffect(() => {
		let loadingFlag = false;

		const getJobInfo = async () => {
			try {
				const j = await JoblyApi.getJob(id);
				setJob(j);
				if (!loadingFlag) {
					setLoading(false);
				}
			} catch (e) {
				console.log(e);
			}
		};

		getJobInfo();

		return () => {
			loadingFlag = true;
		};
	}, [id]);

	if (isNaN(id)) return <Redirect to={"/jobs"} />;

	if (!currUser.username) {
		return <Redirect to="/signup" />;
	}

	if (loading) {
		return <p>Loading ...</p>;
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} minHeight={"70rem"}>
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
							component="div"
							sx={{ mb: 1.5 }}
						>
							Job Details!
						</Typography>
						<ThemeProvider theme={darkTheme}>
							<Card
								sx={{
									width: 400,
									mb: 2,
									boxShadow: "0px 7px 17px black",
								}}
								variant="outlined"
							>
								<CardContent>
									<Typography
										variant="h5"
										component="div"
										sx={{ mb: 1.5 }}
									>
										<b>Job Title:</b> {job.title}
									</Typography>
									<Typography
										variant="h5"
										component="div"
										sx={{ mb: 1.5 }}
									>
										<b>Salary:</b>{" "}
										{job.salary
											? job.salary.toLocaleString("en-US")
											: 0}
									</Typography>
									<Typography
										variant="h5"
										component="div"
										sx={{ mb: 1.5 }}
									>
										<b>Equity:</b>{" "}
										{job.equity ? job.equity : 0}
									</Typography>
									<Typography
										variant="h5"
										component="div"
										sx={{ mb: 1.5 }}
									>
										<b>Company:</b>{" "}
										<Link
											className="company-link"
											to={`/companies/${job.company.handle}`}
										>
											{job.company.name}
										</Link>
									</Typography>
									<CardActions>
										{currUser.applications.includes(
											job.id
										) ? (
											<Alert
												sx={{ mx: "auto" }}
												variant="outlined"
												severity="info"
											>
												You have applied to this
												position!
											</Alert>
										) : (
											<Button
												variant="outlined"
												fullWidth
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
										)}
									</CardActions>
								</CardContent>
							</Card>
						</ThemeProvider>
					</Box>
				</Grid>
			</Grid>
		</Box>

		// <div>
		// 	<h2>Title: {job.title}</h2>
		// 	<h4>
		// 		Salary: ${job.salary ? job.salary.toLocaleString("en-US") : 0}
		// 	</h4>
		// 	<h4>Equity: {job.equity ? job.equity : 0}</h4>
		// 	<p>
		// 		Company:{" "}
		// 		<Link to={`/companies/${job.company.handle}`}>
		// 			{job.company.name}
		// 		</Link>
		// 	</p>
		// 	<button>
		// 		<Link to={`/jobs`}>Back to Jobs</Link>
		// 	</button>
		// 	{currUser.applications.includes(job.id) ? (
		// 		<p>You have already applied to this position!</p>
		// 	) : (
		// 		<button
		// 			onClick={() =>
		// 				apply(currUser.username, job.id, currUser.token.token)
		// 			}
		// 		>
		// 			Apply
		// 		</button>
		// 	)}
		// </div>
	);
};

export default Job;
