import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, CircularProgress } from '@material-ui/core/';

//* Service
import { getCliente } from '../../Service/clientes.service';

const useStyles = makeStyles((theme) => ({
  box_cliente: {
    '& > .titulo': {
      fontSize: 18,
      fontWeight: 'bold'
    },
    '& > .key': {
      display: 'block',
      fontSize: 12,
      '& > span': {
        color: theme.palette.text.common,
        fontSize: 14
      }
    }
  }
}));

export const ClienteDados = ({ id, title }) => {
  const classes = useStyles();
  const [cliente, setCliente] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let render = true;

    (async () => {
      setLoading(true);
      try {
        const { success, data } = await getCliente(id);
        if (success && render) return setCliente(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      render = false;
    };
<<<<<<< HEAD
    // eslint-disable-next-line
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 6e4996a7b24e709a1325b59e4330fdec35691b96
  }, []);

  return (
    <div className={classes.box_cliente}>
      <Typography component="span" className="titulo">
        {title}
      </Typography>
      {!loading && cliente.id ? (
        <>
          <Typography component="span" className="key">
            Nome: <span>{cliente.nome_fantasia}</span>
          </Typography>
        </>
      ) : (
        <div className={classes.loading}>
          <CircularProgress size={25} />
        </div>
      )}
    </div>
  );
};
