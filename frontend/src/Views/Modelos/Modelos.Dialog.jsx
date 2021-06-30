import React from 'react';
import { Dialog } from '@material-ui/core/';
import DialogTitle from '../../Components/Dialog/HeadDialog';
import FormFactor from './Modelo.Form';
import useDialog from '../../Context/DialogContext';

export default React.memo(() => {
  const { type, open, closeDialog } = useDialog();

  const Factor = React.useCallback(() => {
    if (type) {
      switch (type) {
        case 'insert':
          return (
            <React.Fragment>
              <DialogTitle title="Inserir Modelo" />
              <FormFactor />
            </React.Fragment>
          );
        case 'update':
          return (
            <React.Fragment>
              <DialogTitle title="Editar Modelo" />
              <FormFactor />
            </React.Fragment>
          );

        case 'delete':
          return (
            <React.Fragment>
              <DialogTitle title="Deletar Modelo" />
              <FormFactor />
            </React.Fragment>
          );
        default:
          break;
      }
    }
  }, [type]);

  return open && type ? (
    <Dialog onClose={closeDialog} open={open} maxWidth="md" scroll="body">
      {Factor()}
    </Dialog>
  ) : null;
});

