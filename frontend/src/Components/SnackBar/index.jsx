import React from "react";
import { makeStyles, Snackbar } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

import useSnackBar from "../../Context/SnackBarContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default React.memo(() => {
  const classes = useStyles();
  const SnackBar = useSnackBar();

  return (
    <>
      {SnackBar.severity && SnackBar.message && (
        <div className={classes.root}>
          <Snackbar
            open={SnackBar.openSnackBar}
            autoHideDuration={SnackBar.severity === 'error' ? 60000 * 5 : 6000}
            onClose={SnackBar.clickSnackBar}
          >
            <Alert
              onClose={SnackBar.clickSnackBar}
              severity={SnackBar.severity ? SnackBar.severity : 'success'}
            >
              {SnackBar.message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
});
