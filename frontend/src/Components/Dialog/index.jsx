import React from "react";
import { Dialog as MyDialog } from "@material-ui/core/";
import DialogTitle from "./HeadDialog";
import useDialog from "../../Context/DialogContext";

const Dialog = (props) => {
  const { type, open, closeDialog } = useDialog();

  const FormInsert = props.options.Insert ? props.options.Insert : "";
  const FormUpdate = props.options.Insert ? props.options.Update : "";
  const FormDelete = props.options.Insert ? props.options.Delete : "";
  const FormActivedDisabled = props.options.Insert
    ? props.options.ActivedDisabled
    : "";

  /**
   * Renderiza o Dialog, baseado no tipo;
   */
  const dialogFactory = React.useCallback(() => {
    switch (type) {
      case "insert":
        return (
          <React.Fragment>
            <DialogTitle title={`Inserir ${props.options.title}`} />
            <FormInsert />
          </React.Fragment>
        );
      case "update":
        return (
          <React.Fragment>
            <DialogTitle title={`Editar ${props.options.title}`} />
            <FormUpdate />
          </React.Fragment>
        );
      case "delete":
        return (
          <React.Fragment>
            <DialogTitle title={`Deletar ${props.options.title}`} />
            <FormDelete />
          </React.Fragment>
        );
      case "disabled":
      case "actived":
        return (
          <React.Fragment>
            <DialogTitle
              title={
                type === "disabled"
                  ? `Desabilitar ${props.options.title}`
                  : `Habilitar ${props.options.title}`
              }
            />
            <FormActivedDisabled />
          </React.Fragment>
        );

      default:
        break;
    }
  }, [type, props.options.title]);

  return open && type ? (
    <MyDialog onClose={closeDialog} open={open} maxWidth="md" scroll="body">
      {dialogFactory()}
    </MyDialog>
  ) : null;
};

export default React.memo(Dialog);
