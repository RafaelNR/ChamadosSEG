import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";
import { AddIconButton } from "../Buttons/Icons";
import Search from "../Search";
import { SearchContext } from "../../Context/SearchContext";

// Titulo da tabela
const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	title: {
		flex: "1 1 100%",
	},
}));

const EnhancedTableToolbar = ({ title }) => {
	const classes = useToolbarStyles();
	const { handleChangeSearch } = useContext(SearchContext);

	return (
		<Toolbar className={clsx(classes.root)}>
			<Typography
				className={classes.title}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				{title}
			</Typography>
			<Search handleChangeSearch={handleChangeSearch} />
			<AddIconButton />
		</Toolbar>
	);
};

export default EnhancedTableToolbar;
