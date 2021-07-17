import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Tooltip,
  Button,
  CircularProgress} from '@material-ui/core/';
import { SendOutlined, PictureAsPdfSharp } from "@material-ui/icons/";
 
//* CONTEXT
import useSnackBar from '../../Context/SnackBarContext';
import useDialog from "../../Context/DialogContext";
import useLogs from '../../Context/Log.Context';

//* SERVICE
import Service from '../../Service/log.service'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    '& .MuiButton-startIcon': {
      marginRight: 0
    },
    '& .MuiButton-label': {
      margin: 'auto 0',
      display: 'contents'
    }
  },
  send: {
    padding: '5px 0',
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: `0.09rem solid rgba(255, 255, 255, 0.08)`,
    minWidth: 36,
    height: 36,
    backgroundColor: theme.palette.button.view,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.view
    }
  },
  pdf: {
    padding: '5px 0',
    marginRight: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minWidth: 36,
    height: 36,
    backgroundColor: theme.palette.button.pdf,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.pdf
    }
  },
  confirm: {
    backgroundColor: theme.palette.primary.light,
    padding: '8px 15px',
    marginRight: '8px',
    '&:hover': {
      transition: '',
      color: 'white',
      backgroundColor: theme.palette.primary.dark
    }
  },
  icon: {
    fontSize: 15,
    marginRight: 8
  },
  loading: {
    fontSize: 15,
    marginRight: 8,
    width: '20px !important',
    height: '20px !important'
  }
}));


export const OpenPDF = React.memo(({ file }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  
  const handleClick = React.useCallback(async () => {
    try {
      const myRequest = new Request(
        `${process.env.REACT_APP_API_ENDPOINT_SERVICE}/tmp/uploads/${file}`
      );
      const response = await fetch(myRequest);

      if (response.ok) {
        return window.open(
          `${process.env.REACT_APP_API_ENDPOINT_SERVICE}/tmp/uploads/${file}`,
          '_blank'
        );
      }

      throw new Error('Arquivo PDF removido ou indisponível.');
    } catch (error) {
      handleSnackBar({
        type: 'error',
        message: error.message
      });
    }
<<<<<<< HEAD

    // eslint-disable-next-line
  }, []);
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96

  return (
    <Tooltip title="Abrir PDF">
      <Button
        onClick={handleClick}
        className={clsx(classes.root, classes.pdf)}
        startIcon={ <PictureAsPdfSharp style={{ fontSize: 15 }} /> }
      />
    </Tooltip>
  );
});


export const ConfirmResendEmail = React.memo(({ id }) => {
  const classes = useStyles();
  const { setCurrLog } = useLogs();
  const { openDialog } = useDialog();

  return (
    <Tooltip title="Reenviar Email">
      <Button
        onClick={() => {
          openDialog();
          setCurrLog({ id: id });
        }}
        className={clsx(classes.root, classes.send)}
        startIcon={<SendOutlined style={{ fontSize: 15 }} />}
      />
    </Tooltip>
  );
});


export const ResendEmail = React.memo(({ id }) => {
  const classes = useStyles();
  const { setOpen } = useDialog();
  const { handleSnackBar } = useSnackBar();
  const { loadSendMail, setLoadSendMail } = useLogs();

  const handleResend = async () => {

    try {
      setLoadSendMail(true)
      await Service.resendEmail(id)
      handleSnackBar({
        type: 'success',
        message: 'Email Enviado para o destinatário.'
      });
    } catch (error) {
      console.log(error)
      handleSnackBar({
        type: 'error',
        message: error.message || 'Erro em enviar email.'
      });
    } finally {
      setLoadSendMail(false)
      setOpen(false);
    }
    
  }

  return (
    <Button
      onClick={!loadSendMail && handleResend}
      className={clsx(classes.root, classes.confirm)}
      disabled={loadSendMail}
      startIcon={
        loadSendMail ? (
          <CircularProgress className={classes.loading} />
        ) : (
          <SendOutlined className={classes.icon} />
        )
      }
    >
      Reenviar
    </Button>
  );

});