import React from "react";
import {
  IconButton,
  Typography,
  DialogTitle as MuiDialogTitle,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useDialog from "../../Context/DialogContext";

const styles = (theme) => ({
  root: {
    margin: 0,
    width: "calc(100% - 25%)",
    height: "calc(100% - 20%)",
    padding: theme.spacing(2),
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "5px",
    color: "white",
  },
  headerdialog: {
    height: "55px",
    backgroundColor: theme.palette.background.dialog,
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
  },
  titledialog: {
    color: "white",
    fontSize: "18px",
  },
});

export default withStyles(styles)((props) => {
  const { children, classes } = props;
  const { closeDialog } = useDialog();
  return (
    <MuiDialogTitle
      disableTypography
      className={(classes.root, classes.headerdialog)}
      title=""
    >
      <Typography className={classes.titledialog} variant="h6">
        {children ? children : props.title}
      </Typography>
      {closeDialog ? (
        <Tooltip title="Fechar">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeDialog}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </MuiDialogTitle>
  );
});
