import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MyMenu from "./Menu";
import HeaderPage from "../Components/HeaderPage/";
import SnackBar from "../Components/SnackBar";

import { SnackBarProvider } from "../Context/SnackBarContext";
import { MenuProvider } from "../Context/MenuContext";
import { MythemeProvider } from '../Context/ThemeContext';


const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  content: {
    flexGrow: 1,
    marginLeft: "72px",
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();

  return (
    <MythemeProvider>
      <SnackBarProvider>
        <MenuProvider>
          <MyMenu />
          <HeaderPage />
          <main className={classes.content}>{children}</main>
          <SnackBar />
        </MenuProvider>
      </SnackBarProvider>
    </MythemeProvider>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Main);
