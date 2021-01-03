import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Fade, Backdrop } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: 0,
    backgroundColor: theme.palette.background.paper,
    width: "calc(100% - 25%)",
    height: "calc(100% - 20%)",
    boxShadow: theme.shadows[5],
  },
  headermodal: {
    height: "55px",
    backgroundColor: theme.palette.background.dialog,
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    border: "1px solid #dee2e6",
  },
  headertitle: {
    color: "white",
    fontSize: "18px",
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  });

  const handleClose = React.useCallback(() => {
    setOpen(false);
  });

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        className={classes.modal}
        open={open}
        disablePortal
        disableEnforceFocus
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.headermodal}>
              <span id="transition-modal-title" class={classes.headertitle}>
                Criar novo Usuário
              </span>
            </div>
            <div className="body-modal"></div>
            <div className="footer-modal"></div>

            <p id="transition-modal-description"></p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
