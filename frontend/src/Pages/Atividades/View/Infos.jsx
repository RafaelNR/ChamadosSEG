import React from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core/";
import Accordion from "../../../Components/Accordion/Accordion";

import {
  getStatusAtividade,
} from '../../../Utils/dates';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '20px 5px'
  },
  categoria: {
    '& .MuiTypography-h5': {
      fontSize: '15px',
      color: theme.palette.text.atividade,
      fontWeight: 'bold',
      paddingBottom: '5px'
    }
  },
  descricao: {
    '& .MuiTypography-h5': {
      fontSize: '15px',
      color: theme.palette.text.atividade,
      fontWeight: 'bold',
      paddingBottom: '5px'
    }
  },
  not: {
    padding: 25,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold'
  }
}));

export default ({ ticket, infos, date }) => { 
  const classes = useStyles();

  return (
    <>
      {infos && infos.length >= 1 ? (
        infos.map((info, index) => {
          return (
            <Accordion key={index} info={{ ...info, ticket }}>
              <Grid container className={classes.grid}>
                <Grid item md={3} className={classes.categoria}>
                  <Typography variant="h5">Categoria</Typography>
                  <span>{info.categoria}</span>
                </Grid>
                <Grid item md={9} className={classes.descricao}>
                  <Typography variant="h5">Descrição</Typography>
                  <span>{info.descricao}</span>
                </Grid>
              </Grid>
            </Accordion>
          );
        })
      ) : (
        <Paper>
          <Typography className={classes.not}>
            {getStatusAtividade(date)
              ? 'Nenhuma atividade realizada até o momento.'
              : 'Nenhuma atividade realizada.'}
          </Typography>
        </Paper>
      )}
    </>
  );
}