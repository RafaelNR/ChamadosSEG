import React, { useEffect, useState } from "react";

//UI
import Grid from "@material-ui/core/Grid";
import Menu from "../Template/Menu";

export default () => {
	return (
		<Grid container component="main">
			<Menu></Menu>
		</Grid>
	);
};
