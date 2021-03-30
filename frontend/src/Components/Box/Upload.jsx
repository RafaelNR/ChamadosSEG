import React from 'react'
import {
  makeStyles,
  Typography,
  CircularProgress
} from '@material-ui/core/';
import ImageIcon from '@material-ui/icons/Image';
import { useDropzone } from 'react-dropzone'

import useUpload  from '../../Context/UploadContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    border: '2px dotted #aaa',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& span': {
      color: '#aaa'
    },
    '& i': {
      color: '#aaa',
      '& > svg': {
        fontSize: 50
      }
    }
  }
}));

export default ({ id }) => {
  const classes = useStyles();
  const { handleFile } = useUpload();

  const onDrop = React.useCallback(
    (uploadFile) => {
      handleFile(uploadFile[0],id)
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone(
    { accept: 'image/*', multiple: false, maxSize: 3000000, maxFiles:1, onDrop },
  );
  
  return (
    <>
      <div className={classes.root} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={classes.text}>
          <Typography component="i">
            <ImageIcon />
          </Typography>
          <Typography component="span">
            Arraste a imagem aqui ou click.
          </Typography>
          <Typography component="span">Tamanho máximo é de 3MB.</Typography>
        </div>
      </div>
    </>
  );

}
