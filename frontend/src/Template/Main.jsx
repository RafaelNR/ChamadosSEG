import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyMenu from "./Menu";
import HeaderPage from "../Components/HeaderPage/HeaderPage";
import { SnackBarProvider } from "../Context/SnackBarContext";
import SnackBar from "../Components/SnackBar";

const useStyles = makeStyles((theme) => ({
	hide: {
		display: "none",
	},
	content: {
		flexGrow: 1,
		marginLeft: "72px",
	},
}));

Main.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function Main({ children }) {
	const classes = useStyles();

	return (
		<SnackBarProvider>
			<MyMenu />
			<HeaderPage />
			<main className={classes.content}>{children}</main>
			<SnackBar />
		</SnackBarProvider>
	);
}
