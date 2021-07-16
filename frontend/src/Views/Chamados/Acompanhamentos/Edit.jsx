import React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid } from '@material-ui/core/';
import { User, EditDescricaoText } from '../../../Components/Box/AcmChamado';

//* HOOKS
import useUser from '../../../Hooks/useUser';

const useStyles = makeStyles((theme) => ({
  box: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid' + theme.palette.border.common,
    position: 'relative',
    '&:last-child': {
      borderBottom: '0px solid'
    }
  },
  // left: {
  //   '&::after': {
  //     left: '16.5%',
  //     width: 0,
  //     height: 0,
  //     top: '17.5%',
  //     content: '""',
  //     zIndex: 9,
  //     position: 'absolute',
  //     transform: 'rotate(0)',
  //     border: '25px solid',
  //     borderColor:
  //       theme.palette.background.acm + ' transparent transparent transparent'
  //   }
  // },
  // right: {
  //   '&::after': {
  //     right: '15.3%',
  //     width: 0,
  //     height: 0,
  //     top: '17.5%',
  //     content: '""',
  //     zIndex: 9,
  //     position: 'absolute',
  //     transform: 'rotate(0)',
  //     border: '25px solid',
  //     borderColor:
  //       theme.palette.background.acm + ' transparent transparent transparent'
  //   }
  // },
  user: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default ({ acm }) => {
  const classes = useStyles();
  const { userDados } = useUser();

  return (
    <div
      className={clsx(
        classes.box,
        userDados.id === acm.user_id ? classes.right : classes.left
      )}
    >
      {userDados.id === acm.user_id ? (
        <>
          <EditDescricaoText acm={acm} position="right" />
          <Grid item xs={2} className={classes.user}>
            <User nome={acm.nome} role_id={acm.role_id} imagem={acm.imagem} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={2} className={classes.user}>
            <User nome={acm.nome} role_id={acm.role_id} imagem={acm.imagem} />
          </Grid>
          <EditDescricaoText acm={acm} position="left" />
        </>
      )}
    </div>
  );
};
