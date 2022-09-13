import { Link, Redirect, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import JoblyApi from "../api";
import UserContext from "../helpers/UserContext";
import "../styles/Company.css";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const Company = ({ apply }) => {
	const currUser = useContext(UserContext);

	const { handle } = useParams();
	const [loading, setLoading] = useState(true);
	const [company, setCompany] = useState({});

	useEffect(() => {
		let loadingFlag = false;
		const getSingleCompany = async () => {
			try {
				const companyObject = await JoblyApi.getCompany(handle);
				setCompany(companyObject);
				if (!loadingFlag) {
					setLoading(false);
				}
			} catch (e) {
				console.log(e);
			}
		};
		getSingleCompany();

		return () => {
			loadingFlag = true;
		};
	}, [handle]);

	if (!company) return <Redirect to={"/companies"} />;

	if (!currUser.username) {
		return <Redirect to="/login" />;
	}

	if (loading) {
		return <p>Loading ...</p>;
	}

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
						<Typography variant="h4">
							Company Name: {company.name}
						</Typography>
						<Typography variant="h6">
							Description: {company.description}
						</Typography>
						<Typography variant="h6">
							Employees:{" "}
							{company.numEmployees ? company.numEmployees : 0}
						</Typography>
						<Typography variant="h6">Available Jobs:</Typography>
						<ul>
							{company.jobs.map((j) => (
								<ThemeProvider theme={darkTheme} key={j.id}>
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
												variant="p"
												component="div"
												sx={{ mb: 1.5 }}
											>
												<b>Job Title:</b> {j.title}
											</Typography>
											<Typography
												variant="p"
												component="div"
												sx={{ mb: 1.5 }}
											>
												<b>Salary:</b> $
												{j.salary
													? j.salary.toLocaleString(
															"en-US"
													  )
													: 0}
											</Typography>
											<Typography
												variant="p"
												component="div"
												sx={{ mb: 1.5 }}
											>
												<b>Equity</b>{" "}
												{j.equity ? j.equity : 0}
											</Typography>
											<CardActions>
												{currUser.applications.includes(
													j.id
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
													<Box>
														<Link
															to={`/jobs/${j.id}`}
														>
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
																	j.id,
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
							))}
						</ul>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Company;
