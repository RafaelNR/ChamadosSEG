import React from "react";

//UI
import Grid from "@material-ui/core/Grid";
import ButtonLogout from "../Components/LogOut";

export default () => {
	return (
		<Grid container component="main">
			<h1>home</h1>;
			<ButtonLogout />
		</Grid>
	);
};
