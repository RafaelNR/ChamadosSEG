import React from "react";
import { Grid, Paper, makeStyles, Button } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

//* PROVIDER
import useReportAtividades from '../../../Context/Report.Atividades';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    marginTop: 10
  },
  buttonView: {
    backgroundColor: theme.palette.button.viewpdf,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.button.hover
    }
  },
  buttonDownload: {
    backgroundColor: theme.palette.button.downloadpdf,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.button.hover
    }
  }
}));


export default () => {
  const classes = useStyles();
  const { download } = useReportAtividades();
  return (
    <>
      {download && (
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={5}>
              <Button
                className={classes.buttonView}
                variant="contained"
                startIcon={<CloudDownloadIcon />}
                href={download && download.link}
                fullWidth={true}
                download="download.pdf"
              >
                Download PDF
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <Button
                className={classes.buttonDownload}
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                href={download && download.link}
                fullWidth={true}
                target="_blank"
              >
                Abrir PDF
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}

