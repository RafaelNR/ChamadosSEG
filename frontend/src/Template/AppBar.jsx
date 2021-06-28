import React from "react";
import clsx from "clsx";
import { Link } from 'react-router-dom'
import { MenuRounded } from "@material-ui/icons/";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip
} from "@material-ui/core";
import MenuUser from './MenuUser'
import { SearchAtividade } from '../Components/Search/ticket';
import MenuCreate from '../Components/Menu/AppBarCreate';

//* CONTEXT
import useMenu from "../Context/MenuContext";
import SwitchDarkMode from "../Components/Buttons/DarkMode.Switch";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  buttons: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 100),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  atividadebutton: {
    paddingLeft: 30,
    display: 'flex'
  },
  icon: {
    color: '#fff'
  }
}));

export default () => {
  const classes = useStyles();
  const { open, handleDrawerOpen } = useMenu();

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuRounded />
          </IconButton>

          <div className={classes.atividadebutton}>
            <SearchAtividade />
            <MenuCreate />
          </div>

          <div className={classes.grow} />
          <div className={classes.buttons}>
            <SwitchDarkMode />
            <MenuUser />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
