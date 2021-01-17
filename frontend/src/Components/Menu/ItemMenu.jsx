import React, { memo } from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";

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
    marginLeft: 7
  },
  '@global': {
    '.MuiListItemText-primary': {
      fontSize: 12
    }
  }
}));


const MyListItem = memo(({ menu }) => {
  const classes = useStyles();
  const { open, handleDrawerClose } = useMenu();
  return (
    <ListItem
      button
      component={Link}
      to={menu.path}
      onClick={() => (open ? handleDrawerClose() : '')}
    >
      <ListItemIcon aria-label={menu.nome}>{menu.icon}</ListItemIcon>
      <ListItemText primary={menu.nome} />
    </ListItem>
  );
});

const ListItemTooltip = memo(({ menu }) => {
  const classes = useStyles();
  return (
    <Tooltip title={menu.nome}>
      <ListItem button component={NavLink} to={menu.path}>
        <ListItemIcon className={classes.icon} aria-label={menu.nome}>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.nome} />
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
