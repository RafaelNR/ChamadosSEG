import React from "react";

//* COMPONENTES
import { Dialog as MyDialog } from "@material-ui/core/";
import DialogTitle from "../../Components/Dialog/HeadDialog";
import { FormInsert, FormUpdate, FormActivedDisabled } from "./Clientes.Form";

import useDialog from "../../Context/DialogContext";

const Dialog = () => {
  const { type, open, closeDialog } = useDialog();

  /**
   * Renderiza o dialog baseado na action clicada.
   */
  const dialogFactory = React.useCallback(() => {
    switch (type) {
      case "insert":
        return (
          <React.Fragment>
            <DialogTitle title="Inserir Cliente" />
            <FormInsert />
          </React.Fragment>
        );
      case "update":
        return (
          <React.Fragment>
            <DialogTitle title="Editar Cliente" />
            <FormUpdate />
          </React.Fragment>
        );
      case "disabled":
      case "actived":
        return (
          <React.Fragment>
            <DialogTitle
              title={
                type === "disabled"
                  ? "Desabilitar Cliente"
                  : "Habilitar Cliente"
              }
            />
            <FormActivedDisabled />
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
