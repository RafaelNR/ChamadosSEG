import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button, DialogActions } from "@material-ui/core/";
import { Save, Close, NavigateNextSharp, NavigateBeforeSharp } from "@material-ui/icons/";

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
	next: {
		backgroundColor: "blue",
		color: "white",
		padding: "8px",
		marginRight: "8px",
		"&:hover": {
			transition: "",
			backgroundColor: "blue",
		},
	},
	icon: {
		fontSize: "20px",
	},
}));

const SaveButton = React.memo(({disabled}) => {
	const classes = useStyles();
	return (
			<Button type="submit" className={classes.save} disabled={disabled}>
				<Save className={classes.icon}/>
			</Button>
	);
});

const NavigatorButton = React.memo(({ clickAction, name, icon }) => {
	const classes = useStyles();
	return (
		<Button onClick={() => clickAction()} className={classes.next}>
			{icon === 'next'
				? <NavigateNextSharp className={classes.icon} />
				: <NavigateBeforeSharp className={classes.icon} />
			}
			{ name ? name : ''}
		</Button>
	);
});

const CancelButton = React.memo(({ clickClose }) => {
	const classes = useStyles();
	return (
		<DialogActions>
			<Button className={classes.cancel} onClick={clickClose}>
				<Close className={classes.icon} />
			</Button>
		</DialogActions>
	);
});

CancelButton.propTypes = {
	clickClose: PropTypes.func.isRequired,
};

export { SaveButton, CancelButton, NavigatorButton };
