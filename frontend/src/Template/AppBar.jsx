import React from "react";
import clsx from "clsx";
import { MenuRounded } from "@material-ui/icons/";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
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
    zIndex: theme.zIndex.drawer - 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
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
  toolbar: (props) => ({
    display: 'flex',
    paddingLeft: props.open ? 0 : theme.spacing(7) + 1
  }),
  atividadebutton: {
    paddingLeft: 30,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: '#fff'
  }
}));

export default () => {
  const { open } = useMenu();
  const classes = useStyles({open});

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        elevation={0}
      >
        <div className={classes.toolbar}>

          <div className={classes.atividadebutton}>
            <SearchAtividade />
            <MenuCreate />
          </div>

          <div className={classes.grow} />
          <div className={classes.buttons}>
            <SwitchDarkMode />
            <MenuUser />
          </div>
        </div>
      </AppBar>
    </div>
  );
};
