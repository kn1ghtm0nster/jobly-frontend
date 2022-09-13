import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// EDGE CASES: empty search CANNOT be submitted, if NO data is returned, then reload the page and show a small message at bottom of page or something idk.

const Search = ({ query, setQueriedCompanies }) => {
	const INITIAL_STATE = {
		value: "",
	};

	const [searchQuery, setSearchQuery] = useState(INITIAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSearchQuery((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { value } = searchQuery;
		const returnedData = await query(value);
		setQueriedCompanies(returnedData);
		setSearchQuery(INITIAL_STATE);
	};

	return (
		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				justifyContent: "center",
				width: 450,
				my: 1,
			}}
			onSubmit={handleSubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search Companies"
				inputProps={{ "aria-label": "search-companies" }}
				name="value"
				value={searchQuery.value}
				onChange={handleChange}
			/>
			<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default Search;
