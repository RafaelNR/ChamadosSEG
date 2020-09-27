import React, { useContext } from "react";
import { Paper, CircularProgress } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import UsersTable from "../Tables/UsersTable";
import DialogType from "../Dialog/UserDialog";
import { UsuariosContext } from "../../Context/UsuariosContext";
import { DialogProvider } from "../../Context/DialogContext";
import { SearchProvider } from "../../Context/SearchContext";
import { OrderTableProvider } from "../../Context/OrderTableContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: "-6rem",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	paperloader: {
		width: "100%",
		height: "500px",
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	loading: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
}));

export default () => {
	const classes = useStyles();
	const { loading } = useContext(UsuariosContext);

	return (
		<div className={classes.root}>
			<Paper className={loading ? classes.paperloader : classes.paper}>
				{loading ? (
					<div className={classes.loading}>
						<CircularProgress />
					</div>
				) : (
					<React.Fragment>
						<DialogProvider>
							<SearchProvider>
								<OrderTableProvider>
									<UsersTable />
								</OrderTableProvider>
							</SearchProvider>
							<DialogType />
						</DialogProvider>
					</React.Fragment>
				)}
			</Paper>
		</div>
	);
};
