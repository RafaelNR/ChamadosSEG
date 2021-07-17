import React from 'react';
import {
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import useDialog from '../../../Context/DialogContext';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
    position: 'absolute',
    right: 0
  }
}));

export default () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openDialog } = useDialog();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        className={classes.button}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            openDialog('total');
            handleClose();
          }}
        >
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Gerar Liberação Total" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            openDialog('siteapp');
            handleClose();
          }}
        >
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Gerar Liberação Site ou App" />
        </MenuItem>
      </Menu>
    </>
  );
};
