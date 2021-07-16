import React from 'react';
import { Switch, FormControlLabel, makeStyles, Grid } from '@material-ui/core/';

//* CONTEXT
import useLogin from '../../Context/LoginContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 50
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-start',
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: theme.spacing.unit
    }
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing.unit * 2
  }
}));

export default () => {
  const classes = useStyles();
  const { login, handleChangeLogin } = useLogin();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6} className={classes.left}>
        <FormControlLabel
          control={
            <Switch
              name="lembrar"
              color="primary"
              size="small"
              checked={login.lembrar}
              onChange={handleChangeLogin}
            />
          }
          label="Lembrar"
          labelPlacement="start"
        />
      </Grid>
      <Grid item xs={6} className={classes.right}>
        <FormControlLabel
          control={
            <Switch
              name="permanecer"
              color="primary"
              size="small"
              checked={login.permanecer}
              onChange={handleChangeLogin}
            />
          }
          label="Permanecer"
          labelPlacement="start"
        />
      </Grid>
    </Grid>
  );
};
