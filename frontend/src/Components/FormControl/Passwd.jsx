import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%'
  },
  error: {
    color: 'red',
  }
}));

export default ({ helperText, ...rest }) => {
  const classes = useStyles();
  const [showPasswd, setShowPasswd] = useState(false);

  const handleClickShowPassword = () => {
    setShowPasswd(!showPasswd);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl className={classes.input} variant="outlined">
      <InputLabel htmlFor="passwd">Senha</InputLabel>
      <OutlinedInput
        id="passwd"
        type={showPasswd ? 'text' : 'password'}
        name="passwd"
        {...rest}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPasswd ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
      <FormHelperText className={classes.error}>{helperText}</FormHelperText>
    </FormControl>
  );
}
