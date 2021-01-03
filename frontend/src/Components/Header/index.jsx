import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { adminMenu, defaultMenu, analistaMenu } from "../../Store/Pages";

const useStyles = makeStyles((theme) => ({
	box_header: {
		display: "flex",
		height: "250px",
		borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		backgroundColor: theme.palette.primary.main,
		color: "white",
	},
	span: {
		display: "flex",
		alignItems: "center",
		fontSize: "25px",
		paddingLeft: "95px",
		width: "100%",
	},
}));

export default () => {
	const classes = useStyles();
	const { pathname } = useLocation();
	const [path, setPath] = useState("Home");

	useEffect(() => {
		const Menus = adminMenu.concat(defaultMenu).concat(analistaMenu);

		const Menu = Object.values(Menus).filter((Menu) =>
			Menu.path === pathname ? Menu : null
		);

		if (Menu && Menu[0]) setPath(Menu[0].nome);

	}, [pathname]);

	return (
		<>
			<div className={classes.box_header}>
				<span className={classes.span}>{path}</span>
			</div>
		</>
	);
};
