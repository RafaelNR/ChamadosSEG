import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core/";
import Accordion from "../../../Components/Accordion/Accordion";


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
  }
}));

export default ({ ticket, infos }) => { 
  const classes = useStyles();
  return (
  <>
    {
        infos && infos.map((info,index) => {
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
        )

      })
      }
  </>
  )
}