import React from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    width: "100%",
    "& > label": {
      fontSize: "1rem",
    },
    "& .MuiInputBase-root": {
      padding: "1px",
    },
  },
  selectitem: {
    width: "80%",
  }
});

export default ({ title, handleChange, id, name, value, itens, errorText, variant, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled' } 
      className={classes.formControl}
      error={errorText ? true : false}
    >
      <InputLabel id="cliente">{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ""}
        {...rest}
      >
        {itens.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.nome}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ""}</FormHelperText>
    </FormControl>
  );
};

export const SelectItem = ({ title, handleChange, id, name, value, itens, errorText, variant, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled' } 
      className={classes.selectitem}
      error={errorText ? true : false}
    >
      <InputLabel id="cliente">{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ""}
        {...rest}
      >
        {itens.map((item) => {
          return (
            <MenuItem key={item} value={item} >
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ""}</FormHelperText>
    </FormControl>
  );
};

export const SelectMeses = ({ title, handleChange, id, name, value, itens, errorText, variant, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled' } 
      className={classes.selectitem}
      error={errorText ? true : false}
    >
      <InputLabel id="cliente">{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ""}
        {...rest}
      >
        {itens.map((item,index) => {
          return (
            <MenuItem key={item} value={index+1} >
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ""}</FormHelperText>
    </FormControl>
  );
};

