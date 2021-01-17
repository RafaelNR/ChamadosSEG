import React, { createContext, useState, useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { green, red, blue } from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core'

const ThemeContext = createContext({})

const MythemeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(false);

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
          },
        }
      }
    },
    darkMode: darkMode,
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
        dialog: '#0B4672'
      },
      text: {
        title: darkMode ? 'white ' : '#0B4672',
        info: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        atividade: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        subtitle: darkMode ? '#f58634' : '#0B4672',
        common: darkMode ? '#898989' : 'black',
        icon: 'white'
      },
      button: {
        downloadpdf: '#0B4672',
        viewpdf: '#3949ab',
        hover: '#7986cb',
        edit: darkMode ? green[700] : green[900],
        create: darkMode ? blue[700] : blue[900],
        delete: darkMode ? red[700] : red[900],
        active: darkMode ? blue[700] : blue[900],
        pdf: darkMode ? 'white ' : '#0B4672',
        accordion: darkMode ? 'white ' : '#0B4672',
        success: darkMode ? green[700] : green[900]
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
