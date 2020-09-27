import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Save, Close } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
	cancel: {
		backgroundColor: "white",
		color: "#b71c1c",
		border: "1px solid #b71c1c",
		"&:hover": {
			transition: "",
			color: "white",
			backgroundColor: "#b71c1c",
		},
	},
	save: {
		backgroundColor: "#1b5e20",
		color: "white",
		padding: "8px",
		marginRight: "8px",
		"&:hover": {
			transition: "",
			backgroundColor: "#124116",
		},
	},
	icon: {
		fontSize: "20px",
	},
}));

const SaveButton = ({ clickSubmit }) => {
	const classes = useStyles();
	return (
		<Button className={classes.save} autoFocus onClick={clickSubmit}>
			<Save className={classes.icon} />
		</Button>
	);
};

const CancelButton = ({ clickClose }) => {
	const classes = useStyles();
	return (
		<Button className={classes.cancel} onClick={clickClose}>
			<Close className={classes.icon} />
		</Button>
	);
};

export { SaveButton, CancelButton };
