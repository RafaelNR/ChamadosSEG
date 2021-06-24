import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Grid } from '@material-ui/core/';
import { User, NewUploadInput } from '../../../Components/Box/AcmChamado';
import { MenuAcmActionsUpload } from '../../../Components/Menu/AcmChamados';
import Fade from '../../../Components/Transition/Fade';

//* CONTEXT
import useChamados from '../../../Context/ChamadosContext';
import useAcompanhamento from '../../../Context/AcmChamadoContext';

//* PROVIDER
import { UploadProvider } from '../../../Context/UploadContext';

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
  user: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default () => {
  const classes = useStyles();
  const { userDados } = useUser();
  const { chamado } = useChamados();
  const { tipo, setAcompanhamento } = useAcompanhamento();

  useEffect(() => {
    setAcompanhamento((acm) => {
      return {
        tipo: tipo,
        chamado_id: chamado.id
      };
    });
  },[])

  return (
    <Fade>
      <div
        className={clsx(
          classes.box,
          userDados.id === chamado.requerente_id ? classes.right : classes.left
        )}
      >
        <Grid item xs={10}>
          <UploadProvider>
            <NewUploadInput>
              <MenuAcmActionsUpload />
            </NewUploadInput>
          </UploadProvider>
        </Grid>
        <Grid item xs={2} className={classes.user}>
          <User
            nome={userDados.nome}
            role_id={userDados.role_id}
            imagem={userDados.imagem}
          />
        </Grid>
      </div>
    </Fade>
  );
};
