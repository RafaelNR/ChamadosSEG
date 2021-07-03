import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Typography, Grid, Button } from '@material-ui/core/';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& p': {
      color: '#ddd',
      fontWeight: 600,
      fontSize: '0.9rem',
      '& span': {
        color: 'white',
        fontWeight: 400
      }
    }
  },
  icon: {
    width: 120,
    height: 120
  },
  button: {
    margin: '10px 0',
    color: 'white',
    background: theme.palette.primary.light
  }
}));

export const Acompanhamento = ({ acm }) => {
  const classes = useStyles();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (acm) {
      setFile(JSON.parse(acm.descricao));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {file && (
        <Box className={classes.root}>
          <Grid container>
            <Grid item>
              <DescriptionIcon className={classes.icon} />
            </Grid>
            <Grid xs={10} item>
              <Typography component="p">
                Nome: <span>{file.filename}</span>
              </Typography>
              <Typography component="p">
                Tamanho: <span>{parseInt(file.size / 1024)}Kb</span>
              </Typography>
              <Button
                className={classes.button}
                onClick={() => {
                  window.open(
                    process.env.REACT_APP_ENDPOINT_FILES_CHAMADOS +
                      file.filename
                  );
                }}
              >
                Visualizar
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
