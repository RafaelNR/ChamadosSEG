import React, { memo } from "react";
import clsx from 'clsx';
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
  root: {
    height: 48,
    paddingLeft: 20,
    '& .MuiListItemText-primary': {
      fontSize: 12
    },
    '& .MuiListItemText-root': {
      flex: 0
    }
  },
  active: {
    background: theme.darkMode ? '#606060' : '#f2f3f5',
    borderLeft: '3px solid ' + theme.palette.primary.main,
    paddingLeft: 17,
    '& span': {
      fontWeight: 'bold'
    }
  },
  box: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    display: 'flex'
  }
}));


const MyListItem = memo(({ menu }) => {
  const { open, handleDrawerClose } = useMenu();
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <ListItem
      button
      component={Link}
      to={menu.path}
      onClick={() => (open ? handleDrawerClose() : '')}
      className={clsx(classes.root, pathname === menu.path && classes.active)}
    >
      <div className={classes.box}>
        <ListItemIcon className={classes.icon} aria-label={menu.nome}>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.nome} />
      </div>

    </ListItem>
  );
});

const ListItemTooltip = memo(({ menu }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Tooltip title={menu.nome} placement="right" arrow>
      <ListItem
        button
        component={NavLink}
        to={menu.path}
        className={clsx(classes.root, pathname === menu.path && classes.active)}
      >
        <div className={classes.box}>
          <ListItemIcon className={classes.icon} aria-label={menu.nome}>
            {menu.icon}
          </ListItemIcon>
        </div>
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
