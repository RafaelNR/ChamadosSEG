import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, CircularProgress } from '@material-ui/core/';


//* Service
import { getUser } from '../../Service/user.service'

const useStyles = makeStyles((theme) => ({
  box_user: {
    '& > .titulo': {
      fontSize: 18,
      fontWeight: 'bold'
    },
    '& > .key': {
      display: 'block',
      fontSize: 12,
      '& > span': {
        fontWeight: 'bold',
        color: theme.palette.text.common,
        fontSize: 14,
        fontWeight: 100
      }
    }
  }
}));


export const UserDados = ({ id,title }) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let render = true;
    
    (async () => {
      setLoading(true);
      try {
        const { success, data } = await getUser(id);
        if (success && render) return setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }


    })()

    return () => {
      render = false;
    }

  }, [])
  
  return (
    <div className={classes.box_user}>
      <Typography component="span" className="titulo">
        {title}
      </Typography>
      {!loading && user.id ? (
        <>
          <Typography component="span" className="key">
            Nome: <span>{user.nome}</span>
          </Typography>
          <Typography component="span" className="key">
            Email: <span>{user.email}</span>
          </Typography>
          <Typography component="span" className="key">
            Ramal: <span>{user.ramal}</span>
          </Typography>
          <Typography component="span" className="key">
            Telefone: <span>{user.telefone}</span>
          </Typography>
        </>
      ) : (
        <div className={classes.loading}>
          <CircularProgress size={25} />
        </div>
      )}
    </div>
  );

}