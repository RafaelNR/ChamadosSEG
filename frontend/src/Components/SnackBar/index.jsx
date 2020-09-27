import React, { useContext } from "react";
import { makeStyles, Snackbar } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

import { SnackBarContext } from "../../Context/SnackBarContext";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

export default () => {
	const classes = useStyles();
	const { openSnackBar, clickSnackBar, severity, message } = useContext(
		SnackBarContext
	);

	return (
		<div className={classes.root}>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={severity === "error" ? 30000 : 6000}
				onClose={clickSnackBar}
			>
				<Alert
					onClose={clickSnackBar}
					severity={severity ? severity : "success"}
				>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};
