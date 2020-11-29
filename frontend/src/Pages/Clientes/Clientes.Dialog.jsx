import React from "react";

//* COMPONENTES
import { Dialog as MyDialog } from "@material-ui/core/";
import DialogTitle from "../../Components/Dialog/HeadDialog";
import FactorForm  from "./Clientes.Form";

import useDialog from "../../Context/DialogContext";

const Dialog = () => {
  const { type, open, closeDialog } = useDialog();

  const getTitle = React.useCallback(() => {

    switch (type) {
      case 'insert':
        return 'Inserir Cliente';
      
      case "update":
        return 'Editar Cliente';

      case "disabled":
        return "Desabilitar Cliente";

      case "actived":
        return "Habilitar Cliente";
    
      default:
        break;
    }

  },[type]);

  return open && type ? (
    <MyDialog onClose={closeDialog} open={open} maxWidth="md" scroll="body">
      <React.Fragment>
        <DialogTitle title={getTitle()} />
        <FactorForm />
      </React.Fragment>
    </MyDialog>
  ) : null;
};

export default React.memo(Dialog);
