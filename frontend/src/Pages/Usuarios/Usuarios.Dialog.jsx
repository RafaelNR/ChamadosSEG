import React from "react";
import { Dialog as MyDialog } from "@material-ui/core/";
import DialogTitle from "../../Components/Dialog/HeadDialog";
import FactorForm from "./Usuarios.Form";
import useDialog from "../../Context/DialogContext";

const Dialog = () => {
  const { type, open, closeDialog } = useDialog();

  const dialogFactory = React.useCallback(() => {
    switch (type) {
      case "insert":
        return (
          <React.Fragment>
            <DialogTitle title="Inserir Usuário" />
            <FactorForm currForm="insert" />
          </React.Fragment>
        );
      case "update":
        return (
          <React.Fragment>
            <DialogTitle title="Editar Usuário" />
            <FactorForm currForm="update" />
          </React.Fragment>
        );
      case "disabled":
      case "actived":
        return (
          <React.Fragment>
            <DialogTitle
              title={
                type === "disabled"
                  ? "Desabilitar Usuário"
                  : "Habilitar Usuário"
              }
            />
            <FactorForm currForm="activeddisabled" />
          </React.Fragment>
        );

      default:
        break;
    }
  }, [type]);

  return open && type ? (
    <MyDialog onClose={closeDialog} open={open} maxWidth="md" scroll="body">
      {dialogFactory()}
    </MyDialog>
  ) : null;
};

export default React.memo(Dialog);
