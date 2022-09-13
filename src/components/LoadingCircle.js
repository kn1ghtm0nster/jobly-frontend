import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const CircularIndeterminate = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} minHeight={"45rem"}>
				<Grid
					xs
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress color="secondary" size="2rem" />
				</Grid>
			</Grid>
		</Box>
	);
};

export default CircularIndeterminate;
