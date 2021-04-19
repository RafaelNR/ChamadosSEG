import React, { createContext, useState, useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { green, red, blue } from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core'

const ThemeContext = createContext({})

const MythemeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(false);

  const theme = createMuiTheme({
    darkMode: darkMode,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': {
            flex: 1,
            display: 'block',
            height: '100vh'
          },
          a: {
            textDecoration: 'none'
          }
        }
      }
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        light: '#1161A6',
        main: '#0B4672',
        dark: '#020B13'
      },
      secondary: {
        light: 'f47e2a',
        main: '#f58634',
        dark: '#020B13'
      },
      background: {
        default: darkMode ? '#303030' : '#f0f0f0',
        boxhome: darkMode ? '#666' : '#ddd',
        dialog: '#0B4672'
      },
      text: {
        title: darkMode ? 'white' : '#0B4672',
        info: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        atividade: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        subtitle: darkMode ? 'white' : '#0B4672',
        common: darkMode ? '#898989' : 'black',
        icon: 'white'
      },
      button: {
        downloadpdf: '#0B4672',
        viewpdf: '#3949ab',
        new: darkMode ? 'rgba(223, 223, 223, 0.15)' : '#0d47a1',
        edit: darkMode ? '#757575' : green[800],
        create: darkMode ? blue[700] : blue[800],
        delete: darkMode ? red[700] : red[800],
        active: darkMode ? blue[700] : blue[800],
        pdf: darkMode ? 'rgba(255, 255, 255, 0.08)' : blue[800],
        view: darkMode ? '#757575' : blue[600],
        accordion: darkMode ? 'white ' : '#0B4672',
        success: darkMode ? green[700] : green[800],
        hover: {
          new: darkMode ? 'rgba(223, 223, 223, 0.30)' : '#093170',
          edit: darkMode ? '#424242' : green[900],
          pdf: darkMode ? '#424242' : blue[900],
          view: darkMode ? '#424242' : blue[700],
          delete: red[900],
          active: blue[900],
          success: green[900]
        }
      },
      border: {
        infos: darkMode ? '#898989' : 'white'
      }
    },
    size: {
      button: {
        common: 18
      }
    }
  });
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
