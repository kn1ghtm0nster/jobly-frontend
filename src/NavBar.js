import { NavLink, Link } from "react-router-dom";
import "./styles/NavBarStyles.css";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Code from MUI setting the width of mobile slide drawer and navItems along with the dark theme for the nav bar.
const drawerWidth = 240;
let navItems = ["jobs", "companies", "signup", "login"];
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

// NavBar component that renders navbar at top of the page.
const NavBar = (props) => {
	// exporting the logut and window methods from the overall props object that is passed in. Window method is for MUI library and logout is prop function from App component to log a user out.
	const { logout, window } = props;
	const container =
		window !== undefined ? () => window().document.body : undefined;
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// initializing drawer variable as undefined
	let drawer;
	// accessing currUser from localStorage.
	const currUser = JSON.parse(localStorage.getItem("user"));
	// conditional to render navbar with links to user profile and logout routes otherwise render default signup / login routes on navbar and drawer.
	if (currUser?.username) {
		navItems = [
			"jobs".toUpperCase(),
			"companies".toUpperCase(),
			currUser.username.toUpperCase(),
		];
		drawer = (
			<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
				<Typography variant="h6" sx={{ my: 2 }}>
					JOBLY
				</Typography>
				<Divider />
				<List>
					{navItems.map((item) => (
						<ListItem key={item} disablePadding>
							<ListItemButton
								sx={{ textAlign: "center" }}
								href={
									item.toLowerCase() ===
									`${currUser.username}`.toLowerCase()
										? "/profile"
										: `/${item.toLowerCase()}`
								}
							>
								<ListItemText primary={item} />
							</ListItemButton>
						</ListItem>
					))}
					<ListItem key="logout" disablePadding>
						<ListItemButton
							sx={{ textAlign: "center" }}
							onClick={() => logout()}
						>
							<ListItemText
								className="nav-logout-link"
								primary={<Link to="/logout">LOG OUT</Link>}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		);
		return (
			<Box sx={{ display: "flex" }}>
				<ThemeProvider theme={darkTheme}>
					<AppBar position="static" component="nav" color="primary">
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: "none" } }}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="/"
								sx={{
									flexGrow: 1,
									display: { xs: "none", md: "flex" },
									fontFamily: "monospace",
									fontWeight: 700,
									color: "inherit",
									textDecoration: "none",
								}}
							>
								JOBLY
							</Typography>
							<Box sx={{ display: { xs: "none", sm: "block" } }}>
								{navItems.map((item) => (
									<NavLink
										key={item}
										className="nav-item"
										to={
											item.toLowerCase() ===
											`${currUser.username}`.toLowerCase()
												? "/profile"
												: `/${item.toLowerCase()}`
										}
									>
										<Button
											sx={{ color: "#fff", m: 1 }}
											color="inherit"
										>
											{item}
										</Button>
									</NavLink>
								))}
								<NavLink
									key="logout"
									to="/logout"
									className="nav-item"
								>
									<Button
										sx={{ m: 1 }}
										color="error"
										variant="outlined"
										onClick={() => logout()}
									>
										Logout
									</Button>
								</NavLink>
							</Box>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
				<Box component="nav">
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</Box>
			</Box>
		);
	} else {
		drawer = (
			<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
				<Typography variant="h6" sx={{ my: 2 }}>
					Jobly
				</Typography>
				<Divider />
				<List>
					{navItems.map((item) => (
						<ListItem key={item} disablePadding>
							<ListItemButton
								sx={{ textAlign: "center" }}
								href={`/${item}`}
							>
								<ListItemText primary={item} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		);
		return (
			<Box sx={{ display: "flex" }}>
				<ThemeProvider theme={darkTheme}>
					<AppBar position="static" component="nav" color="primary">
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: "none" } }}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="/"
								sx={{
									flexGrow: 1,
									display: { xs: "none", md: "flex" },
									fontFamily: "monospace",
									fontWeight: 700,
									color: "inherit",
									textDecoration: "none",
								}}
							>
								JOBLY
							</Typography>
							<Box
								sx={{
									display: { xs: "none", sm: "block" },
								}}
							>
								{navItems.map((item) => (
									<NavLink
										key={item}
										className="nav-item"
										to={`/${item}`}
									>
										<Button
											key={item}
											sx={{ color: "#fff" }}
											color="inherit"
										>
											{item}
										</Button>
									</NavLink>
								))}
							</Box>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
				<Box component="nav">
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</Box>
			</Box>
		);
	}
};

export default NavBar;
