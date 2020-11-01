import React from "react";
import { Paper } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { DialogProvider } from "../../Context/DialogContext";
import { SearchProvider } from "../../Context/SearchContext";
import { OrderTableProvider } from "../../Context/OrderTableContext";
import { PageTableProvider } from "../../Context/PageTableContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

export default React.memo((props) => {
	const classes = useStyles();
	const Render = props.Render;
	const Dialog = props.RenderDialog
	return (
		<div className={classes.root}>
			<Paper>
				<React.Fragment>
					<DialogProvider>
						<SearchProvider>
							<OrderTableProvider>
								<PageTableProvider>
									<Render />
								</PageTableProvider>
							</OrderTableProvider>
						</SearchProvider>
						{Dialog ? <Dialog  options={props.options} /> : ''}
					</DialogProvider>
				</React.Fragment>
			</Paper>
		</div>
	);
});
