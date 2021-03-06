import React, { useEffect, useState } from 'react';
import { makeStyles, Chip, Avatar } from '@material-ui/core/';
import { ArrowIconTooltips } from '../../Components/ToolTip/index';
import * as Service from '../../Service/user.service'

//** CONTEXT
import useSnackBar from '../../Context/SnackBarContext';

const useStyles = makeStyles((theme) => ({
  chip: {
    minWidth: 170,
    maxWidth: 200,
    '& .MuiChip-label': {
      color: theme.palette.primary.title,
      width: '75%',
      textAlign: 'center'
    }
  }
}));

export const ChipUser = ({ nome, img, tooltip, label, style }) => {
  const classes = useStyles();
  const [imagem, setImagem] = useState('/static/logo.png');

  useEffect(() => {
    setImagem(img ? process.env.REACT_APP_ENDPOINT_IMAGES_USER + img : imagem);
    // eslint-disable-next-line
  },[])


  if (tooltip && label) {
    return (
      <ArrowIconTooltips title={label}>
        <Chip
          className={classes.chip}
          variant="outlined"
          avatar={<Avatar alt={nome} src={imagem} />}
          label={nome}
          style={style}
        />
      </ArrowIconTooltips>
    );
  } else {
    return (
      <Chip
        className={classes.chip}
        variant="outlined"
        avatar={<Avatar alt={nome} src={imagem} />}
        label={nome}
      />
    );
  }
    
}

export default ({ nome, id, tooltip, label }) => {
  const classes = useStyles();
  const { handleSnackBar } = useSnackBar();
  const [imagem, setImagem] = useState('/static/logo.png');

  useEffect(() => {
    (async () => {
      try {
        const { success, data } = await Service.getUser(id);
        if (success) {
          data &&
            data.imagem &&
            setImagem(process.env.REACT_APP_ENDPOINT_IMAGES_USER + data.imagem);
        }
      } catch (error) {
        console.log(error);
        handleSnackBar({
          type: 'error',
          message:
            error && error.message
              ? error.message
              : 'Erro em carregar imagem do usuário.'
        });
      }
    })();
    // eslint-disable-next-line
  }, [])
  
  if (tooltip && label) {
    return (
      <ArrowIconTooltips title={label}>
        <Chip
          className={classes.chip}
          variant="outlined"
          avatar={<Avatar alt={nome} src={imagem} />}
          label={nome}
        />
      </ArrowIconTooltips>
      );
  } else {
    return (
      <Chip
        className={classes.chip}
        variant="outlined"
        avatar={<Avatar alt={nome} src={imagem} />}
        label={nome}
      />
    );
  }
    
    

};
