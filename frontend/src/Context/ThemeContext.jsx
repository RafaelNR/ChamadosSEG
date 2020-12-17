import React, { createContext, useState, useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";


const ThemeContext = createContext({})

const MythemeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      background: {
        default: darkMode ? '#303030' : '#f0f0f0',
      },
      type: darkMode ? 'dark' : 'light',
      text: {
        title: darkMode ? 'white ' : '#3f51b5',
        info: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        atividade: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
      }
    },
  })
  

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          darkMode,
          setdarkMode
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

MythemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext, MythemeProvider };