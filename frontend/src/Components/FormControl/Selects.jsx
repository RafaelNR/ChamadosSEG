import React from 'react';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';


const useStyles = makeStyles({
  formControl: {
    //marginTop: 15,
    width: '100%',
    '& > label': {
      fontSize: '1rem'
    },
    '& .MuiInputBase-root': {
      padding: '1px'
    }
  },
  selectitem: {
    width: '80%'
  },
  select: {
    width: 200,
    marginRight: '2%',
    '& .MuiFilledInput-input': {
      padding: '15px 10px'
    }
  }
});

export default ({
  title,
  handleChange,
  id,
  name,
  value,
  itens,
  errorText,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled'}
      className={classes.formControl}
      error={errorText ? true : false}
    >
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        value={value || ''}
        {...rest}
      >
        {itens.length >= 1 &&
          itens.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectItem = ({
  title,
  handleChange,
  id,
  name,
  value,
  itens,
  errorText,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled'}
      className={classes.selectitem}
      error={errorText ? true : false}
    >
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ''}
        {...rest}
      >
        {itens.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectMeses = ({
  title,
  handleChange,
  id,
  name,
  value,
  itens,
  errorText,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant={variant ? variant : 'filled'}
      className={classes.selectitem}
      error={errorText ? true : false}
    >
      <InputLabel id={id}>{title}</InputLabel>
      <Select
        label={title}
        onChange={handleChange}
        id={id}
        name={name}
        fullWidth
        className="MuiFilledInput-input"
        value={value || ''}
        {...rest}
      >
        {itens.map((item, index) => {
          return (
            <MenuItem key={item} value={index + 1}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorText ? errorText : ''}</FormHelperText>
    </FormControl>
  );
};

export const SelectCommon = ({
  handleChange,
  title,
  name,
  value,
  itens,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Select
      label={title}
      onChange={handleChange}
      displayEmpty
      value={value}
      variant="filled"
      defaultValue="todos"
      className={classes.select}
      {...rest}
    >
      <MenuItem value="todos">Todos</MenuItem>
      {itens.length > 1 &&
        itens.map((item) => {
          return (
            <MenuItem
              style={{ paddingLeft: 10 }}
              key={item['id']}
              value={item['id']}
            >
              {item['nome_fantasia']}
            </MenuItem>
          );
        })}
    </Select>
  );
};
