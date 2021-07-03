import React, { useEffect } from 'react';
import { Dialog as MyDialog, DialogContent, makeStyles } from '@material-ui/core/';
import DialogTitle from '../../Components/Dialog/HeadDialog';
import DialogActions from '../../Components/Dialog/Action';
import { CancelButton } from '../../Components/Buttons/Index';
import { ResendEmail } from '../../Components/Buttons/LogsEmails';

//* CONTEXT
import useDialog from '../../Context/DialogContext';
import useLogs from '../../Context/Log.Context';

//* UTILS
import { converterFileInData } from '../../Utils/dates';


const useStyles = makeStyles((theme) => ({
  box: {
    '& h4': {
      margin: 0
    },
    '& span': {
      margin: 5
    }
  }
}));

const Dialog = () => {
  const classes = useStyles();
  const { open, closeDialog } = useDialog();
  const { logs, currLog, setCurrLog } = useLogs();

  useEffect(() => {
    if (currLog && currLog.id) {
      const Dado = logs.filter((log) => log.id === currLog.id && log);
      setCurrLog(Dado[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLog]);

  return open && currLog.id ? (
    <MyDialog onClose={closeDialog} open={open} maxWidth="md" scroll="body">
      <DialogTitle title="Confirmação de reenvio." />
      <DialogContent dividers>
        <div className={classes.box}>
          <h4>Assunto:</h4>
          <span>{currLog.filename}</span>
        </div>
        <div className={classes.box}>
          <h4>Relatório:</h4>
          <span>{currLog.type}</span>
        </div>
        <div className={classes.box}>
          <h4>Destinatário:</h4>
          <span>{currLog.to}</span>
        </div>
        <div className={classes.box}>
          <h4>Mês/Ano:</h4>
          <span>{converterFileInData(currLog.file)}</span>
        </div>
      </DialogContent>
      <DialogActions>
        <ResendEmail id={currLog.id}/>
        <CancelButton clickClose={closeDialog} />
      </DialogActions>
    </MyDialog>
  ) : null;
};

export default React.memo(Dialog);
