import React, { createContext, useState, useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { green, red, blue } from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core'
import Roboto from '../fonts/Roboto-Medium.ttf'

const roboto = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Roboto'),
    local('Roboto-Medium'),
    url(${Roboto}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const ThemeContext = createContext({})

const MythemeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(false);
  const [primary, setPrimary ] = useState('#0B4672');

  const theme = createMuiTheme({
    darkMode: darkMode,
    primary: primary,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
          },
          '@font-face': [roboto],
          a: {
            textDecoration: 'none'
          },
          '.MuiSelect-select.Mui-disabled': {
            color: darkMode ? '#f9f9f9' : '#404040'
          },
          '.MuiFormLabel-root': {
            color: darkMode ? '#f9f9f9' : '#404040'
          },
          '.MuiFormLabel-root.Mui-focused': {
            color: darkMode ? '#f9f9f9 !important' : primary
          }
        }
      }
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        light: '#1161A6',
        main: primary,
        dark: '#020B13'
      },
      secondary: {
        light: 'f47e2a',
        main: '#f58634',
        dark: '#020B13'
      },
      background: {
        default: darkMode ? '#303030' : '#ddd',
        acm: darkMode ? '#606060' : primary,
        acmMy: '#056162',
        acmOther: '#262d31',
        acmEdit: primary,
        acmNew: primary,
        dialog: primary
      },
      text: {
        title: darkMode ? 'white' : primary,
        info: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        atividade: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#676767',
        subtitle: darkMode ? 'white' : primary,
        common: darkMode ? '#ddd' : '#404040',
        icon: 'white'
      },
      button: {
        common: darkMode ? '#000' : '#ffffff',
        downloadpdf: primary,
        viewpdf: '#3949ab',
        new: darkMode ? 'rgba(223, 223, 223, 0.15)' : '#0d47a1',
        edit: darkMode ? '#757575' : green[800],
        create: darkMode ? blue[700] : blue[800],
        delete: darkMode ? red[700] : red[800],
        active: darkMode ? blue[700] : blue[800],
        pdf: darkMode ? 'rgba(255, 255, 255, 0.08)' : blue[800],
        view: darkMode ? '#757575' : blue[600],
        accordion: darkMode ? 'white ' : primary,
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
        infos: darkMode ? '#898989' : 'white',
        common: darkMode ? '#303030' : '#ddd'
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
          setdarkMode,
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
