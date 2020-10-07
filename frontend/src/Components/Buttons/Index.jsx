import React from "react";
import PropTypes from "prop-types";
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

const SaveButton = ({ clickAction }) => {
	const classes = useStyles();
	return (
		<Button className={classes.save} autoFocus onClick={clickAction}>
			<Save className={classes.icon} />
		</Button>
	);
};

SaveButton.propTypes = {
	clickAction: PropTypes.func.isRequired,
};

const CancelButton = ({ clickClose }) => {
	const classes = useStyles();
	return (
		<Button className={classes.cancel} onClick={clickClose}>
			<Close className={classes.icon} />
		</Button>
	);
};

CancelButton.propTypes = {
	clickClose: PropTypes.func.isRequired,
};

export { SaveButton, CancelButton };
