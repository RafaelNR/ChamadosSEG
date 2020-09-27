import React from "react";
import { Grid } from "@material-ui/core";
import {
	EditIconButton,
	DisabledIconButton,
	ActivedIconButton,
} from "../Buttons/Icons";

export default React.memo((props) => {
	return (
		<Grid container spacing={0}>
			<Grid item md={3}>
				<EditIconButton {...props} />
			</Grid>
			<Grid item md={3}>
				{props.disabled === 0 ? (
					<ActivedIconButton {...props} />
				) : (
					<DisabledIconButton {...props} />
				)}
			</Grid>
		</Grid>
	);
});
