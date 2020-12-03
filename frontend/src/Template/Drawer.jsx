import React from "react";
import clsx from "clsx";

//* COMPONENTES
import {
  makeStyles,
  useTheme,
  Drawer,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import ListItensMenu from "../Components/Menu/ItensMenu";
import Perfil from './Perfil'
import ChevronRightIcon from "@material-ui/icons/ChevronRightSharp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeftSharp";

import useMenu from "../Context/MenuContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { open, handleDrawerClose } = useMenu();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h6" noWrap>
        <img
          alt="Logo"
          src="/static/logo.svg"
        />
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {
        open && <Perfil />
      }
      <ListItensMenu open={open} />
    </Drawer>
  );
};

export default React.memo(MiniDrawer);
