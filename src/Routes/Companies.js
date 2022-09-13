import { Link, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../helpers/UserContext";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Search from "../components/Search";
import "../styles/Companies.css";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const Companies = ({ companies, query, authenticated }) => {
	const currUser = useContext(UserContext);
	const [queriedCompanies, setQueriedCompanies] = useState([]);

	if (!currUser.username && !authenticated) {
		return <Redirect to="/signup" />;
	} else {
		const allCompanies = companies.map((company) => (
			<ThemeProvider theme={darkTheme} key={company.handle}>
				<Card
					sx={{ width: 400, my: 1, boxShadow: "0px 7px 17px black" }}
					variant="outlined"
				>
					<CardContent>
						<Typography
							variant="p"
							component="div"
							sx={{ mb: 1.5 }}
						>
							<b>Company:</b> {company.name}
						</Typography>
						<Typography variant="body2" sx={{ mb: 1.5 }}>
							<b>About:</b> {company.description}
						</Typography>
						<Typography variant="body2">
							<b>Employees: </b>{" "}
							{company.numEmployees ? company.numEmployees : 0}
						</Typography>
					</CardContent>
					<CardActions>
						<Link
							className="company-btn"
							to={`/companies/${company.handle}`}
						>
							<Button size="small" color="primary">
								<b>Learn More</b>
							</Button>
						</Link>
					</CardActions>
				</Card>
			</ThemeProvider>
		));

		let filtered;

		if (queriedCompanies.length >= 1) {
			filtered = queriedCompanies.map((company) => (
				<ThemeProvider theme={darkTheme} key={company.handle}>
					<Card
						sx={{
							width: 400,
							my: 1,
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
								<b>Company:</b> {company.name}
							</Typography>
							<Typography variant="body2" sx={{ mb: 1.5 }}>
								<b>About:</b> {company.description}
							</Typography>
							<Typography variant="body2">
								<b>Employees: </b>{" "}
								{company.numEmployees
									? company.numEmployees
									: 0}
							</Typography>
						</CardContent>
						<CardActions>
							<Link
								className="company-btn"
								to={`/companies/${company.handle}`}
							>
								<Button size="small" color="primary">
									<b>Learn More</b>
								</Button>
							</Link>
						</CardActions>
					</Card>
				</ThemeProvider>
			));
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
							<Typography variant="h3">Companies</Typography>
							<Search
								query={query}
								setQueriedCompanies={setQueriedCompanies}
							/>
							{queriedCompanies.length >= 1
								? filtered
								: allCompanies}
						</Box>
					</Grid>
				</Grid>
			</Box>
		);
	}
};

export default Companies;
