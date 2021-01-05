import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Switch } from '@material-ui/core/';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

//* CONTEXT
import useTheme from '../../Context/ThemeContext'

//* HOOK
import useLocalStore from '../../Hooks/useLocalStore'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  switch: {
    width: 70,
    height: 40
  },
  fundo: {
    width: 22,
    height: 22,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  light: {
    color: '#404040',
    fontSize: 17
  },
  dark: {
    color: '#404040',
    fontSize: 17,
    transform: 'rotate(45deg)'
  },
}));


const Icone = ({ darkMode }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.fundo, classes.root)}
      style={darkMode ? { marginLeft: 10 } : { marginLeft: 0 }}
    >
      {!darkMode ? (
        <WbSunnyIcon className={classes.light} />
      ) : (
        <Brightness3Icon className={classes.dark} />
      )}
    </div>
  );
}


export default () => {
  const classes = useStyles();
  const { getData, setData, removeData } = useLocalStore();
  const { darkMode, setdarkMode } = useTheme();

  useEffect(() => {
    const mode = getData('darkMode');

    if (typeof mode === undefined || mode === null) {
      setData('darkMode', darkMode)
    } else {
      setdarkMode(mode)
    }
    
  }, [darkMode, getData, setData, setdarkMode])

  function changeDarkMode(event) {
    setdarkMode(!darkMode)
    removeData('darkMode')
    setData('darkMode', !darkMode);
  }

  return (
    <div className={classes.root}>
      <Switch
        className={classes.switch}
        checked={darkMode}
        onChange={changeDarkMode}
        color="default"
        inputProps={{ 'aria-label': 'altera para dark tema' }}
        icon={<Icone darkMode={darkMode} />}
        checkedIcon={<Icone darkMode={darkMode} />}
      />
    </div>
  );
}
