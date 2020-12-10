import React from "react";
import { Link } from "../Header/node_modules/react-router-dom";
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

import { AccountCircle } from "@material-ui/icons";

import useUser from "../../Hooks/useUser";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      color: "white",
    },
    "& p": {
      fontSize: "14px",
      paddingLeft: "5px",
      textTransform: "capitalize",
    },
  },
  link: {
    textDecoration: "none",
    color: "#404040",
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { nome } = useUser();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onMouseEnter={handleOpen}
      >
        <AccountCircle />
        <Typography>{nome}</Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/perfil" className={classes.link}>
            Perfil
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
