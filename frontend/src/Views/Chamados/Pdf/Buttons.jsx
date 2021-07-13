import React, {useCallback, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { green, orange } from '@material-ui/core/colors';	


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  success: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
    color: 'white',
    '&:hover': {
      backgroundColor: green[900]
    }
  },
  view: {
    color: 'white',
    '&:hover': {
      backgroundColor: orange[900]
    }
  }
}));

export const ButtonGerar = React.memo(() => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<PictureAsPdfIcon />}
    >
      Gerar
    </Button>
  );
});


export const ButtonLink = ({link}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.success}
        startIcon={<CloudDownloadIcon />}
        onClick={() => window.open(link, '_blank')}
      >
        Download
      </Button>
    </>
  );
}