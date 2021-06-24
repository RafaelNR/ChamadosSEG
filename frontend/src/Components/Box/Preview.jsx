import React from 'react';
import { makeStyles, Box, Typography, Grid, Button } from '@material-ui/core/';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& p':{
    color: '#ddd',
    fontWeight: 600,
    fontSize: '0.9rem',
      '& span': {
      color: 'white',
      fontWeight: 400,
      }
    },
  },
  icon: {
    width: 120,
    height: 120
  },
  button: {
    margin: '10px 0',
    color: 'white',   
    background: theme.palette.primary.light,
  }
}));

export default ({ file }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item>
          <DescriptionIcon className={classes.icon} />
        </Grid>
        <Grid xs={10} item>
          <Typography component="p">
            Nome Original: <span>{file.name}</span>
          </Typography>
          <Typography component="p">
            Novo Nome: <span>{file.newName}</span>
          </Typography>
          <Typography component="p">
            Tamanho: <span>{parseInt(file.size / 1024)}Kb</span>
          </Typography>
          <Button className={classes.button} onClick={() => {
            window.open(file.preview); 
          }}>Preview</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
