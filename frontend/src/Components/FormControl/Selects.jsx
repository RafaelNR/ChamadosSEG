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
});

export default ({ title, handleChange, id, name, value, itens, errorText, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControl
      variant="filled"
      className={classes.formControl}
      error={errorText ? true : false}
    >
      <InputLabel id="role_id">{title}</InputLabel>
      <Select
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
