import React from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Typography } from '@material-ui/core/';
import ImageIcon from '@material-ui/icons/Image';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Preview from './Preview';

import useUpload from '../../Context/UploadContext';
import useSnackBar from '../../Context/SnackBarContext';

import { NewFileName } from '../../Utils/functions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
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

export const UploadImage = ({ type, id }) => {
  const classes = useStyles();
  const { handleFile } = useUpload();

  const onDrop = React.useCallback(
    (uploadFile) => {
      handleFile(type, { File: uploadFile[0], id: id });
    },
    [handleFile, id, type]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 3000000,
    maxFiles: 1,
    onDrop
  });

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
};

export const Upload = ({ id, accept }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const { file, setFile, setProcess } = useUpload();

  const onDrop = React.useCallback(
    (uploadFile) => {
      const File = (uploadFile && uploadFile[0]) || null;
      if (File) {
        const reader = new FileReader();

        reader.onabort = () => console.log('Abort');
        reader.onerror = () => console.log('error');
        reader.onloadstart = () => setProcess('Start');
        reader.onprogress = () => setProcess('Process');

        reader.onload = () => {
          setProcess('Finalizado');

          const newFile = {
            id: id ? id : null,
            file: File,
            name: File.name,
            newName: NewFileName(File.name, File.type, `C-${id}@`),
            size: File.size,
            preview: URL.createObjectURL(File),
            process: 0,
            uploaded: false,
            error: false,
            url: ''
          };
          setFile(newFile);
        };

        reader.readAsArrayBuffer(File);
      } else {
        handleSnackBar({
          type: 'error',
          message: `Erro em fazer o upload. Verifique o tamanho ou tipos aceitos.`
        });
      }
    },
<<<<<<< HEAD
    // eslint-disable-next-line
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96
    [id]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    multiple: false,
    maxSize: 1000000,
    maxFiles: 1,
    onDrop
  });

  return (
    <>
      {file && file.preview ? (
        <Preview file={file} />
      ) : (
        <div className={classes.root} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={classes.text}>
            <Typography component="i">
              <CloudUploadIcon />
            </Typography>
            <Typography component="span">Arraste ou click.</Typography>
            <Typography component="span">
              Tipos aceitos: {accept} / Tamanho máximo: 1MB.
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
