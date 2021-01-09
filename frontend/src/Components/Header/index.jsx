import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Headers } from "../../Store/Pages";

import { handleHeaderName } from '../../Utils/functions'

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
	const [nome, setNome] = useState();

	useEffect(() => {

		if (pathname && pathname !== '/') {
			const Header = handleHeaderName(pathname, Headers);
			if (Header && Header.nome) {
				document.title = `${Header.nome} - OS Técnicos`;
				setNome(Header.nome);
			}
		} else {
			setNome('Dashboard');
			document.title = `${nome ? nome : 'Dashboard' } - OS Técnicos`;
		}

	}, [pathname]);

	return (
		<>
			<div className={classes.box_header}>
				<span className={classes.span}>{nome}</span>
			</div>
		</>
	);
};
