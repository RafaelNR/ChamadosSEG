import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";
import { AddIconButton } from "../Buttons/Icons";
import Search from "../Search";
import useSearch from "../../Context/SearchContext";

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

/**
 * Renderiza toolbar da tabela.
 * @param {string} title
 * @param {Boolean} data
 */
const EnhancedTableToolbar = ({ title, data }) => {
	const classes = useToolbarStyles();
	const { handleChangeSearch } = useSearch();

	return (
		<Toolbar className={classes.root}>
			<React.Fragment>

			<Typography
				className={classes.title}
				variant="h6"
				id="tableTitle"
				component="span"
				>
				{title}
				</Typography>
			</React.Fragment>
			<Search handleChangeSearch={handleChangeSearch} />
			{data ? (<AddIconButton />) : null }
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	title: PropTypes.string.isRequired,
};

export default React.memo(EnhancedTableToolbar);
