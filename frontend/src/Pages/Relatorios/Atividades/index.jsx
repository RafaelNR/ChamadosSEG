import React from "react";
import clsx from 'clsx';
import { Typography, Grid, Paper, makeStyles, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

//* COMPONENTES
import FormAtividades from './Atividades.Form';

//* PROVIDER
import { LoadingProvider } from "../../../Context/LoadingContext";
import { ReportAtividadesProvider } from '../../../Context/Report.Atividades';
import useReportAtividades from '../../../Context/Report.Atividades';
import DownloadPaper from './Download';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '-6rem',
    marginBottom: 10
  },
  paper: {
    padding: 30
  },
}));

const MyRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);


const RadioOptions = () => {
  const { type, handleTypeChange, handleDataChange } = useReportAtividades();

  return (
    <Grid container>
      <Grid item xs={6}>
        <FormLabel component="legend">Data ou período </FormLabel>
        <RadioGroup aria-label="data" name="data" value={type.data} onChange={handleDataChange}>
          <FormControlLabel value="periodo" control={<MyRadio/>} label="Mês e ano" />
          <FormControlLabel value="datas" control={<MyRadio/>} label="Data inicial e final" />
        </RadioGroup>
      </Grid>
      <Grid item xs={6}>
        <FormLabel component="legend">Tipo de Informação</FormLabel>
        <RadioGroup aria-label="info" name="info" value={type.info} onChange={handleTypeChange}>
          <FormControlLabel value="cliente" control={<MyRadio />} label="Cliente" />
          <FormControlLabel value="tecnico" control={<MyRadio />} label="Técnico" />
        </RadioGroup>
      </Grid>
    </Grid>
  )
}

export default () => {
  const classes = useStyles();
  return (
    <LoadingProvider>
      <ReportAtividadesProvider>
        <Paper className={clsx(classes.root,classes.paper)} >
          <RadioOptions />
        </Paper>

        <Paper className={classes.paper}>
          <FormAtividades />
        </Paper>
        <DownloadPaper />
      </ReportAtividadesProvider>
    </LoadingProvider>
  );
};
