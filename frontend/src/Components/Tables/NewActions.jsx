import React from 'react';
import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import {
  EditSharp,
  DeleteForeverSharp
} from '@material-ui/icons';

import useDialog from '../../Context/DialogContext';

const useStyles = makeStyles((theme) => ({
  edit: {
    backgroundColor: theme.palette.button.edit,
    '&:hover': {
      backgroundColor: theme.palette.button.hover.edit
    }
  },
  disabled: {
    backgroundColor: theme.palette.button.delete,
    '&:hover': {
      backgroundColor: theme.palette.button.hover.delete
    }
  },
  actived: {
    backgroundColor: theme.palette.button.active,
    '&:hover': {
      backgroundColor: theme.palette.button.hover.active
    }
  },
  icon: {
    fontSize: '20px'
  }
}));

export default ({ id, buttons, setCurrent}) => {
  const classes = useStyles();
  const { openDialog } = useDialog();

  return (

      <ButtonGroup disableElevation variant="contained" color="primary">
        {buttons.map((button, index) => {
          switch (button) {
            case 'edit':
              return (
                <Button
                  className={classes.edit}
                  onClick={() => {
                    setCurrent({ id });
                    openDialog('update');
                  }}
                  key={index}
                >
                  <EditSharp className={classes.icon} />
                </Button>
              );

            case 'delete':
              return (
                <Button
                  className={classes.disabled}
                  onClick={() => {
                    setCurrent({ id });
                    openDialog('delete');
                  }}
                  key={index}
                >
                  <DeleteForeverSharp className={classes.icon} />
                </Button>
              );

            // case 'disable':
            //   return (
            //     <Grid item key={index}>
            //       {props.disabled === 0 ? (
            //         <ActivedButton {...props} border={false} />
            //       ) : (
            //         <DisabledButton {...props} border={false} />
            //       )}
            //     </Grid>
            //   );

            default:
              break;
          }
        })}
      </ButtonGroup>
  );
};
