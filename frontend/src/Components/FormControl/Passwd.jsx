import React, { useState } from 'react';
import {
  makeStyles,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText
} from '@material-ui/core';
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

export default ({ helperText, label, ...rest }) => {
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
      <InputLabel htmlFor="passwd">{label}</InputLabel>
      <OutlinedInput
        id="passwd"
        label={label}
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
