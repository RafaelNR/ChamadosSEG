import React from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  makeStyles,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Badge,
} from "@material-ui/core";
import ButtonLogout from "../Components/LogOut";

//* CONTEXT
import useMenu from "../Context/MenuContext";
import SwitchDarkMode from "../Components/Buttons/DarkMode.Switch";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  buttons: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    '& button':{
      widtht: 90,
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 100),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default () => {
  const classes = useStyles();
  const { open, handleDrawerOpen } = useMenu();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.grow} />
          <div className={classes.buttons}>
            <SwitchDarkMode />
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <ButtonLogout />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
