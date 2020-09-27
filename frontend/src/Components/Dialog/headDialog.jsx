import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	root: {
		margin: 0,
		width: "calc(100% - 25%)",
		height: "calc(100% - 20%)",
		padding: theme.spacing(2),
		color: "white",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: "white",
	},
	headerdialog: {
		height: "55px",
		backgroundColor: "#3f51b5",
		boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "0.5rem 1rem",
	},
	titledialog: {
		color: "white",
		fontSize: "18px",
	},
});

export default withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle
			disableTypography
			className={(classes.root, classes.headerdialog)}
			{...other}
		>
			<Typography className={classes.titledialog} variant="h6">
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});
