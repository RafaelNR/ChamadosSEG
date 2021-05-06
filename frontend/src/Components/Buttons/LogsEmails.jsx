import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  Tooltip,
  Button,
  CircularProgress} from '@material-ui/core/';
import { Edit, VisibilitySharp, Add, SendOutlined, PictureAsPdfSharp } from "@material-ui/icons/";
import Progress from "./Progress";

//* CONTEXT
import useSnackBar from '../../Context/SnackBarContext';
import useLogs from '../../Context/Log.Context';


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
  new: {
    padding: '7.5px 0',
    backgroundColor: theme.palette.button.new,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.new
    }
  },
  edit: {
    padding: '5px 0',
    minWidth: 36,
    height: 36,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: theme.palette.button.edit,
    '&:hover': {
      transition: '',
      backgroundColor: theme.palette.button.hover.edit
    }
  },
  view: {
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
  loading: {
    fontSize: 12,
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


  },[])

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


export const ResendEmail = React.memo(({ id }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const { logs } = useLogs();

  const handleResend = () => {
    handleSnackBar({
      type: 'error',
      message: 'Função de reenvio de email em desenvolvimento.'
    });
  }


  return (
    <Tooltip title="Reenviar Email">
      <Button
        onClick={handleResend}
        className={clsx(classes.root, classes.view)}
        startIcon={<SendOutlined style={{ fontSize: 15 }} />}
      />
    </Tooltip>
  );

});