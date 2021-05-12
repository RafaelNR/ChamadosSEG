import React, { memo } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, useLocation } from 'react-router-dom';

import useMenu from "../../Context/MenuContext";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  makeStyles
} from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({
  icon: {
    height: 48
  },
  '@global': {
    '.MuiListItemText-primary': {
      fontSize: 12
    }
  },
  active: {
    background: theme.darkMode ? '#606060' : '#ccc'
  }
}));


const MyListItem = memo(({ menu }) => {
  const classes = useStyles();
  const { open, handleDrawerClose } = useMenu();
  const { pathname } = useLocation();

  return (
    <ListItem
      button
      component={Link}
      to={menu.path}
      onClick={() => (open ? handleDrawerClose() : '')}
      className={pathname === menu.path && classes.active}
    >
      <ListItemIcon aria-label={menu.nome}>{menu.icon}</ListItemIcon>
      <ListItemText primary={menu.nome} />
    </ListItem>
  );
});

const ListItemTooltip = memo(({ menu }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Tooltip title={menu.nome}>
      <ListItem
        button
        className={classes.icon}
        component={NavLink}
        to={menu.path}
        className={pathname === menu.path && classes.active}
      >
        <ListItemIcon aria-label={menu.nome}>{menu.icon}</ListItemIcon>
      </ListItem>
    </Tooltip>
  );
});

MyListItem.propTypes = {
  menu: PropTypes.object.isRequired,
};

ListItemTooltip.propTypes = {
  menu: PropTypes.object.isRequired,
};

export { MyListItem, ListItemTooltip };
