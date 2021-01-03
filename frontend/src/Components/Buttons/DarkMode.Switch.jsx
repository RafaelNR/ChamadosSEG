import React, { useEffect } from 'react';
import Switch from '@material-ui/core/Switch';

//* CONTEXT
import useTheme from '../../Context/ThemeContext'

//* HOOK
import useLocalStore from '../../Hooks/useLocalStore'


export default () => {
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
    <div>
      <Switch
        checked={darkMode}
        onChange={changeDarkMode}
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
    </div>
  );
}
