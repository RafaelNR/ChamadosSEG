import React, { useContext } from "react";
import { Paper, CircularProgress } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import useLoading from "../../Context/LoadingContext";
import { DialogProvider } from "../../Context/DialogContext";
import { SearchProvider } from "../../Context/SearchContext";
import { OrderTableProvider } from "../../Context/OrderTableContext";
import { PageTableProvider } from "../../Context/PageTableContext";

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

export default ({ Render, RenderDialog }) => {
	const classes = useStyles();
	const { loading } = useLoading();

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
									<PageTableProvider>
										<Render />
									</PageTableProvider>
								</OrderTableProvider>
							</SearchProvider>
								{RenderDialog ? <RenderDialog /> : '' }
						</DialogProvider>
					</React.Fragment>
				)}
			</Paper>
		</div>
	);
};
