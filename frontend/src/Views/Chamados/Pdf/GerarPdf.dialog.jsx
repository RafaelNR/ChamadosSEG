import React from 'react';
import { Dialog } from '@material-ui/core/';
import DialogTitle from '../../../Components/Dialog/HeadDialog';
import useDialog from '../../../Context/DialogContext';
import FormControl from './GerarPdf.form'


export default React.memo(() => {
  const { type, open, closeDialog } = useDialog();

  const Factor = React.useCallback(() => {
    if (type) {
      switch (type) {
        case 'total':
          return (
            <React.Fragment>
              <DialogTitle title="Gerar PDF - Liberação Total de Disposítivo" />
              <FormControl />
            </React.Fragment>
          );
        case 'siteapp':
          return (
            <React.Fragment>
              <DialogTitle title="Gerar PDF - Liberação de Site ou Aplicativo" />
              <FormControl />
            </React.Fragment>
          );

        default:
          break;
      }
    }
  }, [type]);

  return open && type ? (
    <Dialog open={open} maxWidth="md" scroll="body">
      {Factor()}
    </Dialog>
  ) : null;
});
