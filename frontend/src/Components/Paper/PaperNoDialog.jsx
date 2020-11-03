import React from "react";
import { Paper } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { SearchProvider } from "../../Context/SearchContext";
import { OrderTableProvider } from "../../Context/OrderTableContext";
import { PageTableProvider } from "../../Context/PageTableContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: "-6rem",
	},
}));


export default React.memo(({ Render }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
        <SearchProvider>
          <OrderTableProvider>
            <PageTableProvider>
              {Render ? <Render /> : ''}
            </PageTableProvider>
          </OrderTableProvider>
        </SearchProvider>
			</Paper>
		</div>
	);
});
